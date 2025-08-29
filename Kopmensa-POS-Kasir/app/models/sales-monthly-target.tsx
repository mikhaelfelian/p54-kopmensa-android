export interface SalesMonthlyTarget {
  current_month_sales: number;
  previous_month_sales: number;
  sales_growth_percentage: number;
  average_order_value: number;
  monthly_target: number;
  daily_target: number;
  today_sales: number;
  monthly_progress_percentage: number;
  daily_progress_percentage: number;
  total_customers: number;
  new_customers_this_month: number;
}
