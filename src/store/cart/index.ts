import IGoodParams from "interfaces/IGoodParams";
import IGoodsItem from "interfaces/IGoodsItem";

export default {
  namespaced: true,
  state: {
    cart: [] as IGoodParams[]
  },
  getters: {
    cart: ({cart}: any) => cart,
  },
  mutations: {
    addToCart(state: any, { categoryId, id, count, quantity }: IGoodParams) {
      let itemInCart = state.cart.find((item: IGoodParams) => item.categoryId === categoryId && item.id === id);
      if(itemInCart && itemInCart.quantity + quantity <= count) {
        state.cart[state.cart.indexOf(itemInCart)].quantity += quantity;
      } else {
        state.cart.push({ categoryId, id, quantity })
      }
    },
    changeQuantity(state: any, { categoryId, id, count, value }: any) {
      let itemIndex = state.cart.findIndex((item: IGoodParams) => item.categoryId === categoryId && item.id === id);
      if(value == 0) {
        state.cart.splice(itemIndex, 1)
      } else if(value <= count) {
        state.cart[itemIndex].quantity = value;
      }
    },
    deleteGoodsItem(state: any, { categoryId, id }: any) {
      let itemIndex = state.cart.findIndex((item: IGoodParams) => item.categoryId === categoryId && item.id === id);
      state.cart.splice(itemIndex, 1)
    },
  },
  actions: {

  },
}
