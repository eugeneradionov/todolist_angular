let projectsController = ($window, $scope, ProjectsService, Flash) => { 'ngInject';
    $scope.init = () => {
        getAllProjects();
    };

    $scope.collapseTasks = (project) => {
        if (project.showTasks === undefined) {
            project.showTasks = true;
        } else {
            project.showTasks = !project.showTasks;
        }
    };

    $scope.create = (projectName) => {
        ProjectsService.createProject({name: projectName || ''}).then(
            (response) => {
                $scope.projects.push(response.data);
                $scope.projectName = '';
            },
            (errors) => {
                onErrors(errors.data);
            }
        );
    };

    $scope.edit = (project, editingProjectName) => {
        project.name = editingProjectName;
        ProjectsService.updateProject(project).then(
            (response) => {
                project.name = editingProjectName;
                $scope.cancelEditing();
            },
            (errors) => {
                onErrors(errors.data);
            }
        );
    };

    $scope.delete = (project) => {
        let message = `Are you really want to delete "${project.name}" project?`;

        if ($window.confirm(message)) {
            ProjectsService.deleteProject(project).then(
                (response) => {
                    $scope.projects.splice($scope.projects.indexOf(project), 1);
                },
                (errors) => {
                    onErrors(errors);
                }
            );
        }
    };

    $scope.startEditing = (project) => {
        $scope.editingProjectName = project.name;
        $scope.editingProject = project;
    };


    $scope.cancelEditing = () => {
        $scope.editingProjectName = '';
        $scope.editingProject = null;
    };

    let onErrors = (errors) => {
        let errorMessage = '<ul>';
        errors.forEach((error) => {
            errorMessage += `<li>${error}</li>`;
        });
        errorMessage += '</ul>';
        Flash.create('danger', errorMessage);
    };

    let getAllProjects = () => {
        ProjectsService.getAllProjects().then(
            (projects) => {
                $scope.projects = projects.data;
            }
        );
    };
};

export default {
    template: require('./projects.html'),
    controller: projectsController,
};
