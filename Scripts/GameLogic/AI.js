class AI
{
    constructor()
    {
        // Change later to use collision map's X and Y positions.
        this.x = canvas.width / 2;
        this.y = canvas.height - 230;
        this.animationStatus = "moving";
        this.speed = 7;
        this.velocity = {x: 0.0, y: 0.0};
    }

    /**
     * Initializes the array of enemies to be placed in the world.
     * @param amount - The amount of enemies to be added to the array
     */
    static InitializeAIArray(amount)
    {
        for(let i = 0; i < amount; i++)
            enemies[i] = new AI();
    }

    /**
     * Draws the AI onto the canvas using a specified image file
     * @param image - The image of the AI to be used as the character sprite
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

        // console.log(`Player Position: (${this.x},${this.y})`); // Debug the AI's position
        // console.log(`Mirror Status: ${isMirrored}`); // Debug the boolean value of argument 'isMirrored'
    }

    /**
     * Handles the AI's animation in this function in order to keep the main file clean.
     * @param status - The animation status of the player. Options are "idle", "moving", "jumping",
     *      "idle_mirrored", "moving_mirrored", and "jumping_mirrored"
     */
    Animate(status)
    {
        enemies.forEach(enemy => {
            switch(status)
            {
                case "moving": enemy.Draw(enemyImages[enemyCount], false); break;
                case "moving_mirrored": enemy.Draw(enemyImages[enemyCount], true); break;
                default: console.log("An error has occured in drawing the AI sprite!");
            }
        });
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
     * Asynchronous function to allow the player to jump.
     */
    async Jump()
    {
        if(isJumping) return;
        isJumping = true;
        setTimeout(() => {
            if(i >= 100) { i = 0; return; }
            if(isOnGround && i > 0)
            {
                this.velocity.y = 0;
                i = 0;
                return;
            }

            else
            {
                this.velocity.y += 0.4;
                this.y += this.velocity.y;
                // console.log(`Velocity(${this.velocity.x}, ${this.velocity.y})`); // Debug velocity
            }
            player.Jump();
            i++;
        }, 10);

        isJumping = false;
    }

    /**
     * Initializes an array containing the AI images
     * @param div - The <div> element in the HTML file to check for the images
     */
    static InitializeImageArray(div)
	{
		// Initialize the AI Images
		for(let i = 0; i < document.getElementById(div).children.length; i++)
			enemyImages[i] = document.getElementById(div).children[i];
    }

    static GetImageArray(div) { return document.getElementById(div).children; }

    /**
     * Sets the spawn position of the AI in the world
     * @param x - The X value of the spawn position
     * @param y - The Y value of the spawn position
     */
    SetSpawn(x, y)
    {
        this.x = x;
        this.y = y;
    }

    /**
     * Accessor function which returns a new object containing the X and Y position of the AI
     */
    GetPosition() { return {x: this.x, y: this.y}; }
}