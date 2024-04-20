import { useEffect, useRef } from "react";
import Layout from "../../components/layout";

import { initShaderProgram } from '../../lib/webgl/webgl-demo'
import { initBuffers } from "../../lib/webgl/init-buffers.js";
import { drawScene } from "../../lib/webgl/draw-scene.js";


export default function WebGl() {
    const canvasRef = useRef(null);

    useEffect(() => {
        let squareRotation = 0.0;
        let deltaTime = 0;

        const canvas = canvasRef.current;
        const gl = canvas.getContext("webgl");
      
        // Only continue if WebGL is available and working
        if (gl === null) {
          alert(
            "Unable to initialize WebGL. Your browser or machine may not support it."
          );
          return;
        }
      
        // Set clear color to black, fully opaque
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        // Clear the color buffer with specified clear color
        gl.clear(gl.COLOR_BUFFER_BIT);
      
        // Vertex shader program
      
        const vsSource = `
          attribute vec4 aVertexPosition;
          attribute vec4 aVertexColor;
          uniform mat4 uModelViewMatrix;
          uniform mat4 uProjectionMatrix;
          varying lowp vec4 vColor;
          void main(void) {
            gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
            vColor = aVertexColor;
          }
        `;
      
        // Fragment shader program
      
        const fsSource = `
          varying lowp vec4 vColor;
          void main(void) {
            gl_FragColor = vColor;
          }
        `;
      
        // Initialize a shader program; this is where all the lighting
        // for the vertices and so forth is established.
        const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
      
        // Collect all the info needed to use the shader program.
        // Look up which attributes our shader program is using
        // for aVertexPosition, aVertexColor and also
        // look up uniform locations.
        const programInfo = {
          program: shaderProgram,
          attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
            vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
          },
          uniformLocations: {
            projectionMatrix: gl.getUniformLocation(
              shaderProgram,
              "uProjectionMatrix"
            ),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
          },
        };
      
        // Here's where we call the routine that builds all the
        // objects we'll be drawing.
        const buffers = initBuffers(gl);
      
        let then = 0;
      
        // Draw the scene repeatedly
        function render(now) {
          now *= 0.001; // convert to seconds
          deltaTime = now - then;
          then = now;
      
          drawScene(gl, programInfo, buffers, squareRotation);
          squareRotation += deltaTime;
      
          requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    }, [])
    
    return (
        <Layout>
            <canvas ref={canvasRef} id="glcanvas" width="640" height="480"></canvas>
        </Layout>
    )
}