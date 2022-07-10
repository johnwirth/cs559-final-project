import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import { shaderMaterial } from "../../libs/CS559-Framework/shaderHelper.js";

// Odyssey
const topRadius = 2;
const botRadius = topRadius * 0.8;
const bodyHeight = 5;
const baseRadius = 1.9*topRadius;
const baseHeight = 0.5;
const shinyRadius = 1;
const balloonRadius = 5;
const doorHeight = 2;
const doorWidth = doorHeight*.5;

const IDLE=0, ASCEND=1, DESCEND=2, WAIT=3, ROTATE=4, FLY=5;

// Flag
const poleRadius = 0.1
const poleHeight = 2;

const headRadius = 1.25*poleRadius;

const flagBaseRadius = 4*poleRadius;
const flagBaseHeight = 0.1;

const flagWidth = 1;
const flagHeight = 0.75*flagWidth;

// Globe
const globeRadius = 0.75;
const globeBaseRadius = 0.75*globeRadius;
const globeBaseHeight = 0.1;
const globeStandRadius = 0.1*globeBaseRadius;
const globeStandHeight = 5*globeStandRadius;

// Light
const lightBaseRadius  = 1;
const lightRadius = 0.75*lightBaseRadius;
const lightBeamRadius = 1.5*lightRadius;
const lightBeamLength = 7.5*lightRadius;

// Fancy
const fancyRingRadius = 0.15*baseRadius;
const fancyPoleRadius = 0.2*fancyRingRadius;
const fancyPoleHeight = 5*fancyRingRadius;

let flagImage = new T.TextureLoader().load("./textures/flag.jpeg");
let globeImage = new T.TextureLoader().load("./textures/globe.jpg");
let fancyImage = new T.TextureLoader().load("./textures/fancy.jpg");

// Animation
let time = 0;
let shipDir = 1;
let shipAngle = 0;
let flagDir = 1;
let flagAngle = 0;
let lightDir = 1;
let lightAngle = 0;

export class Odyssey extends GrObject {
    /**
   *
   * @param {GrWorld} world
   */
  constructor(world) {
    let group = new T.Group();
    let flagGroup = new T.Group();
    let globeGroup = new T.Group();
    let lightGroup = new T.Group();
    let fancyGroup = new T.Group();
    let fancyGroup1 = new T.Group();
    let fancyGroup2 = new T.Group();
    let fancyGroup3 = new T.Group();
    super("Odyssey", group);
    this.world = world;

    this.ridePoint = new T.Object3D();
    this.ridePoint.rotateX(Math.PI/4);
    this.objects[0].add(this.ridePoint);
    this.rideable = this.ridePoint;

    // Geometries
    this.bodyGeom = new T.CylinderBufferGeometry(topRadius, botRadius, bodyHeight, 20);
    this.baseGeom = new T.CylinderBufferGeometry(baseRadius, baseRadius, baseHeight, 20);
    const cubeRenderTarget = new T.WebGLCubeRenderTarget( 128 );
    this.cubecam = new T.CubeCamera(shinyRadius*1.05, 1000, cubeRenderTarget);
    this.shinyGeom = new T.SphereBufferGeometry(shinyRadius, 20, 10);
    this.balloonGeom = new T.SphereBufferGeometry(balloonRadius, 20, 10);
    this.doorGeom = new T.BoxGeometry(doorWidth,doorHeight,1);

    this.flagGeom = new T.BoxBufferGeometry(flagWidth, flagHeight, 0.01);
    this.poleGeom = new T.CylinderBufferGeometry(poleRadius, poleRadius, poleHeight, 20);
    this.headGeom = new T.SphereBufferGeometry(headRadius,64,32);
    this.flagBaseGeom = new T.CylinderBufferGeometry(flagBaseRadius, flagBaseRadius, flagBaseHeight, 20);
    
    this.globeGeom = new T.SphereBufferGeometry(globeRadius);
    this.globeBaseGeom = new T.CylinderBufferGeometry(globeBaseRadius,globeBaseRadius,globeBaseHeight, 64);
    this.globeStandGeom = new T.CylinderBufferGeometry(globeStandRadius,globeStandRadius,globeStandHeight, 64);

    this.lightBaseGeom = new T.SphereBufferGeometry(lightBaseRadius,32,32,Math.PI,Math.PI,0,Math.PI);
    this.lightRingGeom = new T.RingBufferGeometry(0,lightBaseRadius,30);
    this.lightGeom = new T.SphereBufferGeometry(lightRadius);
    this.lightBeamGeom = new T.CylinderBufferGeometry(0.75*lightRadius,lightBeamRadius,lightBeamLength,20);

    // this.fancyRingGeom = new T.RingBufferGeometry(0,fancyRingRadius,20);
    this.fancyRingGeom = new T.CylinderBufferGeometry(fancyRingRadius,fancyRingRadius,.05,20);
    this.fancyPoleGeom = new T.ConeBufferGeometry(fancyPoleRadius,fancyPoleHeight,20);

    // Materials
    this.bodyMat = new T.MeshStandardMaterial({
        color: "red",
        roughness: 0.2,
        metalness: .7,
    });
    this.shinyMat = new T.MeshStandardMaterial({
        color: "orange",
        roughness: 0.2,
        metalness: .7,
        // @ts-ignore   // envMap has the wrong type
        envMap: this.cubecam.renderTarget.texture,
    });
    this.balloonMat = new T.MeshStandardMaterial({
    color: "white",
    roughness: 0.7,
    }); 

    // this.flagMat = new T.MeshStandardMaterial({
    //     color: "white",
    //     map: flagImage,
    // });
    this.flagMat = shaderMaterial("./shaders/flag.vs", "./shaders/flag.fs", {
        uniforms: {
            tex: { value: flagImage },
        },
    });
    this.poleMat = new T.MeshStandardMaterial({
        color: "yellow",
        roughness: 0.2,
        metalness: .2,
    });

    this.globeMat = new T.MeshStandardMaterial({
        color: "white",
        roughness: 0.7,
        // metalness: .2,
        map: globeImage,
    });
    
    this.lightBeamMat = new T.MeshPhongMaterial({
        color: "rgb(100%, 100%, 0%)",
        transparent: true,
        opacity: 0.5,
    });

    this.fancyRingMat = new T.MeshStandardMaterial({
        side: T.DoubleSide,
        color: "#F2CB61",
        metalness: 0.7,
        map: fancyImage,
    });

    // Creation & placement of components
    this.body = new T.Mesh(this.bodyGeom, this.bodyMat);
    this.base = new T.Mesh(this.baseGeom, this.bodyMat);
    this.base.translateY(-bodyHeight/2);
    this.shiny = new T.Mesh(this.shinyGeom, this.shinyMat);
    this.shiny.translateY(bodyHeight/2+shinyRadius);
    this.balloon = new T.Mesh(this.balloonGeom, this.balloonMat);
    this.balloon.translateY(bodyHeight/2+shinyRadius*2+balloonRadius);
    this.door = new T.Mesh(this.doorGeom, this.balloonMat);
    this.door.translateY(-doorHeight*.8);
    this.door.translateZ(topRadius*.65);

    this.flag = new T.Mesh(this.flagGeom,this.flagMat);
    this.flag.translateY(poleHeight-flagHeight/2);
    this.flag.translateX(flagWidth/2);
    this.pole = new T.Mesh(this.poleGeom,this.poleMat);
    this.pole.translateY(poleHeight/2);
    this.head = new T.Mesh(this.headGeom,this.poleMat);
    this.head.translateY(poleHeight+headRadius/2);
    this.flagBase = new T.Mesh(this.flagBaseGeom,this.poleMat);
    this.flagBase.translateY(flagBaseHeight/2);

    this.globeBase = new T.Mesh(this.globeBaseGeom, this.poleMat);
    this.globeStand = new T.Mesh(this.globeStandGeom, this.poleMat);
    this.globeStand.translateY(globeBaseHeight/2+globeStandHeight/2);
    this.globe = new T.Mesh(this.globeGeom, this.globeMat);
    this.globe.translateY(globeBaseHeight/2+globeStandHeight/2+globeRadius);
    this.globe.rotateZ(Math.PI/8);

    this.lightBase = new T.Mesh(this.lightBaseGeom, this.bodyMat);
    this.lightRing = new T.Mesh(this.lightRingGeom, this.bodyMat);
    this.light = new T.Mesh(this.lightGeom, this.poleMat);
    this.lightBeam = new T.Mesh(this.lightBeamGeom, this.lightBeamMat);
    this.lightBeam.rotateX(-Math.PI/2);
    this.lightBeam.translateY(-0.4*lightBeamLength);

    this.fancyRing1_1 = new T.Mesh(this.fancyRingGeom, this.fancyRingMat);
    this.fancyRing1_1.translateY(fancyPoleHeight/4);
    this.fancyRing1_1.rotateZ(Math.PI/32);
    fancyGroup1.add(this.fancyRing1_1);
    this.fancyRing1_2 = new T.Mesh(this.fancyRingGeom, this.fancyRingMat);
    this.fancyRing1_2.rotateZ(-Math.PI/32);
    fancyGroup1.add(this.fancyRing1_2);
    this.fancyPole1 = new T.Mesh(this.fancyPoleGeom, this.poleMat);
    this.fancyPole1.rotateX(Math.PI);
    fancyGroup1.add(this.fancyPole1);

    this.fancyRing2_1 = new T.Mesh(this.fancyRingGeom, this.fancyRingMat);
    this.fancyRing2_1.translateY(fancyPoleHeight/4);
    this.fancyRing2_1.rotateZ(Math.PI/32);
    fancyGroup2.add(this.fancyRing2_1);
    this.fancyRing2_2 = new T.Mesh(this.fancyRingGeom, this.fancyRingMat);
    this.fancyRing2_2.rotateZ(-Math.PI/32);
    fancyGroup2.add(this.fancyRing2_2);
    this.fancyPole2 = new T.Mesh(this.fancyPoleGeom, this.poleMat);
    this.fancyPole2.rotateX(Math.PI);
    fancyGroup2.add(this.fancyPole2);
    fancyGroup2.translateX(2.5*fancyRingRadius);

    this.fancyRing3_1 = new T.Mesh(this.fancyRingGeom, this.fancyRingMat);
    this.fancyRing3_1.translateY(fancyPoleHeight/4);
    this.fancyRing3_1.rotateZ(-Math.PI/32);
    fancyGroup3.add(this.fancyRing3_1);
    this.fancyRing3_2 = new T.Mesh(this.fancyRingGeom, this.fancyRingMat);
    this.fancyRing3_2.rotateZ(Math.PI/32);
    fancyGroup3.add(this.fancyRing3_2);
    this.fancyPole3 = new T.Mesh(this.fancyPoleGeom, this.poleMat);
    this.fancyPole3.rotateX(Math.PI);
    fancyGroup3.add(this.fancyPole3);
    fancyGroup3.translateX(1.25*fancyRingRadius);
    fancyGroup3.translateZ(2.25*fancyRingRadius);

    // Group logic
    group.add(this.body);
    group.add(this.base);
    group.add(this.cubecam);
    group.add(this.shiny);
    group.add(this.balloon);
    group.add(this.door);
    group.add(flagGroup);
    group.add(globeGroup);
    group.add(lightGroup);
    group.add(fancyGroup);
    group.translateY(10);
    this.odyssey = group;
    this.startX = -12;
    this.startY =   5;
    this.startZ =  12;
    this.goalX = 12;
    group.translateX(this.startX);
    group.translateY(this.startY);
    group.translateZ(this.startZ);

    flagGroup.add(this.flag);
    flagGroup.add(this.pole);
    flagGroup.add(this.head);
    flagGroup.add(this.flagBase);
    flagGroup.translateX(botRadius*.85);
    flagGroup.translateY(-bodyHeight*.45);
    flagGroup.translateZ(topRadius+flagBaseRadius*2);

    globeGroup.add(this.globeBase);
    globeGroup.add(this.globeStand);
    globeGroup.add(this.globe);
    globeGroup.translateX(-botRadius);
    globeGroup.translateY(-bodyHeight*.45);
    globeGroup.translateZ(topRadius+flagBaseRadius*.65);

    lightGroup.add(this.lightBase);
    lightGroup.add(this.lightRing);
    lightGroup.add(this.light);
    lightGroup.add(this.lightBeam);
    lightGroup.translateX(0.70*baseRadius);
    lightGroup.translateY(-bodyHeight/2);
    lightGroup.translateZ(0.90*baseRadius);

    fancyGroup.add(fancyGroup1);
    this.fancyGroup1 = fancyGroup1;
    fancyGroup.add(fancyGroup2);
    this.fancyGroup2 = fancyGroup2;
    fancyGroup.add(fancyGroup3);
    this.fancyGroup3 = fancyGroup3;
    fancyGroup.translateX(-(fancyRingRadius));
    fancyGroup.translateY(-(0.55*fancyPoleHeight+bodyHeight/2));
    fancyGroup.translateZ(-(fancyRingRadius));

    this.state = 0;
    this.delay = 0;
    this.altitude = 15;
  }

  stepWorld(delta, timeOfDay) {
    time += delta * .005;
    let angle = delta / 400;

    // Ship
    let shipDelta = delta / 100;
    switch (this.state) {
        case IDLE:
          this.state = ASCEND;
          this.delay = 0;
          break;
        case ASCEND:
            if (shipDir == 1) {
                this.odyssey.position.y += shipDelta;
                if (this.odyssey.position.y >= this.altitude) {
                    this.odyssey.position.y = this.altitude;
                    this.state = ROTATE;

                    // compute the spin, before we start
                    let dx = this.goalX - this.odyssey.position.x;
                    let dz = this.startZ - this.odyssey.position.z;
                    let ds = Math.sqrt(dx * dx + dz * dz);
                    if (ds > 0) {
                        // compute the goal angle
                        this.goalangle = Math.atan2(dx, dz);
                        // get the current angle
                        let quat = new T.Quaternion();
                        this.odyssey.getWorldQuaternion(quat);
                        let eu = new T.Euler();
                        eu.setFromQuaternion(quat);
                        this.currentangle = eu.y;
                        this.state = ROTATE;
                    } else {
                        this.state = FLY; // don't bother spinning
                    }
                }
            }
            if (shipDir == -1) {
                this.odyssey.position.y += shipDelta;
                if (this.odyssey.position.y >= this.altitude) {
                    this.odyssey.position.y = this.altitude;
                    this.state = ROTATE;

                    // compute the spin, before we start
                    let dx = this.startX - this.odyssey.position.x;
                    let dz = this.startZ - this.odyssey.position.z;
                    let ds = Math.sqrt(dx * dx + dz * dz);
                    if (ds > 0) {
                        // compute the goal angle
                        this.goalangle = Math.atan2(dx, dz);
                        // get the current angle
                        let quat = new T.Quaternion();
                        this.odyssey.getWorldQuaternion(quat);
                        let eu = new T.Euler();
                        eu.setFromQuaternion(quat);
                        this.currentangle = eu.y;
                        this.state = ROTATE;
                    } else {
                        this.state = FLY; // don't bother spinning
                    }
                }
            }
          break;
        case DESCEND: // descend
          this.odyssey.position.y -= shipDelta;
          if (this.odyssey.position.y <= this.startY) {
            shipDir *= -1;
            this.odyssey.position.y = this.startY;
            this.state = WAIT;
            this.delay = 1 + Math.random();
          }
          break;
        case WAIT: // wait before takeoff
          this.delay -= shipDelta;
          if (this.delay < 0) {
            this.state = ASCEND; // take off again
          }
          break;
        case ROTATE: // rotate to point towards destination
          let ad = this.goalangle - this.currentangle;
          if (ad > 0.1) {
            this.currentangle += 0.05;
          } else if (ad < -0.1) {
            this.currentangle -= 0.05;
          } else {
            this.state = FLY;
            this.currentangle = this.goalangle;
          }
          this.odyssey.setRotationFromEuler(
            new T.Euler(0, this.currentangle, 0)
          );
          break;
        case FLY: // fly to destination
            if (shipDir == 1) {
                let dx = this.goalX - this.odyssey.position.x;
                let dz = this.odyssey.position.z - this.odyssey.position.z;
                let dst = Math.sqrt(dx * dx + dz * dz);
                let ds = shipDelta * 1.5;
                if (dst > ds) {
                    this.odyssey.position.x += (dx * ds) / dst;
                    this.odyssey.position.z += (dz * ds) / dst;
                } else {
                    this.odyssey.position.x = this.goalX;
                    this.odyssey.position.z = this.odyssey.position.z;
                    this.state = DESCEND;
                }
            }
            if (shipDir == -1) {
                let dx = this.startX - this.odyssey.position.x;
                let dz = this.odyssey.position.z - this.odyssey.position.z;
                let dst = Math.sqrt(dx * dx + dz * dz);
                let ds = shipDelta * 1.5;
                if (dst > ds) {
                    this.odyssey.position.x += (dx * ds) / dst;
                    this.odyssey.position.z += (dz * ds) / dst;
                } else {
                    this.odyssey.position.x = this.startX;
                    this.odyssey.position.z = this.odyssey.position.z;
                    this.state = DESCEND;
                }
            }
          break;
      }

    // Flag
    // let flagDelta = delta / 3000;
    let flagDelta = .001*delta
    flagAngle += flagDir*flagDelta;
    if (Math.abs(flagAngle) >= Math.PI/4) flagDir *= -1;
    this.flag.rotateY(flagDir*flagDelta);
    this.flag.translateZ(-.5*flagDelta*flagDir);


    // Globe
    this.globe.rotateY(2*angle);

    // Light
    let lightDelta = delta / 3000;
    lightAngle += lightDir*lightDelta;
    if (Math.abs(lightAngle) >= Math.PI/16) lightDir *= -1;
    this.lightBeam.rotateZ(lightDir*lightDelta);
    this.lightBeam.translateX(2*lightDelta*lightDir);

    // Fancies
    this.fancyGroup1.rotateY( 8*angle);
    this.fancyGroup2.rotateY(-8*angle);
    this.fancyGroup3.rotateY( 8*angle);
    
    // Reflective surface
    this.cubecam.update(this.world.renderer, this.world.scene);
  }
}