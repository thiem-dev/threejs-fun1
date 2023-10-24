import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import './App.css'
import { useEffect } from 'react';




function App() {
  // const [count, setCount] = useState(0)

  //loads canvas renderer when canvas element loads
  useEffect(() => {


    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#threejs-canvas")
    });
    renderer.setSize( window.innerWidth, window.innerHeight )

    // document.body.appendChild( renderer.domElement );

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;


    function animate() {
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
    }
    animate();

  }, []);





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
          <div id="musicBox">
              <audio id="myAudio" controls>
                  <source src="./porter-sadMachine.mp3" type="audio/mpeg"></source>
                  Your browser does not support the audio element.
                </audio>
          </div>
          <div className="app-container">
              <div className="app" >Hello</div>
              <canvas id="threejs-canvas"></canvas>
          </div>
      </div>
    </>
  )
}

export default App