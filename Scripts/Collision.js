var data;

class Collision
{
    /**
     * Returns the bytes from the specified file, for use in the collision map.
     * @param file - The file to get the bytes from
     */
    static GetImageBytes(file)
    {
        let image = {width: document.getElementById(file).width, height: document.getElementById(file).height};
        let rect = {x: 0, y: 0, width: image.width, height: image.height};
        let imageData = c.getImageData(rect.x, rect.y, rect.width, rect.height);
        // let biWidth = imageData.getUint32(18, true);
        // let biBitCount = imageData.getUint16(28, true);
        // let stride = Math.abs(Math.floor((biBitCount * biWidth + 31) / 32) * 4);
        let stride = 1;
        let result = [];

        for(let col = 0; col < image.width; ++col)
        {
            result[col] = [];
            for(let row = 0; row < image.height; ++row)
            {
                let currentColor = imageData[row * stride / 4 + col];
                let color = {r: 0, g: 0, b: 0, a: 0};

                color.r = (currentColor & 0xff0000) >> 16;
                color.g = (currentColor & 0xff00) >> 8;
                color.b = currentColor & 0xff;
                color.a = (currentColor & 0xff000000) >> 24;
                result[col][row] = color;
            }
        }

        return result;
    }

    static InitializeCollisionMap(collisionMap) { data = Collision.GetImageBytes(collisionMap); }
}