
interface JWTPayload {
  userId: string;
  email: string;
  name: string;
  profilePicture: string | null;
  currentWorkspace: string | null;
  exp: number;
  iat: number;
}

class TokenManager {
  private accessToken: string | null = null;
  private refreshPromise: Promise<boolean> | null = null;

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  clearAccessToken(): void {
    this.accessToken = null;
  }

  hasAccessToken(): boolean {
    return !!this.accessToken;
  }

  decodeToken(): JWTPayload | null {
    if (!this.accessToken) return null;
    
    try {
      const payload = this.accessToken.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      console.log(decoded)
      return decoded;
    } catch {
      return null;
    }
  }

  getCurrentUser(): JWTPayload | null {
    const decoded = this.decodeToken();
    if (!decoded) return null;
    
    return decoded;
  }

  isTokenExpired(): boolean {
    const decoded = this.decodeToken();
    return !decoded || decoded.exp * 1000 < Date.now();
  }

  async refreshTokenIfNeeded(): Promise<boolean> {
    if (!this.isTokenExpired()) return true;
    
    // If refresh is already in progress, wait for it
    if (this.refreshPromise) {
      return this.refreshPromise;
    }
    
    // Start refresh process
    this.refreshPromise = this.performRefresh();
    const result = await this.refreshPromise;
    this.refreshPromise = null;
    
    return result;
  }

  private async performRefresh(): Promise<boolean> {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include'
      });
      
      if (response.ok) {
        const { accessToken } = await response.json();
        this.setAccessToken(accessToken);
        return true;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }
    
    return false;
  }
}

export const tokenManager = new TokenManager();