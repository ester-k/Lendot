<template>
  <div class="mobile-sidebar-menu">
    <div class="mobile-menu">
        <div class="close-menu" @click="closeMobileMenu">
          <img
            :src="require('~/assets/uploads/close_menu_mobile.svg')"
            alt="close menu"
          />
        </div>
        <div  v-for="menueItem in menue">
          <div class="menu-item">
            <NuxtLink :to="'/loanerPanel/' + menueItem.toLowerCase().split(' ').join('')" @click="closeMobileMenu">
              <p  :class="{'active' : title.toLowerCase() == menueItem.toLowerCase() ? true : false }">{{menueItem}}</p>
            </NuxtLink>
          </div>
        </div>
        <button class="border-button contact-us" @click="openChat">Need Help?</button>
        <div class="new-loan">
          <NuxtLink to="/createRequest" @click="closeMobileMenu">
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
            @click="$router.replace({ path: '/loanerPanel/accountSettings' })">Edit Profile</button>
            <button @click="logout" class="border-button logout"> Logout </button>
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
      menue: ["Actions","Loans","Offers","Account Settings"]
    };
  },
  methods: {
    closeMobileMenu () {
      this.$emit('closeMobileMenu')
    },
    logout() {
      $nuxt.$fire.auth.signOut();
      localStorage.clear();
    },
    openChat(){
      this.$emit('closeMobileMenu')
      var iframe = document.querySelector("iframe[title='chat widget']");
      var button = iframe.contentDocument.querySelector("button");
      button.click();
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
  watch: {
    '$route' () {
      this.$emit('closeMobileMenu')
    }
  },
};
</script>

<style>
@media screen and (max-width: 768px) {
  .mobile-sidebar-menu {
    height: 100%;
    width: 93%;
    max-width: 332px;
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

  button.contact-us {
    color: var(--custom-pink);
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

  .edit-profile, .logout{
    line-height: 19px;
    border-color: var(--custom-blue);
    color: var(--custom-blue);
    margin-top: 20px;
    display:block;
  }

  .mobile-menu .logout{
    margin-top: 10px;
  }

  .menu-item a {
    color: var(--custom-blue);
    font-size: 15px;
  }

  .menu-item {
    margin-bottom: 20px;
  }

  .mobile-menu .new-loan {
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