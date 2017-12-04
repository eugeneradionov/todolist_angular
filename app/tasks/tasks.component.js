import moment from 'moment';

let tasksController = ($rootScope, $scope, $window, TasksService, Flash) => { 'ngInject';
    $scope.init = () => {
        TasksService.getAllTasks($scope.$parent.project).then(
            (response) => {
                $scope.tasks = response.data;
            },
            (errors) => {
                onErrors(errors.data);
            }
        );
        $scope.commentsModal = [];
    };

    $scope.closeModal = () => {
        $('#datePickModal').modal('hide');
    };

    $scope.chooseDeadlineColor = (task) => {
        if (task.completed) {
            return 'color-gray';
        } else if (checkDeadline(task.deadline)) {
            return 'color-dark-red';
        }
        return 'color-green';
    };

    $scope.saveDeadline = (date, time) => {
        let datetime = null;

        if (date && time) {
            datetime = date.format('DD-MM-YYYY') + ' ' + time.format('HH:mm');
        }

        let params = {id: $rootScope.currentTask.id, deadline: datetime};

        TasksService.updateTask($rootScope.currentTask.project_id, params).then(
            (response) => {
                $scope.tasks = response.data;
            },
            (errors) => {
                onErrors(errors.data);
            }
        );
    };

    $scope.minDate = moment().format('DD/MM/YYYY');

    $scope.openDeadlinePicker = (task) => {

        $rootScope.currentTask = task;
        if (task.deadline) {
            $rootScope.actual_date = moment().utc(task.deadline).format('DD/MM/YYYY');
            $rootScope.actual_time = moment().utc(task.deadline).format('HH:mm');
        } else {
            $rootScope.actual_date = moment().utc().format('DD/MM/YYYY');
            $rootScope.actual_time = '12:00';
        }
    };

    $scope.create = (taskName) => {
        let project = $scope.$parent.project;
        let params = {project_id: project.id, name: taskName};

        TasksService.createTask(project, params).then(
            (response) => {
                $scope.tasks.push(response.data);
                $scope.showButtons = false;
                $scope.taskName = '';
            },
            (errors) => {
                onErrors(errors.data);
            }
        );
    };

    $scope.changeTaskCompleted = (task) => {
        let params = {id: task.id, completed: task.completed};

        TasksService.updateTask(task.project_id, params).then(
            (response) => {
                refreshTasks(response);
            },
            (errors) => {
                onErrors(errors.data);
            }
        );
    };

    $scope.edit = (task, editingTaskName) => {
        let params = {id: task.id, name: editingTaskName};

        TasksService.updateTask(task.project_id, params).then(
            (response) => {
                $scope.cancelEditing();
                $scope.tasks = response.data;
            },
            (errors) => {
                onErrors(errors.data);
            }
        );
    };

    $scope.delete = (task) => {
        let message = 'Are you sure you want to delete this item?';

        if ($window.confirm(message)) {
            TasksService.deleteTask($scope.$parent.project, task).then(
                () => {
                    $scope.tasks.splice($scope.tasks.indexOf(task), 1);
                },
                (errors) => {
                    onErrors(errors.data);
                }
            );
        }
    };

    $scope.move = (task, direction) => {
        let taskParams = {id: task.id, task: {move: direction}};
        TasksService.updateTask(task.project_id, taskParams).then(
            (response) => {
                $scope.tasks = response.data;
            },
            (errors) => {
                onErrors(errors.data);
            }
        );
    };

    $scope.startEditing = (task) => {
        $scope.editingTaskName = task.name;
        $scope.editingTask = task;
    };

    $scope.cancelEditing = () => {
        $scope.editingTaskName = '';
        $scope.editingTask = null;
    };

    let checkDeadline = (deadline) => {
        return moment(deadline) < moment(new Date()).add(1, 'days')._d;
    };

    let refreshTasks = (response) => {
        $scope.tasks = response.data;
        if (allTasksCompleted(response.data)) {
            Flash.create(
                'success',
                `Well Done! You’re successfully completed all the task in ${$scope.$parent.project.name}!`
            );
        }
    };

    let allTasksCompleted = (tasks) => {
        return tasks.every(
            (task) => {
                return task.completed === true;
            }
        );
    };

    let onErrors = (errors) => {
        let errorMessage = '<ul>';
        errors.forEach((error) => {
            errorMessage += `<li>${error}</li>`;
        });
        errorMessage += '</ul>';
        Flash.create('danger', errorMessage);
    };
};

export default {
    template: require('./tasks.html'),
    controller: tasksController,
};
