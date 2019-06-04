/*
    Author: David Ryan
    Period: 7
    Computer Science 2
    Due Date: June 7th, 2019
    Github: https://www.github.com/DavidMRyan/[REPO_NAME_HERE ]
    Version: 1.0
    [Note: All assets are owned by Nintendo, no copyright infringement was intended.]
*/
var player = new Player(), count = 4, frameCounter = 0,
    isIdle = true, mirrorImage = false,
    isJumping = false, isOnGround = true;
var enemies = [];
const A = 65, D = 68, SPACE = 32;
var canvasMatrix = matrixIdentity;
var keyMap = [], sounds = [];

/**
 * Initializes some things before calling GameLoop or starting the main menu
 */
function Main()
{
    window.setInterval("GameLoop()", 1000 / 60);

    // Game Setup
    Util.InitializeImageArray();
    AI.InitializeAIArray(5);
    Collision.InitializeCollisionMap("1_1_col");
    Sound.PlayMusic("1-1", true);
    player.SetSize("large"); // Just for Debugging!

    // Event Listeners
    onkeydown = onkeyup = (key) => {
        // USING SWITCH STATEMENT:
        // ###############################
        // switch(key.keyCode)
		// {
        //     case A:
        //         player.Move("LEFT");
        //         isIdle = false;
        //         mirrorImage = true;
        //         player.animationStatus = "moving_mirrored";
        //         break;

        //     case D:
        //         player.Move("RIGHT");
        //         isIdle = false;
        //         mirrorImage = false;
        //         player.animationStatus = "moving";
        //         break;

        //     case SPACE:
        //         if(isOnGround)
        //         {
        //             player.velocity.y = -14.0;
        //             player.Jump();
        //             isOnGround = false;
        //             mirrorImage ? player.animationStatus = "jumping_mirrored" : player.animationStatus = "jumping"
        //         }
        //         // Debug if the player is on the ground.
        //         // else console.log(`Cannot Jump! Player is already jumping!`);
        //         break;
        // }

        //USING S.O. METHOD
        // ###############################
        key = key || event;
        keyMap[key.keyCode] = key.type == 'keydown'
        
        // TODO: Add multiple keypresses later
        // ###################################
        //
        // if(keyMap[A] && keyMap[SPACE])
        // {
        //     player.Move("LEFT");
        //     isIdle = false;
        //     mirrorImage = true;
        //     isJumping = true;
        //     player.animationStatus = "jumping_mirrored";
        //     if(isOnGround) { isJumping = false; player.animationStatus = "mirrored"; }
        // }
        // 
        // if(keyMap[D] && keyMap[SPACE])
        // {
        //     player.Move("RIGHT");
        //     isIdle = false;
        //     mirrorImage = false;
        //     isJumping = true;
        //     player.animationStatus = "jumping";
        // }

        if(keyMap[A])
        {
            player.Move("LEFT");
            isIdle = false;
            mirrorImage = true;
            player.animationStatus = "moving_mirrored"; 
        }

        if(keyMap[D])
        {
            player.Move("RIGHT");
            isIdle = false;
            mirrorImage = false;
            player.animationStatus = "moving";
        }

        if(keyMap[SPACE])
        {
            if(isOnGround)
            {
                player.velocity.y = -14.0;
                player.size == "small" ? Sound.PlayFX("Jump_Small") : Sound.PlayFX("Jump_Large");
                player.Jump();
                isOnGround = false;
                mirrorImage ? player.animationStatus = "jumping_mirrored" : player.animationStatus = "jumping";
            }
        }
    }

    // Debug the keys being pressed
    // for(let i = 0; i < keyMap.length; i++)
    //     console.log(`Keys Being Pressed ${keyMap[i]}`);

    window.addEventListener("keyup", (key) => {
        isIdle = true;
        if(isOnGround)
            mirrorImage ? player.animationStatus = "idle_mirrored" : player.animationStatus = "idle";
    });
}

/**
 * Runs the game portion of the program
 */
function GameLoop()
{
    Background.Draw();
    player.Animate(player.size, player.animationStatus);

    // Test collision, before adding collsion map.
    if(player.y >= canvas.height - 230 && i > 0)
    {
        isOnGround = true;
        mirrorImage ? player.animationStatus = "idle_mirrored" : player.animationStatus = "idle";
    }

    // console.log(`Player Position: (${player.x}, ${player.y})`);
    // Animate the character sprites
    frameCounter++;
    if(frameCounter % 5 == 0) count++; // Increment the current image to draw every 5 frames
    if(count > 7) count = 4;
}