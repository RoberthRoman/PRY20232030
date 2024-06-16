import { AxiosInstance } from "axios";
import { axiosInstance } from "./axios";

function newAbortSignal(timeoutSeconds: number) {
  const timeoutMs = timeoutSeconds * 1000;
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
}

class ApiService {
  private axiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  public async get<T>(url: string): Promise<T> {
    const response = await this.axiosInstance.get<T>(`${url}`, {
      signal: newAbortSignal(60),
    });
    return response.data;
  }

  public async post<T>(url: string, data: unknown): Promise<T> {
    const response = await this.axiosInstance.post<T>(`${url}`, data, {
      signal: newAbortSignal(60),
    });
    return response.data;
  }

  public async put<T>(url: string, data: unknown): Promise<T> {
    const response = await this.axiosInstance.put<T>(`${url}`, data, {
      signal: newAbortSignal(60),
    });
    return response.data;
  }

  public async delete<T>(url: string): Promise<T> {
    const response = await this.axiosInstance.delete<T>(`${url}`, {
      signal: newAbortSignal(60),
    });
    return response.data;
  }
}

export const apiService = new ApiService(axiosInstance);
