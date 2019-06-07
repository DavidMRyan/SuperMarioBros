let i = 0;

class Player
{
    constructor()
    {
        this.size = "small";
        this.x = canvas.width / 2;
        this.size == "small" ? this.y = 611 : this.y = 570;
        this.animationStatus = "idle";
        this.speed = 7;
        this.velocity = {x: 0.0, y: 0.0};
        this.lives = 5;
        this.width = 26;
        this.height = 32;

        this.left = this.x;
        this.top = this.y;
        this.bottom = this.y + this.height;
        this.right = this.x + this.width;

        this.collides = (value) => {
            // console.log(value.x + " " + this.right);
            return value.x <= this.right && this.x <= value.right
                && value.y <= this.bottom && this.y <= value.bottom;
        }
    }

    /**
	 * Initializes the two dimensional array, containing the character's sprites
	 * images[0] - Array of small character sprites
	 * images[1] - Array of large character sprites
	 */
	static InitializeImageArray()
	{
		images[0] = []; // Small Mario Images
		images[1] = []; // Large Mario Images
		smallMario = document.getElementById("small_mario").children;
		largeMario = document.getElementById("large_mario").children;

		// Initialize the Small Mario Images
		for(let i = 0; i < smallMario.length; i++)
			images[0][i] = smallMario[i];

		// Initialize the Large Mario Images
		for(let j = 0; j < largeMario.length; j++)
            images[1][j] = largeMario[j];
            
        // this.width = images[0][0].width;
        // this.size == "small" ? this.height = images[0][0].height : this.height = images[1][0].height;
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
     * @param size - The size of the player's sprite to be drawn at. Options are "small" (or 0) and "large" (or 1)
     * @param status - The animation status of the player. Options are "idle", "moving", "jumping",
     *      "idle_mirrored", "moving_mirrored", and "jumping_mirrored"
     */
    Animate(size, status)
    {
        switch(size)
        {
            case "small": case 0:
                switch(status)
                {
                    case "dead": player.Draw(document.getElementById("MarioDead"), false); break; 
                    case "idle": player.Draw(images[0][0], false); break;
                    case "moving": player.Draw(images[0][count], false); break;
                    case "jumping": player.Draw(images[0][3], false); break;
                    case "idle_mirrored": player.Draw(images[0][0], true); break;
                    case "moving_mirrored": player.Draw(images[0][count], true); break;
                    case "jumping_mirrored": player.Draw(images[0][3], true); break;           
                }
                break;

            case "large": case 1:
                switch(status)
                {
                    case "dead": player.Draw(document.getElementById("MarioDead"), false); break;  
                    case "idle": player.Draw(images[1][0], false); break;
                    case "moving": player.Draw(images[1][count], false); break;    
                    case "jumping":player.Draw(images[1][3], false); break;
                    case "idle_mirrored": player.Draw(images[1][0], true); break;
                    case "moving_mirrored": player.Draw(images[1][count], true); break;
                    case "jumping_mirrored": player.Draw(images[1][3], true); break; 
                }
                break;

            default: console.log("An error has occured in drawing the player sprite!")
        }
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
            case "LEFT": 
                this.x -= this.speed;
                this.left = this.x;
                this.top = this.y;
                this.bottom = this.y + this.height;
                this.right = this.x + this.width;
                break;

            case "RIGHT": 
                this.x += this.speed;
                this.left = this.x;
                this.top = this.y;
                this.bottom = this.y + this.height;
                this.right = this.x + this.width;
                break;
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

    Death()
    {
        isDead = true;
        this.lives--;
        player.animationStatus = "dead";
        Sound.StopMusic();
        Sound.PlayFX("Dead");
        Util.Sleep(3000).then(() => { 
            Game.StopInterval();
            GameOver.SplashScreen();

            if(player.lives > 0)
            {
                Util.Sleep(2000).then(() => {
                    player.animationStatus = "idle";
                    player.size == "small" ? player.SetSpawn(512, 611) : player.SetSpawn(512, 570);
                    isDead = false;
                    Main();
                });
            }
        });
        // console.log("The player has died!");
    }

    /**
     * Sets the spawn position of the player in the world
     * @param x - The X value of the spawn position
     * @param y - The Y value of the spawn position
     */
    SetSpawn(x, y)
    {
        this.x = x;
        this.y = y;
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

    /**
     * Accessor function which returns a new object containing the X and Y position of the Player
     */
    GetPosition() { return {x: this.x, y: this.y}; }
}