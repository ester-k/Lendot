<template>
  <div class="mobile-sidebar-menue">
    <div class="mobile-menu">
        <div class="close-menue" @click="closeMobileMenu">
          <img
            :src="require('~/assets/uploads/close_view_popup.svg')"
            alt="close menue"
          />
        </div>
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
    return {};
  },
  methods: {
    closeMobileMenu () {
      this.$emit('closeMobileMenu')
    }
  },
  created() { },
  computed: {
    currentUser: function () {
      return this.$store.state.currentUser;
    },
  },
};
</script>

<style>
.mobile-sidebar-menue {
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

.close-menue img {
    width: 10.5px;height: 10.5px;
}

.close-menue {
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

.user-details .full-name{
  font-weight: bold;
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

</style>