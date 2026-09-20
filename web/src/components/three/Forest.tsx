"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

export const random = (n: number) => { const v = Math.sin(n * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };
export const pathX = (z: number) => 2.8 + Math.sin(z * 0.085) * 2.4;
export function groundY(x: number, z: number) {
  const banks = THREE.MathUtils.smoothstep(Math.abs(x - pathX(z)), 1.1, 4.5);
  return banks * (0.65 + Math.sin(x * 0.53 + z * 0.13) * 0.35 + Math.cos(z * 0.32) * 0.3) + Math.sin(z * 0.11) * 0.16;
}

/** Bake static trunks, roots and branching limbs into one GPU draw call. */
function limb(a: THREE.Vector3, b: THREE.Vector3, bottom: number, top: number) {
  const geometry = new THREE.CylinderGeometry(top, bottom, a.distanceTo(b), 6, 1);
  geometry.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize()));
  geometry.translate(...a.clone().add(b).multiplyScalar(0.5).toArray());
  return geometry;
}

export function Forest({ mobile }: { mobile: boolean }) {
  const geometry = useMemo(() => {
    const pieces: THREE.BufferGeometry[] = [];
    const anchors = mobile
      ? [[-.7, 1], [7.2, -1], [-1.8, -12], [7, -17], [0, -29], [6, -33], [-4, -39], [10, -42]]
      : [[-8, 5], [11, 3], [-4, -10], [8, -13], [-1, -29], [6, -33], [-7, -39], [13, -42]];
    const count = mobile ? 68 : 108;
    for (let i = 0; i < count; i++) {
      const z = i < anchors.length ? anchors[i][1] : 9 - random(i + 1) * 85;
      let x = (random(i + 300) - 0.5) * 72;
      if (Math.abs(x - pathX(z)) < 3.4) x += x < pathX(z) ? -4 : 4;
      // Keep the centre clearing open; foreground trunks frame the lens.
      if (z > 0 && Math.abs(x) < (mobile ? 5 : 8)) x += x < 0 ? -7 : 7;
      if (i < anchors.length) x = anchors[i][0];
      const y = groundY(x, z);
      const height = 11 + random(i + 80) * 16;
      const radius = i < 2 ? (mobile ? .24 : .5) : 0.17 + random(i + 600) * 0.48;
      const lean = (random(i + 900) - 0.5) * 2;
      pieces.push(limb(new THREE.Vector3(x, y - 0.1, z), new THREE.Vector3(x + lean, y + height, z - .6), radius, radius * .36));
      for (let j = 0; j < 4; j++) {
        const side = j % 2 ? -1 : 1;
        const by = height * (.35 + j * .13);
        const a = new THREE.Vector3(x + lean * by / height, y + by, z);
        const b = a.clone().add(new THREE.Vector3(side * (1.2 + random(i * 4 + j) * 2.2), 1.3, -.4));
        const c = b.clone().add(new THREE.Vector3(side * 1.5, 2.1, .2));
        pieces.push(limb(a, b, radius * .33, radius * .14), limb(b, c, radius * .14, .015));
      }
      for (let j = 0; j < 3; j++) {
        const angle = j * 2.094 + i;
        const rx = x + Math.cos(angle) * radius * 4;
        const rz = z + Math.sin(angle) * radius * 4;
        pieces.push(limb(new THREE.Vector3(x, y + .7, z), new THREE.Vector3(rx, groundY(rx, rz), rz), radius * .42, .035));
      }
    }
    const merged = mergeGeometries(pieces);
    pieces.forEach((g) => g.dispose());
    return merged;
  }, [mobile]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <mesh geometry={geometry}><meshStandardMaterial color="#12131b" roughness={1} flatShading /></mesh>;
}

export function Terrain() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(150, 150, 110, 110);
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, 0, -45);
    const positions = geo.attributes.position;
    const colors = [];
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i), z = positions.getZ(i);
      positions.setY(i, groundY(x, z));
      const onPath = 1 - THREE.MathUtils.smoothstep(Math.abs(x - pathX(z)), .9, 3.8);
      const color = new THREE.Color("#171822").lerp(new THREE.Color("#42404a"), onPath * .7);
      color.multiplyScalar(.8 + random(i) * .3);
      colors.push(color.r, color.g, color.b);
    }
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <mesh geometry={geometry}><meshStandardMaterial vertexColors roughness={.95} /></mesh>;
}

export function Undergrowth({ mobile }: { mobile: boolean }) {
  const geometry = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < (mobile ? 5200 : 10000); i++) {
      const z = 10 - random(i + 400) * 56;
      const x = (random(i + 10000) - .5) * 50;
      if (Math.abs(x - pathX(z)) < 1.5 + random(i) * .9) continue;
      for (let blade = 0; blade < 4; blade++) {
        const bx = x + (random(i + blade * 321) - .5) * .2;
        const bz = z + (random(i + blade * 432) - .5) * .2;
        const y = groundY(bx, bz) - .015;
        const height = .16 + random(i + blade * 311 + 900) * .48;
        const width = .018 + random(i + 40) * .024;
        const bend = (random(i + blade * 153 + 1800) - .5) * height * 1.5;
        const mx = bx + bend * .25, my = y + height * .55;
        positions.push(bx - width,y,bz, bx + width,y,bz, mx + width*.4,my,bz,
          bx - width,y,bz, mx + width*.4,my,bz, mx - width*.4,my,bz,
          mx - width*.4,my,bz, mx + width*.4,my,bz, bx+bend,y+height,bz-.06);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [mobile]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <mesh geometry={geometry}><meshBasicMaterial color="#10121c" side={THREE.DoubleSide} fog /></mesh>;
}

const fogVertex = `varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const fogFragment = `
  uniform float uTime; uniform float uOpacity; uniform vec3 uColor; varying vec2 vUv;
  float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
  void main(){
    vec2 p=vUv*vec2(7.,3.)+vec2(uTime*.035,0.);
    float n=noise(p)*.6+noise(p*2.1)*.28+noise(p*4.2)*.12;
    float edge=smoothstep(0.,.18,vUv.x)*(1.-smoothstep(.82,1.,vUv.x))*smoothstep(0.,.25,vUv.y)*(1.-smoothstep(.5,1.,vUv.y));
    gl_FragColor=vec4(uColor,n*edge*uOpacity);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }`;

export function Mist({ still, mobile }: { still: boolean; mobile: boolean }) {
  const group = useRef<THREE.Group>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uOpacity: { value: .27 }, uColor: { value: new THREE.Color("#7b7186") } }), []);
  useFrame(({ clock }) => {
    if (still || !group.current) return;
    for (const child of group.current.children) {
      const material = (child as THREE.Mesh).material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = clock.elapsedTime;
    }
  });
  return <group ref={group}>{(mobile ? [-9, -27] : [0, -15, -34]).map((z) => (
    <mesh key={z} position={[0, 1.1, z]} renderOrder={1}>
      <planeGeometry args={[70, 8]} />
      <shaderMaterial vertexShader={fogVertex} fragmentShader={fogFragment} uniforms={uniforms} transparent depthWrite={false} />
    </mesh>
  ))}</group>;
}

export function Motes({ still, mobile }: { still: boolean; mobile: boolean }) {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = [];
    for (let i = 0; i < (mobile ? 35 : 75); i++) positions.push((random(i)-.5)*30, random(i+100)*9, -random(i+200)*28);
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [mobile]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useFrame(({ clock }) => { if (!still && points.current) points.current.position.y = Math.sin(clock.elapsedTime * .12) * .6; });
  return <points ref={points} geometry={geometry}><pointsMaterial size={.028} color="#dac9ae" transparent opacity={.48} depthWrite={false} /></points>;
}
