app.factory('MatrizAdjacenciaService', function () {

    function MatrizAdjacencia() {

        this.matriz = [];
        this.arestaHash = {};
        this.escala = 0;
        this.id = "";
        this.vertices = 0;
        this.arestas = 0;
        this.x = 0;
        this.y = 0;

        this.criar = function criar(vertices,arestas) {

            this.vertices = vertices;
            this.arestas = arestas;

            for (i in this.arestas) {
                var id = this.arestas[i].source + "-" + this.arestas[i].target;
                this.arestaHash[id] = this.arestas[i];
            }

            for (a in this.vertices) {
                for (b in this.vertices) {
                    var grade = {id: this.vertices[a].id + "-" + this.vertices[b].id, x: b, y: a, weight: 0};
                    if (this.arestaHash[grade.id]) {
                        grade.weight = this.arestaHash[grade.id].weight;
                    }
                    this.matriz.push(grade);
                }
            }

            d3.select("svg")
                .append("g")
                .attr("transform", "translate(50,50)")
                .attr("id", "matriz")
                .selectAll("rect")
                .data(this.matriz)
                .enter()
                .append("rect")
                .attr("width", 25)
                .attr("height", 25)
                .attr("x", function (d) {return d.x * 25})
                .attr("y", function (d) {return d.y * 25})
                .style("stroke", "black")
                .style("stroke-width", "1px")
                .style("fill", "red")
                .style("fill-opacity", function (a) {
                    return parseInt(a.weight) * .2
                }).on("mouseover", gridOver);

            this.escala = vertices.length * 25;
            this.id = d3.scale.ordinal().domain(this.vertices.map(function (el) {return el.id})).rangePoints([0,this.escala],1);
            this.x = d3.svg.axis().scale(this.id).orient("top").tickSize(4);
            this.y = d3.svg.axis().scale(this.id).orient("left").tickSize(4);
            d3.select("#matriz").append("g").call(this.x).selectAll("text").style("text-anchor", "end").attr("transform", "translate(-10,-10) rotate(90)");
            d3.select("#matriz").append("g").call(this.y);

            function gridOver(d,i) {
                d3.selectAll("rect").style("stroke-width", function (p) {return p.x == d.x || p.y == d.y ? "3px" : "1px"});
            }
        };
    }

    return MatrizAdjacencia;
});
