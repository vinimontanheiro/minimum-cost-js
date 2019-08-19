/**
 * @name Aplicações com Grafos
 * @description Controle principal da aplicação
 * @dedicated {
 *      Faculdade : PUC - Goiás
 *      Curso : Ciência da computação
 *      Professor : Marco Antônio Figueiredo Menezes
 *      Disciplina : Fundamentos II
 * }
 * @author Vinícius Montanheiro
 * @version 0.1
 * @copyright open source
 */

app.controller('MainController', ['$scope','Util','MessageService','GrafoService','MatrizAdjacenciaService','DijkstraService',
    function mainController($scope, Util, MessageService, Grafo, MatrizAdjacenciaService, Dijkstra) {

        /**
         * Variáveis globais
         * @type {null}
         */
        $scope.entidade = {};
        var modeloDeDados = {
            vertices : []
        };
        var canvas = null;
        var ctx = null;
        var matriz = new MatrizAdjacenciaService();
        var Dijkstra = Dijkstra;
        var grafo = new Grafo();

        var modeloEntidade = {
            graph : null,
            quantidadeDeNos : 0,
            listaDeVertices : [],
            listaDeArestas : [],
            listaDeCharCode : [],
            listaDeEntradas : {},
            listaMatriz : [],
            resultado : null,
            origem : null,
            destino : null,
            mostrarFormAdd : false,
            mostrarMatriz : false,
            isCustoAletorio:false,
            mostrarOrigemDestino:false,

            fn : {
                processarGrafo : null,
                criarMatriz : null,
                buscarCaminho : null,
                util : null
            }
        };

        /*
        * Bind encima do modelo
         */
        $scope.entidade = angular.copy(modeloEntidade);
        $scope.entidade.fn.processarGrafo = processarGrafo;
        $scope.entidade.fn.criarMatriz = criarMatriz;
        $scope.entidade.fn.buscarCaminho = buscarCaminho;
        $scope.entidade.fn.limparResultado = limparResultado;
        $scope.entidade.fn.custoManual = grafo.custoManual;
        $scope.entidade.fn.util = Util.fn;

        /**
         * Obtém os valores dos pontos e conexões e
         * inicia o processo de criação do grafo.
         */
        function processarGrafo(){

            canvas = document.getElementById("quadro");
            ctx = canvas.getContext("2d");

            var nodes = parseInt($scope.entidade.quantidadeDeNos);

            for(var i = 0; i < nodes; i++){
                var dados = {
                    arestas : nodes <= 1 ? [0] : [Util.fn.gerarConexoesAleatorias(nodes,0),Util.fn.gerarConexoesAleatorias(nodes,0)],
                    x : Util.fn.gerarPosicaoAleatoria(canvas.width),
                    y: Util.fn.gerarPosicaoAleatoria(canvas.width)
                };
                modeloDeDados.vertices.push(dados);
            }

            /**
             * Definindo configurações
             */
            grafo.setModelo(modeloDeDados);
            grafo.setCustoAletorio($scope.entidade.isCustoAletorio);
            grafo.setQuantidadeDeNos(nodes);
            $scope.entidade.graph = grafo.getModelo();

            /**
             * Criando grafo
             */
            grafo.criar(ctx);

            /**
             * Recuperando listas
             * @type {listaDeVertices}
             */
            $scope.entidade.listaDeVertices = grafo.getListaDeVertices();
            $scope.entidade.listaDeArestas = grafo.getListaDeArestas();
            $scope.entidade.listaDeCharCode = grafo.getListaDeCharCode();
            $scope.entidade.listaDeEntradas = grafo.getListaDeEntradas();
            $scope.entidade.listaMatriz = grafo.getListaMatriz();

            /**
             * Escondendo formulário de inclusão
             */
            if($scope.entidade.listaDeVertices.length >=1){
                $scope.entidade.mostrarFormAdd = true;
            }else{
                $scope.entidade.mostrarFormAdd = false;
            }

            if(!grafo.isCustoAletorio){
                MessageService.addInfo("Por favor informe os custos!");
            }
        };

        /***
         * Método responsável por criar matriz de adjacência
         */
        function criarMatriz(){
            matriz.criar($scope.entidade.listaDeVertices,$scope.entidade.listaMatriz);
            $scope.entidade.mostrarOrigemDestino = true;
        };

        /**
         * Faz á busca usando o algorítmo Dijkstra
         */
        function buscarCaminho(){
            var origem = $scope.entidade.origem;
            var destino = $scope.entidade.destino;
            $scope.entidade.resultado = null;

            var arestas = $scope.entidade.listaDeArestas;

            for(var i = 0; i < arestas.length;i ++){
                Dijkstra.link(arestas[i].source,arestas[i].target,arestas[i].weight);
            }

            $scope.entidade.resultado = Dijkstra.find(origem, destino) != undefined
            && Dijkstra.find(origem, destino) != null ? Dijkstra.find(origem, destino).toString()
                : MessageService.addError("Caminho não encontrado!");
        };

        /**
         * Mudança de flag para nova consulta
         */
        function limparResultado(){
            $scope.entidade.resultado = null;
        }
    }]);
