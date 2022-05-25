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
              class="desktop"
            />
            <img
              :src="require('~/assets/uploads/close_menu_mobile.svg')"
              alt="close popup"
              class="mobile"
            />
          </div>

           <h3 class="title" :class="{'open' : showMobile['propertyDetals'] }" @click="showMobile['propertyDetals'] = !showMobile['propertyDetals'];">Property Details</h3>
          <div class="row">
            <div class="loan-prop" v-if="offer.requestId">
              <p class="key">{{ offer.requestId.propertyType }}</p>

              <p class="value">
                {{ offer.requestId.propertyAddress.state }},
                {{ offer.requestId.propertyAddress.city }},
                {{ offer.requestId.propertyAddress.address }}
              </p>
            </div>
            <div class="loan-prop" v-if="offer.requestId">
              <p class="key">Purchase Price</p>
              <p class="value">{{ offer.requestId.price }}$</p>
            </div>

          
            <div class="loan-prop" v-if="offer.requestId">
              <p class="key">Estimated After Completion Value</p>
              <p class="value">{{ offer.requestId.estimated }}$</p>
            </div>

            <div class="loan-prop" v-if="offer.requestId">
              <p class="key">Rehab / Construction Budget</p>
              <p class="value">{{ offer.requestId.rehub }}$</p>
            </div>
          </div>
          <h3 class="title" :class="{'open' : showMobile['offerDetails'] }" @click="showMobile['offerDetails'] = !showMobile['offerDetails'];">Offer Details</h3>
          <div class="row">
            <div class="loan-prop">
              <p class="key">Lender's Name</p>

              <p class="value">
                {{ offer.lenderId.firstName }}
                {{offer.lenderId.lastName }}
              </p>
            </div>
            <div class="loan-prop">
              <p class="key">Loan Amount</p>
              <p class="value">{{ offer.amount }}$</p>
            </div>

            <div class="loan-prop">
              <p class="key">Loan Term</p>
              <p class="value">{{ offer.term }}</p>
            </div>
            <div class="loan-prop">
              <p class="key">Interest</p>
              <p class="value">{{ offer.interest }}%</p>
            </div>

            <div class="loan-prop">
              <p class="key">Monthly Repayments</p>
              <p class="value">{{ offer.rehub }}$</p>
            </div>
          </div>
          <h3 class="title" :class="{'open' : showMobile['uploadedDocuments'] }" @click="showMobile['uploadedDocuments'] = !showMobile['uploadedDocuments'];">Uploaded Documents</h3>
          <div >
            <div  v-for="(document, index) of offer.documents" :key="index" class="row documents-list" :class="{'empty-row':!document.loanerDocs.length}">
               
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
              
                View
              </div>
              <div :id="'view-' + index + '-pdf'"></div>
            </div>
          </div>
          </div>
          <h3 class="title" :class="{'open' : showMobile['theProcess'] }" @click="showMobile['theProcess'] = !showMobile['theProcess'];">The Process</h3>
          <div class="row">
            <div class="loan-prop" v-if="offer.requestId">
              <p class="key">Submit The Request</p>
              <p class="value">{{ offer.requestId.createdDate }} | formatDate</p>
            </div>
            <div class="loan-prop">
              <p class="key">Receiving The Loan</p>
              <p class="value">{{ offer.recivedDate }}</p>
            </div>

            <div class="loan-prop">
              <p class="key">End Of Loan Repayment</p>
              <p class="value">{{ offer.endLoanDaye }}</p>
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
      class="desktop"
    />
    <viewPdfMobile
      v-if="openViewPdf"
      :source="source"
      class="mobile"
      @closePdfPopup="openViewPdf=false"
    />
  </div>
</template>
<script>
import viewPdf from "~/components/viewPdf.vue";
import viewPdfMobile from "~/components/viewPdfMobile.vue";
import $ from "jquery";

export default {
  name: "ViewOffer",
  props: ["offer"],
  components: {
    viewPdf,
    viewPdfMobile,
  },
  data() {
    return {
      source: "",
      openViewPdf: false,
      showMobile: {
        propertyDetals: true,
        offerDetails: true,
        uploadedDocuments: false,
        theProcess: false,
      },
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
        !event.target.closest(".wrap-document") &&
        !event.target.closest(".pdf-popup-mobile")
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
.popup .row.empty-row{
   margin-bottom: 0px;
}
.popup .row {
  display: flex;
  justify-content: space-between;
 margin-bottom: 50px;
}
.popup .row.documents-list {
  justify-content: left;
}
.popup .row.documents-list .wrap-document {
  margin-right: 41px;
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
  background-color: var(--custom-blue);
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

@media screen and (max-width: 768px) {
  .popup .row.empty-row{
   margin-bottom: 0px;
}
  .popup .row {
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0;
    margin-bottom: 25px;
    grid-row-gap: 10px;
  }

  .wrap-document img {
    margin-bottom: 0;
  }

  .popup .row.documents-list .wrap-document {
    margin-right: 10px;
  }

  .popup h3.title.open + div {
    display: block;
  }

  .popup h3.title + div {
    display: none;
  }

  .popup h3.title.open + div.row {
    display: flex;
  }

  .popup .title:after {
    content: url("../../assets/uploads/mobile_popup_open_tab.svg");
    margin-left: 6px;
    position: absolute;
    transform: rotate(-90deg);
    top: 1px;
  }

  .popup .title.open:after {
    top: -3px;
    transform: none;
  }
}
</style>