import { apiService, IApiService } from "./api.service";

export interface CreateTransactionRequest {
  amount: number;
  description: string;
  category_id: string;
  type: "income" | "expense";
  date: string; // ISO string
}

export class TransactionService {
  constructor(private api: IApiService) {}

  async create(data: CreateTransactionRequest): Promise<void> {
    return this.api.post("/transactions", data);
  }
}

export const transactionService = new TransactionService(apiService);