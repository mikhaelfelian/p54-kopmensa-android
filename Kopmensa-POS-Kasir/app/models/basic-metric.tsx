export interface BasicMetrics {
  total_sales_transactions: number;
  total_revenue: number;
  sales_growth_percentage: number;
  total_purchase_transactions: number;
  total_expenses: number;
  total_profit: number;
  total_stock: number;
  icon: string;
  color: string;
  title: string;
}

export interface BasicMetricItem {
  icon: string;
  color: string;
  title: string;
  value: string;
}
