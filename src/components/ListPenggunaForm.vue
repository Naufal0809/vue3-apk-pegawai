<template>
  <div class="user-form">
    <div class="header">
      <div class="title">LIST PENGGUNA</div>
    </div>

    <div class="buttons-container">
      <div class="other-buttons">
        <button class="back-button" @click="goToAgendaForm">
          <i class="fas fa-arrow-left"></i>Back
        </button>
        <button class="add-button" @click="goToAddUser">
          <i class="fas fa-plus"></i> Tambah
        </button>
      </div>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Opsi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button class="edit-button" @click="goToEditUser(user.id)">
                <i class="fa fa-edit"></i> Edit
              </button>
              <button class="delete-button" @click="deleteUser(user.id)">
                <i class="fa fa-trash"></i> Hapus
              </button>
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
      users: [],
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        var token = localStorage.getItem("token");
        let config = {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }
        const response = await axios.get('http://172.20.10.2/api/users', config);
        this.users = response.data.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    goToAddUser() {
      this.$router.push({ name: 'TambahListPenggunaForm' });
    },
    goToEditUser(id) {
      this.$router.push({ name: 'EditListPenggunaForm', params: { id } });
    },
    async deleteUser(id) {
      try {
        var token = localStorage.getItem("token");
        let config = {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }
        await axios.delete(`http://172.20.10.2/api/users/${id}`, config);
        this.fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    goToAgendaForm() {
      this.$router.push({ name: 'AgendaForm' }); // Mengarahkan ke halaman AgendaForm
    }
  },
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
.user-form {
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
}

.title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  position: absolute;
}

.buttons-container {
  display: flex;
  justify-content: flex-start; /* Mengatur agar tombol bersebelahan dari kiri */
  align-items: center;
  margin-bottom: 20px;
}

.other-buttons {
  display: flex;
  gap: 15px; /* Menambahkan jarak antara tombol "Back" dan "Tambah" */
}

.table-container {
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.edit-button,
.delete-button {
  padding: 3px 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
  display: inline-flex;
  align-items: center;
  font-size: 12px;
}

.edit-button {
  background-color: #28a745;
  color: #fff;
}

.delete-button {
  background-color: #dc3545;
  color: #fff;
}

.add-button {
  background-color: #28a745; /* Warna hijau */
  color: #fff; /* Warna teks putih */
  border: none; /* Menghilangkan border default */
  padding: 10px 20px; /* Menambahkan padding */
  border-radius: 5px; /* Menambahkan border-radius */
  cursor: pointer; /* Menampilkan pointer saat hover */
  display: inline-flex; /* Menjaga ikon dan teks berada dalam satu baris */
  align-items: center; /* Menyelaraskan ikon dan teks secara vertikal */
}

.add-button i {
  margin-right: 5px; /* Menambahkan jarak antara ikon dan teks */
}

.back-button {
  background-color: #5a6268; /* Warna abu-abu gelap untuk Back button */
  color: #fff; /* Warna teks putih */
  border: none; /* Menghilangkan border default */
  padding: 10px 20px; /* Menambahkan padding */
  border-radius: 5px; /* Menambahkan border-radius */
  cursor: pointer; /* Menampilkan pointer saat hover */
  display: inline-flex; /* Menjaga ikon dan teks berada dalam satu baris */
  align-items: center; /* Menyelaraskan ikon dan teks secara vertikal */
}

.back-button i {
  margin-right: 5px; /* Menambahkan jarak antara ikon dan teks */
}
</style>
