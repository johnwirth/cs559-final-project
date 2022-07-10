import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";

const castleWidth = 14;
const castleHeight = 0.5*castleWidth;
const castleDepth = 0.75*castleWidth;

const pillarHeight = 1.5*castleHeight;
const pillarRadius = 0.15*pillarHeight;

const pillarRoofRadius = 1.25*pillarRadius;
const pillarRoofHeight = 0.33*pillarHeight;

const centerPillarRadius = 2*pillarRadius;
const centerPillarHeight = 1.5*pillarHeight;

const centerRoofRadius = 1.75*centerPillarRadius;
const centerRoofHeight = 0.33*centerPillarHeight;

const doorWidth = castleWidth/3;
const doorHeight = castleHeight*.8;

let brickImage = new T.TextureLoader().load("./textures/white-brick.jpg");
let doorImage = new T.TextureLoader().load("./textures/door.jpg");

export class Castle extends GrObject {
    /**
   *
   * @param {GrWorld} world
   */
  constructor(world) {
    let group = new T.Group();
    super("Castle", group);
    this.world = world;

    // Geometries
    this.castleGeom = new T.BoxBufferGeometry(castleWidth,castleHeight,castleDepth);
    this.pillarGeom = new T.CylinderBufferGeometry(pillarRadius,pillarRadius,pillarHeight,20);
    this.pillarRoofGeom = new T.ConeBufferGeometry(pillarRoofRadius,pillarRoofHeight,20);
    this.lowerRoofGeom = new T.CylinderBufferGeometry(castleHeight,castleHeight,castleWidth,3);
    this.centerPillarGeom = new T.CylinderBufferGeometry(centerPillarRadius,centerPillarRadius,centerPillarHeight,20);
    this.centerRoofGeom = new T.ConeBufferGeometry(centerRoofRadius,centerRoofHeight,20);
    this.doorGeom = new T.BoxBufferGeometry(doorWidth,doorHeight,0.5);
    
    // Materials
    this.castleMat = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.7,
      map: brickImage,
    });
    this.roofMat = new T.MeshStandardMaterial({
      color: "maroon",
      roughness: 0.7,
      map: brickImage,
    });
    this.doorMat = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.7,
      map: doorImage,
    });
    
    // Creation & placement of components
    this.castle = new T.Mesh(this.castleGeom,this.castleMat);
    this.castle.translateY(castleHeight/2);
    this.pillar1 = new T.Mesh(this.pillarGeom,this.castleMat);
    this.pillar1.translateX(castleWidth/2);
    this.pillar1.translateY(pillarHeight/2-castleHeight/2);
    this.pillar1.translateZ(castleDepth/2);
    this.pillarTop1 = new T.Mesh(this.pillarRoofGeom,this.roofMat);
    this.pillarTop1.translateY(pillarHeight-pillarRoofHeight);
    this.pillar2 = new T.Mesh(this.pillarGeom,this.castleMat);
    this.pillar2.translateX(-castleWidth/2);
    this.pillar2.translateY(pillarHeight/2-castleHeight/2);
    this.pillar2.translateZ(castleDepth/2);
    this.pillarTop2 = new T.Mesh(this.pillarRoofGeom,this.roofMat);
    this.pillarTop2.translateY(pillarHeight-pillarRoofHeight);
    this.pillar3 = new T.Mesh(this.pillarGeom,this.castleMat);
    this.pillar3.translateX(castleWidth/2);
    this.pillar3.translateY(pillarHeight/2-castleHeight/2);
    this.pillar3.translateZ(-castleDepth/2);
    this.pillarTop3 = new T.Mesh(this.pillarRoofGeom,this.roofMat);
    this.pillarTop3.translateY(pillarHeight-pillarRoofHeight);
    this.pillar4 = new T.Mesh(this.pillarGeom,this.castleMat);
    this.pillar4.translateX(-castleWidth/2);
    this.pillar4.translateY(pillarHeight/2-castleHeight/2);
    this.pillar4.translateZ(-castleDepth/2);
    this.pillarTop4 = new T.Mesh(this.pillarRoofGeom,this.roofMat);
    this.pillarTop4.translateY(pillarHeight-pillarRoofHeight);
    this.lowerRoof = new T.Mesh(this.lowerRoofGeom,this.roofMat);
    this.lowerRoof.translateY(castleHeight);
    this.lowerRoof.rotateY(Math.PI/2);
    this.lowerRoof.rotateX(-Math.PI/2);

    this.centerPillar = new T.Mesh(this.centerPillarGeom,this.castleMat);
    this.centerPillar.translateY(centerPillarHeight);
    this.centerRoof1 = new T.Mesh(this.centerRoofGeom,this.roofMat);
    this.centerRoof1.translateY(centerRoofHeight/2);
    this.centerRoof2 = new T.Mesh(this.centerRoofGeom,this.roofMat);
    this.centerRoof2.translateY(2*centerRoofHeight);

    this.door = new T.Mesh(this.doorGeom,this.doorMat);
    this.door.translateZ(.96*castleDepth/2);
    this.door.translateY(doorHeight/2-castleHeight/2);

    // Group logic
    group.add(this.castle);
    this.castle.add(this.lowerRoof);
    
    this.castle.add(this.pillar1);
    this.pillar1.add(this.pillarTop1);
    this.castle.add(this.pillar2);
    this.pillar2.add(this.pillarTop2);
    this.castle.add(this.pillar3);
    this.pillar3.add(this.pillarTop3);
    this.castle.add(this.pillar4);
    this.pillar4.add(this.pillarTop4);
    
    this.castle.add(this.centerPillar);
    this.centerPillar.add(this.centerRoof1);
    this.centerPillar.add(this.centerRoof2);

    this.castle.add(this.door);
  }

  stepWorld(delta, timeOfDay) {
      
  }
}