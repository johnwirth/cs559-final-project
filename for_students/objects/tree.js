import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

const trunkTopRadius = 0.5;
const trunkBotRadius = 0.5;
const trunkHeight = 5;

const leavesRadius = 1;

let trunkTex = new T.TextureLoader().load("./textures/tree-trunk.jpg");
let leavesTex = new T.TextureLoader().load("./textures/leaves.jpg");
let treeCount = 0;

export class Tree extends GrObject {
    /**
   *
   * @param {GrWorld} world
   */
  constructor(world) {
    let group = new T.Group();
    super(`Tree-${++treeCount}`, group);
    this.world = world;

    // Geometries
    this.trunkGeom = new T.CylinderBufferGeometry(trunkTopRadius, trunkBotRadius, trunkHeight, 20);
    this.leavesGeom = new T.SphereBufferGeometry(leavesRadius, 20, 10);
    
    // Materials
    this.trunkMat = new T.MeshStandardMaterial({
        color: "white",
        roughness: 0.7,
        map: trunkTex
    });
    this.leavesMaterial = new T.MeshStandardMaterial({
        color: "green",
        roughness: 0.7,
        map: leavesTex,
    });
    
    // Creation & placement of components
    this.trunk = new T.Mesh(this.trunkGeom, this.trunkMat);
    this.trunk.translateY(trunkHeight/2);

    this.leaves1 = new T.Mesh(this.leavesGeom, this.leavesMaterial);
    this.leaves1.translateY(trunkHeight + leavesRadius/2);

    this.leaves2_1 = new T.Mesh(this.leavesGeom, this.leavesMaterial);
    this.leaves2_1.translateY(trunkHeight - leavesRadius/2);
    this.leaves2_1.translateX(leavesRadius/2);
    this.leaves2_2 = new T.Mesh(this.leavesGeom, this.leavesMaterial);
    this.leaves2_2.translateY(trunkHeight - leavesRadius/2);
    this.leaves2_2.translateX(-leavesRadius/2);
    this.leaves2_3 = new T.Mesh(this.leavesGeom, this.leavesMaterial);
    this.leaves2_3.translateY(trunkHeight - leavesRadius/2);
    this.leaves2_3.translateZ(leavesRadius/2);
    this.leaves2_4 = new T.Mesh(this.leavesGeom, this.leavesMaterial);
    this.leaves2_4.translateY(trunkHeight - leavesRadius/2);
    this.leaves2_4.translateZ(-leavesRadius/2);

    this.leaves3_1 = new T.Mesh(this.leavesGeom, this.leavesMaterial);
    this.leaves3_1.translateY(trunkHeight - 3*leavesRadius/2);
    this.leaves3_1.translateX(leavesRadius/2);
    this.leaves3_1.translateZ(leavesRadius/2);
    this.leaves3_2 = new T.Mesh(this.leavesGeom, this.leavesMaterial);
    this.leaves3_2.translateY(trunkHeight - 3*leavesRadius/2);
    this.leaves3_2.translateX(leavesRadius/2);
    this.leaves3_2.translateZ(-leavesRadius/2);
    this.leaves3_3 = new T.Mesh(this.leavesGeom, this.leavesMaterial);
    this.leaves3_3.translateY(trunkHeight - 3*leavesRadius/2);
    this.leaves3_3.translateX(-leavesRadius/2);
    this.leaves3_3.translateZ(leavesRadius/2);
    this.leaves3_4 = new T.Mesh(this.leavesGeom, this.leavesMaterial);
    this.leaves3_4.translateY(trunkHeight - 3*leavesRadius/2);
    this.leaves3_4.translateX(-leavesRadius/2);
    this.leaves3_4.translateZ(-leavesRadius/2);

    // Group logic
    group.add(this.trunk);
    group.add(this.leaves1);
    group.add(this.leaves2_1);
    group.add(this.leaves2_2);
    group.add(this.leaves2_3);
    group.add(this.leaves2_4);
    group.add(this.leaves3_1);
    group.add(this.leaves3_2);
    group.add(this.leaves3_3);
    group.add(this.leaves3_4);
  }

  stepWorld(delta, timeOfDay) {
  }
}