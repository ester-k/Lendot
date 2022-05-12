<template>
  <div class="actions-container page-content">
    <div class="no-action" v-if="!actionsLength">
      <div class="no-action-text">no actions needed</div>
      <a href="/createRequest"
        ><button type="button" class="fill-button new-loan">
          <p>+</p>
          <p>New Loan</p>
        </button></a
      >
    </div>
    <div v-else>
      <div class="" v-for="(action, aIndex) of loansByAction" :key="aIndex">
        <div v-if="action.loans.length">
          <h3 class="action-title">{{ action.loans[0].status.name }}</h3>

          <div
            class="single-loan"
            v-for="(loan, index) of action.loans"
            :key="index"
            @click="
              dynamicFunctionCall(
                statuses[loan.status.name].action.func,
                statuses[loan.status.name].action.prop,
                loan
              )
            "
          >
            <div class="action-icon">
              <img
                v-if="loan.status"
                :src="
                  require('~/assets/uploads/' + statuses[loan.status.name].icon)
                "
              />
            </div>
            <div class="action-name" v-if="loan.status">
              <p class="name">{{ statuses[loan.status.name].controller }}</p>
              <p class="missing-info" v-if="loan.missindDetails">
                {{ loan.missindDetails }} Details Missing
              </p>
            </div>

            <div class="property-details">
              <p class="property-type">{{ loan.propertyType }}</p>
              <p class="property-address" v-if="loan.propertyAddress">
                {{ loan.propertyAddress.state }},
                {{ loan.propertyAddress.city }},
                {{ loan.propertyAddress.address }}
              </p>
            </div>
            <div class="loan-details">
              <p class="lender-name" v-if="loan.selectedOffer">
                {{ loan.selectedOffer.lenderId.firstName }}
                {{ loan.selectedOffer.lenderId.lastName }}
              </p>
              <p class="loan-amount" v-if="loan.amount">
                {{ loan.amount.toLocaleString() }}
              </p>
            </div>
            <div class="loan-action">
              <button class="border-button">
                {{ statuses[loan.status.name].controller }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="" v-for="(action, oIndex) of offersByAction" :key="oIndex">
        <div v-if="action.offers.length">
          <h3 class="action-title">{{ action.offers[0].status.name }}</h3>

          <div
            class="single-loan"
            v-for="(offer, singleIndex) of action.offers"
            :key="singleIndex"
            @click="
              dynamicFunctionCall(
                statuses[offer.status.name].action.func,
                statuses[offer.status.name].action.prop,
                offer
              )
            "
          >
            <div class="action-icon">
              <img
                v-if="offer.status"
                :src="
                  require('~/assets/uploads/' +
                    statuses[offer.status.name].icon)
                "
              />
            </div>
            <div class="action-name" v-if="offer.status">
              <p class="name">{{ statuses[offer.status.name].controller }}</p>
              <p class="missing-info" v-if="offer.missingDocs">
                {{ offer.missingDocs }} Documents Required
              </p>
            </div>
            <div class="property-details">
              <p class="property-type">{{ offer.request.propertyType }}</p>
              <p class="property-address" v-if="offer.request.propertyAddress">
                {{ offer.request.state }}, {{ offer.request.city }},
                {{ offer.request.address }}
              </p>
            </div>
            <div class="loan-details">
              <p class="lender-name" v-if="offer.lenderId">
                {{ offer.lenderId.firstName }}
                {{ offer.lenderId.lastName }}
              </p>
              <p class="loan-amount" v-if="offer.amount">
                {{ offer.amount.toLocaleString() }}
              </p>
            </div>

            <div class="loan-action">
              <button class="border-button">
                {{ statuses[offer.status.name].controller }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoanStatusEnum from "~/enums/statusEnum";
import { getOffersByStatus } from "~/services/offer-service";
import { getOffersByLoanerRequest } from "~/services/request-service";
import { countMissingDocs } from "~/services/documents-service";

export default {
  name: "Actions",
  data() {
    return {
      loansByAction: [
        { id: "623c41e5d58dd53bd8f3a308", loans: [] }, //Request in Progress
        // { id: "623c4275d58dd53bd8f3a30a", loans: [] }, //action require
        // { id: "623c436e01cfc93560df213f", loans: [] },
      ],
      // getOffersByStatus
      offersByAction: [
        { id: "6269565e8b7b1e5b2c6851ad", offers: [] }, //missing details
        { id: "626a2909e444b82e0c459e21 ", offers: [] }, //accept offer
      ],
      statuses: LoanStatusEnum,
      offers: [],
      loans: [],
      actionsLength:false,
    };
  },
  computed: {
    requests() {
      return this.$store.state.userRequests;
    },
  },
  methods: {
    getRequestsByStatus() {
      let requiredFields = [
        "amount",
        "closeDate",
        "credit",
        "estimated",
        "loanType",
        "price",
        "propertyAddress",
        "propertyType",
        "purpose",
        "rehab",
      ];
      if (this.loans) {
        this.loansByAction.forEach((action) => {
          this.loans.forEach((loan) => {
            if (loan.status._id == action.id) {
              action.loans.push(loan);
            }

            let missingField = 0;
            requiredFields.forEach((field) => {
              if (loan[field] == "" || loan[field] == undefined) {
                missingField++;
              }
            });
            loan["missindDetails"] = missingField;
          });
        });
      }
    },
    async getOffers() {
      let self = this;

      this.requests.forEach((request) => {
        if (request.offers.length) {
          request.offers.forEach((offer) => {
            let address = request.propertyAddress,
              type = request.propertyType,
              id = request._id;
            offer["request"] = {};
            offer.request["propertyAddress"] = address;
            offer.request["propertyType"] = type;
            offer.request["_id"] = id;
            let offerCountDocs = countMissingDocs(offer);
            this.offers.push(offerCountDocs);
          });
        }
      });
      console.log(this.offers);
      // this.offersByAction.forEach(async (offerStatus) => {
      //   let filter = this.offers.filter(
      //     (offer) => {offer.status._id.trim() == offerStatus.id.trim();}
      //   );
      //   offerStatus.offers = filter;
      // });
    },

    dynamicFunctionCall(funcionName, propertys, loan) {
      this[funcionName](propertys, loan);
    },
    navigateAction(propertys, obj) {
      if (propertys.route.indexOf("/offers") == -1)
        this.$router.replace({
          path: propertys.route,
          query: { offer: obj._id },
        });
      else {
        this.$router.replace({
          path: propertys.route,
          query: { loan: obj.request._id },
        });
      }
    },
  },

  async created() {
    this.loans = JSON.parse(localStorage.getItem("loansWithAction"));
    this.getRequestsByStatus();
    if (!this.requests) {
      let vue = this;
      await getOffersByLoanerRequest(this.$store.currentUser._id).then(
        (res) => {
          vue.$store.commit("setState", {
            value: res,
            state: "userRequests",
          });
        }
      );
    }
    this.getOffers();

    this.loansByAction.forEach((action) => {
      if(action.loans.length) {
        this.actionsLength=true
      }
    });
    console.log(this.actionsLength);
  },
};
</script>

<style>
.actions-container {
  margin: auto;
}
.no-action {
  margin: auto;
  text-align: center;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.no-action .new-loan {
  display: flex;
  height: 39px;
  width: 168px;
  line-height: 39px;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  margin: auto;
  margin-top: 76px;
}
.no-action .new-loan p:first-child {
  margin-right: 24px;
}
.no-action-text {
  font-size: 20px;
}
.loans-table {
  padding-top: calc(93px + 19px + 28px);
}
.single-loan {
  margin: auto;
  height: 90px;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  background-color: white;
  margin-bottom: 21px;
  display: flex;
  padding: 21px 30px;
  padding-right: 60px;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  max-width: 1190px;
}
.loan-status {
  height: 20px;
  width: 151px;
  border-radius: 26px;
  text-align: center;
  line-height: 20px;
  font-size: 14px;
  margin-right: 60px;
}
.property-address,
.loan-amount {
  font-size: 12px;
}
.loan-action button {
  border: var(--custom-blue) 2px solid;
  color: var(--custom-blue);
  font-weight: 600;
  height: 42px;
  min-width: 166px;
  box-shadow: 0px 3px 6px #00000029;
}
.action-title {
  font-size: 20px;
  margin-bottom: 30px;
}
.single-loan .action-name .name {
  font-size: 16px;
  font-weight: bold;
  width: 239px;
}
.single-loan .action-name {
  width: 239px;
}
.single-loan .action-icon {
  width: 60px;
}
.single-loan .property-details {
  width: 330px;
}
.single-loan .loan-details {
  width: 284px;
}
.single-loan .loan-action button {
  width: 196px;
  background-color: var(--custom-blue);
  color: white;
  height: 30px;
  font-weight: normal;
  box-shadow: none;
}
.missing-info {
  font-size: 12px;
  color: var(--custom-pink);
}
</style>