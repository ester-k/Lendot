<template>
  <div class="main-container">
    <div id="created-success">The offer was successfully created</div>
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
      <div class="flex" v-for="(input,index) of documents" :key="index">

         <input
        @blur="showSave(index)"
        @focus="hideSave(index)"
              type="text"
              placeholder="doument name"
              v-model="documents[index]"
            />
             <div class="save-change" :id="'save'+index"  @click="addDoc">
          Saved..
        </div>
      </div>
    </div>
    <img
    @click="addDocInput"
                class="add-doc"
                :src="require('~/assets/uploads/add_doc.svg')"
              />
    
</div>
<div class="terms-container"  v-if="!offer.terms">
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
   
    </div>
      <div
            class="wrap-document existing-doc"
            v-else
                       data-open="false"
          >
            <div class="upload-icon">
              <img :src="require('~/assets/uploads/upload_success.svg')" />
            </div>
            <div class="name">{{ termsFileName }}</div>
           
            <div class="actions" :id="'actions' + index">
              <img
                :src="require('~/assets/uploads/delete_doc.svg')"
              />
              <!-- @click.stop="removeFile(index, file)" -->
              <!-- <img
                :src="require('~/assets/uploads/view_doc.svg')"
                @click="viewFile.stop"
              /> -->
              
            </div>
          </div>
             <button @click="createOffer" >Create</button>

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
      termsFileName: "",
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
    addDocInput: function () {
      this.documents.push("");
    },
    addDoc: function () {},
    showSave: function (index) {
      document.getElementById("save" + index).style.display = "none";
    },
    hideSave: function (index) {
      document.getElementById("save" + index).style.display = "block";
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
          let userId = self.currentUser._id;
          this.termsFileName = this.file[0].name;
          uploadedFile.name =
            userId.substring(0, 3) +
            "_" +
            userId.slice(-3) +
            "_" +
            this.file[0].name;
          fileReader.onload = async () => {
            let fileCode = fileReader.result;
            //send to S3
            uploadedFile.blob = fileCode;
            let formData = new FormData();
            formData.append("fileName", uploadedFile.name);
            formData.append("type", uploadedFile.type);
            // formData.append("name", this.offer.documents[index].name);
            formData.append("blob", uploadedFile.blob);
            this.offer.terms = formData;
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
      const axios = require("axios");
      let res = await axios
        .post(`http://localhost:5000/uploadDoc/terms`, self.offer.terms, {
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
      this.offer.requestId = this.request._id;
      this.offer.lenderId = this.currentUser._id;
      this.offer.rate = this.form.rate;
      this.offer.upfrontFee = this.form.upfrontFee;
      this.offer.underwritingFee = this.form.underwritingFee;
      this.offer.closingTimeline = this.form.closingTimeline;

      console.log(this.offer);
      createOffer(this.offer).then((res) => {
        document.getElementById("created-success").style.display = "block"
        setTimeout(removeV, 1000)
        function removeV() {
          self.$router.replace({path: "/admin/requests"})
             
        }
    })
  }},
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
.documents-container {
  margin: 20px 0;
}
.add-doc {
  margin-top: 10px;
}
.wrap-document {
  border: 1px solid var(--custom-blue);
  border-radius: 11px;
  min-height: 89px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 17px;
}
.wrap-document .name {
  font-size: 18px;
  font-weight: 500;
}
.wrap-document:not(.existing-doc) .name {
  margin-bottom: 14px;
}
.wrap-document .upload-area-center {
  width: 890px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.wrap-document.existing-doc .name {
  font-weight: bold;
  margin-right: 22px;
}
.wrap-document .upload-icon {
  width: 58px;
  margin-left: 33px;
}
.wrap-document:not(.existing-doc) .upload-icon {
  cursor: pointer;
}
.wrap-document .actions {
  display: flex;
  justify-content: space-between;
  margin-right: 33px;
  margin-left: auto;
}
.wrap-document .actions img {
  cursor: pointer;
  margin-left: 11px;
}
#created-success{
  display:none;
     font-size: 30px;
    background-color: white;
    padding: 20px;
    z-index: 9;
    position: absolute;
    top: 50px;
    border: var(--custom-blue) 2px solid;
    border-radius: 11px;
box-shadow: 0px 7px 12px #00000029;
}
</style>