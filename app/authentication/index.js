import angular from 'angular';
import uirouter from 'angular-ui-router';

import loginRoutes from './login/login.routes';
import LoginController from './login/login.controller';

import registrationRoutes from './registration/registration.routes';
import registrationController from './registration/registration.controller';

export default angular.module('app.authentication', [uirouter])
  .controller(LoginController)
  .controller(registrationController)
  .config(loginRoutes)
  .config(registrationRoutes)
  .name;
