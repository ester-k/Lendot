<template>
  <div id="create-account" class="main-container">
    <div class="main-content" v-if="createAccountStep == 1||!createAccountStep">
      <img
        class="len-title about-you-title desktop"
        :src="require('~/assets/uploads/about_you_title.svg')"
      />
      <img
        class="len-title about-you-title mobile"
        :src="require('~/assets/uploads/about_you_title_mobile.svg')"
      />
      {{a}}
  <form @submit.prevent="createUserOnDB">
        <label class="form-label"> Name</label>
        <div class="flex-input">
          <div class="wrap-input left-input">
            <input
              :disabled="emailVerified"
              type="text"
              name="first name"
              placeholder="First Name"
              v-model="form.firstName"
            />
             <div
            class="input-errors"
            v-for="(error,i) of errors.firstName"
            :key="i"
          >
            <div class="input-error-msg">{{ error}}</div>
          </div>
          </div>
          <div class="wrap-input">
            <input
              :disabled="emailVerified"
              type="text"
              name="last name"
              placeholder="Last Name"
              v-model="form.lastName"

            />
              <div
            class="input-errors"
            v-for="(error,i) of errors.lastName"
            :key="i"
          >
            <div class="input-error-msg">{{ error}}</div>
          </div>
          </div>
        </div>

        <label class="form-label"> Email Address</label>
        <div class="wrap-input">
          <!-- type="email" -->
          <input
            name="email"
              :disabled="emailVerified"
            placeholder="youremail@gmail.con"
            v-model="form.email"

          />
           <div
            class="input-errors"
            v-for="(error,i) of errors.email"
            :key="i"
          >
            <div class="input-error-msg">{{ error}}</div>
          </div>
        </div>
        <label class="form-label"> Phone Number</label>
        <div class="wrap-input">
          <input
            :disabled="emailVerified"
            type="text"
            name="phone"
            placeholder="+9999-9999-9999"
            v-model="form.phone"
          />
           <div
            class="input-errors"
            v-for="(error,i) of errors.phone"
            :key="i"
          >
            <div class="input-error-msg">{{ error}}</div>
          </div>
        </div>
         <label class="form-label"> Credit Score</label>
      <!-- credit score -->  <div class="wrap-input">
        <Select
          class="lendot-select"
          :options="creditScores"
          :default="defaultSelect"
          v-on:input="changeCredit"
        />
          <div
            class="input-errors"
            v-for="(error,i) of errors.credit"
            :key="i"
          >
            <div class="input-error-msg">{{ error}}</div>
          </div>
      </div>
        <div class="flex purchase-cnt">
          <label class="form-label"
            >How many investment properties have you purchased/refinanced in the
            last two years?</label
          >
          <input type="number" placeholder="0" :disabled="emailVerified" />
        </div> 
        
     <div class="next-btn">
        <p class="error-msg" id="emailError">This email address exists,<NuxtLink to="/login"> click here to log in</NuxtLink></p>
        <button type="submit">next</button>
     </div>
      </form> 
    
    </div>
 
    <VerifyEmail
      :currentUser="JSON.stringify(currentUser)"
      v-if="createAccountStep > 1"
      v-model="currentUser"
    />
  </div>
</template>
<script>
// import { User } from ".~/models/user";
import { createUser } from "~/services/user-service";

export default {
  name: "CreateAccount",
  // components: { VerifyEmail },

  data() {
    return {
      form: {
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        credit: "",
      },
      errors: {},
      a: "",
      defaultSelect: "-Select-",
      url: window.location.href,
      emailSend: false,
      currentUser: localStorage.getItem("currentUser"),
      creditScores: [
        { value: "Under 550" },
        { value: "551-600" },
        { value: "601-650" },
        { value: "651-700" },
        { value: "701-750" },
        { value: "751-800" },
        { value: "800+" },
      ],
    };
  },

  watch: {
    $route(to, from) {
      this.$nextTick(this.showCheckedLoan);
    },
  },
  methods: {
    createUserOnDB: async function () {
      let isFormCorrect = this.checkValidForm();
      if (isFormCorrect) {
        // let newUser = new User();
        let newUser = {};
        newUser.firstName = this.form.firstName;
        newUser.lastName = this.form.lastName;
        newUser.username = this.firstName + this.form.lastName;
        newUser.email = this.form.email;
        newUser.phone = this.form.phone;
        newUser.creditScore = this.form.credit;
        this.currentUser = newUser;
        this.$store.commit("setState", {
          value: newUser,
          state: "currentUser",
        });
       await this.createUser(newUser);
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        this.$store.commit("setState", {
          value: newUser,
          state: "currentUser",
        });
        let userForm = JSON.parse(localStorage.getItem("createRequestData"));
        if (!userForm) {
          userForm["steps"] = {};
        }
        userForm.steps["createAccount"].data = newUser;
        localStorage.setItem("createRequestData", JSON.stringify(userForm));
        this.emailSend = true;
      }
    },
    createUser: async function (user) {
      await createUser(user)
        .then((response) => {
          console.log("response",response);
          if (!response.hasOwnProperty("code")) {
            this.$store.commit("setState", {
              value: 2,
              state: "createAccountStep",
            });
            localStorage.setItem("createAccountStep", 2);
          } else {
            if (response.code == 11000) {
              document.getElementById("emailError").classList.add("show");
            }
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    checkValidForm: function () {
      this.a = this.a + " ";
      let errors = this.errors;
      errors = this.$Validator.checkForm(this.form);

      this.errors = errors;
      console.log(this.errors);
      if (
        this.errors &&
        Object.keys(this.errors).length === 0 &&
        Object.getPrototypeOf(this.errors) === Object.prototype
      ) {
        //change the icon
        let activeRoute = document.querySelector(".nuxt-link-exact-active");
        activeRoute.querySelector(".step-button").classList.add("complete");
        let activeRouteImg = activeRoute.querySelector("img");
        activeRouteImg.src = require("~/assets/uploads/v_icon.svg");
        // this.$emit("updateRequestData", {
        //   key: "steps",
        //   value: "true",
        //   step: "createAccount",
        // });

        return true;
      } else {
        console.log("in correct", this.errors);
        return false;
      }
    },
    changeCredit(data) {
      this.form.credit = data;
    },
    showCheckedLoan() {
      let loanType = localStorage.getItem("loanType");
      let loans = document.querySelectorAll(".loan-type");
      if (loans.length) {
        loans = [...loans];
        let loan = loans.find(
          (loan) => loan.getAttribute("data-type") == loanType
        );
        if (loan) loan.click(event);
      }
    },
  },
  created() {
    //if user is logged he can't create account
    if ($nuxt.$fire.auth.currentUser) {
      this.$router.replace("/createRequest");
    }

    this.$emit("updateRequestData", {
      key: "createRequestStep",
      value: "createAccount",
    });
    let userForm = JSON.parse(localStorage.getItem("createRequestData")).steps[
      "createAccount"
    ].data;
    if (userForm) {
      this.email = userForm.email;
      this.firstName = userForm.firstName;
      this.lastName = userForm.lastName;
      this.phone = userForm.phone;
    }
    if (
      !this.$store.state.createAccountStep ||
      !this.$store.state.currentUser
    ) {
      if (!localStorage.getItem("createAccountStep"))
        localStorage.setItem("createAccountStep", {
          value: 1,
          state: "createAccountStep",
        });
    } else {
      localStorage.setItem(
        "createAccountStep",
        this.$store.state.createAccountStep
      );
    }
    this.$store.commit("setState", {
      value: localStorage.getItem("createAccountStep") * 1,
      state: "createAccountStep",
    });
  },

  computed: {
    emailVerified: function () {
      return localStorage.getItem("emailVerified") == "true";
    },
    signUp: function () {
      return localStorage.getItem("signUp") == "true";
    },
    createAccountStep: function () {
      return this.$store.state.createAccountStep;
    },
  },
};
</script>

<style>
.purchase-cnt {
  align-items: center;
  margin-bottom: 61px;
}
.purchase-cnt input[type="number"] {
  width: 60px;
  margin-left: 19px;
  padding: 0;
  padding-right: 10px;
  text-align: center;
}
.purchase-cnt .form-label {
  font-weight: normal;
}
.emil-send .title {
  font-size: 30px;
  font-weight: bold;
}
.emil-send .contact {
  font-size: 20px;
  font-weight: 600;
}
.emil-send .verify-now {
  margin-top: 57px;
  margin-bottom: 26px;
  height: 52px;
  width: 190px;
  font-size: 20px;
}
.emil-send .continue-request {
  font-size: 16px;
  text-decoration: underline;
}

.error-msg a {
  text-decoration: underline;
  color: var(--custom-pink);
}
.next-btn {
  display: flex;
  justify-content: space-between;
}
@media screen and (max-width: 768px) {
  .purchase-cnt input[type="number"] {
    width: 32px;
    padding: 0;
    height: 28px;
  }

  .purchase-cnt {
    margin-bottom: 0;
  }
}
</style>