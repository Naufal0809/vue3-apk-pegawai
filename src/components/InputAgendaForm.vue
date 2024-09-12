<template>
  <div class="form-container">
    <h1>Tambah Agenda</h1>
    <form @submit.prevent="InputAgenda">
      <div class="form-group">
        <label for="tanggal">Tanggal:</label>
        <input type="date" id="tanggal" v-model="agenda.tanggal" placeholder="Isi tanggal" required />
      </div>
      <div class="form-group">
        <label for="waktu">Waktu:</label>
        <input type="time" id="waktu" v-model="agenda.waktu" placeholder="Isi waktu" required />
      </div>
      <div class="form-group">
        <label for="kegiatan">Kegiatan:</label>
        <input type="text" id="kegiatan" v-model="agenda.kegiatan" placeholder="Isi kegiatan" required />
      </div>
      <div class="form-group">
        <label>Tipe Acara:</label>
        <div class="radio-group">
          <label>
            <input type="radio" id="offline" value="Offline" v-model="agenda.tipe_acara" />
            Offline
          </label>
          <label>
            <input type="radio" id="online" value="Online" v-model="agenda.tipe_acara" />
            Online
          </label>
        </div>
      </div>
      <div class="form-group">
        <label for="tempat">Tempat:</label>
        <input
          type="text"
          id="tempat"
          v-model="agenda.tempat"
          :placeholder="agenda.tipe_acara === 'Offline' ? 'Masukkan nama tempat' : 'Masukkan link (Zoom, GMeet, dll.)'"
          required
        />
      </div>
      <div class="form-group">
        <label for="delegasi">Delegasi:</label>
        <VueMultiselect
          v-model="agenda.delegasi"
          :options="['andra','naufal','adit']"
          :searchable="true"
          :multiple="true"
          placeholder="Pilih delegasi"
        />
        {{ agenda.delegasi }}
      </div>
      <div class="form-group">
        <label for="drescode">Dresscode:</label>
        <input type="text" id="drescode" v-model="agenda.drescode" placeholder="Isi dresscode" required />
      </div>
      <div class="form-group">
        <label for="upload">Upload Surat:</label>
        <input type="file" id="upload" @change="onFileChange" />
      </div>
      <button type="submit" class="submit-btn">Tambah</button>
    </form>
  </div>
</template>


<script>
import axios from 'axios';
import VueMultiselect from 'vue-multiselect'
export default {
  components: { VueMultiselect },
  data() {
    return {
      selected: null,
      options: ['list', 'of', 'options'],
      pegawais:'',
      agenda: {
        tanggal: '',
        waktu: '',
        kegiatan: '',
        tipe_acara: '',
        // lokasi: '', // Digunakan untuk tempat atau link acara
        delegasi: [],
        drescode: '',
        file: '',
      },
    };
  },
  mounted() {
      this.fetchPegawais();
    },
  methods: {
    onFileChange(e) {
      this.agenda.file = e.target.files || e.dataTransfer.files;
      console.log(this.file);  
    },
    async fetchPegawais() {
        try {
          var token = localStorage.getItem("token");
          let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          };
          const response = await axios.get('http://172.20.10.2/api/pegawais', config);
          this.pegawais = response.data.data;
        } catch (error) {
          console.error('Error fetching pegawai:', error);
          alert('Gagal memuat data pegawai.');
        }
      },
    async InputAgenda() {
      try {
        var token = localStorage.getItem("token");
        let config = {
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'multipart/form-data'
          }
        };
        const { data } = await axios.post('http://172.20.10.2/api/agendas', {
          tanggal: this.agenda.tanggal,
          waktu: this.agenda.waktu,
          kegiatan: this.agenda.kegiatan,
          tempat: this.agenda.tempat,
          tipe_acara: this.agenda.tipe_acara, // Selalu kirim lokasi baik untuk offline maupun online
          delegasi: this.agenda.delegasi.toString(),
          drescode: this.agenda.drescode,
          file: this.agenda.file[0],
        }, config);
        console.log(data);

        // Setelah berhasil menambahkan agenda, arahkan ke halaman AgendaForm
        this.$router.push('/AgendaForm');
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.radio-group {
  display: flex;
  justify-content: center;
  align-items: center;
}

.radio-group label {
  margin-right: 20px;
}

button.submit-btn {
  width: 100%;
  padding: 10px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button.submit-btn:hover {
  background-color: darkgreen;
}
</style>