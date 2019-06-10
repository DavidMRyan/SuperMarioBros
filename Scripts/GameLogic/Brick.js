var brickBlock = document.getElementById("brick_block"),
    itemBlock = [document.getElementById("item_block00"), 
                 document.getElementById("item_block01"),
                 document.getElementById("item_block02"),
                 document.getElementById("item_block03")
    ];

class Brick
{
    constructor(type, x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type; // Types: Collision, Brick, Item
        this.containsCoin = false;

        this.left = this.x;
        this.top = this.y;
        this.right = this.x + this.width;
        this.bottom = this.y + this.height;

        this.getHeight = () => { return this.bottom - this.top; }
        this.getWidth = () => { return this.right - this.left; }
    }

    SpawnBlock()
    {
        c.beginPath();
        switch(this.type)
        {
            case "collision":
                c.fillStyle = "grey"; // For Debugging position.
                c.fillRect(this.x, this.y, this.width, this.height);
                break;
            
            case "brick": c.drawImage(brickBlock, this.x, this.y, brickBlock.width, brickBlock.height); break;
            case "item": c.drawImage(itemBlock[0], this.x, this.y, 16 * 3.14, 16 * 3.14); break;
        }
        c.closePath();
    }
}