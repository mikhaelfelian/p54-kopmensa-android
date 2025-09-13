export interface Shift {
  id: number;
  shift_code: string;
  outlet_id: number;
  outlet_name: string;
  user_open_id: number;
  user_open_name: string;
  start_at: string;
  end_at: string | null;
  open_float: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ShiftDetail {
  shift: {
    id: number;
    shift_code: string;
    outlet_id: number;
    user_open_id: number;
    user_close_id: number | null;
    user_approve_id: number | null;
    start_at: string;
    end_at: string | null;
    open_float: string;
    sales_cash_total: string;
    petty_in_total: string;
    petty_out_total: string;
    expected_cash: string;
    counted_cash: string | null;
    diff_cash: string | null;
    status: string;
    notes: string | null;
    created_at: string;
    updated_at: string;
    outlet_name: string;
    outlet_code: string;
    user_open_name: string;
    user_open_lastname: string;
    user_close_name: string | null;
    user_close_lastname: string | null;
    user_approve_name: string | null;
    user_approve_lastname: string | null;
  };
  petty_entries: any[];
  sales_entries: any[];
}
