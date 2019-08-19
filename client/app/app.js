var app = angular.module('grafos', ['ui.router','ngAnimate','ngAria','ngMaterial','toaster']);

app.config(function ($stateProvider, $urlRouterProvider,$locationProvider,$mdThemingProvider, $mdIconProvider) {
    $stateProvider
        .state('index', {
            url: "/",
            templateUrl: "index.html"
        });

    $mdIconProvider.icon('menu', '../assets/icons/svg/black/svg/th-large.svg', 24)
        .icon('upload','../assets/icons/svg/black/svg/upload.svg',24);

    $mdThemingProvider.definePalette('default', {
        '50': '00979D',
        '100': '00979D',
        '200': '00979D',
        '300': '00979D',
        '400': '00979D',
        '500': '00979D',
        '600': '00979D',
        '700': '00979D',
        '800': '00979D',
        '900': '00979D',
        'A100': '00979D',
        'A200': '00979D',
        'A400': '00979D',
        'A700': '00979D',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
        'contrastLightColors': undefined
    });
    $mdThemingProvider.theme('default')
        .primaryPalette('default');

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    ///$locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise("/");


});
