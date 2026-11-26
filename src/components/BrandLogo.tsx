import React from "react";

interface BrandLogoProps {
  className?: string;
  heightClass?: string;
  priority?: boolean;
}

export function BrandLogo({
  className = "",
  heightClass = "h-7",
  priority = false,
}: BrandLogoProps) {
  const loadingAttr = priority ? "eager" : "lazy";
  return (
    <span className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/brand/wordmark-white-metallic.png"
        alt="XITNOD, Engineered for resilience"
        width={180}
        height={40}
        loading={loadingAttr}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={`hidden dark:block w-auto object-contain ${heightClass}`}
      />
      <img
        src="/brand/wordmark-light-metallic.png"
        alt="XITNOD, Engineered for resilience"
        width={180}
        height={40}
        loading={loadingAttr}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={`block dark:hidden w-auto object-contain ${heightClass}`}
      />
    </span>
  );
}

export function BrandEmblem({
  className = "h-10 w-10",
  size = 64,
  priority = false,
}: {
  className?: string;
  size?: number;
  priority?: boolean;
}) {
  const loadingAttr = priority ? "eager" : "lazy";
  return (
    <span className="inline-flex items-center select-none">
      <img
        src="/brand/icon-dark-metallic.png"
        alt="XITNOD Exit Node metallic emblem"
        width={size}
        height={size}
        loading={loadingAttr}
        decoding="async"
        className={`hidden dark:block object-contain ${className}`}
      />
      <img
        src="/brand/icon-light-metallic.png"
        alt="XITNOD Exit Node metallic emblem"
        width={size}
        height={size}
        loading={loadingAttr}
        decoding="async"
        className={`block dark:hidden object-contain ${className}`}
      />
    </span>
  );
}
