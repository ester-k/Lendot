<template>
  <div class="email-send">
    <div class="title">Hi {{ user.firstName }} {{ user.lastName }},</div>
    <p class="content">
      we're happy you signed up for lendot.<br />
      to continue please confirm your email address.
    </p>
    <button
      v-if="createAccountStep == 2"
      class="fill-button verify-now"
      @click="sendVerifyLink"
    >
      Verify Now
    </button>
    <p v-if="createAccountStep == 3" class="after-send-text">
      The email has been sent, if you did not receive it
      <a class="" @click="sendVerifyLink">send again</a>
    </p>
    <a
     v-if="createAccountStep == 2"
      class="continue-request"
      @click="$router.replace({ path: '/createRequest/aboutLoan' })"
    >
      continue process and verify later.
    </a>
  </div>
</template>

<script>
const actionCodeSettings = {
  url: window.location.origin + "/createPassword",
  handleCodeInApp: true,
};
// import firebase from "firebase";

export default {
  name: "VerifyEmail",
  prop: ["currentUser"],
  data() {
    return {
      user: {},
    };
  },
  methods: {
    sendVerifyLink() {

      let email = this.user.email;
      this.$fire.auth
        .sendSignInLinkToEmail(email, actionCodeSettings)
        .then((response) => {
          localStorage.setItem("emailForSignIn", email);
          let data = JSON.parse(localStorage.getItem("createRequestData"));
          data.steps["createAccount"].emailSend = "true";
          localStorage.setItem("createRequestData", JSON.stringify(data));
          this.loaclEmailSend = true;
          this.$store.commit("setState", {
            value: 3,
            state: "createAccountStep",
          });
          localStorage.setItem("createAccountStep", 3);
          //   createUser(newUser);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    if (!this.$store.state.currentUser)
      this.$store.commit("setState", {
        value: JSON.parse(localStorage.getItem("currentUser")),
        state: "currentUser",
      });
    this.user = this.$store.state.currentUser || {};
    if (this.$store.state.createAccountStep == 3) {
      this.sendVerifyLink();
    }
   
  },
  computed: {
    emailSend: function () {
      return (
        JSON.parse(localStorage.getItem("createRequestData")).steps[
          "createAccount"
        ].emailSend == "true"
      );
    },
    createAccountStep: function () {
      return this.$store.state.createAccountStep;
    },
  },
};
</script>

<style scoped>
.send-email {
  color: var(--custom-blue);
  max-width: 480px;
}
.title {
  font-size: 30px;
  font-weight: 600px;
  color: var(--custom-blue);
}
.content {
  font-size: 20px;
  margin-bottom: 57px;
}
button.verify-now {
  margin-bottom: 26px;
  height: 52px;
  width: 190px;
  font-size: 20px;
  font-weight: bold;
}
a.continue-request {
  font-size: 16px;
  text-decoration: underline;
  color: var(--custom-pink);
  display: block;
}
p.after-send-text {
  margin-bottom: 60px;
  font-size: 20px;
}
p.after-send-text a {
  color: var(--custom-pink);
}
</style>