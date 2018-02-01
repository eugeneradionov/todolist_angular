export default class TasksService {
  constructor($http) { 'ngInject';
    this.$http = $http;
  }

  getAllTasks(project) {
    return this
      .$http
      .get(`${process.env.API_URL}/projects/${project.id}/tasks`);
  }

  createTask(project, taskParams) {
    return this
      .$http
      .post(`${process.env.API_URL}/projects/${project.id}/tasks`, taskParams);
  }

  deleteTask(project, task) {
    return this
      .$http
      .delete(`${process.env.API_URL}/projects/${project.id}/tasks/${task.id}`);
  }

  updateTask(projectId, taskParams) {
    return this
      .$http
      .put(`${process.env.API_URL}/projects/${projectId}/tasks/${taskParams.id}`, taskParams);
  }
}
