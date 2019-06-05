var logo = document.getElementById("menu_logo");
var mushroom = {image: document.getElementById("mushroom"), x: (canvas.width / 2) - 200, y: 522, max: 522, min: 0};
var isPlaying = false, animationFrameID = 0;
const ENTER = 13, UP_ARROW = 38, DOWN_ARROW = 40;

function MainMenu()
{
    DrawMainMenu();
    console.log(`(${mushroom.x}, ${mushroom.y})`);
    window.addEventListener("keydown", (key) => {
        switch(key.keyCode)
        {
            case ENTER: 
                if(!isPlaying) { isPlaying = true; Main(); }
                break;

            case UP_ARROW:
                if(mushroom.y >= mushroom.max) mushroom.y = mushroom.max;
                else mushroom.y -= 100;
                break;

            case DOWN_ARROW:
                if(mushroom.y <= mushroom.min) mushroom.y = mushroom.min;
                else mushroom.y += 100;
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
        c.beginPath();
        c.fillStyle = "white";
        c.font = "24pt Arial";

        c.fillText("MARIO", 50, 50);
        c.fillText("x00", 350, 50);
        c.fillText("WORLD 1-1", 550, 50);
        c.fillText("TIME", 900, 50);

        c.drawImage(logo, (canvas.width / 2) - (logo.width / 2), 75, logo.width, logo.height);
        c.fillText("By David Ryan", 525, 350);

        c.fillText("Click [Enter] To Begin!", (canvas.width / 2) - 150, 550);
        c.fillText("Quit", (canvas.width / 2) - 40, 650);
        c.drawImage(mushroom.image, mushroom.x, mushroom.y, mushroom.image.width, mushroom.image.height);
        c.closePath();
    }
    else
        cancelAnimationFrame(animationFrameID);
}