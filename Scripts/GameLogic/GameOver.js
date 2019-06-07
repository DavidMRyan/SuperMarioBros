class GameOver
{
    static SplashScreen()
    {
        c.save();
        c.beginPath();

        // Temporary Matrix
        var mat = new Matrix3x2(canvasMatrix.m11, canvasMatrix.m12, canvasMatrix.m21, canvasMatrix.m22,
            canvasMatrix.dx, canvasMatrix.dy);

        /** 
         * Creates a temporary matrix representing the current canvas matrix
         * and change the scale and translation to mirror the image
         */
        mat.SetScale(mat.m11, mat.m22); 
        c.setTransform(mat.m11, mat.m12, mat.m21, mat.m22, mat.dx, mat.dy);

        c.fillStyle = "black";
        c.fillRect(-canvasMatrix.dx, canvasMatrix.dy, canvas.width, canvas.height);
        c.font = "24pt Press Start";
        c.fillStyle = "white";
    
        if(player.lives > 0) 
        {
            c.drawImage(images[0][0], -canvasMatrix.dx + (canvas.width / 2) - 50, canvasMatrix.dy + (canvas.height / 2) - 8);
            c.fillText(`x ${player.lives}`, -canvasMatrix.dx + (canvas.width / 2), canvasMatrix.dy + (canvas.height / 2) + 20);
        }

        else 
        {
            c.fillText("Game Over", -canvasMatrix.dx + (canvas.width / 2) - 85, canvasMatrix.dy + (canvas.height / 2) + 20);
            Sound.PlayFX("GameOver");
        }
            
        HUD.DrawHUD();

        c.setTransform(canvasMatrix.m11, canvasMatrix.m12, canvasMatrix.m21, canvasMatrix.m22,
            canvasMatrix.dx, canvasMatrix.dy);

        c.closePath();
        c.restore();
    }

    static Quit()
    {
        requestAnimationFrame(GameOver.Quit);
        c.beginPath();
        c.fillStyle = "rgb(0, 0, 0)";
        c.fillRect(0, 0, canvas.width, canvas.height);
        c.fillStyle = "rgb(255, 255, 255)";
        c.font = "24pt Press Start";
        c.fillText("Thanks for Playing!", canvas.width / 2 - 170, canvas.height / 2);
        c.closePath();
    }
}