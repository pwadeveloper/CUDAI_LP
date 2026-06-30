"use client";

// THREE.Clock was deprecated in r168 in favour of THREE.Timer.
// @react-three/drei still calls it internally; suppress until the package updates.
if (typeof window !== "undefined") {
  const _warn = console.warn.bind(console);
  console.warn = (...args: Parameters<typeof console.warn>) => {
    if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
    _warn(...args);
  };
}

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Bulge ("big head") lens that follows the cursor: a smooth spherical
// magnification that inflates the content under the pointer, springing in.
const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTex;
  uniform float uHover;
  uniform vec2 uMouse;
  uniform float uImgAspect;
  uniform float uPlaneAspect;

  vec2 coverfit(vec2 uv) {
    float r = uPlaneAspect / uImgAspect;
    if (r > 1.0) { uv.y = (uv.y - 0.5) / r + 0.5; }
    else { uv.x = (uv.x - 0.5) * r + 0.5; }
    return uv;
  }

  void main() {
    vec2 cuv = coverfit(vUv);
    vec2 mcuv = coverfit(uMouse);

    vec2 ds = (vUv - uMouse) * vec2(uPlaneAspect, 1.0); // circular on screen
    float dist = length(ds);
    float R = 0.45;                            // bulge radius
    float strength = 0.95 * max(uHover, 0.0);  // springy inflate amount

    float t = clamp(dist / R, 0.0, 1.0);
    // scale < 1 toward the center -> magnify (bulge); 1 at the edge -> seamless
    float scale = (dist < R) ? pow(t, strength) : 1.0;

    float ca = (dist < R) ? (1.0 - t) * 0.006 * strength : 0.0; // subtle chroma
    vec2 off = cuv - mcuv;
    vec3 col;
    col.r = texture2D(uTex, clamp(mcuv + off * (scale - ca), 0.001, 0.999)).r;
    col.g = texture2D(uTex, clamp(mcuv + off * scale, 0.001, 0.999)).g;
    col.b = texture2D(uTex, clamp(mcuv + off * (scale + ca), 0.001, 0.999)).b;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Plane({
  src,
  mouse,
  hovered,
}: {
  src: string;
  mouse: React.RefObject<{ x: number; y: number }>;
  hovered: React.RefObject<boolean>;
}) {
  const texture = useTexture(src);
  const { viewport } = useThree();
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const vel = useRef(0);

  texture.colorSpace = THREE.SRGBColorSpace;

  const uniforms = useMemo(() => {
    const img = texture.image as { width: number; height: number } | undefined;
    return {
      uTex: { value: texture },
      uHover: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uImgAspect: { value: img ? img.width / img.height : 1 },
      uPlaneAspect: { value: 1 },
    };
  }, [texture]);

  useFrame((_, dt) => {
    const u = matRef.current?.uniforms;
    if (!u) return;
    const step = Math.min(dt, 1 / 30);
    const k = Math.min(1, dt * 12);
    u.uPlaneAspect.value = viewport.width / viewport.height;
    u.uMouse.value.x += (mouse.current.x - u.uMouse.value.x) * k;
    u.uMouse.value.y += (mouse.current.y - u.uMouse.value.y) * k;

    // springy reveal: pops in with a slight overshoot, springs back on leave
    const target = hovered.current ? 1 : 0;
    const stiffness = 330;
    const damping = 22;
    vel.current +=
      ((target - u.uHover.value) * stiffness - vel.current * damping) * step;
    u.uHover.value += vel.current * step;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

/**
 * Image that refracts through a concave glass lens around the cursor on hover,
 * easing back to normal on leave. Falls back to a plain image before mount and
 * under prefers-reduced-motion.
 */
export default function ShaderImage({
  src,
  placeholder = "#15140f",
}: {
  src: string;
  placeholder?: string;
}) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const hovered = useRef(false);
  useEffect(() => setMounted(true), []);

  if (reduced || !mounted) {
    return (
      <div
        className="h-full w-full bg-cover bg-center"
        style={{ backgroundColor: placeholder, backgroundImage: `url(${src})` }}
      />
    );
  }

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current.x = (e.clientX - rect.left) / rect.width;
    mouse.current.y = 1 - (e.clientY - rect.top) / rect.height;
  };

  return (
    <div
      className="h-full w-full"
      style={{ backgroundColor: placeholder }}
      onPointerEnter={() => (hovered.current = true)}
      onPointerLeave={() => (hovered.current = false)}
      onPointerMove={onMove}
    >
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 2], fov: 50 }}
      >
        <Suspense fallback={null}>
          <Plane src={src} mouse={mouse} hovered={hovered} />
        </Suspense>
      </Canvas>
    </div>
  );
}
