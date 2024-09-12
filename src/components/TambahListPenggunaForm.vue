<template>
    <div class="form-container">
      <h1>Tambah Pengguna</h1>
      <div class="pengguna-item">
        <div class="form-group">
          <label>Nama:</label>
          <input v-model="pengguna.nama" type="text" placeholder="Isi nama" required />
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input v-model="pengguna.email" type="email" placeholder="Isi email" required />
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input v-model="pengguna.password" type="password" placeholder="Isi password" required />
        </div>
        <div class="form-group">
          <label>Confirm Password:</label>
          <input v-model="pengguna.confirmPassword" type="password" placeholder="Confirmasi password" required />
        </div>
      </div>
      <div class="button-container">
        <button @click="tambahPengguna" class="tambah-btn">Tambah Pengguna</button>
        <button @click="batal" class="batal-btn">Batal</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        pengguna: {
          nama: '',
          email: '',
          password: '',
          confirmPassword: ''
        }
      };
    },
    methods: {
      async tambahPengguna() {
        if (this.pengguna.password !== this.pengguna.confirmPassword) {
          alert("Password dan konfirmasi password tidak cocok");
          return;
        }
  
        try {
          const token = localStorage.getItem('token');
          const config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          };
  
          const response = await axios.post('http://172.20.10.2/api/users', {
            name: this.pengguna.nama,
            email: this.pengguna.email,
            password: this.pengguna.password,
            confirm_password: this.pengguna.confirmPassword,
          }, config);
  
          if (response.data.success === true) {
            alert('Pengguna berhasil ditambahkan');
            this.pengguna = { nama: '', email: '', password: '', confirmPassword: '' };
            this.$router.push({ name: 'ListPenggunaForm' });
          }
        } catch (error) {
          console.error('Error menambahkan pengguna:', error);
          alert('Terjadi kesalahan saat menambahkan pengguna');
        }
      },
      batal() {
        this.$router.push({ name: 'ListPenggunaForm' });
      },
    },
  };
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
  
  .pengguna-item {
    margin-bottom: 20px;
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
  
  .form-group input {
    width: 100%;
    max-width: 400px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .tambah-btn, .batal-btn {
    width: 48%;
    padding: 10px 0;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
  
  .tambah-btn {
    background-color: green;
    color: white;
  }
  
  .tambah-btn:hover {
    background-color: darkgreen;
  }
  
  .batal-btn {
    background-color: red;
    color: white;
  }
  
  .batal-btn:hover {
    background-color: darkred;
  }
  </style>
  