<template>
  <div class=""> 
     <button @click="logout"> Logout </button>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  methods: {
    logout() {
      $nuxt.$fire.auth.signOut();
    },
  },
  created() {},
};
</script>
