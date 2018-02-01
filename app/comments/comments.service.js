export default class CommentsService {
  constructor($http) { 'ngInject';
    this.$http = $http;
  }

  getAllComments(projectId, task) {
    return this
      .$http
      .get(`${process.env.API_URL}/projects/${projectId}/tasks/${task.id}/comments`);
  }

  createComment(projectId, task, commentParams) {
    return this
      .$http
      .post(`${process.env.API_URL}/projects/${projectId}/tasks/${task.id}/comments`, commentParams);
  }

  deleteComment(projectId, task, comment) {
    return this
      .$http
      .delete(`${process.env.API_URL}/projects/${projectId}/tasks/${task.id}/comments/${comment.id}`);
  }
}
