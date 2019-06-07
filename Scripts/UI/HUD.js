class HUD
{
    static DrawHUD()
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

        c.fillStyle = "white";
        c.font = "24pt Press Start";
        c.fillText("MARIO", -(canvasMatrix.dx - 50), canvasMatrix.dy + 50); // 50, 50
        c.fillText("x00", -(canvasMatrix.dx - 350), canvasMatrix.dy + 50); // 350, 50
        c.fillText("WORLD 1-1", -(canvasMatrix.dx - 550), canvasMatrix.dy + 50); // 550, 50
        c.fillText("TIME", -(canvasMatrix.dx - 900), canvasMatrix.dy + 50); // 900, 50

        c.setTransform(canvasMatrix.m11, canvasMatrix.m12, canvasMatrix.m21, canvasMatrix.m22,
            canvasMatrix.dx, canvasMatrix.dy);

        c.closePath();
        c.restore();
    }
}