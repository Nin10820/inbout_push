import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const store = new Vuex.Store({
//   modules,
//   strict: process.env.NODE_ENV !== 'production',
//   plugins: [saveIDB]
// })



const store = new Vuex.Store({
    state: {
        moreInfo: {
            done_qty: '',
            lot_number: '',
            lot_date: '',
            ngay_san_xuat: '',
            ngay_het_han: '',
            print_qr_code: '',
        },
      },
      mutations: {
      }
})

// Init states/modules from IndexedDB

export default store
