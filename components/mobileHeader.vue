 <template>
 <div class="header mobile">
    <a href="">
      <img
      alt="lendot logo"
      class="lendot-icon mobile"
      :src="require('~/assets/uploads/noname_logo_mobile.svg')"
    /></a>
    <div class="blue-header">
      <h1 class="title">{{title}}</h1>
      <div class="menu-right">
        <NuxtLink to="/createRequest">
          <div class="plus">
            <img :src="require('~/assets/uploads/plus_loan_mobile.svg')" />
          </div>
        </NuxtLink>
        <div class="open-popup" @click="showMobileMenu = true">
          <img
            :src="require('~/assets/uploads/open_menu_mobile.svg')"
            alt="open menu"
          />
        </div>
      </div>
    </div>
    <mobileLoanerMenu v-show="showMobileMenu" @closeMobileMenu="showMobileMenu=false" :title="title" />
  </div>  
</template>

<script>
export default {
  name: "MobileHeader",
  data () {
    return {
      showMobileMenu: false
    }
  },
  methods: {
  },
  props:["title"]
};
</script>

<style>
.blue-header {
  height: 120px;
  background-color: var(--custom-blue);
  width: 100%;
}
.lendot-icon {
  position: absolute;
  top: 0;
  left: 0;
}
@media screen and (max-width: 768px) {
  .blue-header {
    background-color: var(--custom-blue);
    width: 100%;
    height: 50px;
    display:flex;
    align-items: center;
    justify-content: space-between;
  }

  h1.title {
    margin: 0;
    color: #ffffff;
    font-size: 15px;
    margin-left: 84px;
    font-weight: normal;
  }

  .menu-right {
    display: flex;
    align-items: center;
  }

  .menu-right .open-popup {
    margin: 0 26px 0 18px;
    display: flex;
  }

  .menu-right .plus {
    display: flex;
  }
}
</style>

 
