import React, { useEffect, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { data } from './Data';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { useRef } from 'react';
import { shaderMaterial } from '@react-three/drei';
import { Tubes } from './BrainTubes';




const PATHS = data.economics[0].paths;





const randomRange = (min, max) => Math.random() * (max - min) + min;
let curves = [];
//curves
for (let i = 0; i < 100; i++) {
    let points = [];
    let length = randomRange(0.1, 1);
    //points
    for (let j = 0; j < 100; j++) {
        points.push(
            new THREE.Vector3().setFromSphericalCoords(
                1,
                Math.PI - (j / 100) * Math.PI * length,
                (i / 100) * Math.PI * 2
            )
        );
    }
    let tempcurve = new THREE.CatmullRomCurve3(points);
    curves.push(tempcurve);
}

// console.log(curves);

let brainCurves = []

PATHS.forEach((path) => {
    let points = []
    for (let i = 0; i < path.length; i += 3) {
        points.push(new THREE.Vector3(path[i], path[i + 1], path[i + 2]))
    }
    let tempcurve = new THREE.CatmullRomCurve3(points);
    brainCurves.push(tempcurve)
})
console.log("brainCurves", brainCurves)


function BrainParticles({ allthecurves }) {

    let density = 10;
    let numberOfPoints = density * allthecurves.length;
    const myPoints = useRef([]);
    const brainGeo = useRef();

    let positions = useMemo(() => {
        let positions = []
        for (let i = 0; i < numberOfPoints; i++) {
            positions.push(
                randomRange(-1, 1),
                randomRange(-1, 1),
                randomRange(-1, 1)
            )
        }
        return new Float32Array(positions)
    }, [])


    let randoms = useMemo(() => {
        let randoms = []
        for (let i = 0; i < numberOfPoints; i++) {
            randoms.push(
                randomRange(0.3,1.)
            )
        }
        return new Float32Array(randoms)
    }, [])



    useEffect(() => {
        for (let i = 0; i < allthecurves.length; i++) {
            for (let j = 0; j < density; j++) {
                myPoints.current.push({
                    currentOffset: Math.random(),
                    speed: Math.random() * 0.0015,
                    curve: allthecurves[i],
                    curPosition: Math.random()
                })
            }
        }
    })



    useFrame(({ clock, camera }) => {
        let curpositions = brainGeo.current.attributes.position.array;
        for (let i = 0; i < myPoints.current.length; i++) {

            myPoints.current[i].curPosition += myPoints.current[i].speed;
            myPoints.current[i].curPosition = myPoints.current[i].curPosition % 1;

            let curPoint = myPoints.current[i].curve.getPointAt(myPoints.current[i].curPosition);

            curpositions[i * 3] = curPoint.x
            curpositions[i * 3 + 1] = curPoint.y
            curpositions[i * 3 + 2] = curPoint.z
            

            const elapsedTime = clock.getElapsedTime();
    camera.position.x = -Math.sin(elapsedTime * 0.3) * 0.16;
    // camera.position.y = -Math.cos(elapsedTime * 0.3) * 0.11;
    camera.position.z = Math.cos(elapsedTime * 0.3) * 0.16;
    camera.lookAt(0, 0, 0);

        }

        brainGeo.current.attributes.position.needsUpdate = true;
    })



    const BrainParticleMaterial = shaderMaterial(
        { time: 0, color: new THREE.Color(0.1, 0.3, 0.6) },
        // { time: 0, color: new THREE.Color(0.2, 0, 0.12) },
        // vertex shader
        /*glsl*/`
          varying vec2 vUv;
          uniform float time;
          varying float vProgress;
          attribute float randoms;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = randoms*1. * (1. / -mvPosition.z);
            // gl_PointSize = 50. ;
          }
        `,
        // fragment shader
        /*glsl*/`
          uniform float time;
          void main() {

            float disc = length(gl_PointCoord.xy - vec2(0.5));
            float opacity = 2. * smoothstep(0.5,0.4,disc);
            gl_FragColor = vec4(vec3(opacity), 1.);
          }
        `
    )

    // declaratively
    extend({ BrainParticleMaterial })





    return (
        <>
            <points>
                <bufferGeometry attach="geometry" ref={brainGeo}>
                    <bufferAttribute
                        attach='attributes-position'
                        count={positions.length / 3}
                        array={positions}
                        itemSize={3}
                    />

                    <bufferAttribute
                        attach='attributes-randoms'
                        count={randoms.length}
                        array={randoms}
                        itemSize={1}
                    />
                </bufferGeometry>

                <brainParticleMaterial
                    attach="material"
                    depthTest={false}
                    transparent={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </>
    )
}


const Brain = () => {
    const [scaling, setscaling] = useState(false);
    const autoRotateRef = useRef();
    return (
        
        <Canvas camera={{ position: [0.07, 0, 0.14], near: 0.001, far: 5 }}
        onCreated={({ camera }) => {
            // Prevent orbit controls from interfering with the rotation
            camera.rotation.set(0, 0, 0);
          }}
        >
            {/* <color attach="background" args={["black"]} /> */}
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Tubes allthecurve={brainCurves} />
            <BrainParticles allthecurves={brainCurves} />
            {/* <Tube /> */}
            <OrbitControls />
        </Canvas>
    )
}

export default Brain
