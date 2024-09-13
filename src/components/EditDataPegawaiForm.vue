<template>
    <div class="container">
      <div class="form-container">
        <h1>Edit Data Pegawai</h1>
        <form @submit.prevent="EditDataPegawaiForm">
          <div class="form-group">
            <label for="nip">NIP</label>
            <input type="text" id="nip" v-model="pegawai.nip" disabled />
          </div>
          <div class="form-group">
            <label for="nama">Nama</label>
            <input type="text" id="nama" v-model="pegawai.nama" placeholder="Masukkan Nama Pegawai" />
          </div>
          <div class="button-container">
            <button type="submit" class="btn-edit">Simpan Perubahan</button>
            <button type="button" @click="cancel" class="btn-cancel">Batal</button>
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
        pegawai: {
          nip: '',
          nama: ''
        }
      };
    },
    created() {
      this.loadDataPegawai();
    },
    methods: {
      async loadDataPegawai() {
        const id = this.$route.params.id; // Ambil ID dari parameter URL
        try {
          const token = localStorage.getItem('token'); // Ambil token dari localStorage
          const response = await axios.get(`http://192.168.21.120:8000/api/pegawais/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}` // Sertakan Bearer token dalam header
            }
          });
          console.log('Loaded data pegawai:', response.data);
          this.pegawai = response.data.data || response.data; // Sesuaikan dengan struktur data API
        } catch (error) {
          console.error('Error loading data pegawai:', error);
          alert('Gagal memuat data pegawai.');
        }
      },
      async EditDataPegawaiForm() {
        const id = this.$route.params.id; // Ambil ID dari parameter URL
        try {
          const token = localStorage.getItem('token'); // Ambil token dari localStorage
          await axios.put(`http://192.168.21.120:8000/api/pegawais/${id}`, this.pegawai, {
            headers: {
              'Authorization': `Bearer ${token}` // Sertakan Bearer token dalam header
            }
          });
          alert('Perubahan berhasil disimpan!');
          this.$router.push('/dataPegawaiForm'); // Redirect ke halaman daftar pegawai
        } catch (error) {
          console.error('Error editing data pegawai:', error);
          alert('Terjadi kesalahan saat menyimpan data pegawai.');
        }
      },
      cancel() {
        this.$router.push('/dataPegawaiForm'); // Redirect ke halaman daftar pegawai
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
  
  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box;
  }
  
  .button-container {
    display: flex;
    gap: 10px; /* Jarak antara tombol */
  }
  
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
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
  