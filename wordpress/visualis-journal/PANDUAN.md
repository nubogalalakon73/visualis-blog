# Panduan Visualis Journal (WordPress)

Tema ini adalah tema WordPress klasik, bukan hasil konversi otomatis dari aplikasi
React. Tidak perlu Node.js atau build step. Upload zip, aktifkan, lalu atur halaman.

## 1. Instal tema

1. Masuk wp-admin.
2. **Appearance → Themes → Add New → Upload Theme**.
3. Upload `visualis-journal.zip`, klik **Install Now**, lalu **Activate**.

## 2. Buat halaman

Buat empat halaman berikut (Pages → Add New):

| Halaman | Template |
| --- | --- |
| Journal | Default template |
| Library | **Members' Shelf** |
| Studio | **Studio** |
| Tags | **Tags Index** |

Setelah itu:

1. **Settings → Reading → Posts page** → pilih **Journal**.
2. **Appearance → Menus** → buat menu, masukkan Journal, Tags, Library, Studio,
   lalu assign ke **Primary menu**.
3. **Appearance → Customize → Visualis settings** → atur judul hero, intro,
   URL membership, dan catatan footer.

## 3. Pilih plugin

Tema kompatibel dengan dua jalur:

### Membership

- **Paid Memberships Pro** (gratis) — status member dibaca lewat
  `pmpro_hasMembershipLevel()`.
- **MemberPress** (berbayar) — status member dibaca lewat `MeprUser::is_active()`.

### Download

- **Download Monitor** (gratis) — tema membaca post type `dlm_download`.
- **Easy Digital Downloads** (gratis) — tema membaca post type `download`.

Tema hanya mengatur tampilan. Proteksi file tetap dijalankan oleh plugin.

## 4. Mengunci file untuk member

### Opsi A — Paid Memberships Pro + Download Monitor (paling langsung)

1. Install **Paid Memberships Pro** dan **Download Monitor**.
2. Install add-on resmi **PMPro Download Monitor Integration**.
3. Buat membership level di PMPro (Memberships → Add New).
4. Tambah download di **Downloads → Add New**, upload file.
5. Di kotak **Require Membership** pada edit download, pilih level yang boleh
   mengunduh.
6. Publish download, lalu buka halaman Library di front end.

Catatan: opsi **Members only** bawaan Download Monitor hanya mewajibkan login,
bukan level berbayar. Untuk pembatasan per level, gunakan integrasi PMPro di atas
atau extension **Advanced Access Manager** milik Download Monitor.

### Opsi B — MemberPress

1. Install MemberPress dan buat membership.
2. Buat **Rule** untuk memproteksi halaman Library dan halaman download.
3. Pastikan URL file asli tidak bisa diakses publik (gunakan proteksi file dari
   plugin download atau aturan server).
4. Tema otomatis menampilkan status member dan CTA join lewat
   `MeprUser::is_active()`.

MemberPress mengatur akses lewat Rules. Tema tidak menggantikan aturan tersebut.

### Opsi C — Easy Digital Downloads

Tema menampilkan produk `download` dari EDD. Proteksi file mengikuti konfigurasi
EDD dan plugin membership yang dipakai. Untuk pembatasan per level, gunakan
integrasi membership yang mendukung EDD, atau proteksi halaman Library dan file
lewat aturan server.

## 5. Halaman Studio

Studio adalah dashboard front-end, bukan editor baru:

- Pengunjung yang belum login melihat gate login/join.
- User dengan role **Subscriber** bisa membaca, tetapi belum bisa menulis.
- User dengan role **Contributor** atau lebih tinggi melihat daftar draft,
  jadwal, dan tulisan mereka, plus tombol **New essay** ke editor WordPress.

Membership dan izin menulis adalah dua hal terpisah. Berikan role Contributor
kepada member yang memang menulis.

## 6. Import demo content (opsional)

1. **Tools → Import → WordPress**.
2. Install importer jika diminta.
3. Upload `demo-content.xml`.
4. Set **Settings → Reading → Posts page** ke Journal jika belum.
5. Cek template Library, Studio, dan Tags; importer biasanya menyimpan template,
   tetapi pastikan di Page Attributes.

Demo berisi empat essay, tag, dan empat halaman. Gambar cover tidak disertakan;
tema membuat cover geometris otomatis saat tidak ada featured image.

## 7. Kustomisasi

- **Warna dan tipografi**: token di bagian atas `style.css`, plus palette di
  `theme.json` untuk block editor.
- **Hero, URL membership, footer**: Appearance → Customize → Visualis settings.
- **Menu**: Primary dan Footer.
- **Widget**: satu area Footer (opsional).
- **Cover otomatis**: warna dipilih dari ID post, label dari tag pertama.
- **Filter download**: `visualis_download_post_types` untuk menambah post type lain.
- **Filter membership**: `visualis_is_member` untuk plugin membership kustom.

## 8. Checklist setelah instalasi

- [ ] Front page menampilkan hero, essay terbaru, tag, dan shelf.
- [ ] Menu mobile bisa dibuka/tutup dengan keyboard.
- [ ] `/tags/` menampilkan daftar tag.
- [ ] Single essay menampilkan cover, meta, tag, author box, dan related posts.
- [ ] Halaman Library menampilkan file dari plugin.
- [ ] Pengunjung tanpa login melihat CTA join/login di Library.
- [ ] File terkunci saat dibuka tanpa membership.
- [ ] Member bisa membuka file.
- [ ] Studio menampilkan draft untuk Contributor.
- [ ] Pencarian dan halaman 404 berfungsi.
- [ ] Tampilan nyaman di lebar 360px, 768px, dan desktop.

## 9. Troubleshooting

| Gejala | Penyebab / solusi |
| --- | --- |
| Shelf kosong | Belum ada download published, atau plugin download belum aktif. |
| File bisa diunduh tanpa login | Proteksi plugin/level belum diatur. Tema tidak memproteksi file. |
| CTA join mengarah ke login | Tidak ada plugin membership aktif dan URL membership belum diisi di Customizer. |
| Studio bilang tidak bisa publish | User belum punya role Contributor atau lebih tinggi. |
| Hero masih memakai teks default | Ubah di Appearance → Customize → Visualis settings. |
| Font tidak sesuai | Google Fonts diblokir jaringan/CSP. Ganti font di `style.css` dan `theme.json`. |

## 10. Catatan keamanan

- Tema tidak pernah menampilkan URL file langsung; kartu menuju permalink download.
- Tetap batasi akses file di plugin membership/download. Tema bukan lapisan proteksi.
- Jangan menaruh file berbayar di folder upload publik tanpa aturan proteksi.
- Update WordPress, tema, dan plugin secara rutin.
