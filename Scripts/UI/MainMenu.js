var logo = document.getElementById("menu_logo");
var mushroom = {image: document.getElementById("mushroom"), x: (canvas.width / 2) - 235, y: 522};
var isPlaying = false, animationFrameID = 0;
const ENTER = 13, UP_ARROW = 38, DOWN_ARROW = 40;

function MainMenu()
{
    DrawMainMenu();
    window.addEventListener("keydown", (key) => {
        switch(key.keyCode)
        {
            case ENTER: 
                if(mushroom.y == 522 && !isPlaying) { isPlaying = true; Main(); }
                else if(mushroom.y == 615 && !isPlaying) GameOver.Quit();
                break;

            case UP_ARROW:
                mushroom.x = (canvas.width / 2) - 235;
                mushroom.y = 522;
                break;

            case DOWN_ARROW:
                mushroom.x = (canvas.width / 2) - 100;
                mushroom.y = 615;
                break;
        }
    });   
}

function DrawMainMenu()
{
    if(!isPlaying)
    {
        animationFrameID = requestAnimationFrame(DrawMainMenu);
        Background.Draw();
        
        c.fillStyle = "white";
        c.font = "24pt Arial";
        c.drawImage(logo, (canvas.width / 2) - (logo.width / 2), 75, logo.width, logo.height);
        c.fillText("By David Ryan", 525, 350);
        c.fillText("Press [Enter] To Begin!", (canvas.width / 2) - 185, 550);
        c.fillText("Quit", (canvas.width / 2) - 50, 640);
        c.drawImage(mushroom.image, mushroom.x, mushroom.y, mushroom.image.width, mushroom.image.height);
        c.closePath();
    }
    else
        cancelAnimationFrame(animationFrameID);
}