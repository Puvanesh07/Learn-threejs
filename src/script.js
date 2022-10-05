//you can put object inside the group
// Position, Scale, Rotation all use to update the objects

import './style.css'
import * as THREE from 'three'
import { Clock } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'dat.gui'
//import gsap from 'gsap'

const gui = new dat.GUI()

 

 const parameters = {
    color: 0xff0000,
    spin: () =>
    {
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
    }
}                                   
gui
.addColor(parameters, 'color')    
.onChange(() =>
{
    material.color.set(parameters.color)           // color change

})

// Canvas
const canvas = document.querySelector('.webgl')  // connect to html class

// Scene
const scene = new THREE.Scene()   // containner

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(2, 2, 2)   //
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }) // add color
const mesh = new THREE.Mesh(geometry, material) // connect the Geomentry and Material as prameter


// // position-                                            

// //mesh.position.x = 1
// // mesh.position.y = 1
// // mesh.position.z = 1

// mesh.position.set(0.7, - 0.6, 1)

// //scale  -is a vector free

// //mesh.scale.x = 2
// //mesh.scale.y = 0.5
// //mesh.scale.z = 0.5

// mesh.scale.set(2, 0.5, 0.5)

// //Rotation but it is Euler or Quaterion

// mesh.rotation.reorder('YXZ') // before rotation

// mesh.rotation.x = Math.PI * 0.25  // MATH.PI   
// mesh.rotation.y = Math.PI * 0.25  // MATH.PI 

scene.add(mesh)  // mesh inherit from object3D

// Convert to group

//  const group = new THREE.Group()
//  group.scale.x = 0.5
//  scene.add(group)

//  const cube1 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({color: 0xff0000})
//  )
//  group.add(cube1)

//  const cube2 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({color: 0x00ff00})
//  )
 
//  cube2.position.x = -2
//  group.add(cube2)

//  const cube3 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({color: 0x0000ff})
//  )
//  cube3.position.x = 2
//  group.add(cube3)

// //AxesHelper
// const axeshelper = new THREE.AxesHelper(2)
// scene.add(axeshelper)

gui
    .add(mesh.position, 'y')
    .min(- 3)
    .max(3)
    .step(0.01)
    .name('elevation')

    gui
    .add(mesh, 'visible')         // Visibility

    gui
    .add(material, 'wireframe')   // Wireframing

    gui.add(parameters, 'spin') 
    
    window.addEventListener('keydown', (_event) => {
        if(_event.key == 'h'){
            gui.show
        }
        else{
            gui.hide
        }
    })


/**
 * Sizes
 */
// const sizes = {
//     width: 800,       //size
//     height: 600
// }

// sizes 
const Sizes = {
    width : window.innerWidth,
    height : window.innerHeight
    
}
// Responsive Size
window.addEventListener('resize', () =>{
    // update size
    Sizes.width = window.innerWidth
    Sizes.height = window.innerHeight

    //update camera
    camera.aspect = Sizes.width / Sizes.height
    camera.updateProjectionMatrix()
    //update renderer
    renderer.setSize(Sizes.width, Sizes.height)
})

window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})

/**
 * Camera
 */
//const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)  // camera degree and sizes
const camera = new THREE.PerspectiveCamera(75, Sizes.width / Sizes.height , 0.1)
camera.position.z = 5

//LookAt

// or (new THREE.vector3(3,0,0)) looking on right
scene.add(camera)

// Oribit Control

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({  
    canvas: canvas                                     // Renderer a canvas
})
//renderer.setSize(sizes.width, sizes.height)            // set sizes
renderer.setSize(Sizes.width, Sizes.height)
//renderer.setPixelRatio(window.devicePixelRatio)
renderer.setPixelRatio(Math.min(window.devicePixelRatio , 1.25))
                          // render(Scean and camera)
                          
// Time

//let time = Date.now()

//using clock
const clock = new THREE.Clock()

//using gsap
//gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })

//mousemove
const cursor = {x:0 , y:0}

window.addEventListener('mousemove', (_event) =>{
    cursor.x = _event.clientX / window.innerWidth - 0.5
    cursor.y = _event.clientY / window.innerHeight - 0.5
    
})

// Animations

const tick = () =>
{
    //Time
    //const current_time = Date.now()
    //const delta_time = current_time - time
    //time = current_time

    // using clock
    const elapsed_time = clock.getElapsedTime()

    //mousemove

     //camera position

    const camaraX = cursor.x - 1
    const camaraY = - cursor.y 
    
    camera.position.x = camaraX
    camera.position.y = camaraY

    camera.position.x += (camaraX - camera.position.x) /5
    camera.position.y += (camaraY - camera.position.y) /5

    //update object
    // mesh.rotation.y += 0.1
    // mesh.rotation.y += 0.01 * delta_time  // using time
    mesh.rotation.y = elapsed_time  //using clock 0r elapsed_time * Math.PI * 2
    mesh.position.y = Math.sin(elapsed_time)
    mesh.position.x = Math.cos(elapsed_time)

    controls.update()   //oribitcontrol update for damping

    // // render
    renderer.render(scene,camera)

    window.requestAnimationFrame(tick)
}
tick() 