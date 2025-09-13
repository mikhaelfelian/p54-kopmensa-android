export interface OutletItem {
  id: number;
  id_user: number;
  kode: string;
  nama: string;
  deskripsi: string;
  status: number;
  status_hps: number;
  created_at: string;
  updated_at: string;
}

export interface SelectedOutletState {
  selected: OutletItem | null;
}
