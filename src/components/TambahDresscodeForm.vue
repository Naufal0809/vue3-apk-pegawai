<template>
  <div class="form-container">
    <h1>Form Dresscode</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="hari">Hari:</label>
        <input type="text" id="hari" v-model="form.hari" placeholder="Masukkan hari" />
      </div>
      <div class="form-group">
        <label for="dresscode">Dresscode:</label>
        <textarea id="dresscode" v-model="form.dresscode" placeholder="Masukkan dresscode"></textarea>
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
        hari: '',
        dresscode: ''
      }
    };
  },
  created() {
    const index = this.$route.query.index;
    if (index !== undefined) {
      this.fetchDresscode(index);
    }
  },
  methods: {
    async fetchDresscode(index) {
      try {
        var token = localStorage.getItem("token");
        let config = {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };
        const response = await axios.get(`http://172.20.10.2/api/dresscodes/${index}`, config);
        this.form = response.data;
      } catch (error) {
        console.error('Error fetching dresscode:', error);
        alert('Gagal memuat dresscode.');
      }
    },
    async submitForm() {
      if (this.form.hari && this.form.dresscode) {
        try {
          var token = localStorage.getItem("token");
          let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          };

          if (this.$route.query.index) {
            await axios.put(`http://172.20.10.2/api/dresscodes/${this.$route.query.index}`, this.form, config);
          } else {
            await axios.post('http://172.20.10.2/api/dresscodes', this.form, config);
          }
          
          alert('Dresscode berhasil disimpan!');
          this.$router.push('/dresscodeform');
        } catch (error) {
          console.error('Error saving dresscode:', error);
          alert('Terjadi kesalahan saat menyimpan dresscode.');
        }
      } else {
        alert('Harap isi semua kolom');
      }
    },
    cancelForm() {
      this.$router.push('/dresscodeform');
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
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
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
