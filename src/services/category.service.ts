import { Category, TransactionType } from "@/types/category";

import { apiService, IApiService } from "./api.service";

export interface CreateCategoryRequest {
  name: string;
  type: TransactionType;
}

export interface GetCategoriesResponse {
  data: Category[]
}

export class CategoryService {
  constructor(private api: IApiService) {}

  // Fetch all categories for the current user
  async list() {
    const responseData = await this.api.get<GetCategoriesResponse>("/api/v1/categories");
    return responseData.data ?? [];
  }

  // Create a new category
  async create(data: CreateCategoryRequest): Promise<Category> {
    return this.api.post<Category, CreateCategoryRequest>("/api/v1/categories", data);
  }
}

export const categoryService = new CategoryService(apiService);