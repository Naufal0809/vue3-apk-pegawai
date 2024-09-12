<template>
  <div class="container">
    <h1>Tambah Agenda</h1>
    <form @submit.prevent="InputAgenda">
      <div class="form-group">
        <label for="tanggal">Tanggal:</label>
        <input type="date" id="tanggal" v-model="agenda.tanggal" required>
      </div>
      <div class="form-group">
        <label for="waktu">Waktu:</label>
        <input type="time" id="waktu" v-model="agenda.waktu" required>
      </div>
      <div class="form-group">
        <label for="Kegiatan">Kegiatan:</label>
        <input type="text" id="Kegiatan" v-model="agenda.kegiatan" required>
      </div>
      <div class="form-group">
        <label for="tipeAcara">Tipe Acara:</label>
        <div class="radio-group">
          <label>
            <input type="radio" name="tipe_acara" value="offline" v-model="agenda.tipe_acara">
            Offline
          </label>
          <label>
            <input type="radio" name="tipe_acara" value="online" v-model="agenda.tipe_acara">
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
          :placeholder="agenda.tipe_acara === 'offline' ? 'Masukkan nama tempat' : 'Masukkan link (Zoom, GMeet, dll.)'"
          required
        >
      </div>
      <div class="form-group">
        <label for="delegasi">Delegasi:</label>
        <!-- <textarea id="delegasi" v-model="agenda.delegasi" required></textarea> -->
        <VueMultiselect
        v-model="agenda.delegasi"
        :options="['andra','naufal','adit']"
        :searchable="true"
        :multiple="true">

    </VueMultiselect>
    {{ agenda.delegasi }}

      </div>
      <div class="form-group">
        <label for="drescode">Drescode:</label>
        <input type="text" id="drescode" v-model="agenda.drescode" required>
      </div>
      <div class="form-group">
        <label for="upload">Upload Surat:</label>
        <input type="file" id="upload"  @change="onFileChange"> 
      </div>
      <button type="submit">Tambah</button>
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
        lokasi: '', // Digunakan untuk tempat atau link acara
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
.container {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
}

.radio-group {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.radio-group label {
  margin-right: 10px;
}

button {
  background-color: green;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: darkgreen;
}

</style>