export interface ReturnDetailItem {
  id: number;
  id_retur_jual: number;
  id_item: number;
  id_satuan: number;
  id_gudang: number;
  kode: string;
  item: string;
  jml: number;
  satuan: string;
  harga: number;
  subtotal: number;
  status_item: number;
  created_at: string;
  updated_at: string;
}

export interface ReturnItem {
  id: number;
  no_retur: string;
  id_penjualan: number;
  id_user: number;
  id_pelanggan: number;
  id_sales: number;
  id_gudang: number;
  customer_nama: string;
  original_nota: string;
  no_nota: string;
  tgl_masuk: string;
  keterangan: string;
  status: number;
  status_retur: number;
  status_terima: number;
  created_at: string;
  updated_at: string;
  details: ReturnDetailItem[];
}
