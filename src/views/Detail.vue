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
        <div class="detail-info__item pr-5 text-uppercase">{{ purchaseOrderDetail.ref }}</div>
        <div class="detail-info__item">Vendor</div>
        <div
          class="detail-info__item text-capitalize"
        >{{ purchaseOrderDetail.partner }}</div>
        <div class="detail-info__item">Purchase Payment</div>
        <div class="detail-info__item">Cash</div>
        <div class="detail-info__item">Scheduled Date</div>
        <div class="detail-info__item">06/26/2020 16:20:16</div>
        <div class="detail-info__item">Company</div>
        <div class="detail-info__item">MEDX</div>
        <div class="detail-info__item">Delivery</div>
        <div class="detail-info__item">{{ purchaseOrderDetail.name }}</div>
      </div>
      <div class="my-3 px-3 position-relative">
        <i class="fas fa-search text-muted position-center"></i>
        <input type="search" class="w-25 input-search pl-5" placeholder="Some Input Text" name id />
      </div>
      <div class="container-fluid bg-light">
        <b-alert
          :show="dismissCountDown"
          dismissible
          fade
          variant="danger"
          @dismiss-count-down="countDownChanged"
          class="fixed-top"
        >Only can add 3 section</b-alert>
        <div class="px-5">
          <div class="list" v-for="product in purchaseOrderDetail.lines" :key="product.id">
            <div class="list-info py-2">
              <div class="list-info__id p-5">{{ product.id }}</div>
              <div class="list-info__image justify-content-center d-flex px-2">
                <img
                  :src="product.image_url ? product.image_url : 'https://assets.thuocsi.vn/assets/defaults/missing-e9cfa4812c342b9780b61700d2ade43591b3c5992f4dffedaa542c07d854b602.png'"
                  :alt="product.name"
                  width="200" height="200"
                />
              </div>
              <div class="list-info__content px-3">
                <div class="label">Tên sản phẩm&colon;</div>
                <div class="content text-capitalize">{{ product.name }}</div>
                <div class="label">Số lượng&colon;</div>
                <div class="content">{{ product.demand_qty }}</div>
              </div>
              <div class="list-info__btnGroup px-5 border-left border-right text-center">
                <b-button variant="success d-block my-2 mx-auto" @click="handleAdd">Add</b-button>
                <b-button variant="outline-primary">Print QR</b-button>
              </div>
            </div>

            <b-table
              hover
              bordered
              class="d-block"
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

              <template v-slot:cell(product_image)="data">
                <img :src="data.value" :alt="data.value" width="100" height="100" class="img-product"/>
              </template>

              <template v-slot:cell(so_luong_nhap)="data">
                <div>Đã in: {{data.value.success}}</div>
                <div>Thất bại: {{data.value.failed}}</div>
              </template>

              <template v-slot:cell(print_qr_code)="row">
                <!-- Start print QR Code -->
                <b-button variant="outline-info mr-2 mb-2" class="btn" v-model="row.print_qr_code" >
                  <i class="fas fa-play"></i> In
                </b-button>

                <!-- Stop print QR Code -->
                <b-button variant="outline-danger" v-model="row.print_qr_code" class="btn">
                  <i class="fas fa-pause"></i> Dừng
                </b-button>
              </template>
              <template v-slot:cell(action)="data">
                <b-button variant="outline-info mr-2 mb-2" class="" >
                  <i class="fas fa-plus"></i> Thêm Lot
                </b-button>
                <b-button variant="danger" @click="handleDelete(data.item.key)">
                  <i class="fas fa-trash"></i> Xóa Lot
                </b-button>
              </template>
              <template v-slot:cell(lot_date)>
                <b-input-group class="mb-3">
                  <b-form-input
                    v-model="date"
                    type="text"
                    size="sm"
                    placeholder="YYYY-MM-DD"
                    autocomplete="off"
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
              <template v-slot:cell(ngay_san_xuat)>
                <b-input-group class="mb-3">
                  <b-form-input
                    v-model="date"
                    type="text"
                    size="sm"
                    placeholder="YYYY-MM-DD"
                    autocomplete="off"
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
              <template v-slot:cell(ngay_het_han)>
                <b-input-group class="mb-3">
                  <b-form-input
                    v-model="date"
                    type="text"
                    size="sm"
                    placeholder="YYYY-MM-DD"
                    autocomplete="off"
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
  name: "detail",
  components: {},
  data() {
    return {
      date: "",
      fields: [
        { key: "product_name", label: "Tên sản phẩm"},
        { key: "product_image", label: "Hình ảnh sản phẩm", tdClass: 'text-center product-img'},
        { key: "so_luong", label: "Số lượng" },
        { key: "so_luong_nhap", label: "Số lượng nhập" },
        { key: "lot_number", label: "Lot Number" },
        { key: "lot_date", label: "Lot Date" },
        { key: "ngay_san_xuat", label: "Ngày sản xuất" },
        { key: "ngay_het_han", label: "Ngày hết hạn" },
        { key: "print_qr_code", label: "In QR Code" },
        { key: "action", tdClass: 'text-center', label: "Thao tác" },
      ],

      dataSource: [
        {
          key: 1,
          product_name: "Panadol Extra",
          product_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSmrQPqF9mu8n26drpKzmzrefHldBo8HPkduw&usqp=CAU",
          so_luong: 1,
          so_luong_nhap: { success: 9, failed: 3 },
          ngay_het_han: "2020/08/20"
        },
        {
          key: 2,
          product_name: "Product 1",
          product_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSmrQPqF9mu8n26drpKzmzrefHldBo8HPkduw&usqp=CAU",
          so_luong: 2,
          so_luong_nhap: { success: 9, failed: 3 },
          lot_date: "2020-09-03",
        },
      ],
      headVariant: "light",
      dismissSecs: 1,
      dismissCountDown: 0,
      purchaseOrderDetail: {},
      isLoading: true
    };
  },
  created() {
    axios.get("https://cors-anywhere.herokuapp.com/https://erp.stg.thuocsi.vn/api/v1/receipts/133044",
                { headers:
                  {
                    "api-key": "1fce20616fd2500d63b980b6f37ea8c288378604f47e282ff8644fc5529ebb75"
                  }
                })
    .then(res => {
      this.purchaseOrderDetail = res.data
      this.isLoading = false;
    })
    .catch(err => {
      console.log(`Error get List PO ${err}`)
    });
  },
  methods: {
    // handleDelete(key) {
    //   const dataSource = [...this.dataSource];
    //   this.dataSource = dataSource.filter((item) => item.key !== key);
    // },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    handleAdd() {
      const { dataSource } = this;
      if (dataSource.length < 3) {
        const newData = {
          key: dataSource.length + 1,
          so_luong: dataSource.length + 2,
          so_luong_nhap: { success: 9, failed: 3 },
        };
        this.dataSource = [...dataSource, newData];
      } else {
        this.dismissCountDown = this.dismissSecs;
      }
    },
    handleDelete(key) {
      this.$bvModal.msgBoxConfirm("Are you sure?").then((value) => {
        if (value) {
          const dataSource = [...this.dataSource];
          this.dataSource = dataSource.filter((item) => item.key !== key);
        }
      });
    },
  },
};
</script>

<style lang="scss">
.position-center {
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
  border: 1px solid #919aa3;
  padding: 0.5em 1em;
  border-radius: 1em;

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
</style>
