// var data;

class Collision
{
    // I wanted to use a collision map, but Web Browsers don't have a ton of support for retrieving 
    // and manipulating image data, so I will just manually map all collision points for this level.
    /**
     * Returns the bytes from the specified file, for use in the collision map.
     * @param file - The file to get the bytes from
     */
    // static GetImageBytes(file)
    // {
        // let image = {width: document.getElementById(file).width, height: document.getElementById(file).height};
        // let rect = {x: 1, y: 1, width: image.width, height: image.height};
        // let image2 = c.getImageData(rect.x, rect.y, rect.width, rect.height);
        // let data = image2.data;
        // let biWidth = imageData.getUint32(18, true);
        // let biBitCount = imageData.getUint16(28, true);
        // let stride = Math.abs(Math.floor((biBitCount * biWidth + 31) / 32) * 4);
        // let stride = 1;
        // let result = [];
        // result[0] = [];

        // result[0][0] = 'rgba(' + data[0] + ', ' + data[1] + ', ' + data[2] + ', ' + (data[3] / 255) + ')';
        // console.log(result[0][0]);

        // for(let col = 0; col < image.width; ++col)
        // {
        //     result[col] = [];
        //     for(let row = 0; row < image.height; ++row)
        //     {
        //         let currentColor = imageData;
        //         let color = {r: 0, g: 0, b: 0, a: 0};

        //         color.r = (currentColor); /* & 0xff0000) >> 16;*/
        //         color.g = (currentColor); /* & 0xff00) >> 8; */
        //         color.b = currentColor; /* & 0xff; */
        //         color.a = (currentColor); /* & 0xff000000) >> 24;*/
        //         result[col][row] = color;
        //     }
        // }

        // return result;
    // }
    // 
    // static InitializeCollisionMap(collisionMap) { Collision.GetImageBytes(collisionMap); }

    static HandlePlayerCollision()
    {
        let anyIntersection = false;
        let anyIsStuck = false;
        let indexInter = 0;
        let indexStuck = 0;
 
        for(let block = 0; block < blocks.length; block++)
        {
            // blocks[block].SpawnBlock();
 
            if(player.intersects2(blocks[block]))
            {
                anyIntersection = true;
                indexInter = block;
                break;
            }
        }
 
        for(let block = 0; block < blocks.length; block++)
        {
            // blocks[block].SpawnBlock();
 
            if(player.isStuck(blocks[block]))
            {
                anyIsStuck = true;
                indexStuck = block;
                break;
            }
        }
 
        if(anyIsStuck) player.y -= 1;
        if(anyIntersection)
        {
            isFalling = false;
            isOnGround = true;
            mirrorImage ? player.animationStatus = "idle_mirrored" : player.animationStatus = "idle";
            player.velocity.y = 0;
            player.bottom = blocks[indexInter].y;
        }
 
        else if (true)
        {  
            isFalling = true;
            isOnGround = false;
            // player.y += 4;
        }
        console.log(`Any Intersection: ${anyIntersection}\nisOnGround: ${isOnGround}\nisFalling: ${isFalling}`);
    }
}