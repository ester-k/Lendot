<template>
  
</template>

<script>
export default {
created(){
     $nuxt.$fire.auth.signOut();
      localStorage.clear();
}
}
</script>

<style>

</style>