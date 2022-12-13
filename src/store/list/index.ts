// @ts-ignore
import data from 'mocks/data';
// @ts-ignore
import names from 'mocks/names';
import IGoodsCategory from "interfaces/IGoodsCategory";

function getCourse(min: number = 20, max: number = 80) {
  return Number((min + Math.random() * (max - min)).toFixed(2));
}

export default {
  namespaced: true,
  state: {
    request: null as any,
    list: {},
    course: 0 as number,
  },
  getters: {
    list: ({list}: any) => Object.values(list).reduce((acc: any, {id, title, goods}: any) => {
      let category: IGoodsCategory = {
        id, title, goods: Object.values(goods)
      };

      acc.push(category);

      return acc
    }, []),
    rawList: ({list}: any) => list,
    course: ({course}: any) => course,
  },
  mutations: {
  },
  actions: {
    init({state, dispatch}: any) {
      dispatch('getData')
      state.request = setInterval(() => {
        dispatch('getData')
      }, 5000)
    },
    getData({state}: any) {

      const currentCourse = getCourse();
      state.course = currentCourse;

      let reformatData = data['Value']['Goods'].forEach((item: any) => {
        let {
          T: id,
          G: groupId,
          C: price,
          P: count,
        } = item;

        price = Number((price * currentCourse).toFixed(2));

        let name = names[groupId]['B'][id]['N'];

        if(!state.list[groupId]) {
          state.list[groupId] = {
            id: groupId,
            title: names[groupId]['G'],
            goods: {
              [id]: {
                id,
                name,
                price,
                count,
              }
            }
          }
        } else if(state.list[groupId] && !state.list[groupId].goods[id]) {
          state.list[groupId].goods[id] = {
            id,
            name,
            price,
            count,
          }
        } else if(state.list[groupId] && state.list[groupId].goods[id]) {
          state.list[groupId].goods[id].price = price;
        }
      })
    }
  },
}
