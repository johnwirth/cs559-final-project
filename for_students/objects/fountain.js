import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

const baseRadius = 5;

const waterWidth = 6;
const waterHeight = 1;
const waterDepth = waterWidth;

const cBaseRadius = 0.25* baseRadius;
const cBaseHeight = 1.25*waterHeight;

const centerRadius = .25;
const centerHeight = 4;

const topRadius = 1;

let waterImage = new T.TextureLoader().load("./textures/water.jpg");
let brickImage = new T.TextureLoader().load("./textures/white-brick.jpg");

export class Fountain extends GrObject {
    /**
   *
   * @param {GrWorld} world
   */
  constructor(world) {
    let group = new T.Group();
    super("Fountain", group);
    this.world = world;

    // Geometries
    this.baseGeom = new T.TorusBufferGeometry(baseRadius,1,30,4);
    this.waterGeom = new T.BoxBufferGeometry(waterWidth,waterHeight,waterDepth);
    this.cBaseGeom = new T.CylinderBufferGeometry(cBaseRadius,cBaseRadius,cBaseHeight);
    this.centerGeom = new T.CylinderBufferGeometry(centerRadius,centerRadius,centerHeight);
    this.topGeom = new T.SphereBufferGeometry(topRadius,4);
    
    // Materials
    this.baseMat = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.7,
      map: brickImage,
    });
    this.waterMat = new T.MeshStandardMaterial({
      color: "white",
      map: waterImage,
    });
    
    // Creation & placement of components
    this.water = new T.Mesh(this.waterGeom, this.waterMat);
    this.water.translateY(waterHeight/2);
    this.cBase = new T.Mesh(this.cBaseGeom,this.baseMat);
    this.cBase.translateY(cBaseHeight/2);
    this.center = new T.Mesh(this.centerGeom,this.baseMat);
    this.center.translateY(centerHeight/2);
    this.top = new T.Mesh(this.topGeom,this.baseMat);
    this.top.translateY(centerHeight+topRadius/2);
    this.base = new T.Mesh(this.baseGeom, this.baseMat);
    this.base.translateY(1);
    this.base.rotateX(Math.PI/2);
    this.base.rotateZ(Math.PI/4);
    

    // Group logic
    group.add(this.base);
    group.add(this.cBase);
    group.add(this.center);
    group.add(this.top);
    group.add(this.water);
    
  }

  stepWorld(delta, timeOfDay) {
    let time = delta * .005;  
    this.top.rotateY(time);
  }
}