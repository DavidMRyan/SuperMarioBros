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
var enemies = [], enemyImages = [], enemyCount = 0;
var canvasMatrix = matrixIdentity;
var keyMap = [], sounds = [];
const A = 65, D = 68, SPACE = 32;

/**
 * Initializes some things before calling GameLoop or starting the main menu
 */
function Main()
{
    window.setInterval("GameLoop()", 1000 / 60);

    // Game Setup
    Player.InitializeImageArray();
    AI.InitializeAIArray(14);
    Collision.InitializeCollisionMap("1_1_col");
    Sound.PlayMusic("1-1", true);
    player.SetSize("small"); // Just for Debugging!

    AI.InitializeImageArray("goomba");
    enemies[0].SetSpawn(1125, 611);
    enemies[1].SetSpawn(2076, 611);
    enemies[2].SetSpawn(2500, 611);
    enemies[3].SetSpawn(2738, 611);
    enemies[4].SetSpawn(4894, 611);
    enemies[5].SetSpawn(4964, 611);
    enemies[6].SetSpawn(5748, 611);
    enemies[7].SetSpawn(5825, 611);
    enemies[8].SetSpawn(6252, 611);
    enemies[9].SetSpawn(6322, 611);
    enemies[10].SetSpawn(6448, 611);
    enemies[11].SetSpawn(6532, 611);
    enemies[12].SetSpawn(8758, 611);
    enemies[13].SetSpawn(8842, 611);

    // Event Listeners
    onkeydown = onkeyup = (key) => {
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
    Util.EndLevel(9970, new Audio("Assets/Sound/Global/StageClear.wav"));
    player.Animate(player.size, player.animationStatus);
    enemies[0].Animate("moving"); // Temporary solution to animation

    // Test collision, before adding collsion map.
    if(player.size == "small" && player.y >= 611 && i > 0)
    {
        isOnGround = true;
        mirrorImage ? player.animationStatus = "idle_mirrored" : player.animationStatus = "idle";
    }

    else if(player.size == "large" && player.y >= 570 && i > 0)
    {
        isOnGround = true;
        mirrorImage ? player.animationStatus = "idle_mirrored" : player.animationStatus = "idle";
    }

    // console.log(`Player Position: (${player.x}, ${player.y})`);
    // Animate the character sprites
    frameCounter++;
    if(frameCounter % 5 == 0) { count++; enemyCount++; } // Increment the current image to draw every 5 frames
    if(count > 7) count = 4;
    if(enemyCount > 1) enemyCount = 0;
}