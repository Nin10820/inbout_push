<template>
  <div class="detail">
    <div class="nav container-fluid p-3">
      <router-link to="/" class="btn">
        <i class="fas fa-chevron-left"></i>
      </router-link>
      <div class="logo">Inbound</div>
    </div>
    <div class="detail-info">
      <div class="detail-info__item pr-5">PO123456</div>
      <div class="detail-info__item">Vendor</div>
      <div
        class="detail-info__item"
      >Quay A2 - Cong ty duoc cua hang 2 Cong ty duoc cua ty duoc cua hang 28 Quay A2 - Cong ty duoc cua hang 2 Cong ty duoc cua ty duoc cua hang 28 Quay A2 - Cong ty duoc cua hang 2 Cong ty duoc cua ty duoc cua hang 28</div>
      <div class="detail-info__item">Purchase Payment</div>
      <div class="detail-info__item">Cash</div>
      <div class="detail-info__item">Scheduled Date</div>
      <div class="detail-info__item">06/26/2020 16:20:16</div>
      <div class="detail-info__item">Company</div>
      <div class="detail-info__item">MEDX</div>
      <div class="detail-info__item">Delivery</div>
      <div class="detail-info__item">WH:Receipts</div>
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
      <div class="container">
        <div class="list">
          <div class="list-info py-2">
            <div class="list-info__id p-5">1</div>
            <div class="list-info__image justify-content-center d-flex px-2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSmrQPqF9mu8n26drpKzmzrefHldBo8HPkduw&usqp=CAU"
                alt
              />
            </div>
            <div class="list-info__content px-3">
              <div class="label">Name:</div>
              <div class="content">Avcvwawvawe</div>
              <div class="label">So luong:</div>
              <div class="content">12</div>
            </div>
            <div class="list-info__btnGroup px-5 border-left border-right text-center">
              <b-button variant="success d-block my-2 mx-auto" @click="handleAdd">Add</b-button>
              <b-button variant="outline-primary">Print QR</b-button>
            </div>
          </div>

          <b-table
            hover
            bordered
            fixed
            :items="dataSource"
            :fields="fields"
            :head-variant="headVariant"
            show-empty
            responsive
          >
            <template v-slot:empty="scope" >
              <div class="text-center h1 py-5 text-black-50">
                <div>
                  <i class="fas fa-box-open"></i>
                </div>
                <div>{{ scope.emptyText }}</div>
              </div>
            </template>
            <template v-slot:cell(image)="data">
              <img :src="data.value" alt />
            </template>

            <template v-slot:cell(so_luong_nhap)="data">
              <div>Da in: {{data.value.success}}</div>
              <div>Loi: {{data.value.failed}}</div>
            </template>

            <template v-slot:cell(print)="data">
              <b-button variant="primary">{{data.field.label}}</b-button>
            </template>
            <template v-slot:cell(action)="data">
              <b-button variant="outline-info mr-2" class="" >
                <i class="far fa-edit"></i>
              </b-button>
              <b-button variant="danger" @click="handleDelete(data.item.key)">
                <i class="fas fa-trash"></i>
              </b-button>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
  components: {},
  data() {
    return {
      fields: [
        { key: "so_luong" },
        { key: "so_luong_nhap" },
        { key: "lot_number" },
        { key: "lot_date" },
        { key: "ngay_san_xuat" },
        { key: "ngay_het_han" },
        { key: "action", tdClass: 'text-center' },
      ],

      dataSource: [
        {
          key: 1,
          so_luong: 1,
          so_luong_nhap: { success: 9, failed: 3 },
        },
        {
          key: 2,
          so_luong: 2,
          so_luong_nhap: { success: 9, failed: 3 },
        },
      ],
      headVariant: "light",
      dismissSecs: 1,
      dismissCountDown: 0,
    };
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
</style>
