<template>
  <div class="mobile-sidebar-menu">
    <div class="mobile-menu">
        <div class="close-menu" @click="closeMobileMenu">
          <img
            :src="require('~/assets/uploads/close_menu_mobile.svg')"
            alt="close menu"
          />
        </div>
        <div class="menu-item">
          <NuxtLink to="/loanerScreen/actions">
            <p  :class="{'active' : title.toLowerCase() == 'Actions'.toLowerCase() ? true : false }">Actions</p>
          </NuxtLink>
        </div>
        <div class="menu-item">
          <NuxtLink to="/loanerScreen/loans">
            <p :class="{'active' : title.toLowerCase() == 'Loans'.toLowerCase() ? true : false }">Loans</p>
          </NuxtLink>
        </div>
        <div class="menu-item">
          <NuxtLink to="/loanerScreen/offers">
            <p :class="{'active' : title.toLowerCase() == 'Offers'.toLowerCase() ? true : false }">Offers</p>
          </NuxtLink>
        </div>
        <div class="menu-item">
          <NuxtLink to="/loanerScreen/accountSettings">
            <p :class="{'active' : title.toLowerCase() == 'Account Settings'.toLowerCase() ? true : false }">Account Settings</p>
          </NuxtLink>
        </div>
        <button class="fill-button contact-us">Need Help?</button>
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
        <div class="user-details">
            <p class="full-name">{{ currentUser.username }}</p>
            <p class="user-email">{{ currentUser.email }}</p>
            <button class="border-button edit-profile"
            @click="$router.replace({ path: '/loanerScreen/accountSettings' })">Edit Profile</button>
        </div>
    </div>
  </div>
</template>

<script>
import { User } from "~/models/user";
export default {
  name: "mobileLoanerMenu",
  data() {
    return {
      isActive:'',
    };
  },
  methods: {
    closeMobileMenu () {
      this.$emit('closeMobileMenu')
    }
  },
  created() { 

  },
  computed: {
    currentUser: function () {
      return this.$store.state.currentUser;
    },
  },
  props:["title"],
};
</script>

<style>
@media screen and (max-width: 768px) {
  .mobile-sidebar-menu {
      height: 100%;
      width: 332px;
      background-color: var(--custom-light-gray);
      position: fixed;
      top: 0;
      right: 0;
      z-index: 10;
      box-shadow: 0px 3px 6px #00000029;
  }

  .mobile-menu{
      display:flex;
      flex-direction:column;
      padding: 0 31px;
  }

  .close-menu {
      text-align: right;
      margin: 21px 0 62px;
  }

  button.fill-button.contact-us {
      border: 2px solid var(--custom-pink);
      background-color: transparent;
      color: var(--custom-pink);
      font-size: 14px;
      line-height: 14px;
      margin-top: 10px;
  }

  .mobile-menu .user-details {
    margin: 0;
    color: var(--custom-blue);
    font-size: 15px;
  }

  .mobile-menu .user-details .full-name{
    font-weight: bold;
    margin-bottom: 0;
  }

  .mobile-menu .user-details .user-email {
      margin-bottom: 0;
  }

  .edit-profile{
      line-height: 19px;
      border-color: var(--custom-blue);
      color: var(--custom-blue);
      margin-top: 20px
  }

  .menu-item a {
      color: var(--custom-blue);
      font-size: 15px;
  }

  .menu-item {
      margin-bottom: 20px;
  }

  .new-loan {
      margin: 30px 0;
      border-top: 1px solid rgba(22, 24, 83, 0.16);
      border-bottom: 1px solid rgba(22, 24, 83, 0.16);
      padding: 30px 0;
  }

  .new-loan-button .new-loan-link {
      flex-grow: 1;
      height: 29px;
  }

  .new-loan-button .new-loan-link p {
      font-size: 12px;
      font-weight: normal;
      line-height: 29px;
  }
  .menu-item p.active {
    color: var(--custom-pink);
    font-weight: 600;
    border-bottom: 2px solid var(--custom-pink);
    width: fit-content;
  }
}
</style>