<template>
  <div class="main-container">
      <div class="admin-menu">
        <div class="menu-item">
          <NuxtLink to="/admin/requests">
            <p class="">Requests</p>
          </NuxtLink>
        </div>

        <div class="menu-item">
          <NuxtLink to="/admin/offers">
            <p class="">Offers</p>
          </NuxtLink>
        </div>
      </div>
          <NuxtChild />

  </div>
</template>

<script>
export default {
  created() {
    if (
      !localStorage.getItem("isAdmin") ||
      !localStorage.getItem("isAdmin") == "true"
    ) {
      let password = prompt("Your message to the user", "");
      if (password != "1234") {
        this.$router.replace({ path: "/login" });
      } else {
        localStorage.setItem("isAdmin", true);
        this.$router.replace({ path: "/admin/requests" });
      }
    }
    else{
      if($nuxt.$route.path == "/admin")
       this.$router.replace({ path: "/admin/requests" });
    }
  },
};
</script>

<style>
.admin-menu {
  display: flex;
  justify-content: left;
  color: black;
  align-items: center;
  position: fixed;
  z-index: 3;
  width: 1200px;
  padding-top: 63px;
  background-color:white;
  top:0
}


.admin-menu .menu-item p {
  margin-right: 57px;
  color: black;
  font-size: 18px;
  text-decoration: underline;
}

.admin-menu .menu-item p:hover {
  color: var(--custom-pink);
}

</style>