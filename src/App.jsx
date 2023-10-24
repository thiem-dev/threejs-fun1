import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import './App.css'
import { useEffect } from 'react';



// var noise = new SimplexNoise();

function App() {





  //loads canvas renderer when canvas element loads
  useEffect(() => {
    var file = document.getElementById('thefile')



    function play() {
    // Audio functionality ---------------------------------------------------------------------------------------


        // mPlayBtn.addEventListener('click', function() {


      //base controls ---------------------------------------------------------------------------------------
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
      const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#threejs-canvas")
      });

      renderer.setSize( window.innerWidth/2, window.innerHeight/2)
      camera.aspect = window.innerWidth / window.innerHeight;
      const controls = new OrbitControls(camera, renderer.domElement);
      camera.position.z = 70;


    // Materials and Prop declaration ---------------------------------------------------------------------------------------

      function makePlane(){
        const planeGeometry = new THREE.PlaneGeometry(64,64,64,64)
        const planeMaterial = new THREE.MeshNormalMaterial( { wireframe: true } );
        const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial) 

        planeMesh.rotation.x = -Math.PI / 2 + Math.PI / 4;
        planeMesh.scale.x = 2;
        planeMesh.scale.y = 2;
        planeMesh.scale.z = 2;
        planeMesh.position.y = 8;
        scene.add(planeMesh)
      }



      //add props ---------------------------------------------------------------------------------------
      // scene.add( cube );
      makePlane();

      // small stars
      // Array(100).fill().forEach(addStar)





  //animation loop ---------------------------------------------------------------------------------------
      function animate() {
        requestAnimationFrame( animate );

        controls.update();
        renderer.render( scene, camera );

      }

      animate();
      }
    


  }, []); //useEffect ends ----------







//DOM elements ---------------------------------------------------------------------------------------
  return (
    <>
      <div className="container">
            <div className="info">
                <h1>Audio Visualizer - Hack-a-thon</h1>
                <h3>Current Song: Porter Robinson - Sad Machine</h3>
                <p className="infoBox">
                    
                    The blob responds to music
                </p>
            </div>
            <label htmlFor="thefile" className="file">
              <input type="file" id="thefile" accept="audio/*"/>
            </label>

            <div id="musicBox">
              <audio id="song" src="./porter-sadMachine.mp3" controls ></audio>
              <div id="id"></div>
                {/* <button id="playBtn">Play</button> */}
              </div>

            <div className="app-container">
                <canvas id="threejs-canvas"></canvas>
            </div>
        </div>
    </>
  )
}

export default App