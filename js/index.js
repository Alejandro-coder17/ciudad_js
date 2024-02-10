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

myCanvas.width = 600;
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
const graphEditor = new GraphEditor(viewport, graph);

animate();

function animate() {
    viewport.reset();
    world.generate();
    world.draw(ctx);
    ctx.globalAlpha = 0.3;
    graphEditor.display();
    requestAnimationFrame(animate);
}

function dispose() {
    graphEditor.dispose();
}

function save() {
    localStorage.setItem("graph", JSON.stringify(graph));
}