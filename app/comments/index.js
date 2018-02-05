import angular from 'angular';

import CommentsService from './comments.service';
import comments from './comments.component';

export default angular.module('app.comments', [])
  .component('commentsList', comments)
  .service('CommentsService', CommentsService)
  .name;
