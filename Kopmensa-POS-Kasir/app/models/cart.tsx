export interface CartSubmit {
  id_item: number;
  id_satuan: number;
  id_kategori: number;
  id_merk: number;
  no_nota: string;
  kode: string;
  produk: string;
  satuan: string;
  harga: number;
  harga_beli: number;
  jml: number;
  jml_satuan: number;
  subtotal: number;
}

export interface HistSubmit {
  id_item: number;
  id_satuan: number;
  id_gudang: number | undefined;
  id_user: any;
  id_pelanggan: string;
  tgl_masuk: string;
  no_nota: string;
  kode: string;
  item: string;
  nominal: number;
  jml: number;
  jml_satuan: number;
  satuan: string;
  status: string;
}

export interface PlatformSubmit {
  id_platform: number;
  no_nota: string;
  platform: string;
  keterangan: string;
  nominal: string;
}
