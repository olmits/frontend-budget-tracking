import { TransactionType } from "@/types/category";

import { apiService, IApiService } from "./api.service";

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category_id: string;
  type: TransactionType;
  date: string;
}

export interface CreateTransactionRequest {
  amount: number;
  description: string;
  category_id: string;
  type: TransactionType;
  date: string;
}

interface GetALlTransactionsResponse {
  data: Transaction[]
}

export class TransactionService {
  constructor(private api: IApiService) {}

  async create(data: CreateTransactionRequest): Promise<void> {
    return this.api.post("/api/v1/transactions", data);
  }

  async getAll(): Promise<Transaction[]> {
    const responseData = await this.api.get<GetALlTransactionsResponse>("/api/v1/transactions");
    return responseData.data ?? [];
  }
}

export const transactionService = new TransactionService(apiService);