<template>
    <div class="pegawai-form">
      <div class="header">
        <h1>DATA PEGAWAI</h1>
      </div>
  
      <div class="buttons-container">
        <button class="back-button" @click="goToAgendaForm">
          <i class="fas fa-arrow-left"></i> Back
        </button>
        <button class="add-button" @click="addPegawai">
          <i class="fas fa-plus"></i> Tambah
        </button>
      </div>
  
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>NIP</th>
              <th>Nama</th>
              <th class="col-opsi">Opsi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in pegawais" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.nip }}</td>
              <td>{{ item.nama }}</td>
              <td class="col-opsi">
                <button @click="editPegawai(item.id)" class="btn-edit">Edit</button>
                <button @click="deletePegawai(item.id, index)" class="btn-delete">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        pegawais: []
      };
    },
    methods: {
      async fetchPegawais() {
        try {
          var token = localStorage.getItem("token");
          let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          };
          const response = await axios.get('http://192.168.21.120:8000/api/pegawais', config);
          this.pegawais = response.data.data;
        } catch (error) {
          console.error('Error fetching pegawai:', error);
          alert('Gagal memuat data pegawai.');
        }
      },
      goToAgendaForm() {
        this.$router.push({ name: 'AgendaForm' });
      },
      addPegawai() {
        this.$router.push({ name: 'TambahDataPegawaiForm' });
      },
      editPegawai(id) {
        this.$router.push({ path: 'edit-data-pegawai-form/'+id });
      },
      async deletePegawai(id, index) {
        if (confirm('Anda yakin ingin menghapus data ini?')) {
          try {
            var token = localStorage.getItem("token");
            let config = {
              headers: {
                'Authorization': 'Bearer ' + token
              }
            };
            await axios.delete(`http://192.168.21.120:8000/api/pegawais/${id}`, config);
            this.pegawais.splice(index, 1); // Hapus dari tampilan setelah berhasil dihapus dari server
            alert('Pegawai berhasil dihapus!');
          } catch (error) {
            console.error('Error deleting pegawai:', error);
            alert('Terjadi kesalahan saat menghapus pegawai.');
          }
        }
      }
    },
    mounted() {
      this.fetchPegawais();
    }
  };
  </script>
  
  <style scoped>
  .header {
  text-align: center; /* Center the header text */
  margin-bottom: 20px;
}

.header h1 {
  font-size: 24px; /* Ukuran teks dresscode pegawai lebih kecil */
  font-weight: bold; /* Anda bisa menyesuaikan ketebalan */
}
  .pegawai-form {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
  
  .header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .buttons-container {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    max-width: 500px;
    margin-bottom: 20px;
  }
  
  .back-button {
    background-color: #6c757d;
    color: #fff;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    margin-right: 10px;
  }
  
  .back-button i {
    margin-right: 5px;
  }
  
  .add-button {
    background-color: green;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .add-button i {
    margin-right: 5px;
  }
  
  .back-button:hover {
    background-color: #5a6268;
  }
  
  .add-button:hover {
    background-color: darkgreen;
  }
  
  .table-container {
    width: 100%;
    margin-bottom: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  .col-opsi {
    width: 150px;
  }
  
  .btn-edit {
    background-color: green;
    color: white;
    padding: 5px 10px;
    margin-right: 5px;
    border: none;
    cursor: pointer;
  }
  
  .btn-delete {
    background-color: red;
    color: white;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
  }
  
  .btn-edit:hover {
    background-color: darkgreen;
  }
  
  .btn-delete:hover {
    background-color: darkred;
  }
  </style>
  