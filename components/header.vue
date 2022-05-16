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
    <div class="blue-header"> <button class="fill-button" @click="$router.go(-1)"> back</button></div>
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
  height: 120px;
    background-color: var(--custom-blue);
    width: 100%;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: right;
}
.lendot-icon {
  position: absolute;
  top: 0;
  left: 0;
}
.fill-button{
  margin-right: 218px;
}
@media screen and (max-width: 768px) {
  .blue-header {
    height: 65px;
    background-color: var(--custom-blue);
    width: 100%;
  }
}
</style>

 
