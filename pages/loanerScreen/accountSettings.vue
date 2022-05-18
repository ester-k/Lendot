<template>
  <div class="account-container page-content">
    <section class="personal-info">
      <div class="title">Personal Information</div>
      <div class="account-info">
        <p class="key">Name:</p>
        <p class="value" id="name_field">{{ currentUser.username }}</p>
        <img class="edit-icon" alt="edit icon" :src="require('~/assets/uploads/edit_icon.svg')"
          @click="(event) => editProfile(event, 'name')" />
        <div class="save-change" @click="(event) => updateProfile(event, 'username')">
          Update
        </div>
      </div>
      <div class="account-info">
        <p class="key">Email:</p>
        <p class="value" id="email_field">{{ currentUser.email }}</p>
        <img class="edit-icon" alt="edit icon" :src="require('~/assets/uploads/edit_icon.svg')"
          @click="(event) => editProfile(event, 'email')" />
        <div class="save-change" @click="(event) => updateProfile(event, 'email')">
          Update
        </div>
      </div>

      <div class="account-info">
        <p class="key">Phone:</p>
        <p class="value" id="phone_field">{{ currentUser.phone }}</p>
        <img class="edit-icon" alt="edit icon" :src="require('~/assets/uploads/edit_icon.svg')"
          @click="(event) => editProfile(event, 'phone')" />
        <div class="save-change" @click="(event) => updateProfile(event, 'phone')">
          Update
        </div>
      </div>

      <div class="account-info">
        <p class="key">Company Name:</p>
        <p class="value" id="company_field">your company name</p>
        <img class="edit-icon" alt="edit icon" :src="require('~/assets/uploads/edit_icon.svg')"
          @click="(event) => editProfile(event, 'company')" />
        <div class="save-change" @click="(event) => updateProfile(event, 'company')">
          Update
        </div>
      </div>
    </section>
    <section class="">
      <div class="account-info">
                        <NuxtLink to="/resetPassword" class="forgot-password key">Reset Password</NuxtLink>
              </div>
    </section>
    <!-- <section class="rating"><div class="title">Your Rating</div></section> -->
  </div>
</template>

<script>
import $ from "jquery";
import { User } from "~/models/user";
import { updateUser } from "~/services/user-service.js";

export default {
  name: "AccountSettings",
  data() {
    return {};
  },
  methods: {
    editProfile(event, fieldName) {
      let input = document.getElementById(fieldName + "_field");
      input.setAttribute("contenteditable", true);
      var range = document.createRange();
      var sel = window.getSelection();
      range.setStart(input.childNodes[0], input.innerText.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
        $(".save-change").css("display", "none");
      $(event.target)
        .closest(".account-info")
        .find(".save-change")
        .css("display", "block");
    },
    showPassword(event, field) {
      event.target.src = require("~/assets/uploads/show_password.svg");
      let password = document.getElementById(field + "_field");
      let type;
      if (password.getAttribute("type") === "password") {
        type = "text";
        event.target.src = require("~/assets/uploads/hide_password.svg");
      } else {
        type = "password";
        event.target.src = require("~/assets/uploads/show_password.svg");
      }
      password.setAttribute("type", type);
    },
    updateProfile: async function (event, field) {
      let updatedUser = new User();
      updatedUser = JSON.parse(localStorage.getItem("currentUser"));
      let input = $(event.target).closest(".account-info").find(".value")[0];
      updatedUser[field] = input.innerText;
      updatedUser._id;
      await updateUser(updatedUser._id, updatedUser).then((res) => {
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        this.$store.commit("setState", {
          value: updatedUser,
          state: "currentUser",
        });
        let text = $(event.target)
          .closest(".account-info")
          .find(".save-change")[0];
        let img = document.createElement("img");
        img.src = require("~/assets/uploads/update_success.gif");
        text.innerHTML = "";
        text.appendChild(img);
        setTimeout(removeV, 1000);
        function removeV() {
          text.innerHTML = "Update";
          document
            .querySelectorAll(".save-change")
            .forEach((node) => (node.style.display = "none"));
        }
      });
    },
  },
  computed: {
    currentUser: function () {
      return JSON.parse(localStorage.getItem("currentUser"));
    },
  },
  created() {
    // exit from edit state on click outside the row
    $(document).on("click", function (event) {
      //if the click is not on the edit icon or on the active field or on save button
      if (!event.target.classList.contains("edit-icon")) {
        if (
          !(
            event.target.classList.contains("value") ||
            event.target.classList.contains("save-change")
          )
        ) {
          // !(
          //  ( event.target.classList.contains("value") ||
          //    event.target.classList.contains("save-change"))
          //  &&
          // $(event.target)
          //   .closest(".account-info")
          //   .find(".value[contenteditable=true]")[0] == event.target
          // )
          let activeField = document.querySelector(
            ".account-info .value[contenteditable=true]"
          );
          if (document.querySelectorAll(".save-change"))
            document
              .querySelectorAll(".save-change")
              .forEach((node) => (node.style.display = "none"));
          if (activeField) {
            activeField.setAttribute("contenteditable", false);
            document
              .querySelectorAll(".save-change")
              .forEach((node) => (node.style.display = "none"));
          }
        }
      }
    });
    this.$emit("childTitle", "account settings");
  },
};
</script>

<style>
.account-container {
  color: var(--custom-blue);
  margin-top: 92px;
}

.account-container section {
  box-shadow: 3px 3px 11px #00000029;
  border-radius: 10px;
  background-color: white;
  padding: 40px 0 30px 60px;
  margin-bottom: 30px;
}

.account-container section .title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 34px;
}

.account-info {
  display: flex;
}

.account-info .key {
  font-size: 16px;
  font-weight: 600;
  margin-right: 13px;
}

.edit-icon {
  margin-left: 10px;
  cursor: pointer;
}

.show-password {
  cursor: pointer;
  margin-left: 10px;
}

.account-info .value[contenteditable="true"]:focus-visible {
  border: unset;
  outline: none;
  border-bottom: #707070 1px solid;
}

.account-info .password {
  height: unset;
  border: none;
  width: max-content;
  padding: 0;
}

.save-change {
  font-size: 16px;
  margin-left: 18px;
  color: var(--custom-pink);
  display: none;
  cursor: pointer;
}
.save-change img {
  height: 16px;
}
.forgot-password,
.forgot-password:hover {
  color: var(--custom-blue);
}
</style>