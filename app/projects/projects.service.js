export default class ProjectsService {
  constructor($http) { 'ngInject';
    this.$http = $http;
  }

  getAllProjects() {
    return this.$http.get(`${process.env.API_URL}/projects`);
  }

  createProject(projectParams) {
    return this.$http.post(`${process.env.API_URL}/projects`, projectParams);
  }

  deleteProject(project) {
    return this.$http.delete(`${process.env.API_URL}/projects/${project.id}`);
  }

  updateProject(project) {
    return this.$http.put(`${process.env.API_URL}/projects/${project.id}`, project);
  }
}
