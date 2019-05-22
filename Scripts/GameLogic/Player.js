class Player
{
    constructor()
    {
        this.x = canvas.width / 2;
        this.y = canvas.height - 230;
        this.speed = 7;
        this.size = "small";
    }

    /**
     * Draws the player onto the canvas using a specified image file
     * @param image - The image of the player to be used as the character sprite
     * @param isMirrored - Boolean value indicating whether or not the image is supposed to be mirrored horizontally.
     */
    Draw(image, isMirrored)
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
        if(isMirrored) 
        {
            mat.SetTranslation(mat.dx + image.width / 2, mat.dy + image.height / 2);
            mat.SetScale(-mat.m11, mat.m22);
            c.setTransform(mat.m11, mat.m12, mat.m21, mat.m22, mat.dx, mat.dy);
            c.drawImage(image, -this.x, this.y - image.height / 2, image.width * 1.3, image.height * 1.3);
            c.setTransform(canvasMatrix.m11, canvasMatrix.m12, canvasMatrix.m21, canvasMatrix.m22,
                canvasMatrix.dx, canvasMatrix.dy);
        }

        else
        {
            mat.SetScale(mat.m11, mat.m22); 
            c.setTransform(mat.m11, mat.m12, mat.m21, mat.m22, mat.dx, mat.dy);
            c.drawImage(image, this.x - image.width / 2, this.y, image.width * 1.3, image.height * 1.3);
            c.setTransform(canvasMatrix.m11, canvasMatrix.m12, canvasMatrix.m21, canvasMatrix.m22,
                canvasMatrix.dx, canvasMatrix.dy);
        }

        c.closePath();
        c.restore();

        // console.log(`Player Position: (${this.x},${this.y})`); // Debug the character's position
        // console.log(`Mirror Status: ${isMirrored}`); // Debug the boolean value of argument 'isMirrored'
    }

    /**
     * Handles the player animation in this function in order to keep the main file clean.
     */
    Animate()
    {
        if(isIdle && !mirrorImage) this.size == "small" ? player.Draw(images[0][0], false) : player.Draw(images[1][0], false);
        else if(isIdle && mirrorImage) this.size == "small" ? player.Draw(images[0][0], true) : player.Draw(images[1][0], true);
        else if(!isIdle && !mirrorImage) this.size == "small" ? player.Draw(images[0][count], false) : player.Draw(images[1][count], false);
        else if(!isIdle && mirrorImage) this.size == "small" ? player.Draw(images[0][count], true) : player.Draw(images[1][count], true); 
        else console.log("An error has occured in drawing the player sprite!");
    }

    /**
     * Moves the player in the specified direction
     * Change the amount it moves by editing the 'Player.speed' variable in the constructor function
     * @param direction - The direction of the player to be moved in
     */
    Move(direction)
    {
        switch(direction)
        {
            case "LEFT":    this.x -= this.speed;   break;
            case "RIGHT":   this.x += this.speed;   break;
        }
    }

    /**
     * Handles the player jumping, using proper gravity and velocity
     * Still WIP as of 5/14/2019
     * TODO: Finish this
     */
    Jump()
    {
        this.y += velocity * deltaTime;
        velocity += gravity * deltaTime;
    }

    /**
     * Mutator function, to change the player 'size' to either 'small' or 'large'
     * allowing the program to decide which character sprites to use
     * @param newSize - The new size for the character to be drawn at
     */
    SetSize(newSize) { (newSize == "small" || newSize == "large") ? this.size = newSize : null; }

    /**
     * Accessor function to return the current size of the player
     */
    GetSize() { return this.size; }
}