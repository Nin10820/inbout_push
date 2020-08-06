<template>
  <div class="purchase-orders">
    <SearchPurchaseOrder @search-po="eventSearchPO" />

    <b-table id="table-purchase-orders"
      :items="purchaseOrderData"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      bordered="bordered"
      show-empty
      responsive
      :busy="isLoading"
      outlined
    >
      <template v-slot:table-busy>
        <div class="text-center h1 py-5 text-black-50">
          <img src="../../assets/images/loading.gif" alt="Loading..." class="loading"/>
        </div>
      </template>

      <template v-slot:empty="scope">
        <div class="text-center h1 py-5 text-black-50">
          <div>
            <i class="fas fa-box-open"></i>
          </div>
          <div>{{ scope.emptyText }}</div>
        </div>
      </template>

      <template v-slot:cell(id)="data">
        <router-link :to="{ name: 'Detail', params: { id: data.value }}">{{ data.value }}</router-link>
      </template>
    </b-table>  

    <b-pagination
      v-model="currentPage"
      :total-rows="this.purchaseOrderData.length"
      :per-page="perPage"
      aria-controls="table-purchase-orders"
    >
    </b-pagination>
  </div>
</template>

<script>
import axios from "axios";
import SearchPurchaseOrder from '@/components/Inbound/SearchPurchaseOrder'
// import { getListInbound } from "../../Api/inboundServices";

export default {
  name: "ListPurchaseOrder",
  components: {
    SearchPurchaseOrder
  },
  data() {
    return {
      fields: [
        { key: "id", label: "id"},
        { key: "name", label: "Tên PO"},
        { key: "ref", label: "Referrence"},
        { key: "partner", label: "Partner"},
        { key: "date", label: "Date"}
      ],
      purchaseOrderData: [],
      currentPage: 1,
      perPage: 10,
      isLoading: true
    }
  },
  methods: {
    rows() {
      return this.purchaseOrderData.length;
    },
    async eventSearchPO(textSearchInput) {
      if (textSearchInput !== "" || textSearchInput.length !== 0) {
        this.purchaseOrderData = await this.purchaseOrderData.filter(data =>
        {
          return data.ref.toLowerCase().includes(textSearchInput.toLowerCase());
        });
        return this.purchaseOrderData;
      } else {
        this.purchaseOrderData = await axios.get("https://cors-anywhere.herokuapp.com/https://erp.stg.thuocsi.vn/api/v1/receipts",
                { headers:
                  {
                    "api-key": "1fce20616fd2500d63b980b6f37ea8c288378604f47e282ff8644fc5529ebb75"
                  }
        })
        .then(res => this.purchaseOrderData = res.data)
        .catch(err => {
          console.log(`Error get List PO ${err}`)
        });
        return this.purchaseOrderData;
      }
    }
  },
  mounted() {
    axios.get("https://cors-anywhere.herokuapp.com/https://erp.stg.thuocsi.vn/api/v1/receipts",
                { headers:
                  {
                    "api-key": "1fce20616fd2500d63b980b6f37ea8c288378604f47e282ff8644fc5529ebb75"
                  }
                })
    .then(res => {
      this.purchaseOrderData = res.data
      this.isLoading = false;
    })
    .catch(err => {
      console.log(`Error get List PO ${err}`)
    });
  }
}
</script>

<style lang="scss">
  .table {
    thead {
      background: #54af50;
      color: #fff;
    }
  }
  .clickable-row {
    cursor: pointer;
  }

  .loading {
    max-width: 100%;
    background: transparent;
  }
</style>