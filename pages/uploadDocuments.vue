<template>
  <div class="">
    <!-- :back="backDetails" -->
    <Header  />
    <div class="upload-docs-container">
      <div class="title">UPLOAD DOCUMENTS</div>
      <div class="sub-title">Upload the required documents</div>
      <div class="documents">
        <div v-for="(doc, index) of offer.documents" :key="index">
          <div
            class="wrap-document existing-doc"
            v-if="doc.loanerDocs.length"
            @click="(event) => openDragArea(index)"
            data-open="false"
          >
            <div class="upload-icon">
              <img :src="require('~/assets/uploads/upload_success.svg')" />
            </div>
            <div class="name">{{ doc.name }}</div>
            <div class="files">
              <div
                v-for="(file, fileIndex) of doc.loanerDocs"
                :key="fileIndex"
                @click.stop="(event) => selectFile(event, index, fileIndex)"
              >
                {{ file.name }}
              </div>
            </div>
            <div class="actions" :id="'actions' + index">
              <img
                :src="require('~/assets/uploads/delete_doc.svg')"
                @click.stop="removeFile(index, file)"
              />
              <!-- <img
                :src="require('~/assets/uploads/view_doc.svg')"
                @click="viewFile.stop"
              /> -->
              <img
                class="add-doc"
                :src="require('~/assets/uploads/add_doc.svg')"
              />
            </div>
          </div>
          <div class="wrap-document" v-else @click="openDragArea(index)">
            <div class="upload-icon">
              <img :src="require('~/assets/uploads/upload_icon.svg')" />
              <input
                class="inputFile"
                type="file"
                hidden
                @change="(event) => uploadDoc(event, index)"
              />
            </div>
            <div class="name">{{ doc.name }}</div>
          </div>
          <div
            :id="'upload' + index"
            class="upload-area"
            @drop="(event) => onDrop(event, index)"
            @dragover="(event) => event.preventDefault()"
          >
            <div class="name">{{ doc.name }}</div>
            <div class="upload-button">
              <img :src="require('~/assets/uploads/upload_small_icon.svg')" />
              <p>
                Drag and Drop files here or
                <a
                  onclick="document.getElementById('helper-input').click()"
                  @click="changeIndex(index)"
                  >choose file</a
                >
              </p>
              <p>only PDF format</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <input hidden type="file" id="helper-input" @change="uploadDoc" />
  </div>
</template>

<script>
import Header from "~/components/header.vue";
import { getOfferById } from "~/services/offer-service.js";
import { removeFileDB } from "~/services/documents-service.js";
import $ from "jquery";
export default {
  name: "UploadDocuments",
  components: { Header },
  asyncData() {
    return {
      offer: "",
      file: [],
      fileReader: new FileReader(),
      index: 0,
      currentFile: -1,
    };
  },
  async created() {
    this.offer = this.$route.query.offer;
    let localOffer = JSON.parse(localStorage.getItem("offerToAction"));

    if (this.offer) {
      if (localOffer) {
        if (localOffer._id == this.offer) {
          this.offer = localOffer;
        }
      }
    }
    if (!localOffer || typeof this.offer == "string") {
      await getOfferById(this.offer).then((response) => {
        this.offer = response;
      });
    }
    // close drag area
    $(document).on("click", function (event) {
      if (document.querySelector(".files .selected"))
        document.querySelector(".files .selected").classList.remove("selected");
      if (document.querySelector(".actions.show")) {
        if (
          !$(event.target).closest(".actions").length ||
          !$(event.target).closest(".files").length
        ) {
          if (document.querySelector(".actions.show"))
            document.querySelector(".actions.show").classList.remove("show");
        } else {
          return;
        }
      }
      if (
        !event.target.closest(".upload-area") &&
        !event.target.closest(".wrap-document")
      ) {
        if (document.querySelector(".upload-area.show"))
          document.querySelector(".upload-area.show").classList.remove("show");
      } else {
        return;
      }
    });
  },
  methods: {
    changeIndex(index) {
      this.index = index;
    },
    inputTrigger: function (event) {
      $(event.target)
        .closest(".upload-icon")
        .find(".inputFile")
        .trigger("click");
    },
    uploadDoc: function (event, index) {
      let self = this;
      if (index == undefined) index = this.index;
      if (event) this.file[0] = event.target.files[0];
      if (this.file[0]) {
        let fileType = this.file[0].type;
        let valid = ["application/pdf"];
        if (valid.includes(fileType)) {
          var fileReader = new FileReader();
          let uploadedFile = new Object();
          uploadedFile.type = this.file[0].type;
          uploadedFile.name = this.file[0].name;
          fileReader.onload = async () => {
            let fileCode = fileReader.result;
            //send to S3
            uploadedFile.blob = fileCode;
            let formData = new FormData();
            formData.append("fileName", uploadedFile.name);
            formData.append("type", uploadedFile.type);
            formData.append("name", this.offer.documents[index].name);
            formData.append("blob", uploadedFile.blob);

            const axios = require("axios");
            let res = await axios
              .post(`http://localhost:5000/uploadDoc`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
              })
              .then((res) => {
                return res.data.doc;
              })
              .catch((err) => {
                console.log(err.response);
                return false;
              });
            self.offer = res;
            console.log("add", self.offer);
          };
        }
        fileReader.readAsDataURL(this.file[0]);
      } else {
        alert("upload pdf file");
      }
    },
    onDrop: function (event, index) {
      event.preventDefault();
      this.index = index;
      this.file[0] = event.dataTransfer.files[0];
      this.uploadDoc();
    },
    selectFile: function (event, index, fileIndex) {
      if (document.querySelector(".files .selected"))
        document.querySelector(".files .selected").classList.remove("selected");
      event.target.classList.add("selected");
      document.getElementById("actions" + index).classList.add("show");
      this.currentFile = fileIndex;
    },
    async removeFile(docIndex, fileIndex) {
      let file = this.offer.documents[docIndex].loanerDocs[this.currentFile];
      let params = {
        offerId: this.offer._id,
        docName: this.offer.documents[docIndex].name,
        fileName: file.name,
        url: file.url,
      };
      let self = this;
      await removeFileDB(params).then((response) => {
        self.offer = response;
        console.log("remove", self.offer);
      });
    },
    openDragArea: function (index) {
      if (document.querySelector(".upload-area.show"))
        document.querySelector(".upload-area.show").classList.remove("show");
      document.getElementById("upload" + index).classList.add("show");
      // event.target.setAttribute("data-open", "true");
    },
  },
  mounted(){
    let tawkToScript = document.createElement('script')
    let inlineCode = document.createTextNode(`
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src='https://embed.tawk.to/628254e8b0d10b6f3e726d8c/1g36hnbnr';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
      })();
      Tawk_API.onLoad = function(){
          setTimeout(function(){ 
            var iframe = document.querySelector("iframe[title='chat widget']");
            const new_style_element = document.createElement("style");
            new_style_element.textContent = "span.tawk-badge.tawk-flex.tawk-flex-center.tawk-flex-middle.tawk-min-badge {background-color: #EC255A;inset: 0 auto auto  0 !important;}"
            iframe.contentDocument.head.appendChild(new_style_element); 
          },2000);
      };
    `);
    tawkToScript.appendChild(inlineCode); 
    document.head.appendChild(tawkToScript);
  },
};
</script>

<style scoped>
.upload-docs-container {
  max-width: 1200px;
  margin: auto;
  margin-top: 94px;
}
.title {
  font-size: 29px;
  font-weight: bold;
  margin-bottom: 3px;
}
.sub-title {
  font-size: 18px;
  font-weight: 500;
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
  display: none;
  margin-left: 11px;
}
.wrap-document .actions.show img,
.wrap-document .actions img.add-doc {
  display: block;
}
.wrap-document .files {
  display: flex;
  align-items: center;
  width: 720px;
  flex-wrap: wrap;
  gap: 10px 0;
  padding: 22px 0;
}
.wrap-document .files div {
  margin-left: 10px;
  background-color: #dcddec;
  border-radius: 21px;
  padding: 8px 22px;
  cursor: pointer;
}
.wrap-document .files div.selected {
  border: 1px solid var(--custom-blue);
}
.upload-area {
  border: 1px dashed var(--custom-blue);
  height: 216px;
  border-radius: 11px;
  padding: 23px 31px;
  margin-bottom: 17px;
  display: none;
}
.upload-area.show {
  display: block;
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
.back-button {
  display: block;
}

@media screen and (max-width: 768px) {

  .title {
    font-size: 20px;
    margin-bottom: 8px;
  }

  .sub-title {
    font-size: 15px;
  }

  .upload-docs-container {
    margin: 0;
    padding: 45px 27px;
  }

  .upload-icon img {
    transform: scale(0.6);
  }

  .wrap-document .upload-icon {
    width: auto;
    margin-left: 23px;
  }

  .wrap-document.existing-doc .name {
    font-weight: 600;
    margin: 0;
  }

  .wrap-document .actions {
    margin-right: 20px;
  }

  .wrap-document {
    min-height: 58px;
    flex-wrap: wrap;
  }

  .wrap-document .name {
    font-size: 12px;
  }

  .wrap-document .files {
    order: 1;
    padding: 0;
    margin-bottom: 17px;
    width: 100%;
    padding: 0 9px;
    gap: 10px 5px;
  }

  .wrap-document .files div {
    margin: 0;
    font-size: 10px;
    padding: 0;
    width: 133px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    font-weight: 600;
  }

  .upload-area .name {
    font-size: 12px;
    font-weight: 600;
  }

  .upload-area {
    height: 128px;
    padding: 17px;
  }

  .upload-area .upload-button {
    margin-top: calc(40px - 18px );
    font-size: 12px;
    align-items: flex-start;
    margin-right: 10px;
  }

  .upload-button p {
    width: 162px;
    text-align: center;
  }

  .upload-area img {
    transform: scale(0.6);
    margin-right: 7px;
  }

  .upload-button p:last-child {
    margin-left: 30px;
  }

  .wrap-document .actions img {
    transform: scale(0.6);
    margin-left: 0;
  }
}

</style>