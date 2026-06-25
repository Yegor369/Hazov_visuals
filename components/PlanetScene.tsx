"use client";
import { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Float } from "@react-three/drei";
import * as THREE from "three";

// ─── Photo list ──────────────────────────────────────────────────────────────
const PHOTOS = [
  "/assets/photos/01.jpg",
  "/assets/photos/02.jpg",
  "/assets/photos/03.jpg",
  "/assets/photos/04.jpg",
  "/assets/photos/05.jpg",
  "/assets/photos/06.jpg",
  "/assets/photos/07.jpg",
  "/assets/photos/08.jpg",
  "/assets/photos/09.jpg",
  "/assets/photos/10.jpg",
  "/assets/photos/11.jpg",
  "/assets/photos/12.jpg",
  "/assets/photos/13.jpg",
  "/assets/photos/14.jpg",
  "/assets/photos/15.jpg",
  "/assets/photos/founder.jpg",
];

// Strong frames shown bigger/closer in the flying stream
const FEATURED = new Set([0, 4, 8, 10, 12, 14, 15]); // 01,05,09,11,13,15,founder

// ─── Planet: sphere covered with photo planes ─────────────────────────────────
function PhotoSphere({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const textures = useTexture(PHOTOS);
  const mouseRef = useRef({ x: 0, y: 0 });

  const count = isMobile ? 24 : 48;

  // Distribute photo planes on sphere surface (Fibonacci lattice)
  const planeData = useMemo(() => {
    const items: { pos: THREE.Vector3; rot: THREE.Euler; texIdx: number; scale: number }[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      const R = 2.2;
      const pos = new THREE.Vector3(x * R, y * R, z * R);
      const normal = pos.clone().normalize();
      const up = new THREE.Vector3(0, 1, 0);
      const quat = new THREE.Quaternion().setFromUnitVectors(up, normal);
      const rot = new THREE.Euler().setFromQuaternion(quat);
      const texIdx = i % PHOTOS.length;
      const scale = FEATURED.has(texIdx) ? 0.72 : 0.48;
      items.push({ pos, rot, texIdx, scale });
    }
    return items;
  }, [count]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x += (mouseRef.current.y * 0.12 - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.y += (mouseRef.current.x * 0.05) * 0.04;
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe sphere outline */}
      <mesh>
        <sphereGeometry args={[2.18, 32, 32]} />
        <meshBasicMaterial color="#6E7BFF" wireframe opacity={0.04} transparent />
      </mesh>

      {/* Rim glow */}
      <mesh>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshBasicMaterial
          color="#8066FF"
          side={THREE.BackSide}
          opacity={0.18}
          transparent
        />
      </mesh>

      {/* Photo planes */}
      {planeData.map((d, i) => (
        <mesh key={i} position={d.pos} rotation={d.rot} scale={d.scale}>
          <planeGeometry args={[1.4, 0.9]} />
          <meshBasicMaterial map={textures[d.texIdx]} opacity={0.82} transparent side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Storm system: rain particles + lightning flash ──────────────────────────
function Storms({ isMobile }: { isMobile: boolean }) {
  const count = isMobile ? 2 : 4;
  const stormPoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - ((i * 3 + 7) / 20) * 2;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * (i * 5 + 2);
      pts.push(new THREE.Vector3(
        Math.cos(theta) * radius * 2.2,
        y * 2.2,
        Math.sin(theta) * radius * 2.2
      ));
    }
    return pts;
  }, [count]);

  return (
    <>
      {stormPoints.map((pt, i) => (
        <StormCell key={i} center={pt} index={i} />
      ))}
    </>
  );
}

function StormCell({ center, index }: { center: THREE.Vector3; index: number }) {
  const rainRef = useRef<THREE.Points>(null!);
  const lightRef = useRef<THREE.Mesh>(null!);
  const timeRef = useRef(Math.random() * 10);
  const flashRef = useRef(0);

  const rainGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const n = 40;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = center.x + (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 1] = center.y + (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 2] = center.z + (Math.random() - 0.5) * 0.4;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [center]);

  useFrame((_, delta) => {
    timeRef.current += delta;
    // Animate rain particles falling radially inward
    if (rainRef.current) {
      const pos = rainRef.current.geometry.attributes.position.array as Float32Array;
      const dir = center.clone().normalize().negate();
      for (let i = 0; i < pos.length / 3; i++) {
        pos[i * 3] += dir.x * delta * 0.3;
        pos[i * 3 + 1] += dir.y * delta * 0.3;
        pos[i * 3 + 2] += dir.z * delta * 0.3;
        const cx = pos[i * 3] - center.x;
        const cy = pos[i * 3 + 1] - center.y;
        const cz = pos[i * 3 + 2] - center.z;
        if (Math.sqrt(cx * cx + cy * cy + cz * cz) > 0.35) {
          pos[i * 3] = center.x + (Math.random() - 0.5) * 0.4;
          pos[i * 3 + 1] = center.y + (Math.random() - 0.5) * 0.4;
          pos[i * 3 + 2] = center.z + (Math.random() - 0.5) * 0.4;
        }
      }
      rainRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Lightning: flash every ~3-7s, staggered by index
    if (lightRef.current) {
      const period = 4 + index * 1.3;
      const t = timeRef.current % period;
      if (t < 0.12) {
        flashRef.current = Math.sin((t / 0.12) * Math.PI);
      } else {
        flashRef.current = 0;
      }
      (lightRef.current.material as THREE.MeshBasicMaterial).opacity = flashRef.current * 0.9;
      lightRef.current.visible = flashRef.current > 0.01;
    }
  });

  return (
    <group>
      <points ref={rainRef} geometry={rainGeo}>
        <pointsMaterial color="#9BA8FF" size={0.012} opacity={0.6} transparent sizeAttenuation />
      </points>
      {/* Lightning flash plane */}
      <mesh ref={lightRef} position={center} visible={false}>
        <planeGeometry args={[0.15, 0.4]} />
        <meshBasicMaterial color="#B8CCFF" opacity={0} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// ─── Flying photos stream ─────────────────────────────────────────────────────
function FlyingPhotos({ isMobile }: { isMobile: boolean }) {
  const textures = useTexture(PHOTOS);
  const count = isMobile ? 6 : 12;

  const cards = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const texIdx = i % PHOTOS.length;
      const isFeatured = FEATURED.has(texIdx);
      const isFounder = texIdx === 15;
      return {
        texIdx,
        isFeatured,
        isFounder,
        x: (Math.random() - 0.5) * 10 + (i % 2 === 0 ? 4 : -4),
        y: (Math.random() - 0.5) * 8,
        z: -5 - Math.random() * 12,
        speed: isFounder ? 0.6 : isFeatured ? 0.8 : 1.0 + Math.random() * 0.5,
        scale: isFounder ? 1.4 : isFeatured ? 1.1 : 0.7 + Math.random() * 0.3,
        rotX: (Math.random() - 0.5) * 0.3,
        rotY: (Math.random() - 0.5) * 0.5,
        phase: Math.random() * Math.PI * 2,
      };
    });
  }, [count]);

  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const time = useRef(0);

  useFrame((_, delta) => {
    time.current += delta;
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const c = cards[i];
      mesh.position.z += delta * c.speed * 0.5;
      mesh.position.y += Math.sin(time.current * 0.3 + c.phase) * delta * 0.05;
      mesh.rotation.y = Math.sin(time.current * 0.2 + c.phase) * 0.15;
      if (mesh.position.z > 3) {
        mesh.position.z = -18 - Math.random() * 5;
        mesh.position.x = (Math.random() - 0.5) * 10 + (i % 2 === 0 ? 4 : -4);
        mesh.position.y = (Math.random() - 0.5) * 8;
      }
    });
  });

  return (
    <group>
      {cards.map((c, i) => (
        <mesh
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          position={[c.x, c.y, c.z]}
          rotation={[c.rotX, c.rotY, 0]}
          scale={c.scale}
        >
          <planeGeometry args={[1.4, 0.95]} />
          <meshBasicMaterial
            map={textures[c.texIdx]}
            opacity={c.isFounder ? 0.95 : 0.75}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Star field background ────────────────────────────────────────────────────
function StarField({ isMobile }: { isMobile: boolean }) {
  const count = isMobile ? 400 : 900;
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 18 + Math.random() * 12;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [count]);

  return (
    <points geometry={geo}>
      <pointsMaterial color="#C8D0FF" size={0.04} opacity={0.5} transparent sizeAttenuation />
    </points>
  );
}

// ─── Scene root ───────────────────────────────────────────────────────────────
function Scene({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={0.8} color="#6E7BFF" />
      <pointLight position={[5, 3, 5]} intensity={0.3} color="#B66EFF" />
      <StarField isMobile={isMobile} />
      <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.2}>
        <PhotoSphere isMobile={isMobile} />
      </Float>
      <Storms isMobile={isMobile} />
      <FlyingPhotos isMobile={isMobile} />
    </>
  );
}

// ─── Exported canvas wrapper ──────────────────────────────────────────────────
export default function PlanetScene() {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);

    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(rm.matches);

    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reducedMotion) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-64 h-64 rounded-full"
          style={{
            background: "radial-gradient(circle at 40% 40%, rgba(110,123,255,0.25), rgba(10,10,11,0.9))",
            boxShadow: "0 0 80px rgba(110,123,255,0.2)",
          }}
        />
      </div>
    );
  }

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 50 }}
      gl={{ antialias: !isMobile, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Suspense fallback={null}>
        <Scene isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}
