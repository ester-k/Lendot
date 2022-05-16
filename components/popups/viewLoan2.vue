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

      <h3 class="title">Property Details</h3>
      <div class="row">
        <div class="loan-prop">
          <!-- <p class="key">Address</p> -->
          <p class="key">{{ loan.propertyType }}</p>

          <p class="value">
            {{ loan.propertyAddress.state }}, {{ loan.propertyAddress.city }},
            {{ loan.propertyAddress.address }}
          </p>
        </div>
        <div class="loan-prop">
          <p class="key">Purchase Price</p>
          <p class="value">{{ loan.price }}$</p>
        </div>

        <!-- <div class="loan-prop">
          <p class="key">Property Type</p>
          <p class="value">{{ loan.propertyType }}</p>
        </div> -->
        <div class="loan-prop">
          <p class="key">Estimated After Completion Value</p>
          <p class="value">{{ loan.estimated }}$</p>
        </div>

        <div class="loan-prop">
          <p class="key">Rehab / Construction Budget</p>
          <p class="value">{{ loan.rehub }}$</p>
        </div>
      </div>
      <h3 class="title">Accepted Offers</h3>
      <table class="offers-table">
        <thead>
          <th>Lender's Name</th>
          <th>Lender's Name</th>
          <th>Upfront Fees</th>
          <th>Underwriting Fee</th>
          <th>Closing Timeline</th>
        </thead>
        <tbody>
          <tr v-for="(offer,index) of currentLoan.offers" :key="index">
            <td>
              {{ offer.lenderId.firstName }} {{ offer.lenderId.lastName }}
            </td>
            <td>
              <p>{{ offer.rate }}%</p>
            </td>
            <td>{{ offer.upfrontFee }}</td>
            <td>{{ offer.underwritingFee }}</td>
            <td>{{ offer.closingTimeline }}</td>
          </tr>
        </tbody>
      </table>
    </div>
                </div>

    </div>
  </div>
</template>
<script>
import { getOffersByRequest } from "~/services/offer-service";

export default {
  name: "viewLoan2",
  props: ["loan"],
  async created() {
    this.currentLoan=this.loan
    await getOffersByRequest(this.loan._id).then((response) => {
       this.currentLoan.offers = response;
    });
  },
 async mounted() {
     
 },
};
</script>
<style scoped>
@import "./popupStyle.css";
.popup .row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
}
.title {
  margin-bottom: 10px;
}
.offers-table {
    max-width: 870px;
}
.offers-table {
    text-align: center;
        margin-left: -28px;
}
.offers-table th{
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 35px;
}
.offers-table td{
  
    padding-bottom: 53px;
}
.offers-table tr td:first-child{
  color: var(--custom-pink)
}
</style>