export default class RegistrationController {
    constructor($auth, $cookies, $state, $scope, Flash) { 'ngInject';
        this.$auth = $auth;
        this.$cookies = $cookies;
        this.$state = $state;
        this.$scope = $scope;
        this.Flash = Flash;
        this.$scope.signUpError = false;
        this.signUpControl();
    }

    signUpControl() {
        this.$scope.$on('auth:registration-email-success', () => {
            this.$scope.signUpError = false;
            this.$state.go('projects');
            this.Flash.create('success', 'You have successfully registered');
        });

        this.$scope.$on('auth:registration-email-error', (ev, reason) => {
            this.$scope.signUpError = true;
            let errorMessage = '<ul>';
            angular.forEach(reason.errors.full_messages, (msg) => {
                errorMessage += `<li>${msg}</li>`;
            });
            errorMessage += '</ul>';
            this.Flash.create('danger', errorMessage);
        });
    }
}
