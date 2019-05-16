/**
 * [Insert Prologue Block Here]
 */

var player = new Player(), count = 4, frameCounter = 0;
const A = 65, D = 68, SPACE = 32;
var deltaTime, lastFrame;


/**
 * Initializes some things before calling GameLoop or starting the main menu
 */
function Main()
{
    window.setInterval("GameLoop()", 1000 / 60);

    // Game Setup
    Util.InitializeImageArray();
    player.SetSize("large");
    Physics.SetGravity(-2);
    Physics.SetVelocity(2);


    // Event Listeners
    window.addEventListener("keydown", (key) => {
        switch(key.keyCode)
		{
			case A: player.Move("LEFT"); 	break;
			case D: player.Move("RIGHT"); 	break;
			case SPACE: player.Jump();      break;
		}
    });
}

/**
 * Runs the game portion of the program
 */
function GameLoop()
{
    // Keep track of Delta Time, for use in the gravity.
    deltaTime = (new Date().getTime() - lastFrame);
    if(deltaTime > 0.15) deltaTime = 0.15;

    Canvas.Draw(0, 0, canvas.width, canvas.height, "rgb(91, 134, 251)");                    // Fill the background (Just the color)
    player.size == "small" ? player.Draw(images[0][count]) : player.Draw(images[1][count]); // Set the size of the player

    // Animate the character sprites
    frameCounter++;
    if(frameCounter % 5 == 0) count++; // Increment the current image to draw every 5 frames
    if(count > 7) count = 4;

    // Keep track of the last frame that was executed, to use in Delta Time
    lastFrame = new Date().getTime();
}
