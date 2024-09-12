<template>
  <div class="dresscode-form">
    <div class="header">
      <h1>DRESSCODE PEGAWAI</h1>
    </div>

    <div class="buttons-container">
      <button class="back-button" @click="goToAgendaForm">
        <i class="fas fa-arrow-left"></i> Back
      </button>
      <button class="add-button" @click="addDresscode">
        <i class="fas fa-plus"></i> Tambah
      </button>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Hari</th>
            <th>Dresscode</th>
            <th class="col-opsi">Opsi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dresscodes" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.hari }}</td>
            <td>{{ item.dresscode }}</td>
            <td class="col-opsi">
              <button @click="editDresscode(item.id)" class="btn-edit">Edit</button>
              <button @click="deleteDresscode(item.id, index)" class="btn-delete">Delete</button>
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
      dresscodes: []
    };
  },
  methods: {
    async drescodeAgenda() {
      try {
        var token = localStorage.getItem("token");
        let config = {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };
        const response = await axios.get('http://172.20.10.2/api/dresscodes', config);
        this.dresscodes = response.data.data;
      } catch (error) {
        console.error('Error fetching dresscodes:', error);
        alert('Gagal memuat data dresscode.');
      }
    },
    goToAgendaForm() {
      this.$router.push({ name: 'AgendaForm' }); // Arahkan ke halaman AgendaForm
    },
    addDresscode() {
      this.$router.push({ name: 'TambahDresscodeForm' });
    },
    editDresscode(id) {
      this.$router.push({ name: 'EditDresscodeForm', params: { id } });
    },
    async deleteDresscode(id, index) {
      if (confirm('Anda yakin ingin menghapus data ini?')) {
        try {
          var token = localStorage.getItem("token");
          let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          };
          await axios.delete(`http://172.20.10.2/api/dresscodes/${id}`, config);
          this.dresscodes.splice(index, 1); // Hapus dari tampilan setelah berhasil dihapus dari server
          alert('Dresscode berhasil dihapus!');
        } catch (error) {
          console.error('Error deleting dresscode:', error);
          alert('Terjadi kesalahan saat menghapus dresscode.');
        }
      }
    }
  },
  mounted() {
    this.drescodeAgenda();
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

.dresscode-form {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.header {
  text-align: center; /* Center the header text */
  margin-bottom: 20px;
}

.buttons-container {
  display: flex;
  justify-content: flex-start; /* Align buttons to the left */
  width: 100%;
  max-width: 500px; /* Adjust width as needed */
  margin-bottom: 20px;
}

.back-button {
  background-color: #6c757d; /* Grey color for Back button */
  color: #fff; /* White text color */
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 10px; /* Space between Back and Tambah buttons */
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
  background-color: #5a6268; /* Hover color for Back button */
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
