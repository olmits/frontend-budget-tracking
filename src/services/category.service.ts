import { apiService, IApiService } from "./api.service";

export interface Category {
  id: string;
  name: string;
  type: "income" | "expense";
  user_id?: string;
}

export interface CreateCategoryRequest {
  name: string;
  type: "income" | "expense";
}

export class CategoryService {
  constructor(private api: IApiService) {}

  // Fetch all categories for the current user
  async list(): Promise<Category[]> {
    return this.api.get<Category[]>("/categories");
  }

  // Create a new category
  async create(data: CreateCategoryRequest): Promise<Category> {
    return this.api.post<Category, CreateCategoryRequest>("/categories", data);
  }
}

export const categoryService = new CategoryService(apiService);