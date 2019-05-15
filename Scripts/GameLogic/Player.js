class Player
{
    constructor()
    {
        this.x = canvas.width / 2;
        this.y = canvas.height - 72;
        this.speed = 7;
        this.size = "small";
    }

    /**
     * Draws the player onto the canvas using a specified image file
     * @param image - The image of the player to be used as the character sprite
     * @param x - The X position of the image
     * @param y - The Y position of the image
     */
    Draw(image)
    {
        c.beginPath();
        c.drawImage(image, this.x, this.y, image.width, image.height);
        c.closePath();

        console.log(`(${this.x},${this.y})`); // Debug the character's position
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
     * STILL WIP as of 5/14/2019
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