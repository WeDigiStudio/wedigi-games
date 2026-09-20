"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Forest, groundY, Mist, Motes, Terrain, Undergrowth } from "./Forest";
import { Figure, Gopuram, Lantern, Ruin } from "./primitives";

function Camera({ still, mobile }: { still: boolean; mobile: boolean }) {
  const input = useRef({ x: 0, y: 0 });
  const framing = useRef<boolean | null>(null);
  const target = useRef(new THREE.Vector3());
  useEffect(() => {
    if (still || mobile) return;
    const onMove = (event: PointerEvent) => {
      input.current.x = event.clientX / window.innerWidth * 2 - 1;
      input.current.y = event.clientY / window.innerHeight * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [still, mobile]);
  useFrame(({ camera, clock }, delta) => {
    const changedFrame = framing.current !== mobile;
    if (still && !changedFrame) return;
    framing.current = mobile;
    const scroll = still ? 0 : Math.min(window.scrollY / window.innerHeight, 1.3);
    const drift = still ? 0 : Math.sin(clock.elapsedTime * .13) * .35;
    const x = (mobile ? 2.8 : .4) + (still ? 0 : input.current.x * 1.1) + drift + scroll * 1.6;
    const y = (mobile ? 4.8 : 3.8) - scroll * .4 + (still ? 0 : input.current.y * .24);
    const z = (mobile ? 18 : 16) - scroll * 4;
    const ease = still || changedFrame ? 1 : 1 - Math.exp(-delta * 2.2);
    camera.position.lerp(target.current.set(x, y, z), ease);
    camera.lookAt(mobile ? 2.8 : 1.3, mobile ? 3.5 : 2.3, -9);
  });
  return null;
}

function World({ still, onReady }: { still: boolean; onReady: () => void }) {
  const mobile = useThree((state) => state.size.width < 700);
  const ready = useRef(false);
  useFrame(() => { if (!ready.current) { ready.current = true; requestAnimationFrame(onReady); } });
  return <>
    <color attach="background" args={["#4b4258"]} />
    <fogExp2 attach="fog" args={["#4b4258", .031]} />
    <hemisphereLight args={["#aaa0bc", "#19121b", 1.8]} />
    <directionalLight position={[-12, 20, -15]} color="#a6a5c3" intensity={1.8} />
    <Camera still={still} mobile={mobile} />
    <Terrain />
    <Forest mobile={mobile} />
    <Undergrowth mobile={mobile} />
    <Gopuram position={mobile ? [-.5, 0, -23] : [-10, 0, -40]} scale={mobile ? 1.3 : 2.4} />
    <Gopuram position={[9, 0, -47]} scale={2.8} />
    <Ruin />
    <Figure position={[3.1, groundY(3.1, -.5), -.5]} />
    <Lantern position={[5.5, groundY(5.5, -3), -3]} still={still} />
    <Mist still={still} mobile={mobile} />
    <Motes still={still} mobile={mobile} />
  </>;
}

export function Scene({ still, active, onReady }: { still: boolean; active: boolean; onReady: () => void }) {
  return <Canvas
    dpr={[1, 1.5]}
    gl={{ antialias: true, alpha: false, powerPreference: "low-power" }}
    camera={{ position: [0.4, 3.8, 16], fov: 44, near: .1, far: 140 }}
    frameloop={still || !active ? "demand" : "always"}
    style={{ position: "absolute", inset: 0 }}
  ><World still={still} onReady={onReady} /></Canvas>;
}
