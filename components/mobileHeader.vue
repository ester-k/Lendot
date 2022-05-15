 <template>
 <div class="header mobile">
      <a href="">
      <img
      alt="lendot logo"
      class="lendot-icon mobile"
      :src="require('~/assets/uploads/mobile_logo.png')"
    /></a>
    <div class="blue-header"></div>

   </div>
</template>

<script>
export default {
  name: "MobileHeader",
  methods: {
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

 
