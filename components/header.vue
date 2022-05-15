 <template>
 <div class="header">
      <a href="">  <img
      alt="lendot logo"
      class="lendot-icon desktop"
      :src="require('~/assets/uploads/logo.svg')"
    />
      <img
      alt="lendot logo"
      class="lendot-icon mobile"
      :src="require('~/assets/uploads/mobile_logo.png')"
    /></a>
    <!-- <button class="fill-button"> back</button> -->
    <div class="blue-header"></div>
         <!-- <button @click="logout"> Logout </button> -->

   </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    logout() {
      $nuxt.$fire.auth.signOut();
      localStorage.removeItem("currentUser");
      localStorage.removeItem("createRequestData");
            localStorage.removeItem("emailVerified");

    },
  },
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
    height: 65px;
    background-color: var(--custom-blue);
    width: 100%;
  }
}
</style>

 
