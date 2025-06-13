import { Component, OnInit } from '@angular/core';
import { TransaksiService } from '../transaksi.service';
import { PenggunaService } from '../pengguna.service';
import { FotoService } from '../foto.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.page.html',
  styleUrls: ['./transaksi.page.scss'],
})
export class TransaksiPage implements OnInit {

  constructor(private transaksi: TransaksiService, private pengguna: PenggunaService, private fotos: FotoService) { }

  user: any = null;
  transaksis: any[] = [];
  error: string = "";
  isModalOpen = false;
  idOrder = 0;
  alamat = "";
  statuss: any[] = [];
  barangs: any[] = [];
  orderPilihan: any;
  previewFoto: string|null = null;
  namaFile: string = "";
  bukti: string = "";
  baseUrl = environment.apiUrl;

  ngOnInit() {
    this.user = this.pengguna.ambilPengguna()
    if(this.user.id){
      this.transaksi.riwayat(this.user.id).subscribe((data)=>{
        if(data.hasil=="err"){
          this.error = data.data;
          return;
        }
        this.transaksis = data.data;
      });
    }
  }

  getTotal(barang: any[]): number {
    return barang?.reduce((acc: number, barang: any) => acc + barang.harga * barang.jumlah, 0);
  }

  warnaStatus(status: string) {
    switch (status) {
      case 'Terkirim':
        return 'success';
      case 'Menunggu Pengiriman':
        return 'warning';
      case 'Menunggu Pembayaran':
        return 'warning';
      case 'Batal':
        return 'danger';
      default:
        return 'medium';
    }
  }

  icon(status: string) {
    switch (status) {
      case 'Terkirim':
        return 'checkmark-circle';
      case 'Batal':
        return 'close-circle';
      case 'Menunggu Pengiriman':
        return 'time';
      case 'Menunggu Pembayaran':
        return 'time';
      default:
        return 'help-circle';
    }
  }

  bukaModal(order: any) {
    this.orderPilihan = order;
    this.idOrder = order.id;
    this.statuss = order.status;
    this.alamat = order.alamat;
    this.barangs = order.barang;
    this.bukti = order.bukti_pembayaran;
    this.isModalOpen = true;
  }

  tutupModal() {
    this.isModalOpen = false;
  }

  async ambilFoto(source: 'camera' | 'gallery'): Promise<void> {
    try {
      const image: Photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: source === 'camera' ? CameraSource.Camera : CameraSource.Photos
      });

      if (image && image.dataUrl) {
        this.previewFoto = image.dataUrl;
        const blob = this.fotos.dataURLToBlob(image.dataUrl);
        this.namaFile = "Bukti" + "_" + Date.now();

        this.fotos.uploadFoto(blob, this.namaFile, false, true);
      } else {
        console.warn('Tidak ada foto');
        return
      }
    } catch (error) {
      console.error('Error saat mengammbil foto', error);
    }
  }

  uploadBuktiPembayaran() {
    this.transaksi.ubahBukti(this.orderPilihan, this.namaFile).subscribe((data) => {
      if (data.hasil == "err") {
        this.error = data.data;
        return;
      }
      this.tutupModal();
      this.ngOnInit();
    }
    );
  }
}
