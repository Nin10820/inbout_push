<template>
  <div class="container">
    <h1>Purchase Orders</h1>
    <ListPurchaseOrder />
  </div>
</template>

<script>
import ListPurchaseOrder from "@/components/Inbound/ListPurchaseOrder";

export default {
  name: "PurchaseOrders",
  components: {
    ListPurchaseOrder
  }
}
</script>

<style>
</style>