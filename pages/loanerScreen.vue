<template>
  <div class="lender-screen">
    <MobileHeader :title="title"/>
    <ProfileSidebar />
    <div class="app-container">
      <div class="lender-menu">
        <div class="menu-item">
          <NuxtLink to="/loanerScreen/actions">
            <p class="">Actions</p>
          </NuxtLink>
        </div>
        <div class="menu-item">
          <NuxtLink to="/loanerScreen/loans">
            <p class="">Loans</p>
          </NuxtLink>
        </div>
        <div class="menu-item">
          <NuxtLink to="/loanerScreen/offers">
            <p class="">Offers</p>
          </NuxtLink>
        </div>
        <div class="menu-item">
          <NuxtLink to="/loanerScreen/accountSettings">
            <p class="">Account Settings</p>
          </NuxtLink>
        </div>
        <div class="border-button">
          <NuxtLink to="/contact">
            <p>Need Help?</p>
          </NuxtLink>
        </div>
        <div class="new-loan">
          <NuxtLink to="/createRequest">
            <div class="new-loan-button">
              <div class="plus">
                <img :src="require('~/assets/uploads/plus_loan.svg')" />
              </div>
              <div class="new-loan-link">
                <p class="">New Loan</p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <NuxtChild @childTitle="setTitle" @haveActions="setHaveActions"/>
    </div>
  </div>
</template>

<script>
import {
  getRequestsWithAction,
  getOffersByLoanerRequest,
} from "~/services/request-service.js";
import ProfileSidebar from "~/components/profileSidebar.vue";
import { countMissingDocs } from "~/services/documents-service";

export default {
  name: "loanerScreen",
  components: { ProfileSidebar },
  data() {
    return {
      loans: [],
      title: "",
      haveActions: true,
      loansByAction: [
        { id: "623c41e5d58dd53bd8f3a308", loans: [] }, //Request in Progress
      ],
      // getOffersByStatus
      offersByAction: [
        { id: "6269565e8b7b1e5b2c6851ad", offers: [] }, //missing details
        { id: "626a2909e444b82e0c459e21 ", offers: [] }, //accept offer
      ],
      actionsLength: false,
    };
  },
  methods: {
    setTitle(childTitle) {
      this.title = childTitle;
    },
    setHaveActions(haveActions) {
      this.haveActions = haveActions;
    },
    getRequestsByStatus() {
      let self = this;
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
        self.loansByAction.forEach((action) => {
          self.loans.forEach((loan) => {
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
      let finalData = this.loans;
      let offers = [];
      let index = 0;
      for await (let request of finalData) {
        if (request.offers.length) {
          for await (let offer of request.offers) {
            let address = request.propertyAddress,
              type = request.propertyType,
              id = request._id;
            offer["request"] = {};
            offer.request["propertyAddress"] = address;
            offer.request["propertyType"] = type;
            offer.request["_id"] = id;
            let offerCountDocs = await countMissingDocs(offer);
            offers.push(offerCountDocs);
            index++;
          }
        }
      }

      let returnOffers = new Array();
      for (let i = 0; i < index; i++) {
        returnOffers[i] = offers[i];
      }
      this.offersByAction.forEach((offerStatus) => {
        returnOffers.forEach((offer) => {
          if (offer.status._id.trim() == offerStatus.id.trim()) {
            offerStatus.offers.push(offer);
          }
        });
      });
    },
  },
  computed: {
    requests() {
      return this.$store.state.userRequests;
    },
    loanerId() {
      if (!localStorage.getItem("currentUser")) {
        this.$router.replace({path:"/login"});
      } else
        return (
          this.$store.state.currentUser._id ||
          JSON.parse(localStorage.getItem("currentUser"))._id
        );
    },
  },
  async created() {
    console.log(this.loanerId);
     if (!localStorage.getItem("currentUser")) {
        this.$router.replace({path:"/login"});
      } 
    await getOffersByLoanerRequest(this.loanerId).then((res) => {
      this.loans = res;
      localStorage.setItem("userLoans", JSON.stringify(res));
    });
    await this.getRequestsByStatus();
    await this.getOffers();
    await this.loansByAction.forEach((action) => {
      if (action.loans.length) {
        this.actionsLength = true;
      }
    });
    await this.offersByAction.forEach((action) => {
      if (action.offers.length) {
        this.actionsLength = true;
      }
    });

    localStorage.setItem("offersByAction", JSON.stringify(this.offersByAction));
    localStorage.setItem("loansByAction", JSON.stringify(this.loansByAction));

    if (this.loans) {
      if ($nuxt.$route.path == "/loanerScreen") {
        if (!this.actionsLength) {
          this.$router.replace({
            path: "/loanerScreen/loans",
          });
        } else
          this.$router.replace({
            path: "/loanerScreen/actions",
          });
      }
    }
  },
};
</script>

<style>
.lender-screen {
  display: flex;
  height: 100%;
  min-height: 100vh;
  background-color: var(--custom-light-gray);
}

.app-container {
  width: 100%;
  max-width: 1200px;
  margin: 63px auto;
  margin-top: 0;
}

.page-content {
  padding-top: 163px;
}

.lender-menu {
  display: flex;
  justify-content: left;
  color: black;
  align-items: center;
  position: fixed;
  /* top: 63px; */
  z-index: 3;
  width: 1200px;
  background-color: var(--custom-light-gray);
  padding-top: 63px;
}

.lender-menu .menu-item p {
  margin-right: 57px;
  color: black;
  font-size: 18px;
}

.lender-menu .menu-item p:hover {
  color: var(--custom-pink);
}

.lender-menu .menu-item .NuxtLink-active p {
  color: var(--custom-pink);
  font-weight: bold;
  border-bottom: 2px var(--custom-pink) solid;
  padding-bottom: 4px;
  margin-top: 4px;
}

.lender-menu .border-button p {
  color: var(--custom-pink);
  text-align: center;
}

.lender-menu .new-loan {
  margin-left: auto;
}

.new-loan-button .plus {
  align-self: center;
  margin-right: -8px;
  z-index: 2;
  margin-top: 7px;
}

.new-loan-button {
  /* position: relative; */
  display: flex;
  height: 31px;
  align-items: center;
}

.new-loan-button .new-loan-link {
  background-color: var(--custom-pink);
  width: 132px;
  border-radius: 0 26px 26px 0;
  height: 31px;
}

.new-loan-button .new-loan-link p {
  font-size: 18px;
  font-weight: bold;
  color: white;
  margin-right: 0;
  text-align: center;
}
@media screen and (max-width: 768px) {
  .lender-menu {
    display: none;
  }
  .lender-screen {
    display: block;
  }
}
</style>