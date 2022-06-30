<template>
    <div class="popup" >

  <div class="view-pdf-popup">
    <vue-pdf-embed :source="source" />
   
    </div>
  </div>
</template>

<script>
// import $ from "jquery";
export default {
  name: "viewPdf",
  props: ["source"],
  methods: {},
  data() {
    return { width: "auto", height: "calc(100vh - 100px)" };
  },
  created() {
    // document.getElementById("app").classList.add("popup-opened");
    var loadCanvas = setInterval(checkLoadCanvas, 20);
    function checkLoadCanvas() {
      console.log("check");
      if (document.querySelector(".view-pdf-popup .vue-pdf-embed canvas")) {
        clearInterval(loadCanvas);
        document.querySelector(".view-pdf-popup .vue-pdf-embed canvas").style.width='-webkit-fill-available';
        
      }
    }
  },
};
</script>

<style scoped>
.popup {
 
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #00000069;
  /* display: flex; */
  z-index: 999;

}
.view-pdf-popup {
  position: relative;
  top: 50px;
  overflow: auto;
  max-height: calc(100vh - 100px);
  z-index: 999;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: white;
  width:80%
}

</style>