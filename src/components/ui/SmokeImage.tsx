"use client";

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

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTex;
  uniform float uTime;
  uniform float uProgress;
  uniform float uImgAspect;
  uniform float uPlaneAspect;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i), b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
    return v;
  }

  void main() {
    // cover-fit the texture to the plane
    vec2 uv = vUv;
    float r = uPlaneAspect / uImgAspect;
    if (r > 1.0) { uv.y = (uv.y - 0.5) / r + 0.5; }
    else { uv.x = (uv.x - 0.5) * r + 0.5; }

    float p = uProgress;
    float t = uTime;

    // gentle continuous warp — keeps the image alive, never removes it
    vec2 flow = vec2(
      fbm(uv * 3.0 + t * 0.05),
      fbm(uv * 3.0 + vec2(5.2, 1.3) - t * 0.04)
    ) - 0.5;
    vec2 duv = uv + flow * (0.008 + 0.02 * p);
    vec3 col = texture2D(uTex, clamp(duv, 0.001, 0.999)).rgb;

    // smoke wisps drifting across the image (additive — the photo stays intact)
    float s1 = fbm(uv * 3.5 + vec2(t * 0.05, -t * 0.13));
    float wisp = smoothstep(0.45, 0.95, fbm(uv * 6.0 + vec2(-t * 0.08, -t * 0.22) + s1));
    col = mix(col, vec3(0.92), wisp * (0.08 + 0.16 * p));

    // fine drifting particles
    float grain = noise(uv * vec2(200.0, 240.0) + t * 2.0);
    col += (grain - 0.5) * (0.035 + 0.05 * p);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Plane({
  src,
  hovered,
}: {
  src: string;
  hovered: React.RefObject<boolean>;
}) {
  const texture = useTexture(src);
  const { viewport } = useThree();
  const matRef = useRef<THREE.ShaderMaterial>(null);

  texture.colorSpace = THREE.SRGBColorSpace;

  const uniforms = useMemo(() => {
    const img = texture.image as { width: number; height: number } | undefined;
    return {
      uTex: { value: texture },
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uImgAspect: { value: img ? img.width / img.height : 1 },
      uPlaneAspect: { value: 1 },
    };
  }, [texture]);

  useFrame((_, dt) => {
    const u = matRef.current?.uniforms;
    if (!u) return;
    u.uTime.value += dt;
    u.uPlaneAspect.value = viewport.width / viewport.height;
    const target = hovered.current ? 1 : 0;
    u.uProgress.value += (target - u.uProgress.value) * Math.min(1, dt * 2.2);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        transparent
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

/**
 * Image rendered through a WebGL shader: gentle turbulence at rest, dispersing
 * into smoke/particles on hover. Falls back to a plain image before mount and
 * under prefers-reduced-motion.
 */
export default function SmokeImage({
  src,
  placeholder = "#15140f",
}: {
  src: string;
  placeholder?: string;
}) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
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

  return (
    <div
      className="h-full w-full"
      style={{ backgroundColor: placeholder }}
      onPointerEnter={() => (hovered.current = true)}
      onPointerLeave={() => (hovered.current = false)}
    >
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 2], fov: 50 }}
      >
        <Suspense fallback={null}>
          <Plane src={src} hovered={hovered} />
        </Suspense>
      </Canvas>
    </div>
  );
}
