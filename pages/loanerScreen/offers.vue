<template>
  <div class="offers-container page-content">
    <div
      class="wrap-loan"
      v-for="(loan, index) of loans"
      :key="index"
      :id="'wrap-loan' + index"
    >
      <div v-if="loan.offers.length && loan.declinedOffers">
        <div class="loan-address">
          {{ loan.propertyAddress.state }}, {{ loan.propertyAddress.city }},
          {{ loan.propertyAddress.address }}
        </div>
        <div class="loan-price" v-if="loan.price">
          {{ loan.price.toLocaleString() }}$
        </div>

        <div class="offers-table">
          <div class="thead">
            <div class="th">Lender's Name</div>
            <div class="th">Annual Interest Rate</div>
            <div class="th">Upfront Fees</div>
            <div class="th">Underwriting Fee</div>
            <div class="th">Closing Timeline</div>
            <div class="th"></div>
          </div>
          <div class="tbody">
            <div v-for="(offer, i) of loan.offers" :key="i">
              <div
                v-if="offer.status._id !=declineStatus"
                class="wrap-offer tr"
                @click="(event) => openOffer(event, index, i)"
                :id="'offer' + i"
              >
                <div class="loaner-name td">
                 {{ offer.lenderId.username }}
                </div>
                <div class="td" v-if="offer.rate">
                  {{ offer.rate.toLocaleString() }}%
                </div>
                <div class="td" v-if="offer.upfrontFee">
                  {{ offer.upfrontFee.toLocaleString() }}
                </div>
                <div class="td" v-if="offer.underwritingFee">
                  {{ offer.underwritingFee.toLocaleString() }}
                </div>
                <div class="td">{{ offer.closingTimeline }}</div>
                <div class="td actions">
                  <button
                    class="accept-action fill-button"
                    id="acceptOffer"
                   
                  >
                    Accept
                  </button>
                  <button
                    class="decline-action border-button"
                    id="declineOffer"
                    @click="declineOffer(index, i)"
                  >
                    Decline
                  </button>
                </div>
              </div>
              <div class="wrap-offer-container" :id="'offer' + i + '-view'">
                <div class="offer-title">

                  <div class="loaner-name">
                    {{ offer.lenderId.username }}
                  </div>
                  <button class="fill-button selectOffer" @click="selectOffer">
                    Select
                  </button>
                </div>
                <div class="offer-header">
                  <div>
                    <p>Annual Interest Rate</p>
                    <p v-if="offer.rate">{{ offer.rate.toLocaleString() }}%</p>
                  </div>
                  |
                  <div>
                    <p>Upfront Fees</p>
                    <p v-if="offer.upfrontFee">
                      {{ offer.upfrontFee.toLocaleString() }}
                    </p>
                  </div>
                  |

                  <div>
                    <p>Underwriting Fee</p>
                    <p v-if="offer.underwritingFee">
                      {{ offer.underwritingFee.toLocaleString() }}
                    </p>
                  </div>
                  |
                  <div>
                    <p>Closing Timeline</p>
                    <p>{{ offer.closingTimeline }} Days</p>
                  </div>
                </div>
                <div class="offerIframe" v-if="offer.terms">
                  <div class="title">
                    <div
                      class="view"
                      @click="
                        this.source = offer.terms;
                        this.openViewPdf = true;
                      "
                    >
                      <img
                        alt="view icon"
                        :src="require('~/assets/uploads/view_icon.svg')"
                      />View
                    </div>
                    <a :href="offer.terms" download="download"
                      ><div class="download">
                        <img
                          alt="view icon"
                          :src="require('~/assets/uploads/download_icon.svg')"
                        />Download File
                      </div></a
                    >
                  </div>

                  <vue-pdf-embed
                    class="pdf-embed"
                    :source="offer.terms"
                    :height="704"
                   
                  />
                  <div
                    :id="'offer-view-' + i"
                    class="offer-light-box"
                    @click="(event) => closeView(event, i)"
                  >
                    <!-- <vue-pdf-embed
                      :source="offer.terms"
                      :height="viewHeight"
                      :viewWidth="viewWidth"
                    /> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="declined-offers" v-if="loan.declinedOffers">
          <div
            class="declined-title"
            @click="showHideDeclined(index)"
            v-if="loan.declinedOffers.length"
          >
            You Have {{ loan.declinedOffers.length }} Declined
            <img
              class="open-close-declined"
              :src="require('~/assets/uploads/declined_open.svg')"
            />
          </div>
          <div
            class="declined-offers-list"
            :id="'declined-offers-list' + index"
          >
            <div
              class="wrap-declined-offer"
              v-for="(offer, j) of loan.declinedOffers"
              :key="j"
            >
              <div
                class="wrap-offer tr"
                @click="(event) => acceptDeclinedOffer(event, index, j)"
                :id="'offer' + j"
              >
                <div class="loaner-name td">{{ offer.lenderId.username }}</div>
                <div class="td" v-if="offer.rate">
                  {{ offer.rate.toLocaleString() }}%
                </div>
                <div class="td" v-if="offer.upfrontFee">
                  {{ offer.upfrontFee.toLocaleString() }}
                </div>
                <div class="td" v-if="offer.underwritingFee">
                  {{ offer.underwritingFee.toLocaleString() }}
                </div>
                <div class="td" v-if="offer.closingTimeline">
                  {{ offer.closingTimeline.toLocaleString() }}
                </div>
                <div class="td actions">
                  <button
                    class="accept-action fill-button"
                    id="acceptDeclinedOffer"
                  >
                    Recover
                  </button>
                </div>
              </div>
              <div class="wrap-offer-container" :id="'offer' + j + '-view'">
                <div class="offer-title">
                  <div class="loaner-name">
                    {{ offer.lenderId.username }}
                  </div>
                  <button class="fill-button selectOffer">Select</button>
                </div>
                <div class="offer-header">
                  <div>
                    <p>Annual Interest Rate</p>
                    <p>{{ offer.rate.toLocaleString() }}%</p>
                  </div>
                  |
                  <div>
                    <p>Upfront Fees</p>
                    <p>{{ offer.upfrontFee.toLocaleString() }}</p>
                  </div>
                  |

                  <div>
                    <p>Underwriting Fee</p>
                    <p>{{ offer.underwritingFee.toLocaleString() }}</p>
                  </div>
                  |
                  <div>
                    <p>Closing Timeline</p>
                    <p>{{ offer.closingTimeline.toLocaleString() }} Days</p>
                  </div>
                </div>
                <div class="offerIframe">
                  <div class="title">
                    <div
                      class="view"
                      @click="
                        this.source = offer.terms;
                        this.openViewPdf = true;
                      "
                    >
                      <img
                        alt="view icon"
                        :src="require('~/assets/uploads/view_icon.svg')"
                      />View
                    </div>
                    <div class="download">
                      <img
                        alt="view icon"
                        :src="require('~/assets/uploads/download_icon.svg')"
                      />Download File
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-if="noOffers">no offers avalibale</div> -->
    <viewPdf
      class="view-pdf-popup"
      v-if="openViewPdf"
      :source="this.source"
      :height="704"
      :width="500"
    />
  </div>
</template>

<script>
import {
  getOffersByLenderRequest,
  getRequestById,
} from "~/services/request-service.js";
// import VuePdfEmbed from "vue-pdf-embed";
import viewPdf from "~/components/viewPdf.vue";

import { updateOfferStatus } from "~/services/offer-service.js";
import { getOffersByLoanerRequest } from "~/services/request-service";

import $ from "jquery";

export default {
  name: "Offers",
  data() {
    return {
      loans: [],
      viewHeight: "100vh",
      viewWidth: "100%",
      height: "704px",
      width: "auto",
      source: "",
      openViewPdf: false,
      noOffers: false,
      declineStatus: "626a2fde4e14cc66cee9ff1a",
    };
  },
  components: {
    viewPdf,
    // VuePdfEmbed,
  },
  methods: {
    getLoans: async function () {
      let loanerId = JSON.parse(localStorage.getItem("currentUser"))._id;
      return await getOffersByLoanerRequest(loanerId).then((res) => {
        //get declined offers to every loan
        return this.getDeclinedOffers(res).then((response) => {
          return response;
        });
      });
    },
    async getDeclinedOffers(loans) {
      for (let loan of loans) {
        if (loan.offers.length) {
          loan.declinedOffers = loan.offers.filter(
            (offer) => offer.status._id == this.declineStatus
          );
          loan.offers = loan.offers.filter(
            (offer) => offer.status._id != this.declineStatus
          );
        }
      }

      return loans;
    },
    declineOffer: async function (loanIndex, offerIndex) {
      let offer = this.loans[loanIndex].offers[offerIndex];
      offer.status = "decline";
      await updateOfferStatus(offer._id, offer.status._id).then((res) => {
        this.loans[loanIndex].offers.splice(offerIndex, 1);
        this.loans[loanIndex].declinedOffers.push(offer);
      });
    },
    openOffer(event, loanIndex, offerIndex) {
      if (event.target.id == "declineOffer") {
        return;
      }
      let closeOffer = document.getElementById("offer" + offerIndex);
      closeOffer.classList.add("accept");
      let viewOffer = document.getElementById("offer" + offerIndex + "-view");
      //close last offer view
      if (document.querySelector(".wrap-offer-container.open")) {
        document
          .querySelector(".wrap-offer-container.open")
          .classList.remove("open");
        document.querySelector(".wrap-offer.hide").classList.remove("hide");
      }
      closeOffer.classList.add("hide");
      viewOffer.classList.add("open");
    },
    showHideDeclined: async function (loanIndex) {
      let declined = document
        .getElementById("wrap-loan" + loanIndex)
        .querySelector(".declined-offers");
      if (declined.querySelector("img").classList.contains("open")) {
        declined.querySelector("img").classList.remove("open");
        document
          .getElementById("declined-offers-list" + loanIndex)
          .classList.remove("open");
      } else {
        declined.querySelector("img").classList.add("open");
        document
          .getElementById("declined-offers-list" + loanIndex)
          .classList.add("open");
      }
    },
    async acceptDeclinedOffer(event, loanIndex, offerIndex) {
      let currentOffer = this.loans[loanIndex].declinedOffers[offerIndex];
      currentOffer.status = "new";
      //remove from declined list
      this.loans[loanIndex].declinedOffers.splice(offerIndex, 1);
      await updateOfferStatus(currentOffer._id, currentOffer.status._id).then(
        (res) => {
          this.loans[loanIndex].offers.push(currentOffer);
        }
      );
    },
    viewPdf(index) {
      document.getElementById("offer-view-" + index).classList.add("open");
    },
    closeView(event, index) {
      if (!$(event.target).closest(".vue-pdf-embed").length)
        document.getElementById("offer-view-" + index).classList.remove("open");
    },
    selectOffer() {
      this.$router.replace({ path: "/payment" });
    },
  },

  async created() {
    if (this.$route.query.loan) {
      let localLoan = JSON.parse(localStorage.getItem("requestToOffers"));
      if (localLoan._id == this.$route.query.loan) {
        if (typeof localLoan.loanerId == "string") {
          await getRequestById(localLoan._id).then((response) => {
            localLoan = response;
          });
        }
        this.loans.push(localLoan);
      } else {
        await getRequestById(this.$route.query.loan).then((response) => {
          this.loans.push(response);
        });
      }
      this.loans = await this.getDeclinedOffers(this.loans);
    } else {
      this.loans = await this.getLoans();
    }
    let vue = this;
    // exit from offer view on click outside the iframe
    $(document).on("click", function (event) {
      if (
        !event.target.closest(".view-pdf-popup") &&
        !event.target.closest(".view")
      ) {
        vue.openViewPdf = false;
      } else {
        return;
      }

      //if the click is on the current clicked open offer
      let wrapOffer = $(event.target).closest(".wrap-offer")[0];
      if (
        event.target.id == "declineOffer" ||
        event.target.classList.contains("selectOffer") ||
        $(event.target).closest(".title").closest(".offerIframe")[0] !=
          undefined ||
        $(event.target).closest(".vue-pdf-embed").length ||
        event.target.id == "app"
      ) {
        return;
      }

      if (wrapOffer) {
        if (!wrapOffer.classList.contains("hide")) {
          if (document.querySelector(".wrap-offer-container.open"))
            document
              .querySelector(".wrap-offer-container.open")
              .classList.remove("open");
              if( document.querySelector(".wrap-offer.hide"))
          document.querySelector(".wrap-offer.hide").classList.remove("hide");
        }
      } else {
        if (document.querySelector(".wrap-offer-container.open")) {
          document
            .querySelector(".wrap-offer-container.open")
            .classList.remove("open");
        }
        if (document.querySelector(".wrap-offer.hide"))
          document.querySelector(".wrap-offer.hide").classList.remove("hide");
      }
    });
    this.$emit("childTitle", "offers");
  },
};
</script>

<style scoped>
.loan-address {
  font-size: 20px;
  color: var(--custom-blue);
  font-weight: bold;
  margin-top: 76px;
}
.loan-price {
  color: var(--custom-blue);
}
.offers-table {
  width: 100%;
  border-spacing: 0 11px;
  display: table;
}
.offers-table .th {
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  display: table-cell;
}
.thead {
  display: grid;
  grid-template-columns: max-content max-content max-content max-content max-content max-content;
  grid-column-gap: 50px;
}
.tbody {
  display: table-row-group;
}
.tr.wrap-offer {
  margin: auto;
  box-shadow: 0px 3px 6px #00000029;
  background-color: white;
  height: 60px;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 11px;
  cursor: pointer;
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  max-width: 1190px;
}
.tr.wrap-offer.hide {
  display: none;
}
.td {
  padding: 21px 16px;
}
.td.actions {
  margin-left: auto;
}
.loaner-name {
  color: var(--custom-pink);
}
.accept-action,
.decline-action {
  background-color: var(--custom-blue);
  height: 24px;
  width: 115px;
}
.decline-action {
  color: var(--custom-blue);
  border: var(--custom-blue) solid 2px;
  background-color: white;
  margin-left: 11px;
}
.declined-offers {
  margin-top: 20px;
  cursor: pointer;
}
.declined-offers img {
  transform: rotate(-180deg);
}
.declined-offers img.open {
  transform: rotate(0deg);
}
/* opend offers iframe */
.wrap-offer-container {
  display: none;
}
.wrap-offer-container.open {
  display: block;
  max-height: 704px;
}
.loan-details {
  margin-bottom: 23px;
}
.wrap-offer-container {
  background-color: white;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  padding: 22px 30px;
  margin-top: 11px;
}
.wrap-offer-container .loaner-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 14px;
  color: var(--custom-blue);
}
.wrap-offer-container .offer-title,
.wrap-offer-container .offer-header {
  display: flex;
}
.wrap-offer-container .offer-title {
  justify-content: space-between;
}
.wrap-offer-container .offer-header div {
  margin-right: 15px;
  margin-left: 20px;
}
.wrap-offer-container .offer-header div:first-child {
  margin-left: 0px;
}
.wrap-offer-container .offer-header div p {
  display: inline-block;
  font-size: 14px;
}
.wrap-offer-container .offer-header div p:first-child {
  margin-right: 5px;
}
.wrap-offer-container .offerIframe {
  margin-top: 30px;
  height: 704px;
}
.offerIframe .title {
  height: 61px;
  padding-left: 27px;
  display: flex;
  line-height: 61px;
  color: var(--custom-pink);
  border: 1px solid var(--custom-blue);
  border-radius: 10px 10px 0 0;
  border-bottom: 3px solid var(--custom-pink);
}
.offerIframe .title a {
  color: var(--custom-pink);
}
.offerIframe .title div {
  cursor: pointer;
}
.offerIframe .title img {
  margin-right: 5.3px;
}
.offerIframe .title .view {
  margin-right: 24px;
}
.offerIframe .title .view img {
  margin-top: 8px;
}
.declined-offers-list {
  display: none;
}
.declined-offers-list.open {
  display: block;
}

.wrap-declined-offer .accept-action {
  width: 246px;
}
.pdf-embed {
  overflow: scroll;
  max-height: 505px;
  border: 1px solid #707070;
}
.offer-light-box {
  display: none;
}
.offer-light-box.open {
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: #0000007a;
}

.offer-light-box.open .pdf-embed {
  max-height: 100%;
  height: 100%;
  width: 50%;
  margin: auto;
}
</style>