<template>
  <!-- <div  class="view-pdf-container"> -->
  <div class="view-pdf-popup">
    <vue-pdf-embed :source="source" />
    <!-- </div> -->
  </div>
</template>

<script>
// import $ from "jquery";
export default {
  name: "viewPdf",
  props: ["source"],
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