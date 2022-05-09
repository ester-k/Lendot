<template>
  <div class="page-container">
    <Header />
    <div class="create-password">
      <form @submit.prevent="createPassword">
        <h3>Create your password</h3>

        <label>New Password</label>
        <div class="wrap-input">
          <input
            type="password"
            name="password"
            :id="'password_field' + 1"
            class="password-field"
          />
          <img
            class="show-password"
            alt="edit icon"
            :src="require('~/assets/uploads/blue_show_password.svg')"
            @click="(event) => showPassword(event, 1)"
          />
        </div>
       

        <label> Confirm New Password</label>
        <div class="wrap-input">
          <input
            type="password"
            name="confirm password"
            :id="'password_field' + 2"
            class="password-field"
          />
          <img
            class="show-password"
            alt="edit icon"
            :src="require('~/assets/uploads/blue_show_password.svg')"
            @click="(event) => showPassword(event, 2)"
          />
        </div>
      
        <button type="submit" class="">Save</button>
      </form>
      <div class="form-terms">
        <div class="form-term">
          <img
            class="term-icon"
            :src="require('~/assets/uploads/form-term-icon.svg')"
          />
          <p>At least 8 characters</p>
        </div>
        <div class="form-term">
          <img
            class="term-icon"
            :src="require('~/assets/uploads/form-term-icon.svg')"
          />
          <p>
            A mixture of both uppercase and lowercase letters A mixture of
            letters and numbers
          </p>
        </div>
        <div class="form-term">
          <img
            class="term-icon"
            :src="require('~/assets/uploads/form-term-icon.svg')"
          />
          <p>Inclusion of at least one special character, e.g., ! @ # ? ]</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import Header from "~/components/header.vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength, sameAs } from "@vuelidate/validators";
import { updateUser } from "~/services/user-service.js";
import { updateUserStatus } from "~/services/user-service.js";

// import { User } from "../models/user";
// import firebase from "firebase";
export default {
  name: "CreatePassword",
  components: { Header },
  data() {
    return {
      password: "",
      confirmPassword: "",
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      password: {
        required,
        minLength: minLength(8),
      },
      confirmPassword: { required, sameAsPassword: sameAs(this.password) },
    };
  },
  methods: {
    showPassword(event, id) {
      let password = document.getElementById("password_field" + id);
      let type;
      if (password.getAttribute("type") === "password") {
        type = "text";
        event.target.src = require("@/assets/uploads/blue_hide_password.svg");
      } else {
        type = "password";
        event.target.src = require("@/assets/uploads/blue_show_password.svg");
      }
      password.setAttribute("type", type);
    },
    createPassword: async function() {
      // let confirmPassword = await this.v$.$validate();
      // if (confirmPassword) {
        let updatedUser = {};
        updatedUser = JSON.parse(localStorage.getItem("currentUser"));
        updatedUser["password"] = this.password;

      //   const ip = await this.$axios.post(
      //   "http://localhost:5000/user/createUser",
      //   user
      // );
      // console.log(ip);
        await updateUser(updatedUser._id, updatedUser).then((res) => {

          localStorage.setItem("currentUser", JSON.stringify(updatedUser));
          let currentStep=JSON.parse(localStorage.getItem("createRequestData"));
          if(!currentStep||currentStep.createRequestStep=="createAccount" )
          this.$router.replace({
            path: "/createRequest/aboutLoan",
          });
          else
           this.$router.replace({
            path: "/createRequest/"+currentStep.createRequestStep,
          });
        });
      // }
    },
    confirmSignIn: async function () {
      if (this.$fire.auth.isSignInWithEmailLink(window.location.href)) {
        let email = localStorage.getItem("emailForSignIn");
        if (!email) {
          console.log("not email");
        }
        let user = await this.$fire.auth
          .signInWithEmailLink(email, window.location.href)
          .then((result) => {
            // Clear email from storage.
            window.localStorage.removeItem("emailForSignIn");
            let userFromFB = result.user;
            localStorage.setItem("currentUser", JSON.stringify(result.user));
            //save on mongo with isActive=false
            this.updateUser(userFromFB.email, true);
            localStorage.setItem("emailVerified", true);
            this.$store.state.createAccountStep = 1;
            localStorage.setItem("createAccountStep", 1);
            // localStorage.removeItem("verifyEmail");
          })
          .catch((error) => {
            console.log("error", error);
          });
      } else {
        if (window.location.pathname == "/createRequest") {
          if (localStorage.getItem("createRequestStep")) {
            this.$router.replace({
              path: "/createRequest/",
            });
          } else {
            if (this.emailVerified != true) {
              this.$router.replace({
                path: "/createRequest/createAccount",
              });
            } else
              this.$router.replace({
                path: "/createRequest/aboutLoan",
              });
          }
        }
      }
    },
    updateUser: async function (email, isActive) {
      await updateUserStatus(email, isActive).then((updateUser) => {
        let cUser = JSON.parse(localStorage.getItem("currentUser"));
        cUser["_id"] = updateUser._id;
        cUser["firstName"] = updateUser.firstName;
        cUser["lastName"] = updateUser.lastName;
        cUser["username"] = cUser["firstName"] + " " + cUser["lastName"];
        cUser["phone"] = updateUser.phone;
        localStorage.setItem("currentUser", JSON.stringify(cUser));
      });
    },
  },
  created: async function () {
    await this.confirmSignIn(this.url);
  },
};
</script>

<style scoped>
.create-password {
  margin: auto;
  max-width: 808px;
  color: var(--custom-blue);
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.create-password h3 {
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 30px;
  margin-top: 30px;
}
.create-password label {
  font-size: 20px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 7px;
}
.form-terms {
  font-size: 18px;
  margin-top: 105px;
}
.form-terms p {
  max-width: 283px;
  display: inline-block;
}
.form-terms .form-term {
  margin-bottom: 32px;
  display: flex;
  align-items: start;
}
.form-terms .term-icon {
  margin-right: 17px;
  margin: 5px 17px 0 0;
}
button[type="submit"] {
  width: 190px;
  margin-left: unset;
  margin-top: 30px;
}
.wrap-input {
  margin-bottom: 10px;
  padding: 0 20px;
  box-sizing: border-box;
  border: solid 1px var(--custom-blue);
  border-radius: 11px;
  font-size: 16px;
  display: flex;
  align-items: center;
}
input,
input:focus,
input:focus-visible {
  border: unset;
  outline: none;
}
</style>