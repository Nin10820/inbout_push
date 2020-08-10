import Api from './index';

export const getInbounds = () => {
  return Api.get('/receipts');
}

export const getInbound = (id) => {
  return Api.get(`/receipts/${id}`)
}