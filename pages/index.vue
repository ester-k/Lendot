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
  created() {
    
    
    // TODO: get this popup function out of here
    $(document).on("click", function (event) {
      if (event.target.classList.contains("popup-opened")) {
        document.getElementById("app").classList.remove("popup-opened");
        return;
      }
    });
  },
};
</script>
