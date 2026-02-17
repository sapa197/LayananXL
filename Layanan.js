// === FUNGSI BANTUAN UNTUK TAMPILAN MENARIK ===
function warnaTeks(teks, warna) {
  const kodeWarna = {
    biru: "\x1b[34m",
    hijau: "\x1b[32m",
    kuning: "\x1b[33m",
    merah: "\x1b[31m",
    ungu: "\x1b[35m",
    cyan: "\x1b[36m",
    putih: "\x1b[37m",
    reset: "\x1b[0m"
  };
  return `${kodeWarna[warna] || kodeWarna.putih}${teks}${kodeWarna.reset}`;
}

function animasiTeks(teks, kecepatan = 100) {
  return new Promise(resolve => {
    let i = 0;
    const interval = setInterval(() => {
      process.stdout.write(teks[i]);
      i++;
      if (i >= teks.length) {
        clearInterval(interval);
        console.log("\n");
        resolve();
      }
    }, kecepatan);
  });
}

function garisPemisah(karakter = "=", panjang = 50) {
  console.log(warnaTeks(karakter.repeat(panjang), "cyan"));
}


// === DATA PAKET XL KHUSUS ===
const paketXL = [
  {
    id: 1,
    nama: "XL Kuota Harian 2GB",
    harga: 5000,
    masaBerlaku: "24 Jam",
    bonus: "Tanpa Bonus",
    jenis: "Harian",
    tagline: "Cocok untuk kebutuhan mendadak!"
  },
  {
    id: 2,
    nama: "XL Kuota Mingguan 10GB",
    harga: 25000,
    masaBerlaku: "7 Hari",
    bonus: "Bonus 2GB Streaming (Netflix/YouTube)",
    jenis: "Mingguan",
    tagline: "Pas buat aktivitas akhir pekan!"
  },
  {
    id: 3,
    nama: "XL Kuota Bulanan 25GB",
    harga: 100000,
    masaBerlaku: "30 Hari",
    bonus: "Bonus 5GB Game + 10GB Malam (00.00-06.00)",
    jenis: "Bulanan",
    tagline: "Solusi hemat untuk sebulan penuh!"
  },
  {
    id: 4,
    nama: "XL Kuota Unlimited Lite",
    harga: 150000,
    masaBerlaku: "30 Hari",
    bonus: "Unlimited Sosial Media (WA/IG/Facebook)",
    jenis: "Unlimited",
    tagline: "Ngga perlu khawatir kehabisan kuota!"
  },
  {
    id: 5,
    nama: "XL Kuota Anak Sekolah 15GB",
    harga: 75000,
    masaBerlaku: "30 Hari",
    bonus: "Akses Fitur Belajar XL + Filter Konten Aman",
    jenis: "Khusus",
    tagline: "Bimbingan belajar lebih praktis!"
  }
];


// === FUNGSI UTAMA INTERAKTIF ===
async function tampilkanMenuUtama() {
  // Animasi pembuka
  await animasiTeks(warnaTeks("=========================================", "kuning"));
  await animasiTeks(warnaTeks("✨ SELAMAT DATANG DI LAYANAN PAKET XL AXIATA ✨", "hijau"));
  await animasiTeks(warnaTeks("=========================================", "kuning"));

  // Menu pilihan
  while (true) {
    console.log("\n" + warnaTeks("📋 PILIH MENU YANG ANDA INGINKAN:", "ungu"));
    console.log("1. " + warnaTeks("📦 Lihat Semua Paket XL", "biru"));
    console.log("2. " + warnaTeks("🔍 Cari Paket Berdasarkan Kategori", "biru"));
    console.log("3. " + warnaTeks("💳 Beli Paket XL", "biru"));
    console.log("4. " + warnaTeks("📊 Cek Sisa Kuota", "biru"));
    console.log("5. " + warnaTeks("📜 Riwayat Pembelian", "biru"));
    console.log("6. " + warnaTeks("❌ Keluar", "merah"));

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const pilihan = await new Promise(resolve => {
      readline.question(warnaTeks("\nMasukkan nomor pilihan Anda: ", "kuning"), resolve);
      readline.close();
    });

    switch (pilihan) {
      case "1":
        tampilkanSemuaPaket();
        break;
      case "2":
        await cariPaketByKategori();
        break;
      case "3":
        await beliPaketXL();
        break;
      case "4":
        await cekSisaKuotaXL();
        break;
      case "5":
        tampilkanRiwayat();
        break;
      case "6":
        await animasiTeks(warnaTeks("👋 Terima kasih telah menggunakan layanan XL! Sampai jumpa!", "hijau"));
        process.exit();
      default:
        console.log(warnaTeks("❌ Pilihan tidak valid! Silakan coba lagi.", "merah"));
    }
  }
}

function tampilkanSemuaPaket() {
  garisPemisah();
  console.log(warnaTeks("📢 DAFTAR SEMUA PAKET XL AXIATA TERBARU", "hijau"));
  garisPemisah();

  paketXL.forEach((p, idx) => {
    console.log(warnaTeks(`#${idx + 1} | ID Paket: ${p.id}`, "kuning"));
    console.log(`Nama Paket: ${warnaTeks(p.nama, "biru")}`);
    console.log(`Harga: ${warnaTeks("Rp " + p.harga.toLocaleString(), "hijau")}`);
    console.log(`Masa Berlaku: ${p.masaBerlaku}`);
    console.log(`Bonus: ${p.bonus}`);
    console.log(`Tagline: ${warnaTeks(p.tagline, "ungu")}`);
    console.log("\n" + "-".repeat(40) + "\n");
  });
}

async function cariPaketByKategori() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const kategori = await new Promise(resolve => {
    readline.question(warnaTeks("\nMasukkan kategori paket (Harian/Mingguan/Bulanan/Unlimited/Khusus): ", "kuning"), resolve);
    readline.close();
  });

  const paketFilter = paketXL.filter(p => p.jenis.toLowerCase() === kategori.toLowerCase());
  if (paketFilter.length === 0) {
    console.log(warnaTeks("❌ Kategori tidak ditemukan atau tidak ada paket!", "merah"));
    return;
  }

  garisPemisah();
  console.log(warnaTeks(`📦 PAKET XL KATEGORI ${kategori.toUpperCase()}`, "hijau"));
  garisPemisah();

  paketFilter.forEach(p => {
    console.log(`Nama Paket: ${warnaTeks(p.nama, "biru")}`);
    console.log(`Harga: ${warnaTeks("Rp " + p.harga.toLocaleString(), "hijau")}`);
    console.log(`Bonus: ${p.bonus}`);
    console.log("\n" + "-".repeat(40) + "\n");
  });
}

async function beliPaketXL() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const idPaket = await new Promise(resolve => {
    readline.question(warnaTeks("\nMasukkan ID Paket yang ingin dibeli: ", "kuning"), resolve);
    readline.close();
  });

  const paketDipilih = paketXL.find(p => p.id === parseInt(idPaket));
  if (!paketDipilih) {
    console.log(warnaTeks("❌ Paket XL tidak ditemukan!", "merah"));
    return;
  }

  const readlineHP = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const nomorHP = await new Promise(resolve => {
    readlineHP.question(warnaTeks(`Masukkan nomor HP XL untuk paket ${warnaTeks(paketDipilih.nama, "biru")}: `, "kuning"), resolve);
    readlineHP.close();
  });

  // Validasi nomor XL
  const polaXL = /^(\+62|62|0)8(17|18|19|55|56|57)\d{7,9}$/;
  if (!polaXL.test(nomorHP)) {
    console.log(warnaTeks("❌ Nomor HP bukan milik XL atau format salah! (Contoh: 081712345678)", "merah"));
    return;
  }

  const nomorFormat = nomorHP.startsWith("0") ? `+62${nomorHP.slice(1)}` : nomorHP;
  
  // Animasi proses pembelian
  await animasiTeks(warnaTeks("⏳ Sedang memproses pembelian Anda...", "kuning"));
  
  // Simpan transaksi
  const transaksi = {
    idTransaksi: Date.now(),
    paket: paketDipilih.nama,
    harga: paketDipilih.harga,
    nomorHP: nomorFormat,
    tanggal: new Date().toLocaleString("id-ID"),
    operator: "XL Axiata"
  };

  const riwayatXL = JSON.parse(localStorage.getItem("riwayatXL")) || [];
  riwayatXL.push(transaksi);
  localStorage.setItem("riwayatXL", JSON.stringify(riwayatXL));

  // Tampilan konfirmasi menarik
  garisPemisah("🎉", 40);
  console.log(warnaTeks("✅ PEMBELIAN BERHASIL!", "hijau"));
  garisPemisah("🎉", 40);
  console.log(`Paket yang Dibeli: ${warnaTeks(paketDipilih.nama, "biru")}`);
  console.log(`Nomor HP: ${warnaTeks(nomorFormat, "kuning")}`);
  console.log(`Harga: ${warnaTeks("Rp " + paketDipilih.harga.toLocaleString(), "hijau")}`);
  console.log(`Masa Berlaku: ${paketDipilih.masaBerlaku}`);
  console.log(`Waktu Transaksi: ${transaksi.tanggal}`);
  garisPemisah("🎉", 40);
}

async function cekSisaKuotaXL() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const nomorHP = await new Promise(resolve => {
    readline.question(warnaTeks("\nMasukkan nomor HP XL untuk cek sisa kuota: ", "kuning"), resolve);
    readline.close();
  });

  const polaXL = /^(\+62|62|0)8(17|18|19|55|56|57)\d{7,9}$/;
  if (!polaXL.test(nomorHP)) {
    console.log(warnaTeks("❌ Nomor HP bukan milik XL atau format salah!", "merah"));
    return;
  }

  const nomorFormat = nomorHP.startsWith("0") ? `+62${nomorHP.slice(1)}` : nomorHP;
  await animasiTeks(warnaTeks("🔍 Sedang mengecek sisa kuota...", "kuning"));

  // Simulasi data sisa kuota dengan tampilan menarik
  const sisaKuota = {
    nomorHP: nomorFormat,
    sisaData: `${Math.floor(Math.random() * 20) + 1}GB`,
    sisaBonus: `${Math.floor(Math.random() * 10) + 1}GB`,
    masaBerlaku: `${Math.floor(Math.random() * 30) + 1} Hari`,
    paketAktif: paketXL[Math.floor(Math.random() * paketXL.length)].nama
  };

  garisPemisah("📊", 40);
  console.log(warnaTeks("📊 HASIL CEK SISA KUOTA XL", "biru"));
  garisPemisah("📊", 40);
  console.log(`Nomor HP: ${warnaTeks(sisaKuota.nomorHP, "kuning")}`);
  console.log(`Paket Aktif: ${sisaKuota.paketAktif}`);
  console.log(`Sisa Kuota Utama: ${warnaTeks(sisaKuota.sisaData, "hijau")}`);
  console.log(`Sisa Kuota Bonus: ${warnaTeks(sisaKuota.sisaBonus, "hijau")}`);
  console.log(`Masa Berlaku: ${sisaKuota.masaBerlaku}`);
  garisPemisah("📊", 40);
}

function tampilkanRiwayat() {
  const riwayat = JSON.parse(localStorage.getItem("riwayatXL")) || [];
  if (riwayat.length === 0) {
    console.log(warnaTeks("❌ Belum ada riwayat pembelian paket XL.", "merah"));
    return;
  }

  garisPemisah("📜", 40);
  console.log(warnaTeks("📜 RIWAYAT PEMBELIAN PAKET XL", "ungu"));
  garisPemisah("📜", 40);

  riwayat.forEach((t, idx) => {
    console.log(warnaTeks(`#${idx + 1} | ID Transaksi: ${t.idTransaksi}`, "kuning"));
    console.log(`Paket: ${warnaTeks(t.paket, "biru")}`);
    console.log(`Nomor HP: ${t.nomorHP}`);
    console.log(`Harga: ${warnaTeks("Rp " + t.harga.toLocaleString(), "hijau")}`);
    console.log(`Tanggal: ${t.tanggal}`);
    console.log("\n" + "-".repeat(40) + "\n");
  });
}


// === JALANKAN PROGRAM ===
// Catatan: Untuk menjalankan di browser, ganti 'readline' dengan prompt() dan sesuaikan animasi
if (typeof process !== 'undefined' && process.stdout) {
  tampilkanMenuUtama();
} else {
  alert("Program ini lebih optimal dijalankan di lingkungan Node.js untuk tampilan yang menarik!");
  // Versi browser sederhana jika dibutuhkan
  tampilkanSemuaPaket();
}
