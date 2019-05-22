class Matrix3x2
{
    constructor(m11, m12, m21, m22, dx, dy)
    {
        this.m11 = m11;
        this.m12 = m12;
        this.m21 = m21;
        this.m22 = m22;
        this.dx = dx;
        this.dy = dy;
    }

    // Mutator Functions
    SetScale(m11, m22) { this.m11 = m11; this.m22 = m22; }
    SetTranslation(dx, dy) { this.dx = dx; this.dy = dy; }
    SetTransform(m11, m12, m21, m22, dx, dy)
    {
        this.m11 = m11;
        this.m12 = m12;
        this.m21 = m21;
        this.m22 = m22;
        this.dx = dx;
        this.dy = dy;
    }

    // Accessor Functions
    GetScale() { return {x: this.m11, y: this.m22}; }
    GetTranslation() { return {x: this.dx, y: this.dy}; }
    GetTransform() 
    { 
        return [this.m11, this.m12,
                this.m21, this.m22,
                this.dx, this.dy];
    }
}

var matrixIdentity = new Matrix3x2(1, 0, 0, 1, 0, 0);