<template>
  <div class="page-container">
    <Header />
    <div class="login">
      <img class="len-title about-you-title" :src="require('~/assets/uploads/login_title.svg')"
        alt="login title" />
      <div class="register-link">New to lendot? <NuxtLink to="/createRequest/createAccount"> Create an Account
        </NuxtLink>
      </div>
      <form @submit.prevent="login">
        <label class="form-label">Email Address</label>
        <div class="wrap-input">
          <input type="text" name="email" v-model="email" placeholder="Yourmail@Gmail.com"/>
        </div>

        <label class="form-label"> Password</label>
        <div class="wrap-input wrap-password">
          <input type="password" name="password" :id="'password_field' + 1" class="password-field" v-model="password" placeholder="Password" />
          <img class="show-password" alt="edit icon" :src="require('~/assets/uploads/blue_show_password.svg')"
            @click="(event) => showPassword(event, 1)" />
        </div>
        <NuxtLink to="/resetPassword" class="forgot-password">Forgot password?</NuxtLink>

        <button type="submit" class="">Log In</button>
      </form>

    </div>
  </div>
</template>
<script>
import Header from "~/components/header.vue";
import { getUserByEmail } from "~/services/user-service.js";
export default {
  components: { Header },
  name: "login",
  data() {
    return {
      password: "",
      email: "",
    };
  },
  methods: {
    showPassword(event, id) {
      let password = document.getElementById("password_field" + id);
      let type;
      if (password.getAttribute("type") === "password") {
        type = "text";
        event.target.src = require("~/assets/uploads/blue_hide_password.svg");
      } else {
        type = "password";
        event.target.src = require("~/assets/uploads/blue_show_password.svg");
      }
      password.setAttribute("type", type);
    },
    async login() {
      let email = this.email;
      let password = this.password;
      let self = this;
      await this.$fire.auth
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          self.getLoginUser(email);

          self.$router.replace("/loanerScreen");
        })
        .catch((error) => {
          this.errorCode = error.code;
          this.errorMessage = error.message;
        });
    },
    async getLoginUser(email) {
      let self = this;
      getUserByEmail(email).then((response) => {
        self.$store.commit("setState", {
          value: response,
          state: "currentUser",
        });
        localStorage.setItem("currentUser", JSON.stringify(response))
      });
    },
  },
};
</script>

<style scoped>
.login {
  margin: auto;
  max-width: 808px;
  color: var(--custom-blue);
}

.wrap-password {
  margin-bottom: 10px;
  padding: 0;
  padding-right: 20px;
  box-sizing: border-box;
  border: solid 1px var(--custom-blue);
  border-radius: 11px;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.wrap-password input {
  border: unset;
  outline: none;
}

.register-link {
  margin-top: 10px;
  margin-bottom: 47px;
  font-size: 20px;
  font-weight: 500;
}

.register-link a {
  text-decoration: underline;
  color: var(--custom-blue);
}

button[type="submit"] {
  margin-top: 70px;
}

.forgot-password {
  margin-top: 10px;
  text-align: right;
  color: var(--custom-pink);
}

@media screen and (max-width: 768px) {
  .login {
    margin: 102px 27px;
  }

  .register-link {
    font-size: 12px;
    margin: 8px 0 26px;
  }

  .forgot-password {
    float: right;
    margin-top: 0;
    font-size: 10px;
  }

  .login button[type="submit"] {
    font-size: 12px;
    margin-top: 41px;
  }
}
</style>