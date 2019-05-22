/**
 * [Insert Prologue Block Here]
 */
var player = new Player(), count = 4, frameCounter = 0, isIdle = true, mirrorImage = false;
const A = 65, D = 68, SPACE = 32;
var deltaTime, lastFrame;
var canvasMatrix = matrixIdentity;

/**
 * Initializes some things before calling GameLoop or starting the main menu
 */
function Main()
{
    window.setInterval("GameLoop()", 1000 / 60);

    // Game Setup
    Util.InitializeImageArray();
    player.SetSize("large");
    Sound.PlayMusic("1-1", true); // Play level 1-1 music


    // Event Listeners
    window.addEventListener("keydown", (key) => {
        switch(key.keyCode)
		{
            case A:
                player.Move("LEFT");
                isIdle = false;
                mirrorImage = true;
                break;

            case D:
                player.Move("RIGHT");
                isIdle = false;
                mirrorImage = false;
                break;

            case SPACE:
                // Add Jumping Later
                // player.Jump();
                break;
		}
    });

    window.addEventListener("keyup", (key) => { isIdle = true; });
}

/**
 * Runs the game portion of the program
 */
function GameLoop()
{
    Background.Draw();
    player.Animate();

    // Animate the character sprites
    frameCounter++;
    if(frameCounter % 5 == 0) count++; // Increment the current image to draw every 5 frames
    if(count > 7) count = 4;
}
