<template>
  <div class="wrap-sidebar desktop">
    <div class="profile-sidebar">
    
      <a href="/"><img alt="lendot logo" :src="require('~/assets/uploads/logoapp.svg')" /></a> 
      <div class="user-details">
        <p class="full-name">{{ currentUser.username }}</p>
        <p class="user-email">{{ currentUser.email }}</p>
        <button class="border-button edit-profile"
          @click="this.$router.replace({ path: '/loanerScreen/accountSettings' })">Edit Profile</button>

        <button @click="logout" class="border-button logout"> Logout </button>
      </div>
      <div class="help-area">
        <p class="help-title">Need Help?</p>

        <button class="fill-button contact-us">Contact Us</button>
      </div>
    </div>
  </div>
</template>

<script>
import { User } from "~/models/user";
export default {
  name: "profileSidebar",
  data() {
    return {};
  },
  methods: {
    logout() {
      $nuxt.$fire.auth.signOut();
      localStorage.removeItem("currentUser");
      localStorage.removeItem("createRequestData");
      localStorage.removeItem("emailVerified");

    },
  },
  created() { },
  computed: {
    currentUser: function () {
      return this.$store.state.currentUser;
    },
  },
};
</script>

<style>
.profile-sidebar {
  height: 100%;
  width: 299px;
  background-color: var(--custom-blue);
  position: fixed;
}

.user-details {
  margin-top: 104px;
  color: white;
  margin-left: 59px;
}

.user-details .full-name,
.help-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
}

.user-details .user-email {
  margin-bottom: 26px;
}

.help-area {
  margin-top: 71px;
  margin-left: 59px;
  color: white;
}

.help-area .contact-us {
  margin-top: 19px;
}

.wrap-sidebar {
  width: 299px;
  position: relative;
  z-index: 1;
}

.edit-profile,.logout {
  line-height: 19px;
}
.logout{
  margin-top:13px;display: block;
}
</style>