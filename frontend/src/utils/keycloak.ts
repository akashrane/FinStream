import Keycloak from 'keycloak-js';

// MOCK Keycloak Service for "No-Auth" Deployment
class KeycloakService {
  private isInitialized = false;

  constructor() {
    this.isInitialized = false;
  }

  async init(): Promise<boolean> {
    console.log('🔓 Mock Keycloak initialized (Bypassing Auth)');
    this.isInitialized = true;
    return Promise.resolve(true); // Always authenticated
  }

  login(): void {
    console.log('🔓 Mock Login called - doing nothing (already logged in)');
  }

  logout(): void {
    console.log('🔓 Mock Logout called - reloading page');
    window.location.reload();
  }

  getToken(): string | undefined {
    return "mock-token-12345";
  }

  getUserName(): string {
    return 'Demo User';
  }

  isAuthenticated(): boolean {
    return true; // Always true
  }

  isAuthenticatedSync(): boolean {
    return true; // Always true
  }
}

export const keycloakService = new KeycloakService();