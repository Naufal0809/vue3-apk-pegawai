<template>
  <div class="flex justify-center items-center min-h-screen bg-green-500">
    <div class="bg-white p-8 rounded-md shadow-md w-96">
      <div class="text-center mb-6">
        <img src="../assets/png.png" alt="Your Logo" class="w-24 h-24 mx-auto">
        <h1 class="text-2xl font-bold">Login</h1>
      </div>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="NIP" class="block text-gray-700 font-bold mb-2">NIP</label>
          <input type="Text" id="NIP" v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 font-bold mb-2">Password</label>
          <input type="password" id="password" v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="flex items-center justify-between">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="LoginAgenda">Login</button>
          <router-link to="/signup" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"></router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    async LoginAgenda() {
      try {
        const response = await axios.post("http://172.20.10.2/api/login", {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem("token", response.data.data.token);
        console.log('response data:', response.data);
        console.log('Login credentials:', this.email, this.password);

        // Jika login berhasil, arahkan ke halaman AgendaForm
        if (response.data.success === true ) {
          this.$router.push('/AgendaForm');
        } else {
          // Tampilkan pesan kesalahan jika ada
          alert('Login gagal. Silakan cek email dan password Anda.');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Terjadi kesalahan saat login.');
      }
    },
  }
}
</script>