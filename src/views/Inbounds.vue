<template>
    <div class="purchase-orders container">
      <h1>Purchase Orders</h1>

      <!-- Input Search -->
      <!-- <div class="input-group mb-3">
        <input type="search" class="input-search" placeholder="Nhập PO cần tìm (Vd: PO1111)" v-model="searchInput" @input="eventSearchPO" />
        <i class="fas fa-search text-muted position-icon"></i>
      </div> -->
      <b-input-group class="mb-3">
        <b-form-input type="search" class="input-search mw-50" placeholder="Nhập PO cần tìm (Vd: PO1111)" v-model="searchInput" @input="eventSearchPO"></b-form-input>
        <i class="fas fa-search text-muted position-icon"></i>
      </b-input-group>

      <!-- Table Inbounds -->
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
            <img src="../assets/images/loading.gif" alt="Loading..." class="loading"/>
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
          <router-link :to="{ name: 'Inbound', params: { id: data.value }}">{{ data.value }}</router-link>
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
// import ListPurchaseOrder from "@/components/Inbound/ListPurchaseOrder";
const poListURL = "https://cors-anywhere.herokuapp.com/https://erp.stg.thuocsi.vn/api/v1/receipts";
import axios from "axios";

export default {
  name: "Inbounds",
  components: {
    // ListPurchaseOrder
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
      isLoading: true,
      searchInput: ""
    }
  },
  created() {
    this.getInbounds();
  },
  methods: {
    getInbounds() {
      axios.get(poListURL,
                  { headers:
                    {
                      "api-key": "1fce20616fd2500d63b980b6f37ea8c288378604f47e282ff8644fc5529ebb75",
                      "Access-Control-Allow-Origin": "*"
                    }
                  })
      .then(res => {
        this.purchaseOrderData = res.data
        this.isLoading = false;
      })
      .catch(err => {
        console.log(`Error get List PO ${err}`)
      });
    },
    rows() {
      return this.purchaseOrderData.length;
    },
    async eventSearchPO() {
      let searchInp = this.searchInput;

      if (searchInp !== "" || searchInp.length !== 0) {
        this.purchaseOrderData = await this.purchaseOrderData.filter(data =>
        {
          return data.ref.toLowerCase().includes(searchInp.toLowerCase()) || String(data.id).includes(searchInp) || data.partner.toLowerCase().includes(searchInp.toLowerCase());
        });
      } else {
        this.isLoading = true;

        return await axios.get(poListURL,
                { headers:
                  {
                    "api-key": "1fce20616fd2500d63b980b6f37ea8c288378604f47e282ff8644fc5529ebb75"
                  }
        })
        .then(res => {
          this.purchaseOrderData = res.data;
          this.isLoading = false;
        })
        .catch(err => {
          console.log(`Error get List PO ${err}`)
        });
      }
    }
  }
}
</script>

<style lang="scss">
.purchase-orders {
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
}
</style>