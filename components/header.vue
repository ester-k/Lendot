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
    <div class="blue-header"> <button class="fill-button back-button" @click="$router.go(-1)"><img   :src="require('~/assets/uploads/back_icon.svg')"> Back</button></div>
   </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    logout() {
      $nuxt.$fire.auth.signOut();
      localStorage.clear();
    },
  },
};
</script>

<style scoped>
.blue-header {
  height: 120px;
  background-color: var(--custom-blue);
  width: 100%;
  height: 120px;
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
.fill-button {
  margin-right: 218px;
  width: 118px;
height: 31px;
font-weight: 500;;
}
.fill-button img{
  margin-right:17px;
}
.back-button{
display: none;
}
@media screen and (max-width: 768px) {
  .blue-header {
    height: 65px;
    background-color: var(--custom-blue);
    width: 100%;
  }
}
</style>

 
