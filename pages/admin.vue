<template>
  <div>
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
  },
};
</script>

<style>
</style>