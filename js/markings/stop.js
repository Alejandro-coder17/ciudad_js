class Stop extends Marking{
    constructor(center, directionVector, width, height) {
        
        super(center, directionVector, width, height);

        this.border = this.poly.segments[2];
        this.type = "stop";
    }

    draw(ctx){
        this.border.draw(ctx, { width: 5, color: "white" });
        //this.poly.draw(ctx);
        ctx.save();
        ctx.translate(this.center.x, this.center.y);
        ctx.rotate(angle(this.directionVector) - Math.PI / 2);
        ctx.scale(1, 2);

        ctx.beginPath();
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.font = "bold "+this.height * 0.3 + "px Arial";
        ctx.fillText("STOP", 0, 0);

        ctx.restore();
    }
}