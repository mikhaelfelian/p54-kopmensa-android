export interface Product {
  id: number;
  id_kategori: number;
  id_merk: number;
  created_at: string;
  updated_at: string;
  merk: string | null;
  kategori: string;
  kode: string;
  barcode: string;
  item: string;
  deskripsi: string;
  jml_min: number;
  harga_jual: number;
  harga_beli: number;
  foto: string;
  options: {
    harga: any[];
    varian: any;
    galeri: any;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  tax: number;
  priceBeforeTax: number;
}
