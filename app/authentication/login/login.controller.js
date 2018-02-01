export default class LoginController {
  constructor($auth, $cookies, $location, $rootScope, $scope, Flash) { 'ngInject';
    this.$auth = $auth;
    this.$cookies = $cookies;
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$scope.loginError = false;
    this.Flash = Flash;
    this.loginControl();
  }

  loginControl() {
    this.$rootScope.$on('auth:login-success', (ev, user) => {
      this.$scope.loginError = true;
      this.$location.path('/');
      this.Flash.create('success', `You have successfully logged in as ${user.email}`);
    });

    this.$rootScope.$on('auth:login-error', () => {
      this.$scope.loginError = true;
    });

    this.$rootScope.$on('auth:logout-success', () => {
      this.$location.path('login');
      this.Flash.create('info', 'You have successfully logged out');
    });
  }
}
