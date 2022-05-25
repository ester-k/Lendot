<template>
  <div class="loans-container ">
      <table class="loans-table">
     <tbody>
        <tr class="wrap-loan" v-for="(request, index) of requests" :key="index">      
             <td
            class="loan-status"
            v-if="request.status"
           :style="{
              'background-color': statuses[request.status.name].bgcolor,
              color: statuses[request.status.name].color,
            }"
          >
            {{ request.status.name }}
          </td>
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
            v-if="request.status._id!='623c444901cfc93560df2142'"
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
import LoanStatusEnum from "~/enums/statusEnum";

export default {
  name: "",
  data() {
    return { requests: [] , statuses: LoanStatusEnum,};
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
  margin-right: 80px;
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
@media screen and (max-width: 768px) {

  .wrap-loan {
    flex-direction: column;
    height: auto;
    padding: 20px 18px;
    margin-bottom: 10px;
    align-items: flex-start;
  }

  .sort-list, .loan-amount {
    display: none;
  }

  .lender-name + .loan-amount {
    display: block;
  }

  .loans-table {
    padding: 43px 27px;
  }

  .loan-status {
    height: 23px;
    width: 100%;
    font-size: 11px;
    margin: 0;
  }

  .property-details, .loan-details {
    width: 100%;
  }

  .property-type, .lender-name {
    font-size: 13px;
    margin-top: 10px;
  }

  .loan-action button {
    font-size: 13px;
    width: 148px;
    height: 28px;
    padding: 0;
    margin-top: 14px;
  }
  
}
</style>