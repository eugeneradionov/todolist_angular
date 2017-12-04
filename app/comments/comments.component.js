let commentsController = ($scope, CommentsService, Upload, Flash, $window) => { 'ngInject';
    $scope.init = () => {
        CommentsService.getAllComments($scope.vm.task.project_id, $scope.vm.task).then(
            (response) => {
                $scope.comments = response.data;
            }
        );

        $scope.attachmentErrors = false;
        $('#commentsModal').modal('show');
    };

    $scope.delete = (comment) => {
        CommentsService.deleteComment($scope.vm.task.project_id, $scope.vm.task, comment).then(
            (response) => {
                popComment(comment);
            }
        );
    };

    $scope.create = (comment) => {
        if (comment.file) {
            createCommentWithFile(comment);
        } else {
            createComment(comment.body, null);
        }
    };

    $scope.closeModal = () => {
        $scope.$parent.$parent.$parent.commentsModal[$scope.vm.task.id] = false;
        $('#commentsModal').modal('hide');
    };

    $scope.popUp = (url, target) => {
        $window.open(url, target);
    };

    let createCommentWithFile = (comment) => {
        Upload.base64DataUrl(comment.file).then(
            (imageUrl) => {
                createComment(comment.body, imageUrl);
            },
            (errors) => {
                $scope.attachmentErrors = true;
            }
        );
    };

    let createComment = (body, imageUrl) => {
        let params = {body: body, attachment: imageUrl};
        CommentsService.createComment($scope.vm.task.project_id, $scope.vm.task, params).then(
            (response) => {
                unshiftComment(response);
            }
        );
    };

    let popComment = (comment) => {
        $scope.comments.splice($scope.comments.indexOf(comment), 1);
        $scope.vm.task.comments_count -= 1;
    };

    let unshiftComment = (response) => {
        $scope.vm.task.comments_count += 1;
        $scope.comments.unshift(response.data);
        $scope.newComment = '';
    };
};

export default {
    template: require('./comments.html'),
    controller: commentsController,
    controllerAs: 'vm',
    bindings: {
        task: '=',
        commentsModal: '=',
    },
};
