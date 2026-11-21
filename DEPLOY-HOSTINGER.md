# Deploy Visualis Journal ke Hostinger

## Arsitektur yang dipakai

- **Frontend** (React + Vite): file statis di folder `dist/`, di-upload ke Hostinger.
- **Backend, database, auth, download member**: Convex Cloud, berjalan terpisah dari Hostinger.

Hostinger shared hosting hanya perlu menyajikan file statis. Tidak perlu Node.js server
di Hostinger. Semua query, login, dan download tetap diproses oleh Convex.

> Ini bukan tema WordPress. Untuk versi WordPress, dibutuhkan paket tema terpisah.

---

## 0. Yang perlu disiapkan

- Akun Convex dan akses ke project ini di dashboard Convex.
- Node.js 20+ dan Bun (atau npm) di komputer.
- Domain yang sudah terhubung ke Hostinger dan SSL aktif.

---

## 1. Extract dan install

```bash
unzip visualis-journal-source.zip
cd visualis-journal
bun install
```

Jika tidak memakai Bun:

```bash
npm install
```

---

## 2. Deploy backend ke Convex production

```bash
bunx convex login
bunx convex deploy
```

`convex deploy` akan membuat deployment production dan mencetak URL seperti:

```
https://nama-project.convex.cloud
```

Simpan URL tersebut — dipakai sebagai `VITE_CONVEX_URL`.

### Environment variable di Convex production

Buka Convex Dashboard → project → Settings → Environment Variables → **Production**,
lalu isi:

| Variable | Nilai |
| --- | --- |
| `SITE_URL` | `https://domainkamu.com` (harus sama persis dengan domain) |
| `JWT_PRIVATE_KEY` | Diperlukan Convex Auth. Generate mengikuti dokumentasi Convex Auth. |
| `JWKS` | Diperlukan Convex Auth. Generate mengikuti dokumentasi Convex Auth. |
| `VLY_INTEGRATION_KEY` | Hanya untuk email OTP. Tanpa ini guest sign-in tetap jalan, email OTP gagal. |

Catatan:

- Convex Auth butuh `JWT_PRIVATE_KEY` dan `JWKS` di deployment produksi, bukan hanya di dev.
  Cara termudah: jalankan CLI Convex Auth pada project ini dan ikuti instruksinya, atau
  salin konfigurasi yang sudah ada di deployment dev lewat dashboard Convex.
- `SITE_URL` yang salah adalah penyebab paling umum login berputar kembali ke `/auth`.
- Email OTP memakai gateway integrasi Freebuff. Kalau key tersebut tidak tersedia di
  deployment produksi, gunakan **Continue as a guest** atau sambungkan provider email
  sendiri.

Setelah mengubah environment variable, jalankan ulang:

```bash
bunx convex deploy
```

---

## 3. Build frontend untuk production

Buat file `.env.production` di root project (jangan commit file ini):

```dotenv
VITE_CONVEX_URL=https://nama-project.convex.cloud
```

Lalu build:

```bash
bun run build
```

Hasil build ada di folder `dist/`. Isinya:

```
dist/index.html
dist/assets/...
dist/logo.svg
dist/manifest.webmanifest
dist/.htaccess
```

---

## 4. Upload ke Hostinger

1. Masuk **hPanel → Websites → Manage → File Manager**.
2. Buka folder `public_html`.
3. Hapus file bawaan Hostinger seperti `default.php` jika ada.
4. Upload **isi** folder `dist/` (bukan folder `dist`-nya):
   - `index.html`
   - folder `assets/`
   - `logo.svg`
   - `manifest.webmanifest`
   - `.htaccess` (aktifkan **Show hidden files** di File Manager)
5. Pastikan struktur akhirnya `public_html/index.html`, `public_html/assets/...`, dst.

`.htaccess` wajib ikut. Tanpa file itu, membuka `/tags/typography` atau `/posts/...`
langsung akan menghasilkan 404, karena React Router butuh fallback ke `index.html`.

---

## 5. Domain dan SSL

1. hPanel → **Security → SSL** → aktifkan SSL untuk domain.
2. Aktifkan **Force HTTPS**.
3. Buka `https://domainkamu.com` dan pastikan tidak ada peringatan sertifikat.

Kalau memakai subdomain (misalnya `blog.domainkamu.com`), gunakan URL itu di
`SITE_URL` dan saat build.

---

## 6. Checklist uji setelah deploy

- [ ] Landing page memuat 8 essay dan section "The working shelf".
- [ ] `/tags` dan `/tags/typography` bisa dibuka langsung (bukan 404).
- [ ] `/posts/the-grid-is-a-promise` bisa dibuka langsung.
- [ ] `/library` menampilkan 6 file dan status terkunci saat belum login.
- [ ] Klik download tanpa login → diarahkan ke `/auth?returnTo=/library`.
- [ ] Login email OTP atau guest → download file `.md` / `.csv` berhasil.
- [ ] `/studio` bisa membuat dan mem-publish essay.
- [ ] Reload di halaman dalam (contoh `/studio`) tidak 404.

---

## 7. Troubleshooting

| Gejala | Penyebab / solusi |
| --- | --- |
| Reload halaman dalam → 404 | `.htaccess` tidak ter-upload atau `mod_rewrite` tidak aktif. |
| Login berhasil tapi kembali ke halaman login | `SITE_URL` di Convex production salah, atau `JWKS`/`JWT_PRIVATE_KEY` belum di-set. |
| "Could not find public function" | `bunx convex deploy` belum dijalankan, atau `VITE_CONVEX_URL` menunjuk deployment yang salah. |
| Email OTP gagal dikirim | `VLY_INTEGRATION_KEY` tidak ada di production. Pakai guest access. |
| Halaman kosong setelah upload | `assets/` tidak ter-upload, atau `index.html` berada di subfolder yang salah. |
| Download tidak jalan di preview | Browser memblokir download dari iframe; buka situs di tab baru. |

---

## 8. Catatan keamanan dan pemeliharaan

- File `public/downloads/visualis-journal-source.zip` adalah paket ekspor untuk diunduh.
  **Hapus folder `public/downloads/` sebelum build produksi** agar source tidak ikut
  ter-publish di website.
- Jangan commit `.env`, `.env.local`, `.env.production`, atau kunci Convex.
- Isi file download member dilindungi di level server: query publik tidak pernah
  mengirim `content`, dan mutation download menolak pengguna yang belum login.
- Untuk file biner besar (PDF/ZIP/Figma), langkah berikutnya adalah menyimpan file di
  Convex file storage atau object storage dengan signed URL.
