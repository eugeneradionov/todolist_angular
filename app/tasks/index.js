import angular from 'angular';
import uirouter from 'angular-ui-router';

import TasksService from './tasks.service';
import tasks from './tasks.component';

export default angular.module('app.tasks', [uirouter])
    .component('tasksList', tasks)
    .service('TasksService', TasksService)
    .name;
