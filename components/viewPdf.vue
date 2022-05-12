<template>
<div>
  <!-- <div class="view-pdf-container">  -->
  <!-- <vue-pdf-embed :source="this.source" /> -->
  <!-- </div> -->
</div>
</template>

<script>
// import VuePdfEmbed from "vue-pdf-embed";
import $ from "jquery";
export default {
  name: "viewPdf",
  prop: ["source"],
  // components: { VuePdfEmbed },
  methods: {},
  created() {
    document.getElementById("app").classList.add("popup-opened");
  
  },
};
</script>

<style scoped>
.view-pdf-popup {
  position: fixed;
  top: 50px;
  overflow: auto;
  max-height: calc(100vh - 100px);
  z-index: 999;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: white;
}
</style>