<template>
  <div class="popup" @click.self="$emit('closePopup')">
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
                {{ loan.propertyAddress.state }},
                {{ loan.propertyAddress.city }},
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
          <h3 class="title">Offer Details</h3>
          <div class="row">
            <div class="loan-prop">
              <p class="key">Lender's Name</p>

              <p class="value">
                {{ loan.selectedOffer.lenderId.firstName }}
                {{ loan.selectedOffer.lenderId.lastName }}
              </p>
            </div>
            <div class="loan-prop">
              <p class="key">Loan Amount</p>
              <p class="value">{{ loan.selectedOffer.amount }}$</p>
            </div>

            <div class="loan-prop">
              <p class="key">Loan Term</p>
              <p class="value">{{ loan.selectedOffer.term }}</p>
            </div>
            <div class="loan-prop">
              <p class="key">Interest</p>
              <p class="value">{{ loan.selectedOffer.interest }}%</p>
            </div>

            <div class="loan-prop">
              <p class="key">Monthly Repayments</p>
              <p class="value">{{ loan.selectedOffer.rehub }}$</p>
            </div>
          </div>
          <h3 class="title">Uploaded Documents</h3>
          <div >
            <div  v-for="(document, index) of loan.selectedOffer.documents" :key="index" class="row documents-list">
            
            <div
              class="wrap-document"
             v-for="(doc, index) of document.loanerDocs" :key="index"
              onmouseover="this.classList.add('hover')"
              onmouseleave="this.classList.remove('hover')"
              @click="
               openViewPdf = true;
               source = doc.url;
              "
            >
              <div class="wrap-content">
                <img :src="require('~/assets/uploads/download_document.svg')" />
                <p>{{ doc.name }}</p>
              </div>
              <div class="view" :id="'view-' + index">
                <!-- <img
                        alt="view icon"
                        :src="require('~/assets/uploads/view_white_icon.svg')"
                      /> -->
                View
              </div>
              <div :id="'view-' + index + '-pdf'"></div>
            </div>
          </div>
          </div>
          <h3 class="title">The Process</h3>
          <div class="row">
            <div class="loan-prop">
              <p class="key">Submit The Request</p>
              <p class="value">{{ loan.createdDate }} | formatDate</p>
            </div>
            <div class="loan-prop">
              <p class="key">Receiving The Loan</p>
              <p class="value">{{ loan.selectedOffer.recivedDate }}</p>
            </div>

            <div class="loan-prop">
              <p class="key">End Of Loan Repayment</p>
              <p class="value">{{ loan.selectedOffer.endLoanDaye }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <viewPdf
      v-if="openViewPdf"
      :source="source"
      :height="704"
      :width="500"
    />
  </div>
</template>
<script>
import viewPdf from "~/components/viewPdf.vue";
import $ from "jquery";

export default {
  name: "viewCompleteRequest",
  props: ["loan"],
  components: { viewPdf },
  data() {
    return {
      source: "",
      openViewPdf: false,
    };
  },
  methods: {
    viewPdf: function (index) {
      document.getElementById("view-" + index + "-pdf").style.display = "block";
    },
  },
  created() {
    let vue = this;
    // exit from pdf view
    $(document).on("click", function (event) {
      if (
        !event.target.closest(".vue-pdf-embed") &&
        !event.target.closest(".wrap-document")
      ) {
        vue.openViewPdf = false;
      } else {
        return;
      }
    });
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
.popup .row.documents-list{
  justify-content:left;
}
.popup .row.documents-list .wrap-document{
 margin-right:41px ;
}
.title {
  margin-bottom: 10px;
}
.fill-button {
  width: 175px;
  background-color: var(--custom-blue);
  margin-bottom: 25px;
  margin-top: 33px;
}
.wrap-document {
  border: 1px solid var(--custom-blue);
  border-radius: 11px;
  width: 119px;
  min-width: 119px;
  max-width: 119px;
  height: 107px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.wrap-document .wrap-content {
  text-align: center;
  display: block;
}
.wrap-document img {
  margin-bottom: 11px;
}
.wrap-document.hover {
  background-color: var(--custom-pink);
  border-color: var(--custom-pink);
  color: white;
}
.wrap-document.hover .wrap-content {
  display: none;
}
.wrap-document .view {
  display: none;
}
.wrap-document.hover .view {
  display: block;
}
</style>