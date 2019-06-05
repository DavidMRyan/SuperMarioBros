class HUD
{
    static DrawHUD()
    {
        c.beginPath();
        c.fillStyle = "white";
        c.font = "24pt Super Plumber Brothers";

        c.fillText("MARIO", 50, 50);
        c.fillText("x00", 350, 50);
        c.fillText("WORLD 1-1", 550, 50);
        c.fillText("TIME", 900, 50);
        c.closePath();
    }
}