<template>
  <nav>
    <router-link to="/loginForm"></router-link> 
    <router-link to="/signupForm"></router-link> 
    <router-link to="/Agenda"></router-link> 
    <router-link to="/InputAgenda"></router-link> 
    <router-link to="/EditAgenda"></router-link> 
    <router-link to="/EditDresscode"></router-link> 
    <router-link to="/TambahDresscode"></router-link> 
    <router-link to="/Dresscode"></router-link> 
    <router-link to="/ListPengguna"></router-link>

  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>