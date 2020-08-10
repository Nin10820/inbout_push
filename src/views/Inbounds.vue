<template>
    <div class="purchase-orders container">
      <h1>Purchase Orders</h1>

      <b-input-group class="mb-3">
        <b-form-input type="search" class="input-search" placeholder="Nhập PO cần tìm (Vd: PO1111)" v-model="searchInput" @keyup="getDataInbounds()"></b-form-input>
        <i class="fas fa-search text-muted position-icon"></i>
      </b-input-group>

      <!-- Table Inbounds -->
      <b-table id="table-purchase-orders"
        :items="inbounds"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        bordered="bordered"
        show-empty
        responsive
        :busy="isLoading"
        outlined
        selectable
        @row-selected="onRowSelected"
        ref="selectableTable"
        :select-mode="selectMode"
        hover
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
        :total-rows="this.inbounds.length"
        :per-page="perPage"
        aria-controls="table-purchase-orders"
      >
      </b-pagination>
    </div>
</template>

<script>
import { getInbounds } from '@/Api/inboundServices';

export default {
  name: "Inbounds",
  components: {
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
      inbounds: [],
      currentPage: 1,
      perPage: 10,
      isLoading: true,
      searchInput: "",
      selected: [],
      selectMode: 'single'
    }
  },
  created() {
    this.getDataInbounds();
  },
  methods: {
    getDataInbounds() {
      let searchInp = this.searchInput;

      getInbounds()
      .then(res => {
        if (searchInp.length === 0) {
          this.isLoading = false;
          this.inbounds = res.data
        }
        if (searchInp.length >= 3) {
          this.isLoading = true;
          this.inbounds = res.data.filter(data =>
          {
            return data.ref.toLowerCase().includes(searchInp.toLowerCase()) || String(data.id).includes(searchInp) || data.partner.toLowerCase().includes(searchInp.toLowerCase());
          });
          this.isLoading = false;
        }
      })
      .catch(err => {
        console.log(`Error get List PO ${err}`)
      });
    },
    onRowSelected(items) {
      window.location.href= `/${items[0].id}`;
    },
    rows() {
      return this.inbounds.length;
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
    max-width: 30%;

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