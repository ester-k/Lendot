<template>
  <div class="reset-password">
    <Header />
    <div class="main-container">
      <img class="len-title  desktop" :src="require('~/assets/uploads/reset_pass_title.svg')" alt="reset password" />
      <div class="intro">Please enter your email and we’ll send you a link that will reset your password.</div>
      <label class="form-label">Email Address</label>
      <div class="wrap-input">
        <input type="text" name="email" class="email" v-model="email" placeholder="yourmail@gmail.com" />
        <p class="error-msg" id="emailError"> We do not recognize this email. Recommend trying to sign up</p>
      </div>
      <button type="submit" @click="resetPassword">Reset Password</button>
      <NuxtLink to="/login" class="link"> back to log in </NuxtLink>
    </div>
  </div>
</template>

<script>
import Header from "~/components/header.vue";
import { getUserByEmail } from "~/services/user-service.js";
export default {
  name: "resetPassword",
  components: { Header },

  asyncData() {
    return {
      email: "",
    }
  },
  methods: {

    resetPassword() {
      let auth = this.$fire.auth;
      let actionCodeSettings = {
        url: window.location.origin + "/login",
        handleCodeInApp: true,
      };
      auth.sendPasswordResetEmail(this.email, actionCodeSettings)
        .then(() => {
          console.log('Password reset email sent!');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode == "auth/user-not-found") {
            document.getElementById("emailError").classList.add("show")
          }
        });
    },

  }
};
</script>

<style scoped>
.intro {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 34px;
}

button[type="submit"] {
  width: 229px;
  height: 52px;
  margin-bottom: 13px;
  margin-right: auto;
  margin-left: 0;
}

.error-msg {
  margin-bottom: 41px;
  display: none;
}

.error-msg.show {
  display: block;
}
</style>