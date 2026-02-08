import { apiService,IApiService } from "./api.service";


export interface LoginRequest {
  email?: string;
  password?: string;
}

export interface RegisterRequest {
  email?: string;
  password?: string;
}

export interface AuthResponse {
  token?: string;
  message?: string;
  user_id?: string;
}

export class UserService {
  private api: IApiService;

  constructor(apiService: IApiService) {
    this.api = apiService;
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    console.log("Attempting Login with:", data); // <--- Add this
    return this.api.post<AuthResponse, LoginRequest>("/login", data);
  }
    
  async register(data: RegisterRequest): Promise<AuthResponse> {
    return this.api.post<AuthResponse, RegisterRequest>("/register", data);
  }
}

// Export a singleton instance
export const userService = new UserService(apiService);