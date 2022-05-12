<template>
  <div class="lender-screen">
    <ProfileSidebar />
    <div class="app-container">
      state:{{requests}}
      <div class="lender-menu">
        <div class="menu-item">
          <router-link to="/loanerScreen/actions">
            <p class="">Actions</p>
          </router-link>
        </div>
        <div class="menu-item">
          <router-link to="/loanerScreen/loans">
            <p class="">Loans</p>
          </router-link>
        </div>
        <div class="menu-item">
          <router-link to="/loanerScreen/offers">
            <p class="">Offers</p>
          </router-link>
        </div>
        <div class="menu-item">
          <router-link to="/loanerScreen/accountSettings">
            <p class="">Account Settings</p>
          </router-link>
        </div>
        <div class="border-button">
          <router-link to="/contact">
            <p>Need Help?</p>
          </router-link>
        </div>
        <div class="new-loan">
          <router-link to="/createRequest">
            <div class="new-loan-button">
              <div class="plus">
                <img :src="require('~/assets/uploads/plus_loan.svg')" />
              </div>
              <div class="new-loan-link"><p class="">New Loan</p></div>
            </div>
          </router-link>
        </div>
      </div>
      <router-view  />
    </div>
  </div>
</template>

<script>
import { getRequestsWithAction, getOffersByLoanerRequest } from "~/services/request-service.js";
import ProfileSidebar from "~/components/profileSidebar.vue";
export default {
  name: "loanerScreen",
  components: { ProfileSidebar },
  data() {
    return {
      loans: [],
      loanerId: JSON.parse(localStorage.getItem("currentUser"))._id,
    };
  },
  methods: {
    getLoansWithAction: async function (actionsStatuses) {
      await getRequestsWithAction(this.loanerId, actionsStatuses).then(
        (res) => {
          this.loans = res;
        }
      );
    },
  },
  computed: {
    requests() {
      return this.$store.userRequests;
    },
  },
  async created() {
    let actionsStatuses = [
      "623c41e5d58dd53bd8f3a308",
      "623c4275d58dd53bd8f3a30a", //Action Required
      "623c436e01cfc93560df213f",
    ];
    await this.getLoansWithAction(actionsStatuses);

    if (!this.$store.userRequests) {
      await getOffersByLoanerRequest(this.loanerId).then((res) =>
        this.$store.commit("setState", {
          value: res,
          state: "userRequests",
        })
      );
    }

    // if ($nuxt.$route.path == "/loanerScreen") {
    //   if (this.loans) {
    //     localStorage.setItem("loansWithAction", JSON.stringify(this.loans));
    //     this.$router.replace({
    //       path: "/loanerScreen/actions",
    //     });
    //   } else {
    //     this.$router.replace({
    //       path: "/loanerScreen/loans",
    //     });
    //   }
    // }
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
.lender-menu .menu-item .router-link-active p {
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
</style>