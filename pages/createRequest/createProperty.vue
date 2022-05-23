<template>
  <div class="main-container">
        <div class="verify-link"  v-if="!$nuxt.$fire.auth.currentUser"><p>To Complete The Process You Need To Verify The Email</p><button @click="verifyNow">Verify Now</button></div>

    <img
      class="len-title about-you-title desktop"
      :src="require('~/assets/uploads/create_property_title.svg')"
    />
     <img
      class="len-title about-you-title mobile"
      :src="require('~/assets/uploads/create_property_title_mobile.svg')"
    />
    <form @submit.prevent="createRequest" id="form">
      <!-- address -->
      <label class="form-label"> Property Address</label>
      <div class="wrap-input left-input">
        <input
          type="text"
          name="address"
          placeholder="Address"
          v-model="form.address"
        />
         <div
            class="input-errors"
            v-for="(error,i) of errors.address"
            :key="i"
          >
            <div class="input-error-msg">{{ error}}</div>
          </div>
      </div>
      <div class="flex-input">
        <div class="wrap-input left-input">
          <input
            type="text"
            name="city"
            placeholder="Property City"
            v-model="form.city"
          />
           <div
            class="input-errors"
            v-for="(error,i) of errors.city"
            :key="i"
          >
            <div class="input-error-msg">{{ error}}</div>
          </div>
        </div>
        <!-- state -->
        <div class="wrap-input left-input">
          <Select
            class="lendot-select"
            :options="stateNames"
            :default="stateDefaultSelect"
            v-on:input="changeState"
          />
            <div
            class="input-errors"
            v-for="(error,i) of errors.state"
            :key="i"
          >
            <div class="input-error-msg">{{ error}}</div>
          </div>
        </div>
        <!-- zip -->
        <div class="wrap-input">
          <input
            type="text"
            name="zip"
            placeholder="Property Zip Code"
            v-model="form.zip"
          />
          <div
            class="input-errors"
            v-for="(error,i) of errors.zip"
            :key="i"
          >
            <div class="input-error-msg">{{ error}}</div>
          </div>
        </div>
      </div>
      <!-- Property Type -->
      <label class="form-label"> Property Type</label>
      <div class="wrap-input">
        <Select
          class="lendot-select"
          :options="propertyTypes"
          :default="typeDefaultSelect"
          v-on:input="changeType"
        />
      </div>
        <div
            class="input-errors"
            v-for="(error,i) of errors.type"
            :key="i"
          >
            <div class="input-error-msg">{{ error}}</div>
          </div>
      <div id="verifyError">Verify your account</div>

      <button type="submit">next</button>
    </form>
  </div>
</template>

<script>
//vuelidate
import useVuelidate from "@vuelidate/core";
import { required, maxLength, minLength, numeric } from "@vuelidate/validators";
import { createRequest } from "~/services/request-service";
// import { LoanRequest } from "~/models/request";

import Select from "~/components/select.vue";
export default {
  name: "aboutProperty",
  components: {
    Select,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      stateDefaultSelect: "-Select-",
      typeDefaultSelect: "-Select-",
      form: {
        address: "",
        city: "",
        zip: "",
        state: "",
        type:""
      },
      errors: {},
      propertyTypes: [
        { value: "Single-Family Residential" },
        { value: "2-4 Residential Unit" },
        { value: "5+ Multifamily" },
        { value: "Mixed-Use Property" },
        { value: "Ground-Up" },
        { value: "Condo" },
        { value: "Land" },
        { value: "Commercial" },
        { value: "Other" },
      ],
      propertyType: "",
      stateNames: [
        { value: "Alabama" },
        { value: "Alaska" },
        { value: "Arizona" },
        { value: "Arkansas" },
        { value: "California" },
        { value: "Colorado" },
        { value: "Connecticut" },
        { value: "Delaware" },
        { value: "Florida" },
        { value: "Georgia" },
        { value: "Hawaii" },
        { value: "Idaho" },
        { value: "Illinois" },
        { value: "Indiana" },
        { value: "Iowa" },
        { value: "Kansas" },
        { value: "Kentucky" },
        { value: "Louisiana" },
        { value: "Maine" },
        { value: "Maryland" },
        { value: "Massachusetts" },
        { value: "Michigan" },
        { value: "Minnesota" },
        { value: "Mississippi" },
        { value: "Missouri" },
        { value: "Montana" },
        { value: "Nebraska" },
        { value: "Nevada" },
        { value: "New Hampshire" },
        { value: "New Jersey" },
        { value: "New Mexico" },
        { value: "New York" },
        { value: "North Carolina" },
        { value: "North Dakota" },
        { value: "Ohio" },
        { value: "Oklahoma" },
        { value: "Oregon" },
        { value: "Pennsylvania" },
        { value: "Rhode Island" },
        { value: "South Carolina" },
        { value: "South Dakota" },
        { value: "Tennessee" },
        { value: "Texas" },
        { value: "Utah" },
        { value: "Vermont" },
        { value: "Virginia" },
        { value: "Washington" },
        { value: "West Virginia" },
        { value: "Wisconsin" },
        { value: "Wyoming" },
      ],
      type: "",
    };
  },

  watch: {
    $route(to, from) {
      this.$nextTick(this.showCheckedLoan);
    },
  },
  methods: {
    async createRequest(event) {
      let errors = this.$Validator.checkForm(this.form);
      this.errors = errors;
      let isFormCorrect =
        this.errors &&
        Object.keys(this.errors).length === 0 &&
        Object.getPrototypeOf(this.errors) === Object.prototype;
        console.log( this.errors );
      if (isFormCorrect) {
        //create new loan request
        let newReq = {};
        newReq.loanType = localStorage.getItem("loanType");
        newReq.amount = localStorage.getItem("loanAmount");
        newReq.propertyAddress = {};
        newReq.propertyAddress.address = this.form.address;
        newReq.propertyAddress.city = this.form.city;
        newReq.propertyAddress.state = this.form.state;
        newReq.propertyAddress.zip = this.form.zip;
        newReq.propertyType = this.form.type;
        localStorage.setItem("createProperty", JSON.stringify(newReq));

        let user = JSON.parse(localStorage.getItem("currentUser"));
        if (!user) {
          document.getElementById("verifyError").style.display = "block";
          return;
        }
        newReq.loanerId = user._id;
        await createRequest(newReq).then((newRequest) => {
          localStorage.setItem("requestId", newRequest._id);
        });
        let activeRoute = document.querySelector(".nuxt-link-exact-active");
        activeRoute.querySelector(".step-button").classList.add("complete");
        let activeRouteImg = activeRoute.querySelector("img");
        activeRouteImg.src = require("~/assets/uploads/v_icon.svg");
        this.$emit("updateRequestData", {
          key: "steps",
          value: "true",
          step: "createProperty",
        });
        this.$router.replace({ path: "/createRequest/aboutProperty" });
      }
    },
    customSelectColor(event) {
      event.srcElement.classList.add("checked");
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
    changeState(data) {
      this.form.state = data;
    },
    changeType(data) {
      this.form.type = data;
    },
    verifyNow: function () {
      // this.$store.commit("setState", { value: 2, state: "createAccountStep" });
      this.$router.replace({ path: "/createRequest/createAccount" });
    },
  },
  created() {
    this.$emit("updateRequestData", {
      key: "createRequestStep",
      value: "createProperty",
    });
    let property = JSON.parse(localStorage.getItem("createProperty"));
    if (property) {
      this.address = property.propertyAddress.address;
      this.city = property.propertyAddress.city;
      this.zip = property.propertyAddress.zip;
      this.stateDefaultSelect = property.propertyAddress.state;
      this.typeDefaultSelect = property.propertyType;
    }
  },
};
</script>

<style>
.loan-purpose .purpose-type {
  color: var(--custom-blue);
  background-color: unset;
}
.loan-purpose .purpose-type.purchase {
  border-radius: 11px 0px 0px 11px;
  border-right: unset;
}
.loan-purpose .purpose-type.refinance {
  border-radius: 0px 11px 11px 0px;
  border-left: unset;
}
.loan-purpose .purpose-type.active {
  background-color: var(--custom-pink);
  color: white;
  border: unset;
}
.inputs-flex div {
  width: 100%;
}

.date-input::-webkit-calendar-picker-indicator {
  opacity: 0;
  position: relative;
  left: 22px;
}
.date-input:after {
  content: url("~/assets/uploads/date_picker.svg");
  background-repeat: no-repeat;
  background-position: 100% center;
  cursor: pointer;
  background-size: 16px;
  height: 19.64px;
}
#verifyError {
  color: var(--custom-pink);
  display: none;
  margin-left: auto;
  width: max-content;
}
</style>