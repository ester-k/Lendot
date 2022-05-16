<template>
  <div class="">
    <!-- :back="backDetails" -->
    <Header  />
    <div class="upload-docs-container">
      <div class="title">Upload Documents</div>
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
            <div class="upload-area-center">
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
            <div class="upload-area-center">
              <div class="name">{{ doc.name }}</div>
            </div>
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
  data() {
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
            console.log(uploadedFile);
            let formData = new FormData();
            formData.append("fileName", uploadedFile.name);
            formData.append("type", uploadedFile.type);
            formData.append("name", this.offer.documents[index].name);
            formData.append("blob", uploadedFile.blob);
            let self = this;
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
            console.log(this.offer.documents[index]);
            this.offer.documents[index] = res;
            console.log(this.offer.documents[index]);
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
    async removeFile(docIndex) {
      let file = this.offer.documents[docIndex].loanerDocs[this.currentFile];
      let params = {
        offerId: this.offer._id,
        docName: this.offer.documents[docIndex].name,
        fileName: file.name,
        url: file.url,
      };
      let self = this;
      await removeFileDB(params).then((response) => {
        self.offer.documents = response.documents;
      });
    },
    openDragArea: function (index) {
      if (document.querySelector(".upload-area.show"))
        document.querySelector(".upload-area.show").classList.remove("show");
      document.getElementById("upload" + index).classList.add("show");
      // event.target.setAttribute("data-open", "true");
    },
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
  justify-content: center;
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
}
.wrap-document.existing-doc .name {
  font-weight: bold;
  margin-right: 22px;
}
.wrap-document .upload-icon {
  width: 58px;
}
.wrap-document:not(.existing-doc) .upload-icon {
  cursor: pointer;
}
.wrap-document .actions {
  display: flex;
  justify-content: space-between;
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
.back-button{
display: block;
}
</style>