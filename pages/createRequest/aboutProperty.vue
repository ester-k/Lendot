<template>
  <div class="main-container">
        <div class="verify-link"  v-if="!$nuxt.$fire.auth.currentUser"><p>To Complete The Process You Need To Verify The Email</p><button @click="verifyEmail">Verify Now</button></div>

    <img
      class="len-title about-you-title desktop"
      :src="require('~/assets/uploads/about_property_title.svg')"
    />
     <img
      class="len-title about-you-title mobile"
      :src="require('~/assets/uploads/about_property_title_mobile.svg')"
    />
    <form @submit.prevent="sendRequest" id="form">
      <label class="form-label">Loan Purpose</label>
      <div class="wrap-input flex loan-purpose">
        <input
          type="button"
          name="purchase"
          value="Purchase"
          class="purpose-type purchase active"
          data-selected="true"
          @click="selectLoanPurpose($event)"
        />
        <input
          type="button"
          name="refinance"
          value="Refinance"
          class="purpose-type refinance"
          data-selected="false"
          @click="selectLoanPurpose($event)"
        />
      </div>

      <div class="inputs-flex">
        <div class="left-input">
          <label class="form-label"> Expected Close Date</label>
          <!-- date -->
          <div class="wrap-input">
            <input
              type="date"
              name="close date"
              class="date-input"
            />
          </div>
        </div>
        <!-- price -->
        <div>
          <label class="form-label">Purchase Price</label>

          <div class="wrap-input left-input">
            <input
              type="text"
              name="purchase price"
              placeholder="Enter A Number"
            />
          </div>
        </div>
      </div>

      <div class="inputs-flex">
        <div class="left-input">
          <label class="form-label"> Rehab/Construction Budget</label>

          <div class="wrap-input">
            <input
              type="text"
              name="rehab"
              placeholder="Enter A Number"
            />
         
          </div>
        </div>

        <div>
          <label class="form-label">Estimated After Completion Value:</label>

          <div class="wrap-input left-input">
            <input
              type="text"
              name="estimated"
              placeholder="Enter A Number"
            />
           
          </div>
        </div>
      </div>
    
  <!-- <recaptcha /> -->

      <!-- <ReCaptcha /> -->
      <button type="submit" @click="recaptcha">Send</button>
    </form>
  </div>
</template>

<script>
// import ReCaptcha from "~/components/reCaptcha.vue";
//vuelidate
import useVuelidate from "@vuelidate/core";
import { required, maxLength, minLength, numeric } from "@vuelidate/validators";
// import { LoanRequest } from "~/models/request";
import { getRequestById, updateRequest } from "~/services/request-service";
// import Select from "~/components/select.vue";
export default {
  name: "aboutProperty",
  // components: { ReCaptcha, Select },
  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      defaultSelect: "-Select-",
      address: "",
      city: "",
      zip: "",
      state: "",
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
      purpose: "purchase",
      date: "",
      price: "",
      rehab: "",
      estimated: "",
      loanPurpose: "purchase",
      propertyType: "",
      credit: "",
      score: "",
      type: "",
    };
  },
  validations() {
    return {
      date: { required },
      price: { required, numeric },
      rehab: { required, numeric },
      estimated: { required, numeric },
    };
  },
  watch: {
    $route(to, from) {
      this.$nextTick(this.showCheckedLoan);
    },
  },
  methods: {
    selectLoanPurpose(event) {
      let selected = event.srcElement;
      if (selected.getAttribute("data-selected") == "false") {
        // add active class to selected button
        selected.classList.add("active");
        // remove active class from selected button
        let secontPurpose = document
          .querySelector(".loan-purpose")
          .querySelector('input[name="' + this.loanPurpose + '"');
        secontPurpose.classList.remove("active");
        secontPurpose.setAttribute("data-selected", "false");

        this.loanPurpose = selected.getAttribute("name");
        selected.setAttribute("data-selected", "true");
      }
    },
    async sendRequest() {
      //get the loan request
      let requestId = localStorage.getItem("requestId");
      // let isFormCorrect = await this.v$.$validate();
      // if (isFormCorrect) {
        let updateLoan = {};
        updateLoan.purpose = this.loanPurpose;
        updateLoan.closeDate = this.date;
        updateLoan.price = this.price;
        updateLoan.rehab = this.rehab;
        updateLoan.estimated = this.estimated;
        updateLoan.credit = this.credit;
        await getRequestById(requestId).then(async (loanReq) => {
          //update the loan property
          // let updateLoan = new LoanRequest();
          updateLoan._id = loanReq._id;
          updateLoan.status = "623c434201cfc93560df213e"; //wating for offers
          await updateRequest(updateLoan).then((updateLoan) => {
            localStorage.removeItem("requestId");
            localStorage.removeItem("loanType");
            localStorage.removeItem("createProperty");
            localStorage.removeItem("createRequestData");
            localStorage.setItem("finishAuthProcess", "true");
            // this.$store.state.createAccountStep = 1;
            this.$router.replace({ path: "/loanerScreen" });
          });
        });
      // }
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
    changeCredit(data) {
      this.credit = data;
    },
    verifyEmail: function () {
      this.$store.commit("setState",  {value:3,state:"createAccountStep"});
      this.$router.replace({ path: "/createRequest/createAccount" });
    },
  },
  created() {
    this.$emit("updateRequestData", {
      key: "createRequestStep",
      value: "aboutProperty",
    });
  },
  computed: {
    emailVerified: function () {
      return localStorage.getItem("emailVerified") == "true";
    },
  },
  async mounted() {
    try {
      await this.$recaptcha.init();
    } catch (e) {
      console.error(e);
    }
  },
};
</script>

<style>
.loan-purpose {
  width: 382px;
  border-radius: 0;
}

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
.inputs-flex {
  display: flex;
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
@media screen and (max-width: 768px) {
  .loan-purpose {
    width: 264px;
  }
  .inputs-flex {
    display: block;
  }
  button[type="submit"] {
    margin-top: 32px;
  }
}
</style>