import loginController from './login.controller';

export default function routes($stateProvider) { 'ngInject';
  $stateProvider
    .state('login', {
      url: '/login',
      template: require('./login.html'),
      controller: loginController,
      controllerAs: 'login',
    });
}
