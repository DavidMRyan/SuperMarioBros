class Interval
{
    constructor() { this.ID = ""; }
    StartInterval(func, fps) { this.ID = window.setInterval(func, 1000 / fps); }
    StopInterval() { window.clearInterval(this.ID); }
}