"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";
import { SERVICES } from "@/data/services";

interface Hero3DProps {
  activeServiceIndex: number | null;
}

function normalizeGeometryUVs(geo: THREE.BufferGeometry): void {
  geo.computeBoundingBox();
  const box = geo.boundingBox;
  if (!box) return;

  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  if (!pos || !uv) return;

  const spanX = Math.max(box.max.x - box.min.x, 1e-4);
  const spanY = Math.max(box.max.y - box.min.y, 1e-4);

  for (let i = 0; i < pos.count; i++) {
    const u = (pos.getX(i) - box.min.x) / spanX;
    const v = (pos.getY(i) - box.min.y) / spanY;
    uv.setXY(i, u, v);
  }
  uv.needsUpdate = true;
}

function tryCreateStudioEnvironment(
  renderer: THREE.WebGLRenderer,
  isDark: boolean
): THREE.WebGLRenderTarget | null {
  try {
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();

    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(isDark ? 0x101028 : 0xeeeffc);

    const panelConfigs = isDark
      ? [
          { color: 0xffffff, intensity: 4.5, pos: [0, 8, 5], scale: [14, 6, 1] },
          { color: 0xf4f6fc, intensity: 3.6, pos: [-9, 3, 6], scale: [8, 10, 1] },
          { color: 0xe6e9f5, intensity: 2.8, pos: [9, 2, 4], scale: [8, 10, 1] },
          { color: 0xffb27a, intensity: 2.2, pos: [5, -6, 5], scale: [8, 4, 1] },
          { color: 0xd8dcf0, intensity: 2.0, pos: [0, -8, -4], scale: [12, 6, 1] },
        ]
      : [
          { color: 0xffffff, intensity: 4.0, pos: [0, 8, 6], scale: [16, 8, 1] },
          { color: 0xb8beff, intensity: 2.2, pos: [-8, 3, 5], scale: [8, 10, 1] },
          { color: 0x262666, intensity: 2.2, pos: [8, -4, 4], scale: [10, 8, 1] },
          { color: 0xe07628, intensity: 1.8, pos: [4, -5, 6], scale: [7, 4, 1] },
        ];

    const planeGeo = new THREE.PlaneGeometry(1, 1);
    const mats: THREE.Material[] = [];

    for (const cfg of panelConfigs) {
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(cfg.color).multiplyScalar(cfg.intensity),
        side: THREE.DoubleSide,
      });
      mats.push(mat);
      const mesh = new THREE.Mesh(planeGeo, mat);
      mesh.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
      mesh.scale.set(cfg.scale[0], cfg.scale[1], cfg.scale[2]);
      mesh.lookAt(0, 0, 0);
      envScene.add(mesh);
    }

    const renderTarget = pmrem.fromScene(envScene, 0.04);
    pmrem.dispose();
    planeGeo.dispose();
    mats.forEach((m) => m.dispose());
    return renderTarget;
  } catch {
    return null;
  }
}

function createBrushedMetalTexture(isDark: boolean): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, 512, 512);
    if (isDark) {
      grad.addColorStop(0.0, "#FFFFFF");
      grad.addColorStop(0.28, "#E8ECF6");
      grad.addColorStop(0.5, "#B6BCCF");
      grad.addColorStop(0.72, "#E4E8F4");
      grad.addColorStop(1.0, "#CFD4E4");
    } else {
      grad.addColorStop(0.0, "#383882");
      grad.addColorStop(0.35, "#1E1E54");
      grad.addColorStop(0.55, "#0F0F2D");
      grad.addColorStop(0.8, "#2C2C70");
      grad.addColorStop(1.0, "#171742");
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    for (let y = 0; y < 512; y += 2) {
      const alpha = (Math.sin(y * 0.73) * 0.5 + 0.5) * 0.055;
      ctx.fillStyle = y % 4 === 0 ? `rgba(255,255,255,${alpha})` : `rgba(18,18,42,${alpha})`;
      ctx.fillRect(0, y, 512, 1);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createOrangeBladeTexture(isDark: boolean): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const grad = ctx.createRadialGradient(256, 256, 16, 256, 256, 256);
    if (isDark) {
      grad.addColorStop(0.0, "#FFF5E0");
      grad.addColorStop(0.2, "#FFC58A");
      grad.addColorStop(0.48, "#F58A38");
      grad.addColorStop(0.8, "#D9641C");
      grad.addColorStop(1.0, "#B8470D");
    } else {
      grad.addColorStop(0.0, "#FFE0B8");
      grad.addColorStop(0.2, "#F59645");
      grad.addColorStop(0.48, "#DC6518");
      grad.addColorStop(0.8, "#B8490C");
      grad.addColorStop(1.0, "#8F3406");
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createCoreGlowTexture(mode: "wide" | "darkCore" | "lightCushion"): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const grad = ctx.createRadialGradient(128, 128, 4, 128, 128, 128);
    if (mode === "wide") {
      grad.addColorStop(0.0, "rgba(255, 148, 66, 0.42)");
      grad.addColorStop(0.38, "rgba(240, 114, 34, 0.18)");
      grad.addColorStop(0.68, "rgba(255, 168, 98, 0.05)");
      grad.addColorStop(1.0, "rgba(234, 100, 18, 0.0)");
    } else if (mode === "lightCushion") {
      grad.addColorStop(0.0, "rgba(255, 255, 255, 0.96)");
      grad.addColorStop(0.48, "rgba(235, 238, 255, 0.72)");
      grad.addColorStop(1.0, "rgba(244, 245, 253, 0.0)");
    } else {
      grad.addColorStop(0.0, "rgba(255, 224, 180, 0.78)");
      grad.addColorStop(0.3, "rgba(255, 160, 88, 0.36)");
      grad.addColorStop(0.62, "rgba(236, 118, 34, 0.12)");
      grad.addColorStop(1.0, "rgba(234, 118, 36, 0.0)");
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createExitSlashGeometry(): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  const longR = 2.82;
  const shortR = 1.12;
  const waist = 0.24;

  const angleLong1 = Math.PI * 0.25;
  const angleShort1 = Math.PI * 0.75;
  const angleLong2 = Math.PI * 1.25;
  const angleShort2 = Math.PI * 1.75;

  const pts: [number, number][] = [
    [Math.cos(angleLong1) * longR, Math.sin(angleLong1) * longR],
    [Math.cos(angleLong1 + Math.PI * 0.25) * waist, Math.sin(angleLong1 + Math.PI * 0.25) * waist],
    [Math.cos(angleShort1) * shortR, Math.sin(angleShort1) * shortR],
    [Math.cos(angleShort1 + Math.PI * 0.25) * waist, Math.sin(angleShort1 + Math.PI * 0.25) * waist],
    [Math.cos(angleLong2) * longR, Math.sin(angleLong2) * longR],
    [Math.cos(angleLong2 + Math.PI * 0.25) * waist, Math.sin(angleLong2 + Math.PI * 0.25) * waist],
    [Math.cos(angleShort2) * shortR, Math.sin(angleShort2) * shortR],
    [Math.cos(angleShort2 + Math.PI * 0.25) * waist, Math.sin(angleShort2 + Math.PI * 0.25) * waist],
  ];

  shape.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) {
    shape.lineTo(pts[i][0], pts[i][1]);
  }
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.16,
    bevelEnabled: true,
    bevelThickness: 0.065,
    bevelSize: 0.025,
    bevelSegments: 3,
  });
  geo.center();
  normalizeGeometryUVs(geo);
  return geo;
}

function InteractiveCss3DFallback({
  isDark,
  activeServiceIndex,
}: {
  isDark: boolean;
  activeServiceIndex: number | null;
}) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rigRef = useRef<HTMLDivElement | null>(null);
  const wideGlowRef = useRef<HTMLDivElement | null>(null);
  const coreGlowRef = useRef<HTMLDivElement | null>(null);
  const ring1Ref = useRef<HTMLDivElement | null>(null);
  const ring2Ref = useRef<HTMLDivElement | null>(null);
  const ring3Ref = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<number | null>(activeServiceIndex);

  useEffect(() => {
    activeRef.current = activeServiceIndex;
  }, [activeServiceIndex]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let pointerX = 0;
    let pointerY = 0;
    let smoothPx = 0;
    let smoothPy = 0;
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let dragX = 0;
    let dragY = 0;
    let curRx = 0;
    let curRy = 0;
    let a1 = 0;
    let a2 = 120;
    let a3 = 240;
    let elapsed = 0;
    let lastTime = performance.now();
    let animId = 0;

    const onGlobalMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const cx = rect.left + rect.width * 0.5;
      const cy = rect.top + rect.height * 0.5;
      const nx = (e.clientX - cx) / Math.max(window.innerWidth * 0.45, 280);
      const ny = -(e.clientY - cy) / Math.max(window.innerHeight * 0.45, 280);
      pointerX = Math.max(-1, Math.min(1, nx));
      pointerY = Math.max(-1, Math.min(1, ny));

      if (isDragging) {
        dragY = Math.max(-35, Math.min(35, dragY + (e.clientX - prevX) * 0.35));
        dragX = Math.max(-28, Math.min(28, dragX - (e.clientY - prevY) * 0.35));
        prevX = e.clientX;
        prevY = e.clientY;
      }
    };

    const onDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onUp = () => {
      isDragging = false;
    };

    window.addEventListener("pointermove", onGlobalMove, { passive: true });
    stage.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    const tick = (now: number) => {
      animId = requestAnimationFrame(tick);
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      elapsed += dt;

      const idx = activeRef.current;
      const preset = idx !== null && SERVICES[idx] ? SERVICES[idx].orbitPreset : null;
      const mult = preset ? preset.ringSpeed : 1.0;

      if (!isDragging) {
        dragX *= 0.93;
        dragY *= 0.93;
      }

      smoothPx += (pointerX - smoothPx) * 0.065;
      smoothPy += (pointerY - smoothPy) * 0.065;

      const targetRy = smoothPx * 18 + (preset ? preset.tiltY * 28 : 0) + dragY + Math.sin(elapsed * 0.8) * 6;
      const targetRx = smoothPy * 14 + (preset ? preset.tiltX * 24 : 0) + dragX + Math.cos(elapsed * 0.65) * 4;

      curRx += (targetRx - curRx) * 0.08;
      curRy += (targetRy - curRy) * 0.08;
      const floatY = Math.sin(elapsed * 1.4) * 9;

      if (rigRef.current) {
        rigRef.current.style.transform = `translate3d(0, ${floatY.toFixed(2)}px, 0) rotateX(${curRx.toFixed(2)}deg) rotateY(${curRy.toFixed(2)}deg)`;
      }

      const breathe = 1 + Math.sin(elapsed * 1.9) * 0.05;
      if (wideGlowRef.current) {
        const gx = smoothPx * 34;
        const gy = -smoothPy * 28;
        wideGlowRef.current.style.transform = `translate3d(${gx.toFixed(1)}px, ${gy.toFixed(1)}px, -36px) scale(${breathe.toFixed(3)})`;
      }
      if (coreGlowRef.current) {
        const cx = -smoothPx * 14;
        const cy = smoothPy * 12;
        coreGlowRef.current.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, -18px) scale(${(1 + Math.sin(elapsed * 2.3) * 0.06).toFixed(3)})`;
      }

      a1 = (a1 + 26 * mult * dt) % 360;
      a2 = (a2 - 19 * mult * dt) % 360;
      a3 = (a3 + 14 * mult * dt) % 360;

      if (ring1Ref.current) {
        ring1Ref.current.style.transform = `rotateX(64deg) rotateY(22deg) rotateZ(${a1.toFixed(2)}deg)`;
      }
      if (ring2Ref.current) {
        ring2Ref.current.style.transform = `rotateX(-54deg) rotateY(36deg) rotateZ(${a2.toFixed(2)}deg)`;
      }
      if (ring3Ref.current) {
        ring3Ref.current.style.transform = `rotateX(24deg) rotateY(-62deg) rotateZ(${a3.toFixed(2)}deg)`;
      }
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", onGlobalMove);
      stage.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  const ringStroke = isDark ? "rgba(184, 190, 255, 0.44)" : "rgba(22, 22, 56, 0.58)";
  const nodeSilver = isDark ? "#DCE0FF" : "#161638";
  const nodeOrange = isDark ? "#FFB27A" : "#C84B0A";

  return (
    <div
      ref={stageRef}
      aria-label="Interactive 3D XITNOD Exit Node emblem"
      className="relative flex h-full w-full cursor-grab items-center justify-center select-none touch-pan-y active:cursor-grabbing"
      style={{ perspective: "1100px" }}
    >
      {/* Wide Subtle Transparent Orange Backlight (Moves Subtly with Cursor) */}
      <div
        ref={wideGlowRef}
        aria-hidden="true"
        className="pointer-events-none absolute h-[380px] w-[380px] rounded-full will-change-transform sm:h-[460px] sm:w-[460px]"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(255, 146, 60, 0.14) 0%, rgba(236, 108, 28, 0.07) 44%, rgba(255, 178, 122, 0.02) 68%, transparent 82%)"
            : "radial-gradient(circle, rgba(255, 146, 60, 0.09) 0%, rgba(255, 178, 116, 0.04) 48%, transparent 82%)",
          filter: "blur(52px)",
        }}
      />

      <div
        ref={rigRef}
        className="relative flex h-[320px] w-[320px] items-center justify-center sm:h-[380px] sm:w-[380px] lg:h-[430px] lg:w-[430px]"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {/* Subtle Orange Core in Dark Mode, Clean White Separation Cushion in Light Mode */}
        <div
          ref={coreGlowRef}
          aria-hidden="true"
          className="pointer-events-none absolute h-64 w-64 rounded-full blur-3xl will-change-transform"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(255, 176, 114, 0.28) 0%, rgba(240, 118, 34, 0.11) 52%, transparent 76%)"
              : "radial-gradient(circle, rgba(255, 255, 255, 0.96) 0%, rgba(235, 238, 255, 0.72) 52%, transparent 78%)",
          }}
        />

        <div
          ref={ring1Ref}
          aria-hidden="true"
          className="pointer-events-none absolute inset-4"
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          <svg viewBox="0 0 400 400" className="h-full w-full overflow-visible">
            <circle cx="200" cy="200" r="185" fill="none" stroke={ringStroke} strokeWidth={isDark ? "1.5" : "1.75"} />
            <circle cx="385" cy="200" r="5.5" fill={nodeOrange} />
            <circle cx="107" cy="360" r="4" fill={nodeSilver} />
          </svg>
        </div>

        <div
          ref={ring2Ref}
          aria-hidden="true"
          className="pointer-events-none absolute inset-1"
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          <svg viewBox="0 0 400 400" className="h-full w-full overflow-visible">
            <circle cx="200" cy="200" r="192" fill="none" stroke={ringStroke} strokeWidth={isDark ? "1.2" : "1.5"} opacity="0.85" />
            <circle cx="200" cy="8" r="5" fill={nodeOrange} />
            <circle cx="200" cy="392" r="4" fill={nodeSilver} />
          </svg>
        </div>

        <div
          ref={ring3Ref}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          <svg viewBox="0 0 400 400" className="h-full w-full overflow-visible">
            <circle cx="200" cy="200" r="196" fill="none" stroke={ringStroke} strokeWidth={isDark ? "1.05" : "1.3"} opacity="0.68" />
            <circle cx="396" cy="200" r="4.2" fill={nodeSilver} />
          </svg>
        </div>

        <img
          src={isDark ? "/brand/icon-dark-metallic.png" : "/brand/icon-light-metallic.png"}
          alt="XITNOD Exit Node metallic emblem"
          width={320}
          height={320}
          decoding="async"
          draggable={false}
          className={`pointer-events-none relative h-60 w-60 object-contain sm:h-72 sm:w-72 lg:h-80 lg:w-80 ${
            isDark
              ? "drop-shadow-[0_18px_34px_rgba(0,0,0,0.48)]"
              : "drop-shadow-[0_10px_22px_rgba(18,18,52,0.32)]"
          }`}
          style={{ transform: "translateZ(28px)" }}
        />
      </div>
    </div>
  );
}

export function Hero3D({ activeServiceIndex }: Hero3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const activeServiceRef = useRef<number | null>(activeServiceIndex);
  const [useCssFallback, setUseCssFallback] = useState(false);

  useEffect(() => {
    activeServiceRef.current = activeServiceIndex;
  }, [activeServiceIndex]);

  useEffect(() => {
    if (useCssFallback) return;
    const container = containerRef.current;
    if (!container) return;

    const isDark = theme === "dark";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const motionScale = reducedMotion ? 0.35 : 1.0;

    let renderer: THREE.WebGLRenderer | null = null;
    let envTarget: THREE.WebGLRenderTarget | null = null;
    let animId = 0;
    let resizeObserver: ResizeObserver | null = null;

    const disposableGeos: THREE.BufferGeometry[] = [];
    const disposableMats: THREE.Material[] = [];
    const disposableTexs: THREE.Texture[] = [];

    let onGlobalMove: ((e: PointerEvent) => void) | null = null;
    let onPointerDown: ((e: PointerEvent) => void) | null = null;
    let onPointerUp: (() => void) | null = null;
    let onContextLost: ((e: Event) => void) | null = null;

    try {
      const initW = Math.max(container.clientWidth || 0, 320);
      const initH = Math.max(container.clientHeight || 0, 320);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "default",
      });

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(initW, initH, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = isDark ? 0.96 : 1.02;
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      onContextLost = (e: Event) => {
        e.preventDefault();
        setUseCssFallback(true);
      };
      renderer.domElement.addEventListener("webglcontextlost", onContextLost, false);

      container.replaceChildren(renderer.domElement);

      const scene = new THREE.Scene();
      envTarget = tryCreateStudioEnvironment(renderer, isDark);
      if (envTarget) {
        scene.environment = envTarget.texture;
      }

      const camera = new THREE.PerspectiveCamera(36, initW / initH, 0.1, 100);
      camera.position.set(0, 0, 7.6);

      const lightBoost = envTarget ? 1.0 : 1.75;
      const ambient = new THREE.AmbientLight(
        isDark ? 0xe6e9ff : 0xffffff,
        (isDark ? 0.65 : 0.9) * lightBoost
      );
      scene.add(ambient);

      const keyLight = new THREE.DirectionalLight(0xffffff, (isDark ? 1.9 : 2.0) * lightBoost);
      keyLight.position.set(-4.5, 6, 7);
      scene.add(keyLight);

      const rimLight = new THREE.DirectionalLight(
        isDark ? 0xc8ccff : 0x5c62bf,
        (isDark ? 1.3 : 1.15) * lightBoost
      );
      rimLight.position.set(6, -3, -4);
      scene.add(rimLight);

      const fillLight = new THREE.DirectionalLight(0xffcf9e, (isDark ? 0.85 : 0.65) * lightBoost);
      fillLight.position.set(4, 4, 6);
      scene.add(fillLight);

      const warmCoreLight = new THREE.PointLight(0xff9442, isDark ? 4.4 : 2.0, 8.5, 1.5);
      warmCoreLight.position.set(0, 0, 1.2);
      scene.add(warmCoreLight);

      // Wide, subtle cursor-reactive transparent orange backdrop halo
      const wideGlowTex = createCoreGlowTexture("wide");
      disposableTexs.push(wideGlowTex);
      const wideGlowMat = new THREE.SpriteMaterial({
        map: wideGlowTex,
        color: 0xff9442,
        transparent: true,
        opacity: isDark ? 0.34 : 0.15,
        blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
        depthWrite: false,
      });
      disposableMats.push(wideGlowMat);
      const wideGlowSprite = new THREE.Sprite(wideGlowMat);
      wideGlowSprite.scale.set(5.8, 5.8, 1);
      wideGlowSprite.position.set(0, 0, -1.6);
      scene.add(wideGlowSprite);

      const rootGroup = new THREE.Group();
      scene.add(rootGroup);

      const emblemGroup = new THREE.Group();
      rootGroup.add(emblemGroup);

      const ringTex = createBrushedMetalTexture(isDark);
      disposableTexs.push(ringTex);

      const ringMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0xf2f4fa : 0x1e1e5c,
        map: ringTex,
        metalness: envTarget ? (isDark ? 0.88 : 0.82) : 0.45,
        roughness: envTarget ? (isDark ? 0.22 : 0.26) : 0.3,
        envMapIntensity: isDark ? 1.15 : 1.05,
      });
      disposableMats.push(ringMat);

      const makeCenteredRingArc = (startA: number, endA: number) => {
        const shape = new THREE.Shape();
        shape.absarc(0, 0, 1.62, startA, endA, false);
        shape.absarc(0, 0, 1.14, endA, startA, true);
        shape.closePath();
        const g = new THREE.ExtrudeGeometry(shape, {
          depth: 0.28,
          bevelEnabled: true,
          bevelThickness: 0.055,
          bevelSize: 0.04,
          bevelSegments: 5,
          curveSegments: 72,
        });
        g.translate(0, 0, -0.14);
        normalizeGeometryUVs(g);
        return g;
      };

      const trueArcGeo1 = makeCenteredRingArc(Math.PI * 0.305, Math.PI * 1.185);
      const trueArcGeo2 = makeCenteredRingArc(Math.PI * 1.305, Math.PI * 2.185);
      disposableGeos.push(trueArcGeo1, trueArcGeo2);

      const arc1 = new THREE.Mesh(trueArcGeo1, ringMat);
      const arc2 = new THREE.Mesh(trueArcGeo2, ringMat);
      emblemGroup.add(arc1, arc2);

      const slashGeo = createExitSlashGeometry();
      const slashTex = createOrangeBladeTexture(isDark);
      disposableGeos.push(slashGeo);
      disposableTexs.push(slashTex);

      const slashMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0xff9a4d : 0xd6540c,
        map: slashTex,
        emissive: new THREE.Color(isDark ? 0xd95f14 : 0x8a3006),
        emissiveIntensity: isDark ? 0.42 : 0.18,
        metalness: envTarget ? 0.74 : 0.4,
        roughness: 0.22,
        envMapIntensity: 1.05,
      });
      disposableMats.push(slashMat);

      const slashMesh = new THREE.Mesh(slashGeo, slashMat);
      slashMesh.position.z = 0.05;
      emblemGroup.add(slashMesh);

      // Subtle orange core in Dark Mode, clean white separation cushion in Light Mode
      const glowTex = createCoreGlowTexture(isDark ? "darkCore" : "lightCushion");
      disposableTexs.push(glowTex);

      const glowMat = new THREE.SpriteMaterial({
        map: glowTex,
        color: isDark ? 0xffa860 : 0xffffff,
        transparent: true,
        opacity: isDark ? 0.44 : 0.75,
        blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
        depthWrite: false,
      });
      disposableMats.push(glowMat);

      const glowSprite = new THREE.Sprite(glowMat);
      glowSprite.scale.set(2.9, 2.9, 1);
      glowSprite.position.set(0, 0, -0.22);
      emblemGroup.add(glowSprite);

      const orbitGroup = new THREE.Group();
      rootGroup.add(orbitGroup);

      const orbitConfigs = [
        { r: 2.18, tube: isDark ? 0.012 : 0.014, rx: 1.12, ry: 0.38, speed: 0.32, opacity: isDark ? 0.45 : 0.62, nodes: 3 },
        { r: 2.52, tube: isDark ? 0.01 : 0.012, rx: -0.92, ry: 0.62, speed: -0.24, opacity: isDark ? 0.34 : 0.5, nodes: 2 },
        { r: 2.78, tube: isDark ? 0.009 : 0.011, rx: 0.42, ry: -1.04, speed: 0.18, opacity: isDark ? 0.25 : 0.4, nodes: 3 },
      ];

      const orbitRings: { holder: THREE.Group; baseSpeed: number }[] = [];

      const nodeGeo = new THREE.SphereGeometry(0.054, 16, 16);
      disposableGeos.push(nodeGeo);

      const nodeSilverMat = new THREE.MeshBasicMaterial({
        color: isDark ? 0xd8dcff : 0x161638,
      });
      const nodeOrangeMat = new THREE.MeshBasicMaterial({
        color: isDark ? 0xffb27a : 0xc84b0a,
      });
      disposableMats.push(nodeSilverMat, nodeOrangeMat);

      orbitConfigs.forEach((cfg, idx) => {
        const holder = new THREE.Group();
        holder.rotation.set(cfg.rx, cfg.ry, 0);

        const torusGeo = new THREE.TorusGeometry(cfg.r, cfg.tube, 12, 128);
        const torusMat = new THREE.MeshBasicMaterial({
          color: isDark ? 0xb4b8ff : 0x161638,
          transparent: true,
          opacity: cfg.opacity,
        });
        disposableGeos.push(torusGeo);
        disposableMats.push(torusMat);

        holder.add(new THREE.Mesh(torusGeo, torusMat));

        for (let n = 0; n < cfg.nodes; n++) {
          const theta = (n / cfg.nodes) * Math.PI * 2 + idx * 0.9;
          const dot = new THREE.Mesh(nodeGeo, n === 0 ? nodeOrangeMat : nodeSilverMat);
          dot.position.set(Math.cos(theta) * cfg.r, Math.sin(theta) * cfg.r, 0);
          holder.add(dot);
        }

        orbitGroup.add(holder);
        orbitRings.push({ holder, baseSpeed: cfg.speed });
      });

      renderer.render(scene, camera);

      let pointerX = 0;
      let pointerY = 0;
      let isDragging = false;
      let prevX = 0;
      let prevY = 0;
      let dragRotX = 0;
      let dragRotY = 0;

      onGlobalMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        const cx = rect.left + rect.width * 0.5;
        const cy = rect.top + rect.height * 0.5;
        const nx = (e.clientX - cx) / Math.max(window.innerWidth * 0.45, 280);
        const ny = -(e.clientY - cy) / Math.max(window.innerHeight * 0.45, 280);
        pointerX = THREE.MathUtils.clamp(nx, -1, 1);
        pointerY = THREE.MathUtils.clamp(ny, -1, 1);

        if (isDragging) {
          const dx = e.clientX - prevX;
          const dy = e.clientY - prevY;
          dragRotY = THREE.MathUtils.clamp(dragRotY + dx * 0.008, -1.1, 1.1);
          dragRotX = THREE.MathUtils.clamp(dragRotX + dy * 0.008, -0.85, 0.85);
          prevX = e.clientX;
          prevY = e.clientY;
        }
      };

      onPointerDown = (e: PointerEvent) => {
        isDragging = true;
        prevX = e.clientX;
        prevY = e.clientY;
        container.style.cursor = "grabbing";
      };

      onPointerUp = () => {
        isDragging = false;
        container.style.cursor = "grab";
      };

      container.style.cursor = "grab";
      window.addEventListener("pointermove", onGlobalMove, { passive: true });
      container.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointerup", onPointerUp);

      resizeObserver = new ResizeObserver(() => {
        if (!container || !renderer) return;
        const w = Math.max(container.clientWidth, 1);
        const h = Math.max(container.clientHeight, 1);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      });
      resizeObserver.observe(container);

      let lastTime = performance.now();
      let elapsed = 0;

      const animate = (now: number) => {
        animId = requestAnimationFrame(animate);
        const dt = Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;
        elapsed += dt * motionScale;

        const svcIdx = activeServiceRef.current;
        const preset = svcIdx !== null && SERVICES[svcIdx] ? SERVICES[svcIdx].orbitPreset : null;
        const speedMult = (preset ? preset.ringSpeed : 1.0) * motionScale;

        if (!isDragging) {
          dragRotX *= 0.94;
          dragRotY *= 0.94;
        }

        const targetY =
          pointerX * 0.34 + (preset ? preset.tiltY : 0) + dragRotY + Math.sin(elapsed * 0.65) * 0.14;
        const targetX =
          -pointerY * 0.24 + (preset ? preset.tiltX : 0) + dragRotX + Math.cos(elapsed * 0.5) * 0.08;

        rootGroup.rotation.y += (targetY - rootGroup.rotation.y) * 0.06;
        rootGroup.rotation.x += (targetX - rootGroup.rotation.x) * 0.06;
        rootGroup.position.y = Math.sin(elapsed * 1.25) * 0.11;

        // Smooth cursor parallax for the wide subtle transparent orange backdrop glow
        wideGlowSprite.position.x += (pointerX * 0.85 - wideGlowSprite.position.x) * 0.055;
        wideGlowSprite.position.y += (pointerY * 0.65 - wideGlowSprite.position.y) * 0.055;
        const widePulse = 5.8 * (1 + Math.sin(elapsed * 1.8) * 0.05);
        wideGlowSprite.scale.set(widePulse, widePulse, 1);

        const targetCore = preset ? preset.coreIntensity : 1.0;
        const pulse = 1.0 + Math.sin(elapsed * 2.2) * 0.06;
        const baseGlowScale = 2.9 * targetCore * pulse;
        glowSprite.scale.x += (baseGlowScale - glowSprite.scale.x) * 0.08;
        glowSprite.scale.y = glowSprite.scale.x;

        for (const ring of orbitRings) {
          ring.holder.rotation.z += ring.baseSpeed * speedMult * dt;
        }

        keyLight.position.x = -4.5 + pointerX * 3.0;
        keyLight.position.y = 6.0 + pointerY * 2.2;

        renderer?.render(scene, camera);
      };

      animId = requestAnimationFrame(animate);
    } catch {
      setUseCssFallback(true);
    }

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver?.disconnect();
      if (onGlobalMove) window.removeEventListener("pointermove", onGlobalMove);
      if (onPointerDown) container.removeEventListener("pointerdown", onPointerDown);
      if (onPointerUp) window.removeEventListener("pointerup", onPointerUp);
      if (renderer && onContextLost) {
        renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      }

      disposableGeos.forEach((g) => g.dispose());
      disposableMats.forEach((m) => m.dispose());
      disposableTexs.forEach((t) => t.dispose());
      envTarget?.dispose();
      renderer?.dispose();
    };
  }, [theme, useCssFallback]);

  if (useCssFallback) {
    return (
      <InteractiveCss3DFallback
        isDark={theme === "dark"}
        activeServiceIndex={activeServiceIndex}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      aria-label="Interactive 3D XITNOD Exit Node emblem"
      className="relative h-full w-full select-none touch-pan-y"
    />
  );
}
