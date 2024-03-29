class GraphEditor {
    constructor(viewport, graph) {
       this.viewport = viewport;
       this.canvas = viewport.canvas;
       this.graph = graph;
 
       this.ctx = this.canvas.getContext("2d");
 
       this.selected = null;
       this.hovered = null;
       this.dragging = false;
       this.mouse = null;
    }

    enable() {
        this.#addEventListeners();
    }

    disable(){
        this.#removeEventListeners();
        this.selected = false;
        this.hovered = false;
    }

    #addEventListeners() {

        this.boundMouseDown = this.#handleMouseDown.bind(this);
        this.boundMouseMove = this.#handleMouseMove.bind(this);
        this.boundMouseUp = () => this.dragging = false;
        this.boundContextMenu = (e) => e.preventDefault();

        //La función bind sirve para referenciar el mismo objeto(GraphEditor) al pasarse por un método
        this.canvas.addEventListener("mousedown", this.boundMouseDown);
        //Colorea el punto cuanto pasas por encima
        this.canvas.addEventListener("mousemove", this.boundMouseMove);
        //Evita abrir una ventana con el click derecho
        this.canvas.addEventListener("contextmenu", this.boundContextMenu);
        this.canvas.addEventListener("mouseup", this.boundMouseUp);
    }

    #removeEventListeners() {
        this.canvas.removeEventListener("mousedown", this.boundMouseDown);
        this.canvas.removeEventListener("mousemove", this.boundMouseMove);
        this.canvas.removeEventListener("contextmenu", this.boundContextMenu);
        this.canvas.removeEventListener("mouseup", this.boundMouseUp);
    }

    #handleMouseDown(e) {
        if(e.button == 2){ //Click derecho
            //Elimino el punto seleccionado
            if(this.selected){
                this.selected = null;
            } else if(this.hovered){
                this.#removePoint(this.hovered);
            }
        }
        if(e.button == 0){ //Click Izquierdo
            //Creo nuevos puntos
            if(this.hovered){
                this.#select(this.hovered);
                //this.selected = this.hovered;
                this.dragging = true;
                return;
            }
            this.graph.addPoint(this.mouse);
            this.#select(this.mouse)
            //this.selected = this.mouse;
            this.hovered = this.mouse;
        }
    }

    #handleMouseMove(e){
        this.mouse = this.viewport.getMouse(e, true);
        this.hovered = getNearestPoint(this.mouse, this.graph.points, 10 * this.viewport.zoom);
        //Mueve el punto seleccionado
        if(this.dragging == true) {
            this.selected.x = this.mouse.x;
            this.selected.y = this.mouse.y;
        }
    }

    //Colocar segmentos del mouse
    #select(point) {
        if(this.selected) {
            this.graph.tryAddSegment(new Segment(this.selected, point));
        }
        this.selected = point;
    }

    //Se implementa para remover el punto del canvas
    #removePoint(point){
        this.graph.removePoint(point);
        this.hovered = null;
        if(this.selected == point){
            this.selected = null;
        }
    }

    dispose(){
        this.graph.dispose();
        this.selected = null;
        this.hovered = null;
    }

    display() {
        this.graph.draw(this.ctx);
        if(this.hovered) {
            this.hovered.draw(this.ctx, { fill: true});
        }
        if(this.selected) {
            const intent = this.hovered ? this.hovered : this.mouse;
            new Segment(this.selected, intent).draw(ctx, { dash: [3,3]});
            this.selected.draw(this.ctx, { outline: true});
        }
     }

}