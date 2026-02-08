import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { cookies } from "next/headers";


export interface IApiService {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T, D>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T>
}

export class ApiService implements IApiService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string | undefined) {
    if (!baseURL) {
      throw new Error("ApiService Error: 'baseURL' is missing.");
    }

    if (!baseURL.startsWith("http://") && !baseURL.startsWith("https://")) {
      throw new Error(`ApiService Error: baseURL '${baseURL}' is invalid. It must start with 'http://' or 'https://'.`);
    }

    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json"
      }
    });

    this.axiosInstance.interceptors.request.use(async (config) => {
      try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
                
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error fetching cookies in ApiService:", error);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response, // Return success responses as-is
      async (error) => {
        // Check for 401 Unauthorized
        if (error.response?.status === 401) {
          // logic A: server-side (Next.js server component)
          // We throw the error so the Page Component (Step 1) can catch it and redirect.
          if (typeof window === "undefined") {
            return Promise.reject(error);
          }

          // logic B: client-side (Browser)
          // We can forcefully redirect the browser
          console.log("Session expired. Redirecting...");
          
          // Optional: Delete cookie client-side if not httpOnly (usually it is httpOnly though)
          // document.cookie = "token=; Max-Age=0; path=/;";

          window.location.href = "/login?error=SessionExpired";
        }
        
        return Promise.reject(error);
      }
    );
  }
    
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
    return response.data;
  }
  async post<T, D>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T, D> = await this.axiosInstance.post(url, data, config);
    return response.data;
  }
}

export const apiService = new ApiService(process.env.NEXT_PUBLIC_API_URL);