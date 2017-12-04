import registrationController from './registration.controller';

export default function routes($stateProvider) { 'ngInject';
    $stateProvider
        .state('sign_up', {
            url: '/sign_up',
            template: require('./registration.html'),
            controller: registrationController,
            controllerAs: 'signup',
        });
}
