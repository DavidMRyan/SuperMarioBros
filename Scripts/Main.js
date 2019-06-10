/*
    Author: David Ryan
    Period: 7
    Computer Science 2
    Due Date: June 7th, 2019
    Version: 1.0
    [Note: All assets are owned by Nintendo, no copyright infringement was intended.]
*/
var Game = new Interval();
var player = new Player(), count = 4, frameCounter = 0,
    isIdle = true, mirrorImage = false,
    isJumping = false, isFalling = false,
    isOnGround = true, isDead = false;
var enemies = [], enemyImages = [], enemyCount = 0;
var canvasMatrix = matrixIdentity;
var keyMap = [], sounds = [];
const A = 65, D = 68, SPACE = 32;
var blocks = [
    // Ground
    new Brick("collision", 0, 652.25, 3467.75, 611),
    new Brick("collision", 3566.3, 652.25, 755, 611),
    new Brick("collision", 4471, 652.25, 3216.9, 611),
    new Brick("collision", 7786.5, 652.25, 3465, 611),

    // Pipes
    new Brick("collision", 1400, 550, 113, 110),
    new Brick("collision", 1902, 500, 113, 180),
    new Brick("collision", 2305, 450, 113, 210),
    new Brick("collision", 2857, 450, 113, 210),
    new Brick("collision", 8183, 550, 113, 110),
    new Brick("collision", 8987, 550, 113, 110),
];

/**
 * Initializes some things before calling GameLoop or starting the main menu
 */
function Main()
{
    Game.StartInterval("GameLoop()", 60);

    // Game Setup
    Player.InitializeImageArray();
    AI.InitializeAIArray(14);
    Sound.PlayMusic("1-1", true);
    player.SetSize("small");
    player.size == "small" ? player.SetSpawn(512, 611) : player.SetSpawn(512, 570);

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
        
        // TODO: Add multiple keypresses
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
            if(!isDead)
            {
                player.Move("LEFT");
                isIdle = false;
                mirrorImage = true;
                player.animationStatus = "moving_mirrored"; 
            }
        }

        if(keyMap[D])
        {
            if(!isDead)
            {
                player.Move("RIGHT");
                isIdle = false;
                mirrorImage = false;
                player.animationStatus = "moving";
            }  
        }

        if(keyMap[SPACE])
        {
            if(!isDead)
            {
                isOnGround = false;
                player.velocity.y = -14.0;
                player.size == "small" ? Sound.PlayFX("Jump_Small") : Sound.PlayFX("Jump_Large");
                player.Jump();
                mirrorImage ? player.animationStatus = "jumping_mirrored" : player.animationStatus = "jumping";
            }
        }
    }

    // Debug the keys being pressed
    // for(let i = 0; i < keyMap.length; i++)
    //     console.log(`Keys Being Pressed ${keyMap[i]}`);

    window.addEventListener("keyup", (key) => {
        if(!isDead)
        {
            isIdle = true;
            if(isOnGround)
                mirrorImage ? player.animationStatus = "idle_mirrored" : player.animationStatus = "idle";
        } 
    });
}

/**
 * Runs the game portion of the program
 */
function GameLoop()
{
    Background.Draw();
    HUD.DrawHUD();
    Util.EndLevel(9970, new Audio("Assets/Sound/Global/StageClear.wav"));
    player.Animate(player.size, player.animationStatus);
    enemies[0].Animate("moving");

    // World Collision
    Collision.HandlePlayerCollision();

    // AI Collision
    for(let i = 0; i < enemies.length; i++)
    {
        if(player.size == "small" && player.x >= enemies[i].x - 30 && player.x <= (enemies[i].x + AI.GetImageArray("goomba")[0].width) + 3
                && player.y >= enemies[i].y && player.y <= enemies[i].y + AI.GetImageArray("goomba")[0].height)
            {
                if(!isDead)
                {
                    player.Death();
                    isDead = true;
                    // console.log("Player -> AI collision detected!");
                }   
            }
    }

    // Update Player Information
    player.left = player.x;
    player.top = player.y;
    player.bottom = player.y + player.height;
    player.right = player.x + player.width;
    // console.log(`Player Position: (${player.x}, ${player.y})`);

    // Animate the character sprites
    frameCounter++;
    if(frameCounter % 5 == 0) count++; // Increment the current image to draw every 5 frames
    if(frameCounter % 10 == 0) enemyCount++;
    if(count > 7) count = 4;
    if(enemyCount > 1) enemyCount = 0;
}