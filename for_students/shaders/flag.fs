// create the shared variables. which are set in the fragment shader 
varying vec2 v_uv;

uniform sampler2D tex;

void main(void) {
   gl_FragColor = texture2D(tex, v_uv);
} 