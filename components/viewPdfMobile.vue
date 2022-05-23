<template>
  <div class="pdf-popup-mobile" >
    <div class="blue-header">
      <!--<img
        :src="require('~/assets/uploads/open_document_menu.svg')"
        alt="close menu"
      /> -->
      <div class="close-pdf" @click="closePdfPopup">
        <img
          :src="require('~/assets/uploads/close_document.svg')"
          alt="close menu"
        />
      </div>
    </div>
    <div class="view-pdf-popup">
      <vue-pdf-embed :source="source" />
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "viewPdfMobile",
  props: ["source"],
  methods: {  
    closePdfPopup () {
      this.$emit('closePdfPopup')
    }
  },
  data() {
    return { width: "auto", height: "calc(100vh - 100px)" };
  },
  created() {
    var loadCanvas = setInterval(checkLoadCanvas, 20);
    function checkLoadCanvas() {
      if (document.querySelector(".view-pdf-popup .vue-pdf-embed canvas")) {
        clearInterval(loadCanvas);
        document.querySelector(".view-pdf-popup .vue-pdf-embed canvas").style.width='-webkit-fill-available';
        
      }
    };
  },
};
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .pdf-popup-mobile {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #636363;
    z-index: 999;
    display: block;
  }
  .view-pdf-popup {
    position: relative;
    top: 14px;
    overflow: auto;
    z-index: 999;
    background-color: white;
    width: calc(100% - 18px);
    left: 50%;
    transform: translate(-50%, 0);
    height: auto;
  }

  .close-pdf {
    display: flex;
    margin-right: 27px;
  }

  .blue-header {
    justify-content: flex-end;
  }
}
</style>