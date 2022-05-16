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
    </div>

   </div>
</template>

<script>
export default {
  name: "MobileHeader",
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
    height: 65px;
    background-color: var(--custom-blue);
    width: 100%;
  }
}
</style>

 
