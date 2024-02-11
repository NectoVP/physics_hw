import * as THREE from 'three';

export function setUpBasis(scene) {
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
