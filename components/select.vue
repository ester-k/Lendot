<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option.value;
          open = false;
          $emit('input', option.data || option.value, option.order);
        "
      >
        {{ option.value }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "select",
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0].value
        : null,
      open: false,
    };
  },
  mounted() {
    this.$emit("input", this.selected);
  },
  methods: {},
  created() {},
};
</script>

<style>
.lendot-select {
  width: 100%;
  text-align: left;
  outline: none;
  height: 48px;
  line-height: 48px;
}

.lendot-select .selected {
  border-radius: 11px;
  border: solid 1px var(--custom-blue);
  color: var(--custom-gray);
  padding: 0 20px;
  cursor: pointer;
  user-select: none;
  position: relative;
  height: 48px;
  box-sizing: border-box;
}

.lendot-select .selected:after {
  position: absolute;
  content: url("../assets/uploads/polygon.svg");
  right: 22px;
}
.lendot-select .selected.open:after {
  transform: rotate(-180deg);
  margin-top: 2px;
}

.lendot-select .items {
  color: var(--custom-blue);
  left: 0;
  right: 0;
  z-index: 1;
  background: white;
  position: relative;
  box-shadow: 0px 7px 12px #00000029;
  max-height: 214px;
  overflow: auto;
}

.lendot-select .items div {
  color: var(--custom-blue);
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
  border-bottom: 1px solid var(--custom-blue);
  height: 42px;
}

.lendot-select .items div:hover {
  background-color: #1618534d;
}

.selectHide {
  display: none;
}
.sort-select {
  font-size: 18px;
  cursor: pointer;
  padding-left: 12px;
}
.sort-select .selected:after {
  content: url("../assets/uploads/sort_list_icon.svg");
  margin-left: 8.5px;
  display: inline-block;
}
.sort-select .selected.open:after {
  transform: rotate(-180deg);
}
.sort-select .items div {
  font-size: 18px;
  border-bottom: 1px solid #cdcede;
  padding: 12px;
}
.sort-select .items div:last-child {
  border: unset;
}
.sort-select .items {
  background: white;
  position: relative;
  overflow: hidden;
  z-index: 1;
  background: white;
  position: absolute;
  border-radius: 11px;
  width: max-content;
}
</style>