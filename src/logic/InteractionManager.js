import * as Three from 'three';

//this class abstracts away mouse logic from 
// the main ThreeScene logic
export class InteractionManager{
    constructor(camera, scene, domElement){
        this.camera = camera;
        this.scene = scene;
        this.domElement = domElement;

        this.raycaster = new Three.Raycaster();
        this.mouse = new Three.Vector2();


        this.onMouseClick = this.onMouseClick.bind(this);
 }

 enable(){
    this.domElement.addEventListener('click', this.onMouseClick);
 }

 disbale(){
    this.domElement.removeEventListener('click', this.onMouseClick);
 }
 onMouseClick(event){
    const rect = this.domElement.getBoundingClientRect();

    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2-1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2+1;
    
    this.raycaster.setFromCamera(this.mouse, this.camera);


    const intersects = this.raycaster.intersectObjects(this.scene.children);

    if(intersects.length >0){
        const hitObject = intersects[0].object;
        console.log("Clicked:", hitObject);

        if(hitObject.material && hitObject.material.color) {
                hitObject.material.color.set(Math.random() * 0xffffff);
            }
    }
 }
}