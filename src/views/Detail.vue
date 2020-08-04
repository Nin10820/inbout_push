<template>
  <div class="home">
    <div class="nav container-fluid p-3">
      <router-link to="/" class="btn btn-outline-secondary">
        <i class="fas fa-chevron-left pr-2"></i>Back to home
      </router-link>
    </div>
    <div class="detail-info py-3 px-5">
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

    <div class="pt-5 pb-3 px-3">
      <a-input-search placeholder="input search text" style="width: 200px" />
      <a-button class="float-right" type="primary">Button</a-button>
    </div>
    <a-button class type="primary" @click="handleAdd">add</a-button>

    <a-table :columns="columns" :data-source="dataSource" bordered>
      <template slot="name" slot-scope="text">
        <a>{{ text }}</a>
      </template>
    </a-table>
  </div>
</template>

<script>
const renderContent = (value) => {
  const obj = {
    children: value,
    attrs: {},
  };
  return obj;
};

export default {
  name: "Home",
  components: {},
  data() {
    const dataSource = [
      {
        key: "1",
        name: "John Brown",
        image:
          "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
        age: 32,
        tel: "0571-22098909",
        phone: 18889898989,
        address: "New York No. 1 Lake Park",
        children: [
          {
            key: 11,
            tel: "0571-22098909",
            phone: 18889898989,
            address: "New York No. 1 Lake Park",
          },
        ],
      },
      {
        key: "2",
        name: "Jim Green",
        image:
          "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
        tel: "0571-22098333",
        phone: 18889898888,
        age: 42,
        address: "London No. 1 Lake Park",
      },
    ];
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        customRender: (text) => {
          return <a href="#">{text}</a>;
        },
      },
      {
        title: "Age",
        dataIndex: "age",
      },
      {
        title: "Image",
        dataIndex: "image",
        customRender: (text) => {
          if (text) {
            return <img src={`${text}`}></img>;
          }
        },
      },
      {
        title: "Home phone",
        dataIndex: "tel",
        // customRender: (value, row, index) => {
        //   const obj = {
        //     children: value,
        //     attrs: {},
        //   };
        //   if (index === 0) {
        //     obj.attrs.rowSpan = 2;
        //   }
        //   // These two are merged into above cell
        //   if (index === 1) {
        //     obj.attrs.rowSpan = 0;
        //   }
        //   return obj;
        // },
      },
      {
        title: "Phone",
        dataIndex: "phone",
        customRender: renderContent,
      },
      {
        title: "Address",
        dataIndex: "address",
        customRender: renderContent,
      },
    ];
    return {
      dataSource,
      columns,
    };
  },
  methods: {
    handleAdd() {
      const { dataSource } = this;

      this.dataSource.forEach(function (element) {
        if (element.name == "John Brown") {
          const a = {
            ...element,
            key: dataSource.length + 4,
            gentle: "female",
          };
          console.log(a);
        }
        else {
          console.log('failed')
        }
      });
    },
  },
};
</script>

<style lang="scss">
.nav {
  background: white;
  box-shadow: 0 0 10px -6px #919aa3;
}

.detail-info {
  display: grid;
  grid-template-columns: max-content auto 2fr auto 1fr;

  &__item:nth-child(1) {
    font-weight: bold;
    font-size: 3em;
    grid-row-start: 1;
    grid-row-end: 10;
    padding: 0;
  }
  &__item {
    padding: 0.2em 1em;
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
</style>
