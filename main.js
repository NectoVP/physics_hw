import * as THREE from 'three';
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 10, 3, 7 );
camera.lookAt( 0, 0, 0 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth - 200, window.innerHeight);
renderer.domElement.style.marginLeft = '200px';
document.body.appendChild(renderer.domElement);

function setUpBasis(scene) {
    const pointsX = [];
    pointsX.push( new THREE.Vector3( 0, 0, 0 ) );
    pointsX.push( new THREE.Vector3( 3, 0, 0 ) );
    const pointsY = [];
    pointsY.push( new THREE.Vector3( 0, 0, 0 ) );
    pointsY.push( new THREE.Vector3( 0, 3, 0 ) );
    const pointsZ = [];
    pointsZ.push( new THREE.Vector3( 0, 0, 0 ) );
    pointsZ.push( new THREE.Vector3( 0, 0, 3 ) );
    
    const lineGeometryX = new THREE.BufferGeometry().setFromPoints( pointsX );
    const lineX = new THREE.Line( lineGeometryX, new THREE.LineBasicMaterial( { color: 0x00ff00 } ) );
    scene.add( lineX );
    const lineGeometryY = new THREE.BufferGeometry().setFromPoints( pointsY );
    const lineY = new THREE.Line( lineGeometryY, new THREE.LineBasicMaterial( { color: 0xff0000 } ) );
    scene.add( lineY );
    const lineGeometryZ = new THREE.BufferGeometry().setFromPoints( pointsZ );
    const lineZ = new THREE.Line( lineGeometryZ, new THREE.LineBasicMaterial( { color: 0x0000ff } ) );
    scene.add( lineZ);
    pointsX.push( new THREE.Vector3( 0, 0, 0 ) );
}

setUpBasis(scene)

let xSpeed = 5;
let ySpeed = 0;
let zSpeed = 0;
let xMag = 0;
let yMag = 3;
let zMag = 0;
let orX = 0;
let orY = 3;
let orZ = 3;


const pointsSpeed = [];
pointsSpeed.push(new THREE.Vector3(0,0,0));
pointsSpeed.push(new THREE.Vector3(xSpeed,ySpeed,zSpeed));
const SpeedGeometry = new THREE.BufferGeometry().setFromPoints( pointsSpeed );
const Speed = new THREE.Line( SpeedGeometry, new THREE.LineBasicMaterial( { color: 0xf3e5c2 } ) );
scene.add( Speed );

const pointsMag = [];
pointsMag.push(new THREE.Vector3(0,3,3));
pointsMag.push(new THREE.Vector3(xMag,yMag,zMag));
const MagGeometry = new THREE.BufferGeometry().setFromPoints( pointsMag );
const Mag = new THREE.Line( MagGeometry, new THREE.LineBasicMaterial( { color: 0xcca2f9 } ) );
scene.add( Mag );

const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const SphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(sphereGeometry, SphereMaterial);
scene.add(sphere);

let charge = 1;
function updateSliderValue(sliderId, value) {
    console.log(sliderId)
    if (sliderId == 'charge-slider')
        document.getElementById(`${sliderId}-value`).textContent = `Заряд ${value} мкКл`;
    else if(sliderId == 'x-slider' || sliderId == 'y-slider' || sliderId == 'z-slider')
        document.getElementById(`${sliderId}-value`).textContent = `Скорость ${value} м/с`;
    else if(sliderId == 'by-slider' || sliderId == 'bz-slider')
        document.getElementById(`${sliderId}-value`).textContent = `Значение ${value-3} Тл`;
    else
        document.getElementById(`${sliderId}-value`).textContent = `Значение ${value} Тл`;
}

const sliders = ['charge-slider', 'x-slider', 'y-slider', 'z-slider', 'bx-slider', 'by-slider', 'bz-slider'];
sliders.forEach(sliderId => {
    const slider = document.getElementById(sliderId);
    slider.addEventListener('input', function() {
        const sliderValue = parseFloat(slider.value);
        if (sliderId === 'charge-slider')
            charge = sliderValue;
        else if (sliderId === 'x-slider')
            xSpeed = sliderValue;
        else if (sliderId === 'y-slider')
            ySpeed = sliderValue;
        else if (sliderId === 'z-slider')
            zSpeed = sliderValue;
        if (sliderId === 'charge-slider')
            charge = sliderValue;
        else if (sliderId === 'bx-slider')
            xMag = sliderValue;
        else if (sliderId === 'by-slider')
            yMag = sliderValue;
        else if (sliderId === 'bz-slider')
            zMag = sliderValue;
        updateSliderValue(sliderId, sliderValue);
    });
});

let angle = 0

function animate() {
	requestAnimationFrame( animate );

    Speed.geometry.attributes.position.array[3] = xSpeed;
    Speed.geometry.attributes.position.array[4] = ySpeed;
    Speed.geometry.attributes.position.array[5] = zSpeed;

    Mag.geometry.attributes.position.array[3] = xMag;
    Mag.geometry.attributes.position.array[4] = yMag;
    Mag.geometry.attributes.position.array[5] = zMag;

    sphere.position.x += (Speed.geometry.attributes.position.array[4]  * (zMag-3) - Speed.geometry.attributes.position.array[5] * yMag)* 100 * charge * Math.pow(10, -6) * 30 + 0.0001*Speed.geometry.attributes.position.array[3] * charge;
    sphere.position.y -= (Speed.geometry.attributes.position.array[3]  * (zMag-3) - Speed.geometry.attributes.position.array[5] * xMag)* 100 * charge * Math.pow(10, -6) * 30 +  0.0001*Speed.geometry.attributes.position.array[4] * charge;
    sphere.position.z += (Speed.geometry.attributes.position.array[3]  * (yMag-3) - Speed.geometry.attributes.position.array[4] * (yMag-3)) * 100 * charge * Math.pow(10, -6) * 30 +  0.0001*Speed.geometry.attributes.position.array[5] * charge;
    console.log(xMag, yMag, zMag)
    if(sphere.position.x >= 7 || sphere.position.y >= 7 || sphere.position.z >= 7 || sphere.position.x <= -7 || sphere.position.y <= -7 || sphere.position.z <= -7) {
        sphere.position.x = 0
        sphere.position.y = 0
        sphere.position.z = 0
    }
    Speed.geometry.attributes.position.needsUpdate = true;
    Mag.geometry.attributes.position.needsUpdate = true;

    const radius = 8;
    const cameraSpeed = 0.01;
    let tempx = Math.cos(angle) * radius;
    let tempz = Math.sin(angle) * radius;
    camera.position.set(tempx, 4, tempz);
    camera.lookAt(0, 0, 0);
    angle += cameraSpeed;

   renderer.render( scene, camera );
}

animate();