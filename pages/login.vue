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
          <input type="text" name="email" v-model="form.email" placeholder="Yourmail@gmail.com" autocomplete="on"/>
           <div
            class="input-errors"
            v-for="(error,i) of errors.email"
            :key="i"
          >
            <div class="input-error-msg">{{ error}}</div>
          </div>
        </div>

        <label class="form-label"> Password</label>
        <div class="wrap-input wrap-password">
          <input type="password" name="password" :id="'password_field' + 1" class="password-field" v-model="form.password" placeholder="Password" autocomplete="on"/>
          <img class="show-password" alt="edit icon" :src="require('~/assets/uploads/blue_show_password.svg')"
            @click="(event) => showPassword(event, 1)" />
                  

        </div> 
         <div
            class="input-errors"
            v-for="(error,i) of errors.password"
            :key="i"
          >
            <div class="input-error-msg">{{ error}}</div>
          </div>
         <p class="error-msg" id="emailError">Wrong password</p>
        <p class="error-msg" id="userError">User not found</p>
        <NuxtLink to="/recetPassword" class="forgot-password">Forgot password?</NuxtLink>

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
      form: {
        password: "",
        email: "",
      },
      errors: {},
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
      let errors = this.errors;
      errors = this.$Validator.checkForm(this.form);
      this.errors = errors;
      if (
        this.errors &&
        Object.keys(this.errors).length === 0 &&
        Object.getPrototypeOf(this.errors) === Object.prototype
      ) {
        let email = this.form.email;
        let password = this.form.password;
        let self = this;
        await this.$fire.auth
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            self.getLoginUser(email);
          })
          .catch((error) => {
            this.errorCode = error.code;
            this.errorMessage = error.message;
            if (error.code == "auth/wrong-password") {
              document.getElementById("emailError").classList.add("show");
              document.getElementById("userError").classList.remove("show");
            }
            if (error.code == "auth/user-not-found") {
              document.getElementById("userError").classList.add("show");
              document.getElementById("emailError").classList.remove("show");
            }
          });
      }
    },
    async getLoginUser(email) {
      let self = this;
      await getUserByEmail(email).then((response) => {
        self.$store.commit("setState", {
          value: response,
          state: "currentUser",
        });
        localStorage.setItem("currentUser", JSON.stringify(response));
        self.$store.commit("setState", {
          value: response,
          state: "currentUser",
        });
        if (localStorage.getItem("createRequestData")) {
          let createRequestStep = JSON.parse(
            localStorage.getItem("createRequestData")
          ).createRequestStep;
          self.$router.replace({
            path: "/createRequest/" + createRequestStep,
          });
        } else {
          self.$router.replace("/loanerScreen");
        }
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
.login {
  margin-top: calc((100vh - 120px) / 2);
  transform: translate(0, -50%);
}
@media screen and (max-width: 768px) {
  .login {
    margin: 102px 27px;
    transform: none;
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