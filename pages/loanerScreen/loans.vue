<template>
  <div class="loans-container" :class="{ 'open-popup': openViewLoan }">
    <div class="sort-list">
      <p>Sort By:</p>
      <Select :options="sortList" v-on:input="sortLoans" class="sort-select" />
    </div>
    <table class="loans-table">
      <tbody>
        <tr class="wrap-loan" v-for="(loan, index) of loans" :key="index">
          <td
            class="loan-status"
            v-if="loan.status"
            :style="{
              'background-color': statuses[loan.status.name].bgcolor,
              color: statuses[loan.status.name].color,
            }"
          >
            {{ loan.status.name }}
          </td>
          <td class="property-details">
            <p class="property-type">{{loan.propertyType}}</p>
            <p class="property-address" v-if="loan.propertyAddress">
              {{ loan.propertyAddress.state }}, {{ loan.propertyAddress.city }},
              {{ loan.propertyAddress.address }}
            </p>
          </td>
          <td class="loan-details">
            <p class="lender-name" v-if="loan.selectedOffer">
              {{ loan.selectedOffer.lenderId.firstName }}
              {{ loan.selectedOffer.lenderId.lastName }}
            </p>
            <p class="loan-amount">
              {{ loan.amount}}
            </p>
          </td>
          <td class="loan-action">
            <button
              class="border-button"
              @click="
                dynamicFunctionCall(
                  statuses[loan.status.name].action.func,
                  statuses[loan.status.name].action.prop,
                  loan
                )
              "
            >
              {{ statuses[loan.status.name].controller }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <ViewLoan
      :loan="activeLoan"
      v-if="openViewLoan"
      @closePopup="openViewLoan = false"
    />
    <VueCompleteRequest
      :loan="activeLoan"
      v-if="openCompleteRequest"
      @closePopup="openCompleteRequest = false"
    />
    <VueLoan2
      :loan="activeLoan"
      v-if="openViewLoan2"
      @closePopup="openViewLoan2 = false"
    />
  </div>
</template>

<script>
import { LoanRequest } from "~/models/request";
import ViewLoan from "~/components/popups/viewLoan.vue";
import VueCompleteRequest from "~/components/popups/viewCompleteRequest.vue";
import VueLoan2 from "~/components/popups/viewLoan2.vue";
import Select from "~/components/select.vue";

import { getRequestListByLoaner } from "~/services/request-service.js";
import { sortArray } from "~/services/functions/sort.js";
import LoanStatusEnum from "~/enums/statusEnum";
export default {
  name: "Loans",
  components: { ViewLoan, VueCompleteRequest, VueLoan2, Select },
  data() {
    return {
      loans: [],
      activeLoan: {},
      openViewLoan: false,
      openCompleteRequest: false,
      openViewLoan2: false,
      statuses: LoanStatusEnum,
      sortList: [
        { value: " Date asc", data: "createdDate", order: "asc" },
        { value: "Date desc", data: "createdDate", order: "desc" },
        { value: "Value asc", data: "amount", order: "asc" },
        { value: "Value desc", data: "amount", order: "desc" },
      ],
    };
  },
  methods: {
    getLoans: async function () {
      let loanerId = JSON.parse(localStorage.getItem("currentUser"))._id;
      await getRequestListByLoaner(loanerId).then((res) => {
        this.loans = res;
      });
    },
    sortLoans(selected, order) {
      this.loans = sortArray(this.loans, selected, order);
    },
    dynamicFunctionCall(funcionName, params, loan) {
      this[funcionName](params, loan);
    },
    openPopup(params, loan) {
      this.activeLoan = loan;
      this[params.popup] = true;
    },
     navigateAction(propertys, loan) {
      localStorage.setItem("requestToOffers",JSON.stringify(loan))
      this.$router.replace({
        path: propertys.route,
        query: { loan: loan._id },
      });
    },
  },
  created() {
    this.getLoans();
  },
};
</script>

<style scoped>
.loans-container {
 position: relative;
  width: 100%;
}
.loans-table{
      padding-top: calc(93px + 19px + 28px);
}
.wrap-loan {
  height: 90px;
  margin:auto;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  background-color: white;
  margin-bottom: 21px;
  display: flex;
  padding: 21px 30px;
  align-items: center;
  box-sizing: border-box;
    max-width: 1190px;
  justify-content: space-between;
}
.loan-status {
  height: 20px;
  width: 151px;
  border-radius: 26px;
  text-align: center;
  line-height: 20px;
  font-size: 14px;
  margin-right: 143px;
}
.property-details{
  width:309px
}
.loan-details{
  width:372px;
}
.property-type,
.lender-name {
  font-size: 18px;
  font-weight: bold;
}
.loan-action button {
  border: var(--custom-blue) 2px solid;
  color: var(--custom-blue);
  font-weight: 600;
  height: 42px;
  min-width: 166px;
  box-shadow: 0px 3px 6px #00000029;
}
.sort-list {
display: flex;
    justify-content: right;
    background-color: var(--custom-light-gray);
    position: sticky;
    right: 0;
    left: 0;
    width: 1200px;
    top: 0;
    margin-bottom: 19px;
    padding-top: calc(93px + 19px + 28px);
}
.sort-list p {
  font-size: 18px;
  font-weight: bold;
}
</style>