import { IApiService } from "./api.service";

export interface DashboardSummary {
  total_income: number;
  total_expense: number;
  net_balance: number;
}

export class DashboardService {
  private api: IApiService;

  constructor(apiSerice: IApiService) {
    this.api = apiSerice;
  }

  async getSummary(): Promise<DashboardSummary> {
    return this.api.get<DashboardSummary>("/api/v1/dashboard");
  }
}