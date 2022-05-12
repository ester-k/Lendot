<template>
  <div class="main-container">
    <div class="verify-link"><p>To Complete The Process You Need To Verify The Email</p><button @click="verifyEmail">Verify Now</button></div>

    <div class="about-loan-container">

      <img
        class="len-title about-you-title desktop"
        :src="require('~/assets/uploads/about_loan_title.svg')"
        alt="about the loan title"
      />
         <img
        class="len-title about-you-title mobile"
        :src="require('~/assets/uploads/about_loan_title_mobile.svg')"
        alt="about the loan title"
      />
      <label class="form-label"> Loan Amount</label>
      <div class="wrap-input loan-amount">
        <input
          type="string"
          name="loan amount"
        />
      </div>
      <h3 class="sub-title">What type of loan are you looking for?</h3>
      <div class="loans-types">
        <div
          class="loan-type"
          :data-type="loan.name"
          @mouseover="loanTypeHover"
          @mouseleave="loanTypeOut"
          @click="selectLoan"
          v-for="(loan, i) of loans"
          :key="i"
        >
          <div class="wrap-type">
            <img
              :src="require('~/assets/uploads/' + loan.src)"
              :active-src="require('~/assets/uploads/' + loan.hoverSrc)"
              :leave-src="require('~/assets/uploads/' + loan.src)"
            />
          </div>
          <p>{{ loan.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jQuery from "jquery";
const $ = jQuery;
window.$ = $;
import useVuelidate from "@vuelidate/core";
import { required, numeric } from "@vuelidate/validators";

// import { LoanRequest } from "~/models/request";
import { getRequestById, updateRequest } from "~/services/request-service";

export default {
  name: "aboutLoan",
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      amount: { required, numeric },
    };
  },
  data() {
    return {
      show: true,
      amount: "",
      loans: [
        {
          name: "Fix & Flip",
          src: "fix_icon.svg",
          hoverSrc: "fix_hover.svg",
        },
        {
          name: "Ground Up",
          src: "group_icon.svg",
          hoverSrc: "group_hover.svg",
        },
        {
          name: "Multifamily Bridge",
          src: "multifamily_bridge_icon.svg",
          hoverSrc: "mulifamily_bride_hover.svg",
        },
        {
          name: "Single Property Rental",
          src: "single__icon.svg",
          hoverSrc: "single_hover.svg",
        },
        {
          name: "Rental Portfolios",
          src: "rental_icon.svg",
          hoverSrc: "rental_hover.svg",
        },
        {
          name: "Multifamily Term",
          src: "multifamily_icon.svg",
          hoverSrc: "multifamily_hover.svg",
        },
      ],
    };
  },

  methods: {
    loanTypeHover: function (event) {
      let loanType = $(event.srcElement).closest(".loan-type")[0];
      loanType.classList.add("active");
      loanType.querySelector("img").src = loanType
        .querySelector("img")
        .getAttribute("active-src");
    },
    loanTypeOut: function (event) {
      let loanType = $(event.srcElement).closest(".loan-type")[0];
      if (!loanType.classList.contains("checked")) {
        loanType.classList.remove("active");
        loanType.querySelector("img").src = loanType
          .querySelector("img")
          .getAttribute("leave-src");
      }
    },
    selectLoan: async function (event) {
      if (event.isTrusted) {
        let loanType = $(event.srcElement).closest(".loan-type")[0];
        loanType = loanType.getAttribute("data-type");
        let isFormCorrect = await this.v$.$validate();
        if (loanType && isFormCorrect) {
          //save loan property on local storage
          localStorage.setItem("loanType", loanType);
          localStorage.setItem("loanAmount", this.amount);

          this.$router.replace({ path: "/createRequest/createProperty" });
        }
        //update the request loan type
        if (
          localStorage.getItem("requestId") != "undefined" &&
          localStorage.getItem("requestId") != "" &&
          localStorage.getItem("requestId") != null
        ) {
          let requestId = localStorage.getItem("requestId");
          await getRequestById(requestId).then(async (loanReq) => {
            //update the loan property
            let updateLoan =  {};
            updateLoan = loanReq;
            updateLoan.loanType = loanType;
            updateLoan.amount = this.amount;
            await updateRequest(updateLoan).then((updateLoan) => {
              // localStorage.removeItem("requestId");
              // this.$router.replace({ path: "/" });
              console.log(updateLoan);
            });
          });
        }
      } else {
        let loan = event.srcElement;
        loan.classList.add("active", "checked");
        loan.querySelector("img").src = loan
          .querySelector("img")
          .getAttribute("active-src");
      }
    },
    verifyEmail:function(){
 this.$store.commit("setAccountStep", 3);      this.$router.replace({ path: "/createRequest/createAccount" });
    }
  },
  created() {
    this.$emit("updateRequestData", {
      key: "createRequestStep",
      value: "aboutLoan",
    });
    if (localStorage.getItem("loanType") != undefined) {
      this.loanType = localStorage.getItem("loanType");
    }
    if (localStorage.getItem("loanAmount") != undefined) {
      this.amount = localStorage.getItem("loanAmount");
    }
    document.addEventListener("DOMContentLoaded", function (event) {
      //sign the selected loan
      let loanType = localStorage.getItem("loanType");
      let loans = document.querySelectorAll(".loan-type");
      loans = [...loans];
      let loan = loans.find(
        (loan) => loan.getAttribute("data-type") == loanType
      );
      if (loan) loan.click(event);
    });
  },
  watch: {
    $route(to, from) {
      if (this.loanType == "") {
        if (!to.path.indexOf("createAccount") > 0)
          this.$router.replace({ path: "/" });
      } else {
        let activeRoute = document.querySelector(".router-link-active");
        activeRoute.querySelector(".step-button").classList.add("complete");
        let activeRouteImg = activeRoute.querySelector("img");
        activeRouteImg.src = require("~/assets/uploads/v_icon.svg");
        this.$emit("updateRequestData", {
          key: "steps",
          value: "true",
          step: "aboutLoan",
        });
      }
    },
  },
  computed: {
    loanType: function () {
      return localStorage.getItem("loanType") || "";
    },
  },
};
</script>

<style scoped>
.about-loan-container {
  max-width: 473px;
}
.loans-types {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.loan-type {
  text-align: center;
  margin-bottom: 17px;
  width: 146px;
  cursor: pointer;
}
.loan-amount {
      margin-bottom: 10px;
    padding: 0 20px;
    box-sizing: border-box;
    border: solid 1px var(--custom-blue);
    border-radius: 11px;
    font-size: 16px;
    display: flex;
    align-items: center;
}
.loan-amount input{
  outline:none;
  border:unset
}
.wrap-type {
  border: 1.5px solid var(--custom-blue);
  border-radius: 11px;
  height: 108px;
  display: flex;
  margin-bottom: 4px;
}
.wrap-type img {
  margin: auto;
}
.loan-type.active .wrap-type,
.loan-type.selected .wrap-type {
  border: 2px solid var(--custom-pink);
  background-color: var(--custom-light-pink);
}
.loan-type.active p {
  color: var(--custom-pink);
}
.form-label {
  display: block;
}

@media screen and (max-width: 768px) {
  .loan-type {
    width: 90px;
    /* height:67px */
    margin-right: 13px;
  }
  .loan-type img {
    height:50%
  }
  .loans-types{
    justify-content:left;
  }
  .wrap-type{
    height:65px;
  }
  .loan-type p{
  font-size:12px;
  }
  .sub-title{
    font-size:13px
  }
}
</style>