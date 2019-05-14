var canvas, gl;

/**
 * This function initializes WebGL for use in the browser
 * Once WebGL is initialized, we clear the background,
 * and set the background color.
 */
function InitializeWebGL()
{
    canvas = document.getElementById("canvas");
    gl = canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl") ||
        canvas.getContext("moz-webgl") ||
        canvas.getContext("webkit-3d");

    if(gl)
    {
        console.log(`Context: ${gl}\nExtensions: ${gl.getSupportedExtensions()}`);

        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
        gl.clearColor(0.357, 0.525, 0.984, 1); // Set the background color
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    else console.log("Your browser doesn't support WebGL!");
	console.log("WebGL Initialized.");

	// Call the main function after WebGL has been initialized.
	main();
}

function InitializeShader(gl, sourceVertexShader, sourceFragmentShader)
{
	let error = false;
	let vertexShader = gl.createShader(gl.VERTEX_SHADER);
	let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vertexShader, sourceVertexShader);
	gl.shaderSource(fragmentShader, sourceFragmentShader);
	gl.compileShader(vertexShader);
	gl.compileShader(fragmentShader);

	if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) { alert(gl.getShaderInfoLog(vertexShader)); error = true; }
	if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) { alert(gl.getShaderInfoLog(fragmentShader)); error = true; }

	// Create a program, consisting of the VertexShader and FragmentShader
	let program = gl.createProgram();

	// Attach shaders to the program
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);

	// Link the program
	if(gl.linkProgram(program) == 0) { console.log("Program failed with error code 0!"); error = true; }
	if(error) { console.log("Failed to initialize the Shader!"); return; }
	return program;
}

function drawImage(image, x, y, width, height)
{

}
