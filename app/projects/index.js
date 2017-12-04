import angular from 'angular';
import uirouter from 'angular-ui-router';

import routes from './projects.routes';
import ProjectsService from './projects.service';
import projects from './projects.component';

export default angular.module('app.projects', [uirouter])
    .config(routes)
    .component('projectsList', projects)
    .service('ProjectsService', ProjectsService)
    .name;
