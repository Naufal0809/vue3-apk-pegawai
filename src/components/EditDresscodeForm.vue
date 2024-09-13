<template>
  <div class="container">
    <div class="form-container">
      <h1>Edit Dresscode</h1>
      <form @submit.prevent="EditDresscodeForm">
        <!-- Kolom Hari -->
        <div class="form-group">
          <label for="hari">Hari</label>
          <input type="text" id="hari" v-model="dresscode.hari" class="form-control">
        </div>
        <!-- Kolom Dresscode -->
        <div class="form-group">
          <label for="dresscode">Dresscode</label>
          <textarea id="dresscode" v-model="dresscode.dresscode" class="form-control"></textarea>
        </div>
        <!-- Tombol Edit dan Batal -->
        <div class="button-container">
          <button type="submit" class="btn btn-edit">Edit</button>
          <button type="button" @click="cancel" class="btn btn-cancel">Batal</button>
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
      dresscode: {
        hari: '',
        dresscode: ''
      }
    };
  },
  created() {
    this.loadDresscode();
  },
  methods: {
    async loadDresscode() {
      const id = this.$route.params.id;
      try {
        const token = localStorage.getItem('token'); // Ambil token dari localStorage
        const response = await axios.get(`http://192.168.21.120:8000/api/dresscodes/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}` // Tambahkan Bearer token di header
          }
        });
        console.log('Loaded dresscode data:', response.data);
        this.dresscode = response.data.data || response.data; // Sesuaikan dengan struktur data
      } catch (error) {
        console.error('Error loading dresscode:', error);
        alert('Gagal memuat data dresscode.');
      }
    },
    async EditDresscodeForm() {
      const id = this.$route.params.id;
      try {
        const token = localStorage.getItem('token'); // Ambil token dari localStorage
        await axios.put(`http://192.168.21.120:8000/api/dresscodes/${id}`, this.dresscode, {
          headers: {
            'Authorization': `Bearer ${token}` // Tambahkan Bearer token di header
          }
        });
        alert('Edit berhasil!');
        this.$router.push('/dresscodeForm'); // Redirect ke halaman daftar dresscode
      } catch (error) {
        console.error('Error editing dresscode:', error);
        alert('Terjadi kesalahan saat menyimpan dresscode.');
      }
    },
    cancel() {
      this.$router.push('/dresscodeForm'); // Kembali ke halaman daftar dresscode
    }
  }
};
</script>


<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
}

.form-container {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
}

.form-control textarea {
  min-height: 100px; /* Sesuaikan tinggi minimal textarea */
}

.button-container {
  display: flex;
  gap: 15px; /* Jarak antar tombol */
  justify-content: flex-start; /* Pastikan tombol berada di sebelah kiri */
}

button {
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.btn-edit {
  background-color: #4CAF50;
  color: white;
}

.btn-edit:hover {
  background-color: #45a049;
}

.btn-cancel {
  background-color: #f44336;
  color: white;
}

.btn-cancel:hover {
  background-color: #c62828;
}
</style>