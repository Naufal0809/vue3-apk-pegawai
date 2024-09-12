<template>
  <div class="agenda-form">
    <!-- Tombol Agenda, Akun, Dresscode di atas bacaan "LIST AGENDA PEGAWAI" -->
    <div class="menu-buttons-container">
      <button class="keluar-button" @click="logout">
        Keluar
      </button>
      <div class="center-buttons">
        <button class="menu-button" @click="goToAgenda">
          Agenda
        </button>
        <button class="menu-button" @click="goToAkun">
          Akun
        </button>
        <button class="menu-button" @click="goToDresscode">
          Dresscode
        </button>
        <button class="menu-button" @click="goToDataPegawai">
          DataPegawai
        </button>
      </div>
    </div>
    <div class="header">
      <div class="title">LIST AGENDA PEGAWAI</div>
    </div>
    <input type="date" id="waktu" v-model="start_date" required>
    <input type="date" id="waktu" v-model="end_date" required>
    <button class="copy-button" @click="listAgendaByDate">mencari</button>
    <div class="buttons-container">
      <div class="other-buttons">
        <button class="export-button" @click="exportExcel">Eksport Excel</button>
        
        <download-excel
      :data="filteredAgendaItems"
      :fields="fields"
      name="agenda-data.xls">
        </download-excel>

        <button class="copy-button" @click="copyToWA">Copy to WA</button>
        <button class="tambah-button" @click="addItem">
          + Tambah
        </button>
      </div>
      <div class="search-and-exit">
        <div class="search-bar">
          <input
            type="text"
            placeholder="Search Agenda"
            v-model="searchQuery"
          />
          <button class="search-button" @click="searchAgenda">
            <i class="fa fa-search"></i> Search
          </button>
        </div>
      </div>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Tanggal</th>
            <th>Waktu</th>
            <th>Kegiatan</th>
            <th>Tipe acara</th>
            <th>Tempat</th>
            <th>Delegasi</th>
            <th>Dresscode</th>
            <th>Surat</th>
            <th>Opsi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in filteredAgendaItems"
            :key="item.id"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ item.tanggal }}</td>
            <td>{{ item.waktu }}</td>
            <td>{{ item.kegiatan }}</td>
            <td>{{ item.tipe_acara }}</td>
            <td>{{ item.tempat }}</td>
            <td>{{ item.delegasi }}</td>
            <td>{{ item.drescode }}</td>
            <td><a :href="'http://172.20.10.2/upload/'+ item.file_name " target="_blank">{{ item.original_file}}</a></td>
            <td>
              <div class="action-buttons">
                <button class="edit-button" @click="editItem(item.id)">
                  <i class="fa fa-edit"></i> Edit
                </button>
                <button class="delete-button" @click="deleteItem(item.id)">
                  <i class="fa fa-trash"></i> Hapus
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import * as XLSX from 'xlsx';
import { useNow, useDateFormat } from '@vueuse/core'


export default {
  data() {
    return {
      start_date:'', //filter agenda 
      end_date:'',  //filter agenda
      agendaItems: [], // Menyimpan semua agenda
      searchQuery: '', //untuk mencari agenda 
      tgl:'',
      Fields: { //export to excel
      },
    };
  },
  computed: {
    filteredAgendaItems() {
      return this.agendaItems.filter(item => {
        const query = this.searchQuery.toLowerCase();
        return (
          item.tanggal.toLowerCase().includes(query) ||
          item.kegiatan.toLowerCase().includes(query) ||
          item.tipe_acara.toLowerCase().includes(query) ||
          item.tempat.toLowerCase().includes(query) ||
          item.delegasi.toLowerCase().includes(query) ||
          item.drescode.toLowerCase().includes(query)
        );
      });
    }
  },
  created() {
    this.liatAgenda();
  },
  methods: {
    async exportExcel() {
      const datatoExport = this.filteredAgendaItems.map((item, index) => {
    return {
      No: index + 1,
      Tanggal: item.tanggal,
      Kegiatan: item.kegiatan,
      'Tipe Acara': item.tipe_acara,
      Tempat: item.tempat,
      Delegasi: item.delegasi,
      Dresscode: item.drescode
      
    };
    });
      const ws = XLSX.utils.json_to_sheet(datatoExport);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Agenda');
      XLSX.writeFile(wb, 'agenda-data.xlsx');
      },
    async editItem(id) {
      this.$router.push({ path: '/EditAgenda/' + id });
    },
    async liatAgenda() {
      try {
        var token = localStorage.getItem("token");
        let config = {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }
        const response = await axios.get("http://172.20.10.2/api/agendas-today", config);
        this.agendaItems = response.data.data;
        this.tgl = useDateFormat(useNow(), "dddd, DD MMMM YYYY", {locales:'id-ID'})
      } catch (error) {
        console.error(error);
      }
    },
    async listAgendaByDate() {
      try {
        var token = localStorage.getItem("token");
        let config = {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }
        const response = await axios.get("http://172.20.10.2/api/agenda-by-date?start_date="+this.start_date+"&&end_date="+this.end_date, config); //kaklo get di dalem url kalo post di dalem body 
        this.agendaItems = response.data.data;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteItem(id) {
      if (confirm('Apakah Anda yakin ingin menghapus agenda ini?')) {
        try {
          var token = localStorage.getItem("token");
          let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }
          await axios.delete(`http://172.20.10.2/api/agendas/${id}`, config);
          this.agendaItems = this.agendaItems.filter(item => item.id !== id);
        } catch (error) {
          console.error('Terjadi kesalahan saat menghapus agenda:', error);
        }
      }
    },
    logout() {
      localStorage.removeItem('authToken');
      this.$router.push('/login');
    },
    addItem() {
      this.$router.push('/InputAgendaForm');
    },
    searchAgenda() {
      // Pencarian otomatis sudah diimplementasikan dalam computed property
    },
    goToAgenda() {
      this.$router.push('/AgendaForm');
    },
    goToAkun() {
      this.$router.push('/ListPenggunaForm');
    },
    goToDresscode() {
      this.$router.push('/DresscodeForm');
    },
    goToDataPegawai() {
      this.$router.push('/DataPegawaiForm');
    },
    copyToWA() {
      let agendaString = 'Agenda Kegiatan Biro Pengadaan Barang dan Jasa\n';
      // var tanggal = ''
      if (this.start_date === null) {
        // tanggal = useDateFormat(useNow(), "dddd, DD MMMM YYYY ", {locales:'id-ID'})
      }
      else {
        // tanggal = useDateFormat(this.start_date, "dddd, DD MMMM YYYY ", {locales:'id-ID'})
      }
      // const d = new Date()
      //   d.setDate(d.getDate() + 1)
      // const hari = useDateFormat(useNow(), "dddd, DD MMMM YYYY ", {locales:'id-ID'})
      agendaString += this.tgl+'\n\n\n';
      // console.log(hari)
      this.filteredAgendaItems.forEach((item, index) => {
        agendaString += `${index + 1}. Waktu: ${item.waktu} WIB\n Kegiatan: ${item.kegiatan}\n Tempat: ${item.tempat}\n Delegasi: ${item.delegasi}\n Dresscode: (${item.dresscode})\n\n`;
      });

      // Copy to clipboard
      navigator.clipboard.writeText(agendaString).then(() => {
        alert('Agenda berhasil disalin !');
      }).catch(err => {
        console.error('Gagal menyalin teks: ', err);
      });
    }
  }
};
</script>


<style scoped>
.agenda-form {
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  margin-top: 20px; /* Tambahkan margin-top untuk memberi jarak dari tombol menu */
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
}

.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.menu-buttons-container {
  display: flex;
  justify-content: center; /* Pusatkan tombol di tengah */
  align-items: center;
  margin-bottom: 20px;
  position: relative;
}

.center-buttons {
  display: flex;
  gap: 20px; /* Memberi jarak antar tombol */
  justify-content: center;
}

.menu-button {
  padding: 10px 20px;
  background-color: #17a2b8;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

/* Mengatur tombol "Keluar" berada di sebelah kanan */
.keluar-button {
  padding: 8px 16px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  right: 0; /* Tempatkan di sebelah kanan */
}

.buttons-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.other-buttons {
  display: flex;
  align-items: center;
  gap: 10px; /* Memberi jarak antar tombol */
}

.export-button,
.copy-button,
.tambah-button {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-and-exit {
  display: flex;
  align-items: center;
  gap: 10px; /* Memberi jarak antara search bar dan tombol keluar */
}

.search-bar {
  display: flex;
  align-items: center;
}

.search-bar input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-button {
  padding: 8px 12px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 5px;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.table-container {
  overflow-x: auto; /* Agar tabel responsive pada layar kecil */
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px; /* Menentukan lebar minimum tabel */
}

th,
td {
  padding: 12px 15px;
  border: 1px solid #ccc;
  text-align: left;
}

th {
  background-color: #f8f9fa;
}

.action-buttons {
  display: inline-flex; /* Mengatur tombol agar tampil berdampingan */
  gap: 10px; /* Memberi jarak antara tombol edit dan hapus */
}

.edit-button,
.delete-button {
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-button {
  background-color: #28a745;
  color: #fff;
}

.delete-button {
  background-color: #dc3545;
  color: #fff;
}

.top-left-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align to the left */
  gap: 10px;
}

.date-search-container {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
</style>