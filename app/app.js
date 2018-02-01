'use strict';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/npm.js';
import './styles/style.sass';
import 'angular-moment-picker/dist/angular-moment-picker.min.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import ipCookie from 'angular-cookie';
import cookies from 'angular-cookies';
import ngTokenAuth from 'ng-token-auth';
import ngFlash from 'angular-flash-alert';
import fileUpload from 'ng-file-upload';
import 'angular-moment-picker/dist/angular-moment-picker.min.js';

import routes from './app.routes';
import authConfig from './app.auth.config';

import projects from './projects';
import tasks from './tasks';
import comments from './comments';
import auth from './authentication';

angular.module('app', [
  uirouter,
  ipCookie,
  cookies,
  ngTokenAuth,
  ngFlash,
  fileUpload,
  'moment-picker',
  projects,
  tasks,
  comments,
  auth,
])
  .config(routes)
  .config(authConfig);
