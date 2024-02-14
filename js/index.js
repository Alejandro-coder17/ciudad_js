/*function removeAll(){
    graph.dispose();
    ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
    graph.draw(ctx);
}

function removeRandomPoints(){
    if(graph.points.length == 0){
        console.log("No points");
        return;
    }
    const index = Math.floor(Math.random() * graph.points.length);
    graph.removePoint(graph.points[index]);
    ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
    graph.draw(ctx);
}

function removeRandomSegment() {
    if(graph.segments.length == 0) {
        console.log("No segments");
        return;
    }
    const index = Math.floor(Math.random() * graph.segments.length);
    graph.removeSegment(graph.segments[index]);
    ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
    graph.draw(ctx);
}

function addRandomSegment(){
    if(graph.points.length <= 1){
        console.log("No points");
        return;
    }
    const index1 = Math.floor(Math.random() *graph.points.length);
    const index2 = Math.floor(Math.random() *graph.points.length);
    const success =  graph.tryAddSegment(
        new Segment(graph.points[index1], graph.points[index2])
    );
    ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
    graph.draw(ctx);
    console.log(success);
}

function addRandomPoint(){
    const success = graph.tryAddPoint(
        new Point(
            Math.random() * myCanvas.width,
            Math.random() * myCanvas.height
        )
    )
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    graph.draw(ctx);
    //console.log(success);
}*/

myCanvas.width = 1200;
myCanvas.height = 600;

const ctx = myCanvas.getContext("2d");

/*const p1 = new Point(200, 200);
const p2 = new Point(500, 200);
const p3 = new Point(400, 400);
const p4 = new Point(100, 300);

const s1 = new Segment(p1, p2);
const s2 = new Segment(p1, p3);
const s3 = new Segment(p1, p4);
const s4 = new Segment(p2, p3);*/

const graphString = localStorage.getItem("graph");
const graphInfo = graphString ? JSON.parse(graphString) : null;
const graph = graphInfo ? 
            Graph.load(graphInfo)
            : new Graph();
const world = new World(graph);
const viewport = new Viewport(myCanvas);
const tools = {
    graph: { button: graphBtn, editor: new GraphEditor(viewport, graph) },
    stop: { button: stopBtn, editor: new StopEditor(viewport, world) },
    crossing: { button: crossingBtn, editor: new CrossingEditor(viewport, world) },
    start: { button: startBtn, editor: new StartEditor(viewport, world) },
    light: { button: lightBtn, editor: new LightEditor(viewport, world) },
    target: { button: targetBtn, editor: new TargetEditor(viewport, world) },
    
 };

let oldGraphHash = graph.hash();

setMode("graph");

animate();

function animate() {
    viewport.reset();
    if(graph.hash() != oldGraphHash){
        world.generate();
        oldGraphHash = graph.hash();
    }
    const viewPoint = scale(viewport.getOffset(), -1);
    world.draw(ctx, viewPoint);
    ctx.globalAlpha = 0.3;
    for(const tool of Object.values(tools)){
        tool.editor.display();
    }
    
    requestAnimationFrame(animate);
}

function dispose() {
    tools['graph'].editor.dispose();
    world.markings.length = 0;
}

function save() {
    localStorage.setItem("graph", JSON.stringify(graph));
}

function setMode(mode){
    dissableEditors();
    tools[mode].button.style.backgroundColor = "white";
    tools[mode].button.style.filter = "";
    tools[mode].editor.enable();
}

function dissableEditors(){
    for(const tool of Object.values(tools)){
        tool.button.style.backgroundColor = "gray";
        tool.button.style.filter = "grayscale(100%)";
    
        tool.editor.disable();
    }

}