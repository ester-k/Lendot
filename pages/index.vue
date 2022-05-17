<template>
  <div class=""> 
<!--Start of Tawk.to Script-->

<script type="text/javascript">

var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();

(function(){

var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];

s1.async=true;

s1.src='https://embed.tawk.to/628254e8b0d10b6f3e726d8c/1g36hnbnr';

s1.charset='UTF-8';

s1.setAttribute('crossorigin','*');

s0.parentNode.insertBefore(s1,s0);

})();

</script>

<!--End of Tawk.to Script-->  </div>
</template>

<script>
export default {
  name: "IndexPage",
  methods: {
    logout() {
      $nuxt.$fire.auth.signOut();
      
    },
  },
  created() {
       
    // TODO: get this popup function out of here
    $(document).on("click", function (event) {
      if (event.target.classList.contains("popup-opened")) {
        document.getElementById("app").classList.remove("popup-opened");
        return;
      }
    });
  },
};
</script>
