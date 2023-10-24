import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import './App.css'
import { useEffect } from 'react';




function App() {
  // const [count, setCount] = useState(0)

  //loads canvas renderer when canvas element loads
  useEffect(() => {


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

    // make box
    const geometry = new THREE.BoxGeometry( 5, 5, 5);
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
    const cube = new THREE.Mesh( geometry, material );


    //make star
    function addStar(){
      const geo2 = new THREE.SphereGeometry(.25 , 10, 10)
      const material2 = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
      const star = new THREE.Mesh( geo2, material2 );
  
      const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100)) 
  
      star.position.set(x,y,z)
      scene.add(star)
    }
    



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
      cube.rotation.x += 0.002;
      cube.rotation.y += 0.002;

      controls.update();

      play();

      renderer.render( scene, camera );

    }
    animate();




// Audio functionality ---------------------------------------------------------------------------------------
  function play(){
    const audioContext = new window.AudioContext();
    const audioElement = document.getElementById("myAudio");
    const source = audioContext.createMediaElementSource(audioElement);
    const analyser = audioContext.createAnalyser();
    audioElement.volume = 0.5;
    
    
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 512;

    let bufferLength = analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);


    analyser.getByteFrequencyData(dataArray);

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
          <div id="musicBox">
              <audio id="myAudio" 
                src="./porter-sadMachine.mp3"
                className=""
                controls
                autoPlay
                onPlay="animate()"
                
                />

          </div>
          <div className="app-container">
              <canvas id="threejs-canvas"></canvas>
          </div>
      </div>
    </>
  )
}

export default App