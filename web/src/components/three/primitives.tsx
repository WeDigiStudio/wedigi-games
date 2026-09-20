"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

export function useGlowTexture() {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(255,223,163,1)");
    gradient.addColorStop(.1, "rgba(255,163,73,.7)");
    gradient.addColorStop(.4, "rgba(255,110,38,.12)");
    gradient.addColorStop(1, "rgba(255,90,20,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    const result = new THREE.CanvasTexture(canvas);
    result.colorSpace = THREE.SRGBColorSpace;
    return result;
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}

export function Figure({ position }: { position: [number, number, number] }) {
  return <group position={position} rotation-y={-.35}>
    <mesh position={[0, 1.1, 0]} scale={[.9, 1.05, .9]}><sphereGeometry args={[.155, 12, 10]} /><meshBasicMaterial color="#090b12" /></mesh>
    <mesh position={[.015, .79, 0]} rotation-z={-.08}><cylinderGeometry args={[.105, .13, .39, 8]} /><meshBasicMaterial color="#0b0d15" /></mesh>
    <mesh position={[-.068, .44, 0]} rotation-z={-.06}><capsuleGeometry args={[.064, .29, 3, 6]} /><meshBasicMaterial color="#090b12" /></mesh>
    <mesh position={[.076, .43, .015]} rotation-z={.17}><capsuleGeometry args={[.062, .30, 3, 6]} /><meshBasicMaterial color="#090b12" /></mesh>
    <mesh position={[-.058, .17, .025]} rotation-z={.09}><capsuleGeometry args={[.046, .21, 3, 6]} /><meshBasicMaterial color="#090b12" /></mesh>
    <mesh position={[.11, .16, .02]} rotation-z={-.06}><capsuleGeometry args={[.045, .21, 3, 6]} /><meshBasicMaterial color="#090b12" /></mesh>
    <mesh position={[-.045, .045, .065]} scale={[1, .65, 1.7]}><sphereGeometry args={[.065, 8, 6]} /><meshBasicMaterial color="#090b12" /></mesh>
    <mesh position={[.11, .04, .075]} scale={[1, .65, 1.7]}><sphereGeometry args={[.065, 8, 6]} /><meshBasicMaterial color="#090b12" /></mesh>
    {[-1, 1].map((side) => <mesh key={side} position={[side * .14, .71, .03]} rotation-z={side * .08}><capsuleGeometry args={[.034, .3, 3, 6]} /><meshBasicMaterial color="#090b12" /></mesh>)}
    {[.045, -.045].map((x) => <mesh key={x} position={[x, 1.12, .137]}><sphereGeometry args={[.009, 6, 6]} /><meshBasicMaterial color="#f9ead5" fog={false} toneMapped={false} /></mesh>)}
    <mesh rotation-x={-Math.PI / 2} position={[0, .01, .04]} scale={[.38, .18, 1]}><circleGeometry args={[1, 20]} /><meshBasicMaterial color="#06080d" transparent opacity={.45} depthWrite={false} /></mesh>
  </group>;
}

export function Lantern({ position, still }: { position: [number, number, number]; still: boolean }) {
  const glow = useGlowTexture();
  const swing = useRef<THREE.Group>(null);
  const light = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    if (still) return;
    if (swing.current) swing.current.rotation.z = Math.sin(clock.elapsedTime * .65) * .045;
    if (light.current) light.current.intensity = 17 + Math.sin(clock.elapsedTime * 3.2) * 1.4;
  });
  return <group position={position}>
    <mesh position={[0, 1.9, 0]} rotation-z={-.06}><boxGeometry args={[.14, 3.8, .17]} /><meshStandardMaterial color="#17121a" roughness={1} /></mesh>
    <mesh position={[-.43, 3.76, 0]} rotation-z={-.13}><boxGeometry args={[1.2, .12, .17]} /><meshStandardMaterial color="#17121a" roughness={1} /></mesh>
    <mesh position={[-.23, 3.4, 0]} rotation-z={-.8}><boxGeometry args={[.08, .85, .1]} /><meshStandardMaterial color="#17121a" roughness={1} /></mesh>
    <group ref={swing} position={[-.88, 3.65, 0]}>
      <mesh position={[0, -.13, 0]}><torusGeometry args={[.09, .014, 5, 12]} /><meshBasicMaterial color="#0e0b10" /></mesh>
      <mesh position={[0, -.30, 0]} rotation-y={Math.PI / 4}><coneGeometry args={[.27, .18, 4]} /><meshBasicMaterial color="#131018" /></mesh>
      <mesh position={[0, -.58, 0]}><boxGeometry args={[.29, .37, .29]} /><meshBasicMaterial color="#ff9d38" toneMapped={false} /></mesh>
      {[-1, 1].flatMap((x) => [-1, 1].map((z) => <mesh key={`${x}-${z}`} position={[x * .17, -.57, z * .17]} rotation-z={x * .08}><boxGeometry args={[.035, .48, .035]} /><meshBasicMaterial color="#171019" /></mesh>))}
      <mesh position={[0, -.81, 0]}><boxGeometry args={[.41, .055, .41]} /><meshBasicMaterial color="#131018" /></mesh>
      <sprite position={[0, -.56, .05]} scale={[4.2, 4.2, 1]}><spriteMaterial map={glow} transparent opacity={.7} blending={THREE.AdditiveBlending} depthWrite={false} fog={false} /></sprite>
      <pointLight ref={light} position={[0, -.55, .25]} color="#ff8d36" intensity={17} distance={17} decay={2} />
    </group>
  </group>;
}

export function Gopuram({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return <group position={position} scale={scale}>
    {Array.from({ length: 7 }, (_, i) => <group key={i} position={[0, i * .55, 0]}>
      <mesh position={[0, .25, 0]}><boxGeometry args={[2.7 - i * .28, .55, 1.25 - i * .09]} /><meshBasicMaterial color="#22202c" fog /></mesh>
      <mesh position={[0, .53, 0]}><boxGeometry args={[2.85 - i * .28, .1, 1.4 - i * .09]} /><meshBasicMaterial color="#22202c" fog /></mesh>
      {[-1, 1].map((x) => <mesh key={x} position={[x * (1.3 - i * .14), .63, 0]}><sphereGeometry args={[.1, 5, 5]} /><meshBasicMaterial color="#22202c" fog /></mesh>)}
    </group>)}
    {[-.4, -.2, 0, .2, .4].map((x) => <mesh key={x} position={[x, 4.04, 0]}><sphereGeometry args={[.09, 6, 6]} /><meshBasicMaterial color="#22202c" fog /></mesh>)}
  </group>;
}

export function Ruin() {
  return <group position={[11, .5, -22]} rotation-y={-.2}>
    {[-3, 3].map((x) => <mesh key={x} position={[x, 2, 0]}><boxGeometry args={[.38, 4, .4]} /><meshBasicMaterial color="#181722" fog /></mesh>)}
    {[-1, 1].map((s) => <mesh key={s} position={[s * 1.75, 4.2, 0]} rotation-z={s * .55}><boxGeometry args={[4.3, .25, .35]} /><meshBasicMaterial color="#181722" fog /></mesh>)}
    <mesh position={[1.2, 1.8, -.4]} rotation-z={-.9}><boxGeometry args={[.25, 5, .3]} /><meshBasicMaterial color="#181722" fog /></mesh>
    <mesh position={[0, .5, 0]}><boxGeometry args={[7, 1, 3]} /><meshBasicMaterial color="#181722" fog /></mesh>
  </group>;
}
