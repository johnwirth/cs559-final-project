import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

const headRadius = 0.75;

const eyeRadius = 0.25;

const bodyRadius = headRadius/2;
const bodyHeight = headRadius;

const footRadius = 0.25;

let angle = 0;
let direction = 1;
let goombaCount = 0;

export class Goomba extends GrObject {
    /**
   *
   * @param {GrWorld} world
   */
  constructor(world) {
    let group = new T.Group();
    super(`Goomba-${++goombaCount}`, group);
    this.world = world;

    // Geometries
    this.headGeom = new T.SphereBufferGeometry(headRadius, 20, 10);
    this.eyeGeom = new T.SphereBufferGeometry(eyeRadius, 20, 10);
    this.bodyGeom = new T.CylinderBufferGeometry(bodyRadius, bodyRadius, bodyHeight, 20);
    this.footGeom = new T.SphereBufferGeometry(footRadius, 20, 10);
    
    // Materials
    this.headMat = new T.MeshStandardMaterial({
        color: "#4A2706",
        roughness: 0.7,
    });
    this.eyeMat = new T.MeshStandardMaterial({
        color: "white",
        roughness: 0.7,
    });
    this.bodyMat = new T.MeshStandardMaterial({
        color: "#DE9E62",
        roughness: 0.7,
    });
    
    // Creation & placement of components
    this.head = new T.Mesh(this.headGeom, this.headMat);
    this.head.translateY(headRadius/2+bodyHeight/2);
    this.eye1 = new T.Mesh(this.eyeGeom, this.eyeMat);
    this.eye1.translateX(-eyeRadius);
    this.eye1.translateY(eyeRadius/2+bodyHeight);
    this.eye1.translateZ(headRadius-eyeRadius);
    this.eye2 = new T.Mesh(this.eyeGeom, this.eyeMat);
    this.eye2.translateX(eyeRadius);
    this.eye2.translateY(eyeRadius/2+bodyHeight);
    this.eye2.translateZ(headRadius-eyeRadius);
    this.body = new T.Mesh(this.bodyGeom, this.bodyMat);
    this.foot1 = new T.Mesh(this.footGeom, this.headMat);
    this.foot1.translateX(-.5);
    this.foot1.translateY(-.3);
    this.foot2 = new T.Mesh(this.footGeom, this.headMat);
    this.foot2.translateX(.5);
    this.foot2.translateY(-.3);

    // Group logic
    group.add(this.head);
    group.add(this.eye1);
    group.add(this.eye2);
    group.add(this.body);
    group.add(this.foot1);
    group.add(this.foot2);
    group.translateY(0.6);
    this.goomba = group;
  }

  stepWorld(delta, timeOfDay) {
    // let timeDelta = .001 * delta;
    let timeDelta = .025;
    angle += direction*timeDelta;
    if (Math.abs(angle) >= Math.PI/8) direction *= -1;

    this.goomba.rotateZ(direction*timeDelta);
  }
}