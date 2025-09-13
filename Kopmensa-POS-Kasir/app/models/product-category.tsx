export interface CategoryItem {
  id: number;
  kategori: string;
  kode: string;
  status: number;
  created_at: string;
  updated_at: string;
  keterangan: string | null;
}

export interface CategoryResponse {
  current_page: number;
  items: CategoryItem[];
  per_page: number;
  total: number;
  total_page: number;
}
