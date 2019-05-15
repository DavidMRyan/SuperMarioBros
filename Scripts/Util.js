var canvas = document.getElementById("canvas"),
	c = canvas.getContext("2d");

class Canvas
{
	/**
	 * Draws the canvas onto the 2D canvas context
	 * @param x - The X position of the top left corner of the canvas
	 * @param y - The Y position of the top left corner of the canvas
	 * @param width - The width of the canvas in pixles
	 * @param height - The height of the canvas in pixles
	 * @param color - The color of the canvas
	 */
	static Draw(x, y, width, height, color)
	{
		c.beginPath();
		c.fillStyle = color;
		c.fillRect(x, y, width, height);
		c.closePath();
	}
}

var images = [];
var smallMario,
	largeMario;

class Util
{
	/**
	 * Initializes the two dimensional array, containing the character's sprites
	 * images[0] - Array of small character sprites
	 * images[1] - Array of large character sprites
	 */
	static InitializeImageArray()
	{
		images[0] = []; // Small Mario Images
		images[1] = []; // Large Mario Images
		smallMario = document.getElementById("small_mario").children;
		largeMario = document.getElementById("large_mario").children;

		// Initialize the Small Mario Images
		for(let i = 0; i < smallMario.length; i++)
			images[0][i] = smallMario[i];

		// Initialize the Large Mario Images
		for(let j = 0; j < largeMario.length; j++)
			images[1][j] = largeMario[j];
	}
}

var gravity = 0,
	velocity = 0;

class Physics
{
	// Mutator Functions
	static SetGravity(amount) { gravity = amount; }
	static SetVelocity(amount) { velocity = amount; }

	// Accessor Functions
	static GetGravity() { return gravity; }
	static GetVelocity() { return velocity; }
}
