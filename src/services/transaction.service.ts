import { TransactionType } from "@/types/category";

import { apiService, IApiService } from "./api.service";

export interface CreateTransactionRequest {
  amount: number;
  description: string;
  category_id: string;
  type: TransactionType;
  date: string; // ISO string
}

export class TransactionService {
  constructor(private api: IApiService) {}

  async create(data: CreateTransactionRequest): Promise<void> {
    return this.api.post("/api/v1/transactions", data);
  }
}

export const transactionService = new TransactionService(apiService);