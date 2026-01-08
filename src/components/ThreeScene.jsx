import * as Three from 'three';
import { useEffect, useRef } from 'react';
import { InteractionManager } from '../logic/InteractionManager';
/**
 * 
 * **/
export default function ThreeScene(){

    const mountRef = useRef(null);

    useEffect(() => {
        console.log("three useEffect running");
        if(!mountRef.current) return;

        const scene = new Three.Scene();
        const camera = new Three.PerspectiveCamera(
        75, window.innerWidth/ window.innerHeight, 0.1, 
        1000
    );

    const renderer = new Three.WebGLRenderer();
    
    renderer.setSize( window.innerWidth, window.innerHeight);

    const currentMount = mountRef.current;
    currentMount.appendChild(renderer.domElement);
    //document.body.appendChild(renderer.domElement);
    
    const geometry = new Three.BoxGeometry(1,1,1);
    const geometry2 = new Three.CapsuleGeometry( 1, 1, 4, 8, 1 );
    const material = new Three.MeshBasicMaterial({ color: 0xffffff});
    const cube = new Three.Mesh(geometry, material);
    scene.add(cube);

    //to avoid rendering the camera and cube inside each other
    camera.position.z = 6;


    const interactions = new InteractionManager(camera, scene, renderer.domElement);
    interactions.enable();

    function animate(){
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);

    return () => { 
        interactions.disbale();
        renderer.setAnimationLoop(null);
        currentMount.removeChild(renderer.domElement);
        renderer.dispose();
        }
    
    },[]);

      return <div ref={mountRef} style={{ width: '100%', height: '100dvh'
        ,position: 'absolute', top:0, left:0, overflow:'hidden'
       }} />;


   
}

