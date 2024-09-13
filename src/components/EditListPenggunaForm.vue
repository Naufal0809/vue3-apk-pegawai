<template>
    <div class="form-container">
      <h1>Edit Pengguna</h1>
      <form @submit.prevent="editUser">
        <div class="pengguna-item">
          <div class="form-group">
            <label for="name">Nama</label>
            <input type="text" id="name" v-model="user.name" placeholder="Isi nama" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="user.email" placeholder="Isi email" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="user.password" placeholder="Isi password" required />
          </div>
          <div class="form-group">
            <label for="confirm_password">Konfirmasi Password</label>
            <input type="password" id="confirm_password" v-model="user.confirm_password" placeholder="Konfirmasi password" required />
          </div>
        </div>
        <div class="button-container">
          <button type="submit" class="btn-save">Simpan Perubahan</button>
          <button type="button" @click="cancel" class="btn-cancel">Batal</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: {
          name: '',
          email: '',
          password: '',
          confirm_password: ''
        }
      };
    },
    created() {
      this.loadUser();
    },
    methods: {
      async loadUser() {
        const id = this.$route.params.id;
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://192.168.21.120:8000/api/users/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          this.user = response.data.data || response.data;
        } catch (error) {
          console.error('Error loading user:', error);
          alert('Gagal memuat data pengguna.');
        }
      },
      async editUser() {
        const id = this.$route.params.id;
        try {
          const token = localStorage.getItem('token');
          await axios.put(`http://192.168.21.120:8000/api/users/${id}`, this.user, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          alert('Edit berhasil!');
          this.$router.push({ name: 'ListPenggunaForm' });
        } catch (error) {
          console.error('Error editing user:', error);
          alert('Terjadi kesalahan saat menyimpan pengguna.');
        }
      },
      cancel() {
        this.$router.push({ name: 'ListPenggunaForm' });
      }
    }
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
  
  .btn-save, .btn-cancel {
    width: 48%;
    padding: 10px 0;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
  
  .btn-save {
    background-color: green;
    color: white;
  }
  
  .btn-save:hover {
    background-color: darkgreen;
  }
  
  .btn-cancel {
    background-color: red;
    color: white;
  }
  
  .btn-cancel:hover {
    background-color: darkred;
  }
  </style>
  