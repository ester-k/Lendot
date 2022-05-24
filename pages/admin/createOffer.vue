<template>
  <div class="main-container">
<div v-if="!requestExist">
  You must first <nuxt-link to="/admin/requests"> select a request</nuxt-link>
</div>

<div v-else>
    <div class="offer-details">
           <div class="inputs-flex">
        <div class="left-input">
          <label class="form-label">Annual Interest Rate</label>

          <div class="wrap-input ">
            <div class="input-amount">

              <input
                type="text"
                name="rate"
                placeholder="Enter A Number"
                v-model="form.rate"
                data-valid="num"
              />
            
               <p>$</p>
                       
             </div> 
          
          
        </div>
 </div>
        <div>
          <label class="form-label">Upfront Fees</label>

          <div class="wrap-input left-input">
                        <div class="input-amount">

            <input
              type="text"
              name="fee"
              placeholder="Enter A Number"
              v-model="form.upfrontFee"
               data-valid="num"
            />
           
          <p>$</p>

          </div>  
        </div>
      </div>
      </div>

        <div class="inputs-flex">
        <div class="left-input">
          <label class="form-label">Underwriting Fee</label>

          <div class="wrap-input ">
            <div class="input-amount">

              <input
                type="text"
                name="rate"
                placeholder="Enter A Number"
                v-model="form.underwritingFee"
                data-valid="num"
              />
            
               <p>$</p>
                       
             </div> 
          
          
        </div>
 </div>
        <div>
          <label class="form-label">Closing Timeline</label>

          <div class="wrap-input left-input">
                        <div class="input-amount">

            <input
              type="text"
              name="fee"
              placeholder="Enter A Number"
              v-model="form.closingTimeline"
               data-valid="num"
            />
           
          <p>$</p>

          </div>  
        </div>
      </div>
      </div>
    </div>
<div class="documents-container">
    <div class="title">Choose which documents you want to receive</div>
    <div class="documents-list">
         <input
         v-for="(input,index) of documents" :key="index"
              type="text"
              placeholder="doument name"
              v-model="documents[index]"
            />
    </div>
    <button class="fill-button add-doc" @click="addDoc">add document</button>
</div>
<div class="terms-container">
    <div class="title">Upload a terms document or loan detail document</div>
       <div
           
            class="upload-area"
            @drop="(event) => onDrop(event, index)"
            @dragover="(event) => event.preventDefault()"
          >
            <!-- <div class="name">{{ doc.name }}</div> -->
            <div class="upload-button">
              <img :src="require('~/assets/uploads/upload_small_icon.svg')" />
              <p>
                Drag and Drop files here or
                <a
                  onclick="document.getElementById('helper-input').click()"
                 
                  >choose file</a
                >
              </p>
              <p class="limit-msg">(only .pdf format, up to 5MB)</p>
            </div>
          </div>
        <input hidden type="file" id="helper-input" @change="uploadTerms" />
      <button @click="createOffer" >Create</button>

    </div>
  </div>
  </div>
</template>

<script>
import { getRequestById } from "~/services/request-service";
import { createOffer } from "~/services/offer-service";

export default {
  data() {
    return {
      request: {},
      documents: [""],
      requestExist: true,
      file: [],
      offer: { documents: [], requestId: "", terms: "" },
      form: {
        rate: "",
        upfrontFee: "",
        underwritingFee: "",
        closingTimeline: "",
      },
    };
  },
  methods: {
    getRequest: async function (requestId) {
      getRequestById(requestId).then((res) => (this.request = res));
    },
    addDoc: function () {
      this.documents.push("");
    },
    onDrop: function (event, index) {
      event.preventDefault();
      this.file[0] = event.dataTransfer.files[0];
      this.uploadTerms();
    },
    inputTrigger: function (event) {
      $(event.target)
        .closest(".upload-icon")
        .find(".inputFile")
        .trigger("click");
    },
    uploadTerms: function (event, index) {
      let self = this;
      //   if (index == undefined) index = this.index;
      if (event) this.file[0] = event.target.files[0];
      if (this.file[0]) {
        let fileType = this.file[0].type;
        let valid = ["application/pdf"];
        if (valid.includes(fileType)) {
          var fileReader = new FileReader();
          let uploadedFile = new Object();
          uploadedFile.type = this.file[0].type;
          let userId=self.currentUser._id
          debugger
          uploadedFile.name = userId.substring(0, 3)+"_"+userId.slice( -3)+"_"+this.file[0].name
          fileReader.onload = async () => {
            let fileCode = fileReader.result;
            //send to S3
            uploadedFile.blob = fileCode;
            let formData = new FormData();
            formData.append("fileName", uploadedFile.name);
            formData.append("type", uploadedFile.type);
            // formData.append("name", this.offer.documents[index].name);
            formData.append("blob", uploadedFile.blob);

            const axios = require("axios");
            
            let res = await axios
              .post(`http://localhost:5000/uploadDoc/terms`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
              })
              .then((res) => {
                return res.data;
              })
              .catch((err) => {
                if (err.response.data == "LIMIT_FIELD_VALUE")
                  alert("This file size is not supported");
                return false;
              });
            if (res) this.offer.terms = res.data;
            console.log(this.offer);
          };
          fileReader.readAsDataURL(this.file[0]);
        } else {
          alert("This format is not supported");
        }
      }
    },
    createOffer: async function () {
      let self = this;
      this.documents.forEach((doc, index) => {
        if (doc != "") self.offer.documents.push({ name: doc });
      });
      debugger;
      this.offer.requestId = this.request._id;
      this.offer.lenderId = this.currentUser._id;
      this.offer.rate = this.form.rate;
      this.offer.upfrontFee = this.form.upfrontFee;
      this.offer.underwritingFee = this.form.underwritingFee;
      this.offer.closingTimeline = this.form.closingTimeline;

      console.log(this.offer);
      createOffer(this.offer).then((res) => console.log(res));
    },
  },
  created() {
    if (this.$route.query.request) {
      this.getRequest(this.$route.query.request);
    } else {
      this.requestExist = false;
    }
  },
  computed: {
    currentUser: function () {
      return this.$store.state.currentUser;
    },
  },
};
</script>

<style>
.upload-area {
  border: 1px dashed var(--custom-blue);
  height: 216px;
  border-radius: 11px;
  padding: 23px 31px;
  margin-bottom: 17px;
}

.upload-area .name {
  font-weight: 500;
  font-size: 18px;
}
.upload-area .upload-button {
  margin: auto;
  margin-top: 62px;
  max-width: 340px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.upload-area img {
  margin-right: 12px;
}
.upload-area a {
  color: var(--custom-pink);
}

.limit-msg {
  margin: 12px;
}
.inputs-flex {
  display: flex;
}
.inputs-flex div {
  width: 100%;
}
</style>