app.service('GrafoService', ['Util','MatrizAdjacenciaService', function (Util,MatrizAdjacenciaService) {

    /**
     * Constroi um grafo á partir de uma lista de nó e conexão
     * @requires Util service, contexto canvas
     * @constructor
     */

    function Grafo(){

        var self = this;

        this.listaDeVertices = [];
        this.listaDeArestas = [];
        this.listaDeCharCode = [];
        this.listaDeEntradas = {};
        this.listaMatriz = [];
        this.modelo = null;
        this.contexto = null;
        this.isCustoAletorio = false;
        this.quantidadeDeNos = 0;

        /**
         * Define lista de vértices
         * @param listaDeVertices
         */
        this.setListaDeVertices = function setListaDeVertices(listaDeVertices){
            this.listaDeVertices = listaDeVertices;
        };

        /**
         * Recupera lista de vértices
         * @return listaDeVertices
         */
        this.getListaDeVertices = function getListaDeVertices(){
            return this.listaDeVertices;
        };

        /**
         * Define lista de arestas
         * @param listaDeArestas
         */
        this.setListaDeArestas = function setListaDeArestas(listaDeArestas){
            this.listaDeArestas = listaDeArestas;
        };

        /**
         * Recupera lista de arestas
         * @return listaDeArestas
         */
        this.getListaDeArestas = function listaDeArestas(){
            return this.listaDeArestas;
        };

        /**
         * Define lista de códigos char
         * @param listaDeArestas
         */
        this.setListaDeCharCode = function setListaDeCharCode(listaDeCharCode){
            this.listaDeCharCode = listaDeCharCode;
        };

        /**
         * Recupera lista de códigos char
         * @return listaDeCharCode
         */
        this.getListaDeCharCode = function getListaDeCharCode(){
            return this.listaDeCharCode;
        };

        /**
         * Define lista de entradas
         * @param listaDeEntradas
         */
        this.setListaDeEntradas = function setListaDeEntradas(listaDeEntradas){
            this.listaDeEntradas = listaDeEntradas;
        };

        /**
         * Recupera lista de entradas
         * @return listaDeEntradas
         */
        this.getListaDeEntradas = function getListaDeEntradas(){
            return this.listaDeEntradas;
        };

        /**
         * Define lista para popular matriz
         * @param listaMatriz
         */
        this.setListaMatriz = function setListaMatriz(listaMatriz){
            this.listaMatriz = listaMatriz;
        };

        /**
         * Recupera lista para popular matriz
         * @return listaMatriz
         */
        this.getListaMatriz = function getListaMatriz(){
            return this.listaMatriz;
        };

        /**
         * Define modelo grafo vindo do controler
         * @param modelo
         */
        this.setModelo = function setModelo(modelo){
            this.modelo = modelo;
        };

        /**
         * Define o modelo grafo vindo do controler
         * @return modelo
         */
        this.getModelo = function getModelo(){
            return this.modelo;
        };

        /**
         * Define a flag de o custo é aleatório
         * @param bool
         */
        this.setCustoAletorio = function setCustoAletorio(bool){
            this.isCustoAletorio = bool;
        };

        /**
         * Recupera á flag de custo
         * @return bool
         */
        this.getCustoAletorio = function getCustoAletorio(){
            return this.isCustoAletorio;
        };

        /**
         * Define o contexto canvas
         * @param contexto
         */
        this.setContexto = function setContexto(contexto){
            this.contexto = contexto;
        };

        /**
         * Recupera o contexto canvas
         * @return contexto
         */
        this.getContexto = function getContexto(){
            return this.contexto;
        };

        /**
         * Define a quantidade de Nodes
         * @param int
         */
        this.setQuantidadeDeNos = function setContexto(quantidadeDeNos){
            this.quantidadeDeNos = quantidadeDeNos;
        };

        /**
         * Recupera a quantidade de Nodes
         * @return int
         */
        this.getQuantidadeDeNos = function getQuantidadeDeNos(){
            return this.quantidadeDeNos;
        };

        /**
         * Obtém o mapeamento da lista de arestas
         * @param G
         * @returns {Array}
         */
        this.getArestas = function getArestas(G) {
            var i, j, arestas = [],
                e;
            var contains = function (a, e) {
                var i;
                for (i = 0; i < a.length; i += 1) {
                    if (a[i].n === e.n && a[i].m === e.m) {
                        return true;
                    }
                    if (a[i].m === e.n && a[i].n === e.m) {
                        return true;
                    }
                }
                return false;
            };

            for (i = 0; i < G.vertices.length; i += 1) {
                for (j = 0; j < G.vertices[i].arestas.length; j += 1) {
                    e = {
                        n: i,
                        m: G.vertices[i].arestas[j]
                    };
                    if (!contains(arestas, {
                            n: i,
                            m: G.vertices[i].arestas[j]
                        })) {
                        arestas.push(e);
                    }
                }
            }
            return arestas;
        };

        /**
         * Método responsável por criar o gráfo
         * @param ctx
         */
        this.criar = function criar(ctx) {

            //Definindo o contexto
            this.setContexto(ctx);

            var i;
            var n, m;
            var origem;
            var destino;
            var custo = this.isCustoAletorio ? Util.fn.gerarConexoesAleatorias(30,10) : 0;
            var arestas = this.getArestas(this.getModelo());
            var vertices = this.getModelo().vertices;

            for (i = 0; i < vertices.length; i += 1) {
                n = vertices[i];
                this.desenharVertices(this.getContexto(), n.x, n.y,i);
            }

            for (i = 0; i < arestas.length; i += 1) {
                n = vertices[arestas[i].n];
                m = vertices[arestas[i].m];

                this.desenharArestas(this.getContexto(), n.x, n.y, m.x, m.y);

                origem = this.listaDeCharCode[arestas[i].n];
                destino = this.listaDeCharCode[arestas[i].m];
                custo = this.isCustoAletorio ? Util.fn.gerarConexoesAleatorias(30,10) : 0;

                this.listaMatriz.push({
                    source: origem,
                    target: destino,
                    weight: parseInt(custo)
                });

                this.listaMatriz.push({
                    source: destino,
                    target: origem,
                    weight: custo
                });

                this.listaDeArestas.push({
                    source: origem,
                    target: destino,
                    weight: parseInt(custo),
                    nx : n.x,
                    ny : n.y,
                    mx : m.x,
                    my : m.y
                });

                var key = {};
                key[destino] = custo;
                this.listaDeEntradas[origem] = key;
                key = {};
                key[origem] = custo;
                this.listaDeEntradas[destino] = key;
            }
            this.setListaDeArestas(Util.fn.descartarDuplicados(this.listaDeArestas));
            this.setListaMatriz(Util.fn.descartarDuplicados(this.listaMatriz));

            if(this.isCustoAletorio){
                this.desenharCustos(this.getContexto());
            }

        };

        /**
         * Cria os vértices, obtém o código char e adiciona ao contexto
         * @param ctx
         * @param x
         * @param y
         * @param i
         */
        this.desenharVertices = function desenharVertices(ctx, x, y, i) {
            var codigo = "";

            try {
                ctx.beginPath();
                codigo = String.fromCharCode(i + 65);
                ctx.arc(x, y, 4, 0, Math.PI * 2, true);
                ctx.fillText(codigo, x + 10, y);
                ctx.fill();
                ctx.stroke();
                this.listaDeVertices.push({id : codigo});
                this.listaDeCharCode.push(codigo);
            }catch(err){
                console.log(err);
            }
        };

        /**
         * Faz á ligação entre ás arestas/vértices e adiciona ao contexto.
         * @param ctx
         * @param x0
         * @param y0
         * @param x1
         * @param y1
         */
        this.desenharArestas = function desenharArestas(ctx, x0, y0, x1, y1) {
            try{
                ctx.beginPath();
                ctx.moveTo(x0, y0);
                ctx.lineTo(x1, y1);
                ctx.stroke();
            }catch(err){
                console.log(err);
            }
        };

        this.desenharCustos = function desenharCustos(ctx){
            var lista = this.listaDeArestas;

            for(var i = 0; i < lista.length; i++){
                ctx.beginPath();
                ctx.fillText(lista[i].weight,((lista[i].nx + lista[i].mx) / 2) + 15, (lista[i].ny + lista[i].my) / 2);
                ctx.fill();
                ctx.stroke();
            }
        }

        this.custoManual = function custoManual(){
            if(!self.isCustoAletorio){
                self.desenharCustos(self.getContexto());

                for(var i = 0; i < self.listaDeArestas.length; i++) {
                    self.listaDeArestas[i].weight = parseInt(self.listaDeArestas[i].weight);
                    self.listaMatriz[i].weight = parseInt(self.listaDeArestas[i].weight);
                }

                var matriz  = new MatrizAdjacenciaService();
                matriz.criar(self.listaDeVertices,self.listaMatriz);
            }
        }
    }

    return Grafo;
}]);
