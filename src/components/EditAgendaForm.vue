<template>
  <div class="container">
    <div class="form-container">
      <h1>Edit Agenda</h1>
      <form @submit.prevent="edit">
        <div class="form-group">
          <label for="tanggal">Tanggal</label>
          <input type="date" id="tanggal" v-model="agenda.tanggal" required>
        </div>
        <div class="form-group">
          <label for="waktu">Waktu</label>
          <input type="time" id="waktu" v-model="agenda.waktu" required>
        </div>
        <div class="form-group">
          <label for="Kegiatan">Kegiatan</label>
          <input type="text" id="kegiatan" v-model="agenda.kegiatan" required>
        </div>
        <div class="form-group">
          <label for="tempat">Tempat</label>
          <input type="text" id="tempat" v-model="agenda.tempat" required>
        </div>
        <div class="form-group">
          <label>Tipe Acara</label>
          <div class="radio-group">
            <input type="radio" id="offline" value="Offline" v-model="agenda.lokasi">
            <label for="offline">Offline</label>
            <input type="radio" id="online" value="Online" v-model="agenda.lokasi">
            <label for="online">Online</label>
          </div>
        </div>
        <div class="form-group">
          <label for="delegasi">Delegasi</label>
          <textarea id="delegasi" v-model="agenda.delegasi" required></textarea>
        </div>
        <div class="form-group">
          <label for="drescode">Drescode</label>
          <textarea id="drescode" v-model="agenda.drescode" required></textarea>
        </div>
        <div class="form-group">
          <label for="upload">Upload Surat</label>
          <input type="file" id="upload"  required>
        </div>
        <div class="button-group">
          <button type="submit">Edit</button>
          <button type="button" class="cancel-button" @click="cancel">Batal</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      agenda: {
        tanggal: '',
        waktu: '',
        kegiatan: '',
        tempat: 'offline',
        tipe_acara: '',
        delegasi: '',
        drescode: '',
        upload: '',
      },
    };
  },
  created() {
    this.liatAgenda();
  },
  methods: {
    async liatAgenda() {
      const id = this.$route.params.id;
      try {
        const token = localStorage.getItem('token'); // Ambil token dari localStorage
        const response = await axios.get("http://172.20.10.2/api/agendas/" + id, {
          headers: {
            'Authorization': `Bearer ${token}` // Tambahkan Bearer token di header
          }
        });
        this.agenda = response.data.data;
      } catch (error) {
        console.error(error);
      }
    },
    async edit() {
      const id = this.$route.params.id;
      try {
        const token = localStorage.getItem('token'); // Ambil token dari localStorage
        await axios.put('http://172.20.10.2/api/agendas/' + id, this.agenda, {
          headers: {
            'Authorization': `Bearer ${token}` // Tambahkan Bearer token di header
          }
        });
        alert('Edit berhasil!'); // Pemberitahuan berhasil
        this.$router.push('/agendaForm'); // Redirect ke halaman AgendaForm
      } catch (error) {
        console.error(error.response || error);
      }
    },
    cancel() {
      this.$router.push('/agendaForm'); // Batal dan kembali ke halaman AgendaForm
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form-container {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
}

.radio-group {
  display: flex;
  align-items: center;
}

.radio-group input {
  margin-right: 5px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.cancel-button {
  background-color: red;
}

.cancel-button:hover {
  background-color: darkred;
}
</style>
