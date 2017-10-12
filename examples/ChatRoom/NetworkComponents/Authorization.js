class Authorization extends NetworkComponent {
    // one-to-one events
    privateEvents = ['login', 'register', 'error', 'success']

    login (credentials) {
        this.doLogin(credentials);
    }
}

class AuthorizationS extends Authorization {
    onLogin (credentials) {
        let { alias } = credentials;
    }
}

export default {
    Authorization,
    AuthorizationS
}