// create two shared variable for the VS and FS containing the normal and the uv coords 
varying vec2 v_uv; 

void main() { 
    // pass the texture coordinate to the fragment
    v_uv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); 
} 