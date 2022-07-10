import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

const headRadius = 3;

const spotRadius = 0.4*headRadius;

const bodyRadius = 0.6*headRadius;

const flyHeight = bodyRadius*1.5;

let time = 0;

export class Ship extends GrObject {
    /**
   *
   * @param {GrWorld} world
   */
  constructor(world) {
    let group = new T.Group();
    super("Ship", group);
    this.world = world;

    // Geometries
    this.headGeom = new T.SphereBufferGeometry(headRadius, 50, 50, 0, 2*Math.PI, 0, Math.PI/2);
    this.spotGeom = new T.SphereBufferGeometry(spotRadius, 50, 50);
    this.baseGeom = new T.RingBufferGeometry(0, headRadius, 50, 50, 0, 2*Math.PI);
    this.bodyGeom = new T.SphereBufferGeometry(bodyRadius, 50, 50, 0, 2*Math.PI, 0, 2*Math.PI);
    
    // Materials
    this.headMaterial = new T.MeshStandardMaterial({
        color: "red",
        roughness: 0.5,
        metalness: .5,
    });
    this.spotMaterial = new T.MeshStandardMaterial({
        color: "white",
        roughness: 0.2,
        // metalness: .5,
    });
    this.baseMaterial = new T.MeshStandardMaterial({
        color: "grey",
        roughness: 0.2,
        metalness: .3,
    });
    this.bodyMaterial = new T.MeshStandardMaterial({
        color: "#F7C89C",
        roughness: 0.5,
        metalness: 0.5
    });
    
    // Creation & placement of components
    this.head = new T.Mesh(this.headGeom, this.headMaterial);
    this.head.translateY(flyHeight);
    this.spot1 = new T.Mesh(this.spotGeom, this.spotMaterial);
    this.spot1.translateY(flyHeight+headRadius/2+spotRadius/2);
    this.spot2 = new T.Mesh(this.spotGeom, this.spotMaterial);
    this.spot2.translateY(flyHeight+headRadius/2.5);
    this.spot2.translateX(headRadius/1.75);
    this.spot3 = new T.Mesh(this.spotGeom, this.spotMaterial);
    this.spot3.translateY(flyHeight+headRadius/2.5);
    this.spot3.translateX(-headRadius/1.75);
    this.spot4 = new T.Mesh(this.spotGeom, this.spotMaterial);
    this.spot4.translateY(flyHeight+headRadius/2.5);
    this.spot4.translateZ(headRadius/1.75);
    this.spot5 = new T.Mesh(this.spotGeom, this.spotMaterial);
    this.spot5.translateY(flyHeight+headRadius/2.5);
    this.spot5.translateZ(-headRadius/1.75);
    this.base = new T.Mesh(this.baseGeom, this.baseMaterial);
    this.base.translateY(flyHeight);
    this.base.rotateX(Math.PI/2);
    this.body = new T.Mesh(this.bodyGeom, this.bodyMaterial);
    this.body.translateY(flyHeight-bodyRadius/3);

    // Group logic
    group.add(this.head);
    group.add(this.spot1);
    group.add(this.spot2);
    group.add(this.spot3);
    group.add(this.spot4);
    group.add(this.spot5);
    group.add(this.base);
    group.add(this.body);
    group.translateZ(8);
    this.ship = group;
  }

  stepWorld(delta, timeOfDay) {
    time += delta * .005;
    let angle = delta / 400;
    this.ship.rotateY(2*angle);

    let triLength = 5;
    let triX = triLength*Math.cos(-time/4);
    let triZ = triLength*Math.sin(-2*time/4);
    this.ship.position.x = triX;
    this.ship.position.z = triZ;
  }
}