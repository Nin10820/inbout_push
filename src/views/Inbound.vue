<template>
  <div class="detail">
    <div class="nav container-fluid p-3">
      <router-link to="/" class="btn">
        <i class="fas fa-chevron-left"></i>
      </router-link>
      <div class="logo">Inbound</div>
    </div>
    <div class="theme-container" v-if="isLoading">
      <div class="text-center h1 py-5 text-black-50">
        <img src="../assets/images/loading.gif" alt="Loading..." class="loading"/>
      </div>
    </div>
    <div class="theme-container" v-else>
      <div class="detail-info">
        <div class="detail-info__item pr-5 text-uppercase">{{ inbound.ref }}</div>
        <div class="detail-info__item">Vendor</div>
        <div
          class="detail-info__item text-capitalize"
        >{{ inbound.partner }}</div>
        <div class="detail-info__item">Purchase Payment</div>
        <div class="detail-info__item">Cash</div>
        <div class="detail-info__item">Scheduled Date</div>
        <div class="detail-info__item">06/26/2020 16:20:16</div>
        <div class="detail-info__item">Company</div>
        <div class="detail-info__item">MEDX</div>
        <div class="detail-info__item">Delivery</div>
        <div class="detail-info__item">{{ inbound.name }}</div>
      </div>

      <div class="container-fluid">
        <div class="form-group px-5 form-inline">
          <div class="my-3 px-3 position-relative">
            <i class="fas fa-search text-muted position-icon"></i>
            <input type="search" class="input-search" placeholder="Nhập tên thuốc cần tìm..." v-model="searchInput" @keyup="getPODetailById" />
          </div>
          <button type="button" class="btn btn-primary ml-auto">Hoàn tất</button>
        </div>
      </div>

      <div class="container-fluid bg-light">
        <div class="px-5">
          <div class="list" v-for="product in inbound.lines" :key="product.id">
            {{ product }}
            <div class="list-info py-2">
              <div class="list-info__id p-5">{{ product.id }}</div>
              <div class="list-info__image justify-content-center d-flex px-2">
                <img class="img-product"
                  :src="product.image_url ? product.image_url : 'https://assets.thuocsi.vn/assets/defaults/missing-e9cfa4812c342b9780b61700d2ade43591b3c5992f4dffedaa542c07d854b602.png'"
                  :alt="product.name"
                  width="150" height="150"
                />
              </div>
              <div class="list-info__content px-3">
                <div class="label">Tên sản phẩm&colon;</div>
                <div class="content text-capitalize">{{ product.name }}</div>
                <div class="label">Số lượng&colon;</div>
                <div class="content">{{ product.demand_qty }}</div>
              </div>
              <div class="list-info__btnGroup px-5 border-left border-right text-center">
                <b-button variant="outline-info mr-2 mb-2" @click="handleAdd" :disabled="isAddLot" >
                  <i class="fas fa-plus"></i> Thêm Lot
                </b-button>
              </div>
            </div>

            <b-table
              hover
              bordered
              :items="dataSource"
              :fields="fields"
              :head-variant="headVariant"
              show-empty
            >
              <template v-slot:empty="scope">
                <div class="text-center h1 py-5 text-black-50">
                  <div>
                    <i class="fas fa-box-open"></i>
                  </div>
                  <div>{{ scope.emptyText }}</div>
                </div>
              </template>

              <template v-slot:cell(doneQty)="data">
                <div>Đã in: {{data.value.success}}</div>
                <div>Thất bại: {{data.value.failed}}</div>
              </template>

              <template v-slot:cell(printQRCode)="row">
                <!-- Start print QR Code -->
                <b-button variant="outline-info mr-2" class="btn" v-model="row.print_qr_code" @click="printQRCode">
                  <i class="fas fa-play"></i> In
                </b-button>

                <!-- Stop print QR Code -->
                <b-button variant="outline-danger" v-model="row.print_qr_code" class="btn">
                  <i class="fas fa-pause"></i> Dừng
                </b-button>
              </template>
              <template v-slot:cell(action)="data">
                <b-button variant="danger" @click="handleDelete(data.item.key)" :disabled="isPrintQRCode">
                  <i class="fas fa-trash"></i> Xóa Lot
                </b-button>
              </template>
              <template v-slot:cell(lotDate)>
                <b-input-group class="mb-3">
                  <b-form-input
                    v-model="date"
                    type="text"
                    size="sm"
                    placeholder="YYYY-MM-DD"
                    autocomplete="off"
                    :disabled="isPrintQRCode"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-form-datepicker
                      v-model="date"
                      button-only
                      size="sm"
                      right
                      locale="en-US"
                      aria-controls="example-input"
                      :disabled="isPrintQRCode"
                    ></b-form-datepicker>
                  </b-input-group-append>
                </b-input-group>
              </template>
              <template v-slot:cell(productionDate)>
                <b-input-group class="mb-3">
                  <b-form-input
                    v-model="date"
                    type="text"
                    size="sm"
                    placeholder="YYYY-MM-DD"
                    autocomplete="off"
                    :disabled="isPrintQRCode"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-form-datepicker
                      v-model="date"
                      button-only
                      size="sm"
                      right
                      locale="en-US"
                      aria-controls="example-input"
                    ></b-form-datepicker>
                  </b-input-group-append>
                </b-input-group>
              </template>
              <template v-slot:cell(expDate)>
                <b-input-group class="mb-3">
                  <b-form-input
                    v-model="date"
                    type="text"
                    size="sm"
                    placeholder="YYYY-MM-DD"
                    autocomplete="off"
                    :disabled="isPrintQRCode"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-form-datepicker
                      v-model="date"
                      button-only
                      size="sm"
                      right
                      locale="en-US"
                      aria-controls="example-input"
                    ></b-form-datepicker>
                  </b-input-group-append>
                </b-input-group>
              </template>
            </b-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Inbound",
  data() {
    return {
      date: "",
      searchInput: "",
      fields: [
        { key: "doneQty", label: "Số lượng nhập" },
        { key: "lotNumber", label: "Lot Number" },
        { key: "lotDate", label: "Lot Date" },
        { key: "productionDate", label: "Ngày sản xuất" },
        { key: "expDate", label: "Ngày hết hạn" },
        { key: "printQRCode", label: "In QR Code" },
        { key: "action", tdClass: 'text-center', label: "Thao tác" },
      ],

      dataSource: [
      {
        key: 1,
        done_qty: 1
      },
      {
        key: 2,
        done_qty: 2
      },
    ],

      headVariant: "light",
      inbound: {},
      isLoading: true,
      isPrintQRCode: false,
      isAddLot: false
    };
  },
  created() {
    this.getPODetailById();
  },
  methods: {
    getPODetailById() {
      return axios.get(`https://cors-anywhere.herokuapp.com/https://erp.stg.thuocsi.vn/api/v1/receipts/${this.$route.params.id}`,
                  { headers:
                    {
                      "api-key": "1fce20616fd2500d63b980b6f37ea8c288378604f47e282ff8644fc5529ebb75",
                      "Access-Control-Allow-Origin": "*"
                    }
                  })
      .then(res => {
        if (this.searchInput.length === 0) {
          this.inbound = res.data;
          this.isLoading = false;
        } else {
          console.log(this.inbound)
          this.inbound = res.data.lines.filter(product => {
            product.name.toLowerCase().includes(this.searchInput.toLowerCase())
          })
        }
      }).catch(err => {
        console.log(`Error get List PO ${err}`)
      });
    },
    handleAdd() {
      if (this.dataSource.length < 3) {
        const newData = {
          key: this.dataSource.length + 1,
          doneQty: this.dataSource.length + 2
        };
        this.dataSource = [...this.dataSource, newData];

        if (this.dataSource.length === 3) {
          this.isAddLot = true;
        }
      }
    },
    handleDelete(key) {
      this.$bvModal.msgBoxConfirm("Are you sure?").then((value) => {
        if (value) {
          const dataSource = [...this.dataSource];
          this.dataSource = dataSource.filter((item) => item.key !== key);
          this.isAddLot = false;
        }
      });
    },
    printQRCode() {
      // TODO: Need Implement action print QR Code
      this.isPrintQRCode = true;
    },
  }
};
</script>

<style lang="scss">
.position-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 0.8em;
}

.nav {
  background: white;
  box-shadow: 0 0 10px -6px #919aa3;

  .logo {
    font-weight: bold;
    font-size: 1.6em;
  }
}

.detail-info {
  padding: 2em 5em;
  display: grid;
  grid-template-columns: max-content auto 2fr auto auto;

  &__item:nth-child(1) {
    font-weight: bold;
    font-size: 3em;
    grid-row-start: 1;
    grid-row-end: 10;
    padding: 0;
  }
  &__item {
    padding: 0.5em 1em;
  }
}

.input-search {
  border-radius: 35px;
  border: 1px solid  #919aa3;
  border-radius: 35px !important;
  padding: 0.5em 1em 0.5em 2.5em;
  width: 30%;
  min-width: 100%;

  &::before {
    content: "aa";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
  }

  &:focus {
    outline: none;
  }
}

.list {
  border-bottom: 1px solid #d3d3d3;
  padding: 1em 0;
  .list-info {
    display: grid;
    grid-template-columns: auto auto 1fr auto;
    align-items: center;

    &__content {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      .label {
        padding-right: 1em;
        color: #919aa3;
      }
      .content {
        font-size: 1.5em;
      }
    }
  }
}

.img-product {
  transition: transform .2s;
  margin: 0 auto;
}
.img-product:hover {
  -ms-transform: scale(1.5); /* IE 9 */
  -webkit-transform: scale(1.5); /* Safari 3-8 */
  transform: scale(1.5);
}
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
