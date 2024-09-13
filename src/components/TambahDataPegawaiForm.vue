<template>
    <div class="form-container">
      <h1>Form Data Pegawai</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="nip">NIP:</label>
          <input type="text" id="nip" v-model="form.nip" placeholder="Masukkan NIP" />
        </div>
        <div class="form-group">
          <label for="nama">Nama:</label>
          <input type="text" id="nama" v-model="form.nama" placeholder="Masukkan Nama" />
        </div>
        <div class="button-container">
          <button type="submit" class="btn-simpan">Simpan</button>
          <button @click="cancelForm" class="btn-batal">Batal</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        form: {
          nip: '',
          nama: ''
        }
      };
    },
    created() {
      const index = this.$route.query.index;
      if (index !== undefined) {
        this.fetchDataPegawai(index);
      }
    },
    methods: {
      async fetchDataPegawai(index) {
        try {
          var token = localStorage.getItem("token");
          let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          };
          const response = await axios.get(`http://192.168.21.120:8000/api/pegawais/${index}`, config);
          this.form = response.data;
        } catch (error) {
          console.error('Error fetching data pegawai:', error);
          alert('Gagal memuat data pegawai.');
        }
      },
      async submitForm() {
        if (this.form.nip && this.form.nama) {
          try {
            var token = localStorage.getItem("token");
            let config = {
              headers: {
                'Authorization': 'Bearer ' + token
              }
            };
  
            if (this.$route.query.index) {
              await axios.put(`http://192.168.21.120:8000/api/pegawais/${this.$route.query.index}`, this.form, config);
            } else {
              await axios.post('http://192.168.21.120:8000/api/pegawais', this.form, config);
            }
  
            alert('Data pegawai berhasil disimpan!');
            this.$router.push('/datapegawaiform');
          } catch (error) {
            console.error('Error saving data pegawai:', error);
            alert('Terjadi kesalahan saat menyimpan data pegawai.');
          }
        } else {
          alert('Harap isi semua kolom');
        }
      },
      cancelForm() {
        this.$router.push('/datapegawaiform');
      }
    }
  };
  </script>
  
  <style scoped>
  .form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  .form-group {
    margin-bottom: 20px;
    padding-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .btn-simpan,
  .btn-batal {
    width: 48%;
    padding: 10px 0;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
  
  .btn-simpan {
    background-color: green;
    color: white;
  }
  
  .btn-simpan:hover {
    background-color: darkgreen;
  }
  
  .btn-batal {
    background-color: red;
    color: white;
  }
  
  .btn-batal:hover {
    background-color: darkred;
  }
  </style>
  