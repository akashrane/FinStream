// Mock Keycloak instance for "No Auth" / Demo deployment
const keycloak = {
    authenticated: true,
    token: "mock-token-123456",
    tokenParsed: {
        email: "demo@example.com",
        preferred_username: "Demo User",
        name: "Demo User",
        given_name: "Demo",
        family_name: "User",
        sub: "mock-user-id"
    },
    login: (options?: any) => {
        console.log("Mock Login called", options);
    },
    logout: (options?: any) => {
        console.log("Mock Logout called", options);
        window.location.reload();
    },
    init: (options?: any) => Promise.resolve(true),
    updateToken: (minValidity?: number) => Promise.resolve(true),
    hasRealmRole: (role: string) => true,
    hasResourceRole: (role: string) => true,
    // Add other properties/methods as needed by your app
};

export default keycloak;