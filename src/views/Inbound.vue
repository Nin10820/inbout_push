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
        <img src="../assets/images/loading.gif" alt="Loading..." class="loading" />
      </div>
    </div>
    <div class="theme-container" v-else>
      <div class="detail-info">
        <div class="detail-info__item pr-5 text-uppercase">{{ inbound.ref }}</div>
        <div class="detail-info__item">Vendor</div>
        <div class="detail-info__item text-capitalize">{{ inbound.partner }}</div>
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
          <b-button variant="primary ml-auto">Hoàn tất</b-button>
        </div>
      </div>

      <div class="container-fluid bg-light">
        <div class="px-5">
          <div class="list" v-for="product in inbound.lines" :key="product.id">
            <div class="list-info py-2">
              <div class="list-info__id p-5">{{ product.id }}</div>
              <div class="list-info__image justify-content-center d-flex px-2">
                <img
                  class="img-product"
                  :src="product.image_url ? product.image_url : 'https://assets.thuocsi.vn/assets/defaults/missing-e9cfa4812c342b9780b61700d2ade43591b3c5992f4dffedaa542c07d854b602.png'"
                  :alt="product.name"
                  width="150"
                  height="150"
                />
              </div>
              <div class="list-info__content px-3">
                <div class="label">Tên sản phẩm&colon;</div>
                <div class="content text-capitalize">{{ product.name }}</div>
                <div class="label">Số lượng&colon;</div>
                <div class="content">{{ product.demand_qty }}</div>
              </div>
              <div class="list-info__btnGroup px-5 border-left border-right text-center">
                <b-button variant="outline-info mr-2 mb-2" @click="handleAdd(event)" :disabled="isAddLot">
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
                <div>Đã in: {{data.item.doneQty.done}}</div>
                <div>Thất bại: {{data.item.doneQty.yet}}</div>
              </template>

              <template v-slot:cell(printQRCode)="data">
                <!-- Start print QR Code -->
                <b-button variant="outline-info" :class="outlineButton" @click="printQRCode()" :id="data.item.key">
                  <font-awesome-icon :icon="isPrintQRCode ? ['fas', 'pause'] : ['fas', 'play']"></font-awesome-icon> {{ txtPrintAction }}
                </b-button>
              </template>
              <template v-slot:cell(action)="data">
                <b-button
                  variant="danger"
                  @click="handleDelete(data.item.key)"
                  :disabled="isPrintQRCode"
                >
                  <i class="fas fa-trash"></i> Xóa Lot
                </b-button>
              </template>
              <template v-slot:cell(lotDate)="data">
                <date-picker
                  v-model="data.item.lotDate"
                  format="DD/MM/YYYY"
                  placeholder="dd/mm/yyyy"
                ></date-picker>
              </template>
              <template v-slot:cell(productionDate)="data">
                <date-picker
                  v-model="data.item.productionDate"
                  format="DD/MM/YYYY"
                  placeholder="dd/mm/yyyy"
                ></date-picker>
              </template>
              <template v-slot:cell(expDate)="data">
                <date-picker
                  v-model="data.item.expDate"
                  format="DD/MM/YYYY"
                  placeholder="dd/mm/yyyy"
                ></date-picker>
              </template>
            </b-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getInbound } from "@/Api/inboundServices";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  components: { DatePicker },
  name: "Inbound",
  data() {
    return {
      time1: null,
      date: "",
      searchInput: "",
      fields: [
        { key: "doneQty", label: "Số lượng nhập" },
        { key: "lotNumber", label: "Lot Number" },
        { key: "lotDate", label: "Lot Date" },
        { key: "productionDate", label: "Ngày sản xuất" },
        { key: "expDate", label: "Ngày hết hạn" },
        { key: "printQRCode", label: "In QR Code" },
        { key: "action", tdClass: "text-center", label: "Thao tác" },
      ],
      dataProduct: {
        "id": 133089,
        "name": "WH-C7/IN/39634",
        "ref": "PO31523",
        "partner": "Quầy D24 - Công ty TNHH Thương Mại Dược Phẩm Minh Sang - New",
        "date": "2020-05-27",
        "lines": [
            {
                "id": 2173529,
                "product_id": 8485,
                "image_url": "https://buymed-storage.s3.ap-southeast-1.amazonaws.com/u1AhMkReaqfdVm8trgEbwDPw",
                "name": "curmagold fast cvi (h/30v)",
                "demand_qty": 1,
                "done_qty": 0,
                "uom": "Unit(s)"
            },
            {
                "id": 2173540,
                "product_id": 2522,
                "image_url": "https://buymed-storage.s3.ap-southeast-1.amazonaws.com/6tuKNXgrzQETwzS4Fa66jw4K",
                "name": "grafort dioctahedral smectite 3g - daewong (h/20g)",
                "demand_qty": 5,
                "done_qty": 0,
                "uom": "Unit(s)"
            },
            {
                "id": 2173545,
                "product_id": 7477,
                "image_url": "https://buymed-storage.s3.ap-southeast-1.amazonaws.com/dZVUtPtQMNq4C2dK8wgcfrw1",
                "name": "liverton 70 pymepharco (h/100v)",
                "demand_qty": 5,
                "done_qty": 0,
                "uom": "Unit(s)"
            },
            {
                "id": 2173558,
                "product_id": 4511,
                "image_url": false,
                "name": "viên sủi diệp hạ châu râu ngô rau má (tube/20v)",
                "demand_qty": 16,
                "done_qty": 0,
                "uom": "Unit(s)"
            }
        ]
      },
      dataSource: [
        {
          id: 2147096,
          key: 1,
          doneQty: { done: 1, yet: 2 },
          lotNumber: 3,
          lotDate: null,
          productionDate: null,
          expDate: null
        },
        {
          id: 2147101,
          key: 2,
          doneQty: { done: 1, yet: 2 },
          lotNumber: 3,
          lotDate: null,
          productionDate: null,
          expDate: null
        },
      ],

      headVariant: "light",
      inbound: {},
      isLoading: true,
      isPrintQRCode: false,
      isAddLot: false,
      isDisplay: true,
      outlineButton: "outline-info",
      txtPrintAction: 'In'
    };
  },
  created() {
    this.getInboundById();
  },
  methods: {
    displayInpSearch() {
      if (this.inbound.lines.length > 1) {
        return "d-block";
      } else if (!this.isDisplay) {
        return "d-none";
      }
    },
    getInboundById() {
      // TODO: get Inbound API later
      getInbound(this.$route.params.id)
        .then((res) => {
          if (this.searchInput.length === 0) {
            this.isLoading = false;
            this.inbound = res.data;
          } else {
            this.inbound.lines = res.data.lines.filter((product) => {
              return product.name
                .toLowerCase()
                .includes(this.searchInput.toLowerCase());
            });
          }
        })
        .catch((err) => {
          console.log(`Error get List PO ${err}`);
        });
      // if (this.searchInput.length === 0) {
      //     this.isLoading = false;
      //     this.inbound = this.dataProduct;
      // } else {
      //   this.filterInboundProduct(this.dataProduct.lines);
      // }
    },
    filterInboundProduct(data) {
      this.isLoading = true;

      this.inbound.lines = data.filter((product) => {
        return product.name
                .toLowerCase()
                .includes(this.searchInput.toLowerCase())
      });
      this.isLoading = false;
    },
    handleAdd() {
      if (this.dataSource.length < 3) {
        const newData = {
          key: this.dataSource.length + 1,
          doneQty: { done: 0, yet: 0 },
          lotNumber: 0,
          lotDate: "",
          productionDate: "",
          expDate: "",
          lineRow: this.lineRow + 1
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
      // TODO: Need Implement action print QR Code and I18n
      // Toggle button
      if (this.isPrintQRCode) {
        this.isPrintQRCode = false;
        this.outlineButton = "btn-outline-info";
        this.txtPrintAction = "In";
      } else {
        this.isPrintQRCode = true
        this.outlineButton = "btn-outline-danger";
        this.txtPrintAction = "Dừng";
      }
    },
  },
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
  border: 1px solid #919aa3;
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
  transition: transform 0.2s;
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
