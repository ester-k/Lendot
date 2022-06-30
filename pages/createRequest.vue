<template>
  <div id="createRequest">
    <Header />
    <div class="main-container ">
      <div class="request-steps">
        <div
          v-if="!$nuxt.$fire.auth.currentUser"
          class="request-step about-you-step"
        >
          <NuxtLink to="/createRequest/createAccount" >
            <div class="step-button" >      
              <img
                class="step-icon"
                v-if="
                  createRequestData.steps['createAccount'].complete == 'true'
                "
                :src="require('~/assets/uploads/v_icon.svg')"
              />
              <img
                v-else
                class="step-icon"
                :src="require('~/assets/uploads/about_you_icon.svg')"
              />            </div>
            <p>About You</p>
            </NuxtLink
          >
        </div>

         <div class="request-step about-loan-step">
          <NuxtLink to="/createRequest/aboutLoan">
            <div
              class="step-button"
              :class="{
                complete:
                  createRequestData.steps['aboutLoan'].complete == 'true',
              }"
            >
              <img
                class="step-icon"
                v-if="createRequestData.steps['aboutLoan'].complete == 'true'"
                :src="require('~/assets/uploads/v_icon.svg')"
              />
              <img
                v-else
                class="step-icon"
                :src="require('~/assets/uploads/about_loan_icon.svg')"
              />
            </div>
            <p>About The Loan</p>
          </NuxtLink>
        </div>

        <div class="request-step create-property-step">
          <NuxtLink to="/createRequest/createProperty">
            <div
              class="step-button"
              :class="{
                complete:
                  createRequestData.steps['createProperty'].complete == 'true',
              }"
            >
              <img
                class="step-icon"
                v-if="
                  createRequestData.steps['createProperty'].complete == 'true'
                "
                :src="require('~/assets/uploads/v_icon.svg')"
              />
              <img
                v-else
                class="step-icon"
                :src="require('~/assets/uploads/create_property_icon.svg')"
              />
            </div>
            <p>Create The Property</p>
          </NuxtLink>
        </div>

        <div class="request-step about-property-step">
          <NuxtLink to="/createRequest/aboutProperty">
            <div
              class="step-button"
              :class="{
                complete:
                  createRequestData.steps['aboutProperty'].complete == 'true',
              }"
            >
              <img
                class="step-icon"
                v-if="
                  createRequestData.steps['aboutProperty'].complete == 'true'
                "
                :src="require('~/assets/uploads/v_icon.svg')"
              />
              <img
                v-else
                class="step-icon"
                :src="require('~/assets/uploads/about_property_icon.svg')"
              />
            </div>
            <p>About The Property</p>
          </NuxtLink>
        </div>
      </div>
     <NuxtChild/>
   

<!-- </div> -->
      <!-- <router-view
       <div>

        @updateRequestData="updateCreateRequestData"
      /> -->
    </div>
  </div>
</template>

<script>
// import { updateUserStatus } from "~/services/user-service.js";
// import Header from "~/components/header.vue";
export default {
  layout: "blog",
  name: "createRequestPage",
  // components: { Header },
  asyncData() {
    return {
      viewKey: 1,
      createRequestStep: "",
    };
  },
  methods: {
    updateViewKey() {
      this.viewKey += 1;
    },

    updateUser: async function (email, isActive) {
      // await updateUserStatus(email, isActive).then((updateUser) => {
      //   let cUser = JSON.parse(localStorage.getItem("currentUser"));
      //   cUser["_id"] = updateUser._id;
      //   cUser["firstName"] = updateUser.firstName;
      //   cUser["lastName"] = updateUser.lastName;
      //   cUser["username"] = cUser["firstName"] + " " + cUser["lastName"];
      //   cUser["phone"] = updateUser.phone;
      //   localStorage.setItem("currentUser", JSON.stringify(cUser));
      // });
    },
    updateCreateRequestData(params) {
      //   let requestData = JSON.parse(localStorage.getItem("createRequestData"));
      //   if (params.key == "steps") {
      //     requestData[params.key][params.step].complete = params.value;
      //   } else {
      //     requestData[params.key] = params.value;
      //   }
      //   localStorage.setItem("createRequestData", JSON.stringify(requestData));
      // },
    },
    created: async function () {
      if (!localStorage.getItem("createRequestData")) {
        localStorage.setItem(
          "createRequestData",
          JSON.stringify({
            steps: {
              createAccount: { complete: "false" },
              aboutLoan: { complete: "false" },
              createProperty: { complete: "false" },
              aboutProperty: { complete: "false" },
            },
          })
        );
      }
      this.createRequestData = localStorage.getItem("createRequestData");
      this.createRequestStep = this.createRequestData.createRequestStep;
      if ($nuxt.$route.path != "/createRequest") {
        if (this.createRequestStep) {
          this.$router.replace({
            path: "/createRequest/" + this.createRequestStep,
          });
        } else {
          // if (this.emailVerified != true) {
          //   this.$router.replace({
          //     path: "/createRequest/createAccount",
          //   });
          // } else
          this.$router.replace({
            path: "/createRequest/aboutLoan",
          });
        }
      }
    },
  },
  computed: {
    emailVerified: function () {
      return localStorage.getItem("emailVerified") == "true";
    },
    finishAuthProcess: function () {
      return localStorage.getItem("finishAuthProcess") == "true";
    },
    createRequestData: function () {
      let createRequestData = JSON.parse(
        localStorage.getItem("createRequestData")
      );
      if (!createRequestData) {
        createRequestData = {
          steps: {
            createAccount: { complete: "false", emailSend: "false" },
            aboutLoan: { complete: "false" },
            createProperty: { complete: "false" },
            aboutProperty: { complete: "false" },
          },
          createRequestStep: "aboutLoan",
        };
        localStorage.setItem(
          "createRequestData",
          JSON.stringify(createRequestData)
        );
      }
      return createRequestData;
    },
  },
};
</script>
<style>
#createRequest .main-container {
  margin-top: 0;
}
.request-steps {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
  top: -40.5px;
}
.step-button {
  width: 81.2px;
  height: 81.2px;
  border-radius: 50%;
  background-color: white;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 5px 9px var(--custom-gray);
}
.NuxtLink-active .step-button {
  border: 2px solid var(--custom-pink);
}
.step-button.complete {
  background-color: var(--custom-pink);
}
.request-step {
  cursor: pointer;
}
.request-step p {
  text-align: center;
  margin-top: 13px;
  color: #000000;
}
.request-step .NuxtLink-active p {
  font-weight: bold;
  color: var(--custom-pink);
}
.verify-link {
  display: flex;
  margin-top: 17px;
}
.verify-link.error {
  background-color: #ec255a1a;
  padding: 3px 5px 3px 10px;
  width: max-content;
  border-radius: 17px;
}
.verify-link p {
  margin-right: 10px;
  align-self: center;
}
.verify-link button {
  width: 101px;
  height: 28px;
  font-size: 14px;
  font-weight: normal;
}

@media screen and (max-width: 768px) {
  .step-button {
    width: 44.23px;
    height: 44.23px;
  }
  .step-button img {
    width: 50%;
  }
  .main-container {
    max-width: 264px;
  }
  .request-steps {
    top: -22.1px;
  }

  .main-content {
    margin-top: 50px;
  }

  .next-btn {
    padding-bottom: 71px;
  }

  label.form-label {
    margin-bottom: 0;
  }

  .verify-link {
    flex-wrap: wrap;
    justify-content: flex-end;
    margin-bottom: 15px;
  }
}
</style>