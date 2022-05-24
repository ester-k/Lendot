<template>
  <div class="requests-container main-container">
      <table class="loans-table">
     <tbody>
        <tr class="wrap-loan" v-for="(request, index) of requests" :key="index">       
<!-- {{loan.status.name}} -->
          <!-- <td
            class="loan-status"
            v-if="loan.status"
            :style="{
              'background-color': statuses[loan.status.name].bgcolor,
              color: statuses[loan.status.name].color,
            }"
          >
            {{ loan.status.name }}
          </td> -->
          <td class="property-details">
            <p class="property-type">{{request.propertyType}}</p>
            <p class="property-address" v-if="request.propertyAddress">
              {{ request.propertyAddress.state }}, {{ request.propertyAddress.city }},
              {{ request.propertyAddress.address }}
            </p>
          </td>
          <td class="loan-details">
            <!-- <p class="lender-name" v-if="loan.selectedOffer">
              {{ loan.selectedOffer.lenderId.firstName }}
              {{ loan.selectedOffer.lenderId.lastName }}
            </p> -->
            <p class="loan-amount">
              {{ request.amount}}
            </p>
          </td>
          <td class="loan-action">
            <button
              class="border-button"
              @click="
                createOffer(request._id)
              "
            >
              create offer
            </button>
          </td>
        </tr>
      </tbody> 
    </table>
  </div>
</template>

<script>
import { getAllRequests } from "~/services/request-service";

export default {
  name: "",
  data() {
    return { requests: [] };
  },
  methods: {
    getRequests: async function () {
      getAllRequests().then((res) => (this.requests = res));
    },
    createOffer(requestId) {
      this.$router.replace({
        path: "/admin/createOffer",
        query: { request: requestId },
      });
    },
  },
  created() {
    this.getRequests();
  },
};
</script>

<style>
.loans-container {
  position: relative;
  width: 100%;
}
.loans-table {
  padding-top: calc(93px + 19px + 28px);
}
.wrap-loan {
  height: 90px;
  margin: auto;
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
.property-details {
  width: 309px;
}
.loan-details {
  width: 372px;
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
</style>