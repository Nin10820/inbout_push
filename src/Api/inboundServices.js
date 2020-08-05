import Api from './index';

export const getListInbound = () => {
  return Api.get('/receipts');
}

export const getDetailInbound = (id) => {
  return Api.get(`/receipts/${id}`)
}