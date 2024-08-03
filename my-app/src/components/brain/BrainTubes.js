import React from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { data } from './Data';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { useRef } from 'react';
import { shaderMaterial } from '@react-three/drei';
import { useThree } from '@react-three/fiber';


function Tube({ curve }) {

    const brainMat = useRef();

    const {viewport} = useThree()

    useFrame(({ clock, mouse }) => {
        brainMat.current.uniforms.time.value = clock.getElapsedTime()
        brainMat.current.uniforms.mouse.value = new THREE.Vector3(
            mouse.x * viewport.width/2,
            mouse.y * viewport.height/2,
            0
        )
        
    })



    const BrainMaterial = shaderMaterial(
        { 
            time: 0, 
            // color: new THREE.Color(0.1, 0.3, 0.6),
            color: new THREE.Color(0.1, 0.01, 0.6),
            mouse: new THREE.Vector3(0,0,0)
        },
        // vertex shader
        /*glsl*/`
          varying vec2 vUv;
          uniform float time;
          uniform vec3 mouse;
          varying float vProgress;
          void main() {
            vUv = uv;
            vProgress = smoothstep(-1.,1.,sin(vUv.x*8. + time*3.));

            vec3 p = position;
            float maxDist = 0.1;
            float dist = length(mouse - p);
            if(dist < maxDist){
                vec3 dir  = normalize(mouse - p);
                dir *= (1.-dist/maxDist);
                p -= dir*0.01;
            }
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `,
        // fragment shader
        /*glsl*/`
          uniform float time;
          uniform vec3 color;
          varying vec2 vUv;
          varying float vProgress;
          void main() {
            vec3 finalcolor = mix(color,color*0.25, vProgress);
            float hideCorners = smoothstep(1.,0.9,vUv.x);
            float hideCorners1 = smoothstep(0.,0.1,vUv.x);
            gl_FragColor.rgba = vec4(vec3(vProgress),1.);
            gl_FragColor.rgba = vec4(finalcolor,hideCorners*hideCorners1);
          }
        `
    )

    // declaratively
    extend({ BrainMaterial })




    return (
        <>
            <mesh>
                <tubeGeometry args={[curve, 64, 0.001, 2, false]} />
                <brainMaterial
                    ref={brainMat}
                    side={THREE.DoubleSide}
                    transparent={true}
                    depthTest={false}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </>
    );
}


export function Tubes({ allthecurve }) {
    return (
        <>
            {allthecurve.map((curve, index) => (
                <Tube curve={curve} key={index} />
            ))}
        </>
    );
}