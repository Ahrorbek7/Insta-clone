<template>
  <div class="container flex">
    <span v-if="isLoggedIn">
      <button class="bg-red-500 absolute top-2 right-10 w-52 h-12 rounded-md text-white text-lg" @click="handleSignOut"> Logout </button>
    </span>
    <template v-if="$route.path !== '/register'">
      <router-view />
    </template>
    <Navbar v-if="isLoggedIn"/>
  </div>
</template>

<script setup>
  import { onAuthStateChanged, signOut } from 'firebase/auth';
  import { useRouter } from 'vue-router';
  import Navbar from './views/layout/Navbar.vue';
  import { getAuth } from 'firebase/auth';
  import { isLoggedIn } from './state';

  const router = useRouter();

  onAuthStateChanged(getAuth(), (user) => {
    isLoggedIn.value = !!user;
  });

  const handleSignOut = () => {
    signOut(getAuth())
      .then(() => {
        isLoggedIn.value = false;
        router.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
</script>

<style>
  .log-btn:hover {
    background-color: rgb(254, 41, 41);
  }
  .text-lg {
    display: none;
  }
</style>
