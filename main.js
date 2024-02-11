import * as THREE from 'three';
import { setUpBasis } from './Setting Basis Vectors.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 2, 3, 8 );
camera.lookAt( 0, 0, 0 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

setUpBasis(scene)

const pointsSpeed = [];
pointsSpeed.push(new THREE.Vector3(0,0,0));
pointsSpeed.push(new THREE.Vector3(2,2,0));
const SpeedGeometry = new THREE.BufferGeometry().setFromPoints( pointsSpeed );
const Speed = new THREE.Line( SpeedGeometry, new THREE.LineBasicMaterial( { color: 0x00ff00 } ) );
scene.add( Speed );

const fontLoader = new FontLoader();
fontLoader.load('font.json', function(font) {
    const textGeometry = new THREE.TextGeometry('Hello, Three.js!', {
        font: font,
        size: 0.5,
        height: 0.1,
        curveSegments: 12,
        bevelEnabled: false
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(textMesh);
    textMesh.position.set(0, 0, 0);
    renderer.render(scene, camera);
});

function animate() {
	requestAnimationFrame( animate );

    //Speed.geometry.attributes.position.array[] += 0.05;
    Speed.geometry.attributes.position.needsUpdate = true;

	renderer.render( scene, camera );
}

animate();