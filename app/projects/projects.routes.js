export default ($stateProvider) => { 'ngInject';
  $stateProvider
    .state({
      name: 'projects',
      url: '/',
      component: 'projectsList',
      resolve: {
        auth: ['$auth', '$state', ($auth, $state) => {
          return $auth.validateUser().catch((err) => {
            $state.go('login');
          });
        }],
      },
    });
};
