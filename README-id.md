# VMock - Platform Analisis Resume Bertenaga AI

[English](README.md) | **Bahasa Indonesia**

VMock adalah platform analisis resume komprehensif yang memanfaatkan kecerdasan buatan untuk memberikan feedback instant dan personal pada resume. Platform ini membantu pencari kerja mengoptimalkan CV mereka untuk impact, presentasi, kompetensi, dan kompatibilitas ATS (Applicant Tracking System).

## 🚀 Fitur

- **Analisis AI Instant**: Dapatkan feedback resume komprehensif dalam waktu kurang dari 90 detik
- **Optimasi ATS**: Pastikan resume Anda lolos melalui Applicant Tracking Systems
- **Feedback Detail**: Terima saran baris per baris dalam berbagai kategori:
  - Impact (pencapaian terukur, hasil, outcome yang dapat diukur)
  - Presentasi (format, struktur, keterbacaan, organisasi)
  - Kompetensi (keahlian relevan, keselarasan pengalaman, kata kunci industri)
- **Dukungan File**: Upload resume dalam format PDF atau DOCX
- **Autentikasi User**: Sistem login/signup aman dengan NextAuth
- **Pelacakan Riwayat**: Lacak semua analisis resume Anda
- **Dashboard Interaktif**: Feedback visual dengan chart dan breakdown detail
- **Desain Responsif**: Bekerja sempurna di desktop dan mobile

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.2.4** - Framework React untuk produksi
- **React 19** - Versi terbaru React
- **TypeScript** - JavaScript dengan type safety
- **Tailwind CSS 4.1.9** - Framework CSS utility-first
- **Radix UI** - Library komponen UI headless
- **Lucide React** - Library ikon yang indah
- **React Hook Form** - Form performa tinggi dengan validasi mudah
- **Zod** - Validasi schema TypeScript-first

### Backend & Database
- **Neon Database** - Database PostgreSQL serverless
- **NextAuth.js** - Autentikasi untuk Next.js
- **bcryptjs** - Password hashing

### AI & Pemrosesan Dokumen
- **Google Gemini AI** - Analisis resume bertenaga AI
- **ConvertAPI** - Konversi dokumen dan ekstraksi teks

### Komponen UI
- **shadcn/ui** - Komponen yang dapat digunakan ulang menggunakan Radix UI dan Tailwind CSS
- **Recharts** - Visualisasi data dengan Recharts
- **Sonner** - Notifikasi toast
- **Next Themes** - Theme switching

### Tools Development
- **PostCSS** - Pemrosesan CSS
- **ESLint** - Code linting
- **Autoprefixer** - CSS vendor prefixing

## 📁 Struktur Proyek

```
vmock/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── analysis/      # Endpoint analisis resume
│   │   ├── analyze/       # Pemrosesan analisis
│   │   ├── auth/          # Endpoint autentikasi
│   │   └── user/          # Endpoint terkait user
│   ├── auth/              # Halaman autentikasi
│   ├── dashboard/         # Dashboard user
│   ├── history/           # Riwayat analisis
│   ├── upload/            # Halaman upload resume
│   └── layout.tsx         # Layout utama
├── components/            # Komponen React yang dapat digunakan ulang
│   ├── ui/               # Komponen shadcn/ui
│   ├── icons/            # Komponen ikon custom
│   └── ...               # Komponen spesifik fitur
├── lib/                  # Fungsi utilitas dan konfigurasi
│   ├── ai-analysis.ts    # Logika analisis AI
│   ├── database.ts       # Koneksi database
│   ├── resume-parser.ts  # Utilitas parsing resume
│   └── utils.ts          # Utilitas umum
├── hooks/                # Custom React hooks
├── scripts/              # Script database
├── styles/               # Style global
└── public/               # Asset statis
```

## 🚦 Memulai

### Prasyarat

- Node.js 18+ terinstall
- Package manager pnpm
- Akun Neon Database
- Google Gemini API key
- ConvertAPI key (untuk pemrosesan dokumen)

### Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/arnoldart/vmock.git
   cd vmock
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Setup environment variables**
   ```bash
   cp env-sample .env.local
   ```
   
   Isi environment variables yang diperlukan:
   ```env
   DATABASE_URL=your_neon_database_url
   GEMINI_API_KEY=your_gemini_api_key
   CONVERT_API_KEY=your_convert_api_key
   ```

4. **Setup database**
   ```bash
   # Jalankan script migrasi database
   # Eksekusi SQL script di scripts/001-create-vmock-tables.sql
   ```

5. **Jalankan development server**
   ```bash
   pnpm dev
   ```

6. **Buka browser**
   Navigasi ke [http://localhost:3000](http://localhost:3000)

## 📊 Cara Kerja

1. **Upload Resume**: User mengupload resume mereka dalam format PDF atau DOCX
2. **Pemrosesan AI**: Sistem mengekstrak teks dan mengirimnya ke Google Gemini AI untuk analisis
3. **Generasi Analisis**: AI menganalisis resume dalam berbagai dimensi:
   - Perhitungan skor keseluruhan
   - Skor kategori spesifik (Impact, Presentasi, Kompetensi)
   - Penilaian kompatibilitas ATS
   - Feedback baris per baris
   - Rekomendasi yang dapat ditindaklanjuti
4. **Tampilan Hasil**: User menerima dashboard komprehensif dengan:
   - Breakdown skor visual
   - Bagian feedback detail
   - Saran perbaikan spesifik
   - Tips optimasi ATS

## 🎯 Kategori Analisis Utama

### Impact (0-100)
- Pencapaian dan hasil terukur
- Outcome dan metrik yang dapat diukur
- Bahasa berorientasi aksi

### Presentasi (0-100)
- Format dan struktur
- Keterbacaan dan organisasi
- Daya tarik visual dan konsistensi

### Kompetensi (0-100)
- Keselarasan keahlian relevan
- Optimasi kata kunci industri
- Progres pengalaman

### Kompatibilitas ATS (0-100)
- Optimasi kata kunci
- Kepatuhan format standar
- Pengenalan header bagian

## 🔧 Script yang Tersedia

```bash
# Development
pnpm dev          # Mulai development server

# Production
pnpm build        # Build untuk produksi
pnpm start        # Mulai production server

# Kualitas Kode
pnpm lint         # Jalankan ESLint
```

## 🤝 Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/fitur-luar-biasa`)
3. Commit perubahan Anda (`git commit -m 'Tambah fitur luar biasa'`)
4. Push ke branch (`git push origin feature/fitur-luar-biasa`)
5. Buka Pull Request


## 🙋‍♂️ Dukungan

Jika Anda memiliki pertanyaan atau butuh bantuan untuk memulai, silakan:
- Buka issue di GitHub
- Hubungi tim development
- Periksa dokumentasi

## 🌟 Penghargaan

- Google Gemini AI untuk kemampuan analisis resume yang powerful
- Neon Database untuk PostgreSQL serverless yang reliable
- Radix UI untuk primitif komponen yang accessible
- Komunitas open-source untuk tools dan library yang luar biasa

---

Dibuat dengan ❤️ oleh [Arnold](https://github.com/arnoldart)
