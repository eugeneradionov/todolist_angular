export default ($authProvider, $qProvider) => {
    $qProvider.errorOnUnhandledRejections(false);

    $authProvider.configure({
        apiUrl: `${process.env.API_URL}`,
        storage: 'coookies',
        validateOnPageLoad: true,
        tokenFormat: {
            'access-token': '{{ token }}',
            'token-type': 'Bearer',
            'client': '{{ clientId }}',
            'expiry': '{{ expiry }}',
            'uid': '{{ uid }}',
        },
    });
};
