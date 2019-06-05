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
var isAlreadyPlaying = false;

class Util
{
	/**
	 * Starts the end of the stage (animations and sound effects)
	 * @param x - The X position for this 'trigger' to be placed
	 * @param sfx - The song to be played at the end of the level
	 */
    static EndLevel(x, sfx)
    {
		if(!isAlreadyPlaying && player.x >= x)
		{
			Sound.StopMusic();
			sfx.play();
			isAlreadyPlaying = true;
		}
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

var background = document.getElementById("1_1");

class Background
{
	/**
	 * Draws the background, and sets the transform of the canvas matrix
	 * for use in the 'Player.Draw()' function.
	 */
	static Draw()
	{
		let zoom = 3.14; // 'Camera zoom' for the background image drawn on the canvas

		 // Draw the background with the proper zoom
		c.beginPath();
		c.drawImage(background, 0, 0, background.width * zoom, background.height * zoom);
		c.closePath();

		// Center matrix to mario
		canvasMatrix.SetTransform(canvasMatrix.m11, canvasMatrix.m12, canvasMatrix.m21, canvasMatrix.m22,
			-player.x + canvas.width / 2, canvasMatrix.dy);
			
		c.setTransform(canvasMatrix.m11, canvasMatrix.m12, canvasMatrix.m21, canvasMatrix.m22,
			-player.x + canvas.width / 2, canvasMatrix.dy);
	}
}