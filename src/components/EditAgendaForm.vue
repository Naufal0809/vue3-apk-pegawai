  <template>
  <div class="form-container">
    <h1>Edit Agenda</h1>
    <form @submit.prevent="edit">
      <div class="form-group">
        <label for="tanggal">Tanggal:</label>
        <input type="date" id="tanggal" v-model="agenda.tanggal" placeholder="Isi tanggal" required />
      </div>
      <div class="form-group">
        <label for="waktu">Waktu:</label>
        <input type="time" id="waktu" v-model="agenda.waktu" placeholder="Isi waktu" required />
      </div>
      <div class="form-group">
        <label for="kegiatan">Kegiatan:</label>
        <input type="text" id="kegiatan" v-model="agenda.kegiatan" placeholder="Isi kegiatan" required />
      </div>
      <div class="form-group">
        <label for="tempat">Tempat:</label>
        <input type="text" id="tempat" v-model="agenda.tempat" placeholder="Isi tempat" required />
      </div>
      <div class="form-group">
        <label>Tipe Acara:</label>
        <div class="radio-group">
          <label>
            <input type="radio" id="offline" value="Offline" v-model="agenda.tipe_acara" />
            Offline
          </label>
          <label>
            <input type="radio" id="online" value="Online" v-model="agenda.tipe_acara" />
            Online
          </label>
        </div>
      </div>
      <div class="form-group">
        <label for="delegasi">Delegasi:</label>
        <VueMultiselect
          v-model="agenda.delegasi"
          :options="['andra','naufal','adit']"
          :searchable="true"
          :multiple="true"
          placeholder="Pilih delegasi"
        />
        {{ agenda.delegasi }}
      </div>
      <div class="form-group">
        <label for="drescode">Dresscode:</label>
        <textarea id="drescode" v-model="agenda.drescode" placeholder="Isi dresscode" required></textarea>
      </div>
      <div class="form-group">
        <label for="upload">Upload Surat:</label>
        <input type="file" id="upload" @change="onFileChange" />
      </div>
      <div class="button-container">
        <button type="submit" class="submit-btn" @click="edit">edit</button>
        <button type="button" class="cancel-btn" @click="cancel">Batal</button>
      </div>
    </form>
  </div>
</template>


<script>
import axios from 'axios';
import VueMultiselect from 'vue-multiselect'

export default {
  components: { VueMultiselect },
  data() {
    return {
      selected: null,
      options: ['list', 'of', 'options'],
      pegawais:'',
      agenda: {
        tanggal: '',
        waktu: '',
        kegiatan: '',
        tipe_acara: '',
        // lokasi: '', // Digunakan untuk tempat atau link acara
        delegasi: [],
        drescode: '',
        file: '',
      },
    };
  },
  created() {
    this.liatAgenda();
  },
  methods: {
    onFileChange(e) {
      this.agenda.file = e.target.files || e.dataTransfer.files;
      console.log(this.agenda.file);  
    },
    async liatAgenda() {
      const id = this.$route.params.id;
      try {
        const token = localStorage.getItem('token'); // Ambil token dari localStorage
        const response = await axios.get("http://192.168.21.120:8000/api/agendas/" + id, {
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
      console.log(this.agenda)
      try {
        var token = localStorage.getItem("token");
        let config = {
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'multipart/form-data'
          }
        };
        const { data } = await axios.post('http://192.168.21.120:8000/api/edit-agendas/' + id , {
          tanggal: this.agenda.tanggal,
          waktu: this.agenda.waktu,
          kegiatan: this.agenda.kegiatan,
          tempat: this.agenda.tempat,
          tipe_acara: this.agenda.tipe_acara, // Selalu kirim lokasi baik untuk offline maupun online
          delegasi: this.agenda.delegasi.toString(),
          drescode: this.agenda.drescode,
          file: this.agenda.file[0],
        }, config);
        console.log(data);
        alert('Edit berhasil!'); // Pemberitahuan berhasil
        // this.$router.push('/agendaForm'); // Redirect ke halaman AgendaForm
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
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
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
  max-width: 400px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.radio-group {
  display: flex;
  justify-content: center;
  align-items: center;
}

.radio-group label {
  margin-right: 20px;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.submit-btn, .cancel-btn {
  width: 48%;
  padding: 10px 0;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.submit-btn {
  background-color: green;
  color: white;
}

.submit-btn:hover {
  background-color: darkgreen;
}

.cancel-btn {
  background-color: red;
  color: white;
}

.cancel-btn:hover {
  background-color: darkred;
}
</style>
