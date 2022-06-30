<template>
  <div class="requests-container main-container">
      <table class="loans-table">
     <tbody>
      
        <div class="offers-table">
          <div class="thead">
                        <div class="th">Status</div>

            <div class="th">Lender's Name</div>
            <div class="th">Annual Interest Rate</div>
            <div class="th">Upfront Fees</div>
            <div class="th">Underwriting Fee</div>
            <div class="th">Closing Timeline</div>
            <div class="th"></div>
          </div>
          <div class="tbody">
            <div v-for="(offer, i) of offers" :key="i">
              <div
                class="wrap-offer tr"
                @click="open(offer)"
                :id="'offer' + i"
              >
                 <div class="status td">
                 {{ offer.status.name }}
                </div>
                <div class="loaner-name td">
                 {{ offer.lenderId.username }}
                </div>
                <div class="td" v-if="offer.rate">
                  {{ offer.rate.toLocaleString() }}%
                </div>
                <div class="td" v-else>
                 
                </div>
                <div class="td" v-if="offer.upfrontFee">
                  {{ offer.upfrontFee.toLocaleString() }}
                </div>
                <div class="td" v-else>
                 
                </div>
                <div class="td" v-if="offer.underwritingFee">
                  {{ offer.underwritingFee.toLocaleString() }}
                </div>
                <div class="td" v-else>
                 
                </div>
                <div class="td">{{ offer.closingTimeline }}</div>
                <div class="td actions">
               
                  <button
                  v-if="offer.status._id=='628dd0accf4800b07253e112'"
                  @click.stop="approveOffer(offer,i)"
                    class="accept-action fill-button"
                    id="aproveOffer"
                   
                  >
                    Approve
                  </button>
                 
                </div>
              </div>
        
        </div>
       
      </div>
    </div>
      </tbody> 
    </table>

      <ViewOffer
      :offer="selectedOffer"
      v-if="openOfferPopup"
      @closePopup="openOfferPopup = false"
    />
  </div>
</template>

<script>
import { getAllOffers, updateOfferStatus } from "~/services/offer-service";
import ViewOffer from "~/components/popups/viewOffer.vue";

export default {
  name: "",
  data() {
    return { offers: [], openOfferPopup: false, seletedOffer: {} };
  },
  components: { ViewOffer },
  methods: {
    getOffers: async function () {
      await getAllOffers().then((res) => (this.offers = res));
    },
    approveOffer: async function (offer, index) {
      // offer.status._id = "628dd1a7cf4800b07253e113"; //approved
     let res= await updateOfferStatus(offer._id, "628dd1a7cf4800b07253e113").then(
        (res) => {
         return res
        }
      );
      this.offers[index].status = res.status;
    },
    createOffer(requestId) {
      this.$router.replace({
        path: "/admin/createOffer",
        query: { request: requestId },
      });
    },
    open(offer) {
      this.selectedOffer = offer;
      this.openOfferPopup = true;
    },
  },
  created() {
    this.getOffers();
  },
};
</script>

<style>
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
  grid-template-columns: auto auto auto auto auto auto auto;
  max-width: 1190px;
}
.tr.wrap-offer.hide,
.tr.wrap-offer.mobile {
  display: none;
}
.offer-title.desktop,
.offer-header.desktop {
  display: flex;
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

.offer-light-box {
  display: none;
}

.offer-light-box.open .pdf-embed {
  max-height: 100%;
  height: 100%;
  width: 50%;
  margin: auto;
}
@media screen and (max-width: 768px) {
  .tr.wrap-offer {
    grid-template-columns: auto auto;
    height: auto;
    padding: 17px 30px 24px 17px;
  }

  .tr.wrap-offer.mobile {
    display: grid;
  }

  .offer-title.desktop,
  .offer-header.desktop {
    display: none;
  }

  .loaner-name.td,
  .actions.td {
    grid-column: 1 / -1;
    color: var(--custom-pink);
    font-size: 11px;
  }

  .thead {
    display: none;
  }

  .td:nth-of-type(1):before {
    content: "Lender's Name";
  }
  .td:nth-of-type(2):before {
    content: "Annual Interest Rate";
  }
  .td:nth-of-type(3):before {
    content: "Upfront Fees";
  }
  .td:nth-of-type(4):before {
    content: "Underwriting Fee";
  }
  .td:nth-of-type(5):before {
    content: "Closing Timeline";
  }
  .td:before {
    font-size: 11px;
    color: var(--custom-blue);
    font-weight: bold;
  }

  .td {
    display: flex;
    flex-direction: column;
    padding: 0;
    padding-bottom: 16px;
  }

  .td.actions {
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    padding-bottom: 0;
  }

  .offers-container {
    padding: 0 27px 36px;
  }

  .accept-action,
  .decline-action {
    width: 121px;
    height: 25px;
  }

  .loan-address {
    margin-top: 0;
    order: 2;
    font-size: 13px;
    font-weight: normal;
  }

  .loan-price {
    margin-top: 48px;
    font-size: 15px;
    font-weight: bold;
    order: 1;
  }

  .loan-section {
    display: flex;
    flex-direction: column;
  }

  .offers-table {
    order: 3;
  }

  .wrap-declined-offer .accept-action {
    width: 100%;
  }
}
</style>