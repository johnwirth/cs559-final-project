/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 *
 * This is the main file - it creates the world, populates it with
 * objects and behaviors, and starts things running
 *
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 *
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */

import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";

import { Odyssey } from "./objects/odyssey.js"
import { Mario } from "./objects/mario.js"
import { Goomba } from "./objects/goomba.js";
import { Tree } from "./objects/tree.js";
import { Ship } from "./objects/ship.js";
import { Fountain } from "./objects/fountain.js";
import { Castle } from "./objects/castle.js";

import { cubeTextureHelp } from "./readCubeTexture.js";

/**
 * The Graphics Town Main -
 * This builds up the world and makes it go...
 */

// make the world
let world = new GrWorld({
    width: 800,
    height: 600,
    groundplanesize: 20 // make the ground plane big enough for a world of stuff
});

const skyboxBase = "./textures/skybox/skybox";
world.scene.background = cubeTextureHelp(skyboxBase);

world.camera.position.x = 30;
world.camera.position.y = 40;
world.camera.position.z = 50;

// put stuff into the world
// this calls the example code (that puts a lot of objects into the world)
// you can look at it for reference, but do not use it in your assignment
function main(world) {

    // Odyssey instatiation & placement
    let odyssey = new Odyssey(world);
    odyssey.setPos(-12,5,12);
    world.add(odyssey);

    // Castle instatiation & placement
    let castle = new Castle(world);
    castle.setPos(0,0,-12);
    world.add(castle);

    // Fountain instatiation & placement
    let fountain = new Fountain(world);
    fountain.setPos(0,0,8);
    world.add(fountain);

    // Goomba instatiations & placements
    let goomba1 = new Goomba(world);
    goomba1.setPos(-14,.5,-16);
    world.add(goomba1);

    let goomba2 = new Goomba(world);
    goomba2.setPos(-14,.5,-12);
    world.add(goomba2);

    let goomba3 = new Goomba(world);
    goomba3.setPos(-14,.5,-8);
    world.add(goomba3);

    let goomba4 = new Goomba(world);
    goomba4.setPos(12,.5,-16);
    world.add(goomba4);

    let goomba5 = new Goomba(world);
    goomba5.setPos(12,.5,-12);
    world.add(goomba5);

    let goomba6 = new Goomba(world);
    goomba6.setPos(12,.5,-8);
    world.add(goomba6);

    // Mario instatiation & placement
    let mario = new Mario(world);
    world.add(mario);

    // Ship instatiation & placement
    let ship = new Ship(world);
    ship.setPos(-4,10,20);
    world.add(ship);

    // Tree instatiations & placements
    let tree1 = new Tree(world);
    tree1.setPos(-18,0,-16);
    world.add(tree1);

    let tree2 = new Tree(world);
    tree2.setPos(-18,0,-12);
    world.add(tree2);

    let tree3 = new Tree(world);
    tree3.setPos(-18,0,-8);
    world.add(tree3);

    let tree4 = new Tree(world);
    tree4.setPos(18,0,-16);
    world.add(tree4);
    
    let tree5 = new Tree(world);
    tree5.setPos(18,0,-12);
    world.add(tree5);
    
    let tree6 = new Tree(world);
    tree6.setPos(18,0,-8);
    world.add(tree6);
}

main(world);

// while making your objects, be sure to identify some of them as "highlighted"

///////////////////////////////////////////////////////////////
// because I did not store the objects I want to highlight in variables, I need to look them up by name
// This code is included since it might be useful if you want to highlight your objects here
function highlight(obName) {
    const toHighlight = world.objects.find(ob => ob.name === obName);
    if (toHighlight) {
        toHighlight.highlighted = true;
    } else {
        throw `no object named ${obName} for highlighting!`;
    }
}
// of course, the student should highlight their own objects, not these
highlight("Odyssey");
highlight("Castle");
highlight("Goomba-3");
highlight("Fountain");
highlight("Ship");

///////////////////////////////////////////////////////////////
// build and run the UI
// only after all the objects exist can we build the UI
// @ts-ignore       // we're sticking a new thing into the world
world.ui = new WorldUI(world);
// now make it go!
world.go();
