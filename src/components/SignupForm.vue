<template>
  <div class="flex justify-center items-center min-h-screen bg-green-500">
    <div class="bg-white p-8 rounded-md shadow-md w-96">
      <div class="text-center mb-6">
        <img src="../assets/png.png" alt="Your Logo" class="w-24 h-24 mx-auto">
        <h1 class="text-2xl font-bold">Signup</h1>
      </div>
      <form @submit.prevent="handleSignup">
        <div class="mb-4">
          <label for="username" class="block text-gray-700 font-bold mb-2">Username</label>
          <input type="text" id="username" v-model="username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-bold mb-2">Email</label>
          <input type="email" id="email" v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-bold mb-2">Password</label>
          <input type="password" id="password" v-model="password" @focus="passwordFocused = true" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-6">
          <label for="confirm_password" class="block text-gray-700 font-bold mb-2">Confirm Password</label>
          <input type="password" id="confirm_password" v-model="confirm_password" :disabled="!passwordFocused" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="flex items-center justify-between">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Signup</button>
          <router-link to="/login" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Already have an account?</router-link>
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
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      passwordFocused: false,  // Menambahkan flag untuk melacak fokus password
    };
  },
  methods: {
    async handleSignup() {
      // Validasi jika password dan confirm_password cocok
      if (this.password !== this.confirm_password) {
        alert('Passwords tidak sesuai');
        return;
      }

      try {
        const response = await axios.post("http://172.20.10.2/api/register", {
          name: this.username,
          email: this.email,
          password: this.password,
          confirm_password: this.confirm_password
        });

        console.log('Signup data:', response.data);

        // Jika signup berhasil, arahkan ke halaman login
        if (response.data.succses === true) {
          this.$router.push('/login');
        } else {
          alert('Signup gagal. Silakan coba lagi.');
        }
      } catch (error) {
        console.error('Signup error:', error);
        alert('Terjadi kesalahan saat signup.');
      }
    },
  },
};
</script>
