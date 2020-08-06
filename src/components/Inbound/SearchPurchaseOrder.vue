<template>
  <div>
    <form>
      <div class="input-group mb-3">
        <input type="search" class="form-control inp-search" placeholder="Nhập PO cần tìm (Vd: PO1111)" v-model="searchInput" @input="onInputSearchPO">
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
  .inp-search {
    border-radius: 35px !important;
  }
</style>