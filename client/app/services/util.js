app.factory('Util', function () {
    var methods = {};
    methods.buildIconsObj = buildIconsObj;
    methods.gerarPosicaoAleatoria = gerarPosicaoAleatoria;
    methods.gerarConexoesAleatorias = gerarConexoesAleatorias;
    methods.descartarDuplicados = descartarDuplicados;
    methods.recarregarPagina = recarregarPagina;

    return {
      fn : methods
    };

    /**
     * @desc Monta um objeto de icones
     * @params String name,url,size
     * @returns obj
     */
    function buildIconsObj(name,url,size){
        return {
            name : name,
            url : url,
            size : size
        };
    }

    /**
     * Gera números aletórios para ás posições com valor inicial definido
     * @param valor
     * @returns {number}
     */
    function gerarPosicaoAleatoria(valor) {
        return Math.floor((Math.random() * (valor - 150)) + Math.floor((Math.random() * 2) + 100));
    };

    /**
     * Gera números aleatórios para ás conexões a partir de um valor inicial genérico.
     * @param len
     * @param ini
     * @returns {number}
     */
    function gerarConexoesAleatorias(len,ini){
        return Math.floor((Math.random() * len) + ini);
    };

    /**
     * Remove os itens duplicados de uma estrutura do tipo lista.
     * @param lista
     * @returns {Array}
     */
    function descartarDuplicados(lista){
        var novaLista = [];
        for(var i = 0; i < lista.length; i++){
            if(lista[i].source != lista[i].target){
                novaLista.push(lista[i]);
            }
        }
        return novaLista;
    }

    /**
     * Faz o recarregamento da página
     */
    function recarregarPagina(){
        location.reload();
    };

});
