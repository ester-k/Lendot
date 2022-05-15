<template>
  <div class="popup">
    <div class="placeholder"></div>
    <div class="inner-popup">
      <div class="content">
        <div dir="ltr">
          <div class="close-popup" @click="$emit('closePopup')">
            <img
              :src="require('~/assets/uploads/close_view_popup.svg')"
              alt="close popup"
            />
          </div>
          <h3 class="title">Loan Details</h3>
          <div class="row">
            <div class="loan-prop">
              <p class="key">Loan Type</p>
              <p class="value">{{ loan.loanType }}</p>
            </div>
            <div class="loan-prop">
              <p class="key">Loan Sum</p>
              <p class="value">{{ loan.price }}</p>
            </div>
            <div class="loan-prop">
              <p class="key">Expected Close Date</p>
              <p class="value">{{ loan.closeDate }}</p>
            </div>
          </div>
          <hr class="horizonal-hr" />
          <div class="row">
            <div class="loan-prop">
              <p class="key">Purchase Price</p>
              <p class="value">{{ loan.price }}$</p>
            </div>
            <div class="loan-prop">
              <p class="key">Address</p>
              <p class="value">
                {{ loan.propertyAddress.state }},
                {{ loan.propertyAddress.city }},
                {{ loan.propertyAddress.address }}
              </p>
            </div>
            <div class="loan-prop">
              <p class="key">Property Type</p>
              <p class="value">{{ loan.propertyType }}</p>
            </div>
            <div class="loan-prop">
              <p class="key">Estimated After Completion Value</p>
              <p class="value">{{ loan.estimated }}$</p>
            </div>
            <div class="loan-prop">
              <p class="key">Loan Purpose</p>
              <p class="value">{{ loan.purpose }}</p>
            </div>
            <div class="loan-prop">
              <p class="key">Rehab / Construction Budget</p>
              <p class="value">{{ loan.rehub }}$</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "viewLoan",
  props: ["loan"],
};
</script>
<style scoped>
@import "./popupStyle.css";
.inner-popup {
  padding-bottom: 70px;
}
</style>