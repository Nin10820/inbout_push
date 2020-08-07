<template>
  <div>
    <form>
      <div class="input-group mb-3">
        <input type="search" class="input-search" placeholder="Nhập PO cần tìm (Vd: PO1111)" v-model="searchInput" @input="onInputSearchPO" />
        <i class="fas fa-search text-muted position-icon"></i>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchPurchaseOrder",
  data() {
    return {
      searchInput: ""
    }
  },
  methods: {
    onInputSearchPO() {
      this.$emit("search-po", this.searchInput);
    }
  }
}
</script>

<style lang="scss">
.position-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 0.8em;
}
.input-search {
  border: 1px solid  #919aa3;
  border-radius: 35px !important;
  padding: 0.5em 1em 0.5em 2.5em;
  width: 30%;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
  }

  &:focus {
    outline: none;
  }
}
</style>