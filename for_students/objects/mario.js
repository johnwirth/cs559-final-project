import * as T from "../../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import { OBJLoader } from "../../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";

export class Mario extends GrObject {
    /**
   *
   * @param {GrWorld} world
   */
  constructor(world) {
    let group = new T.Group();
    super("Mario", group);
    this.world = world;

    // Geometries
    let mario;
    let loader = new OBJLoader();
    loader.load("./objects/Super_Mario.obj", function (obj) {
        mario = obj;
        obj.position.set(0,0,-5);
        world.scene.add(obj);
    });
  }

  stepWorld(delta, timeOfDay) {

  }
}