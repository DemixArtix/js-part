<template lang="pug">
.cart.p-2
  h3.cart__title.text-left.font-medium.pl-2 Корзина
  .cart__list(class="text-[12px]")
    .cart__header.flex.text-gray-400.border-b
      .cart__header_item.text-left.p-2(v-for="param in listParams" :key="param" :class="param.widthClass") {{param.name}}
    .cart__body
      transition-group(
        name="list"
        )
        .cart__body_item.flex.p-1.items-center.border-b(v-for="goodsItem in goodsList" :key="goodsItem.categoryId + 'key' + goodsItem.id")
          .cart__header_item.flex.p-1.flex-col(v-for="param in listParams" :class="param.widthClass")
            template(v-if="param.type === 'text'")
              .text-left {{goodsItem[param.field]}}
            template(v-else-if="param.type === 'delete'")
              a.cursor-pointer(@click.prevent="onDelete(goodsItem)") Удалить
            template(v-else-if="param.type === 'quantity'")
              input.w-16.p-1.border(type="number" :max="goodsItem.count" :value="goodsItem[param.field]" @input="changeQuantity(goodsItem, $event)")
              .text-red-300.text-left(class="text-[9px]" v-if="(goodsItem.count - goodsItem.quantity) < 5") кол-во&nbspограничено:&nbsp{{goodsItem.count - goodsItem.quantity}}
            template(v-else-if="param.type === 'price'")
              .text-left
                strong {{goodsItem[param.field]}} руб.
                span &nbsp/ шт

    .cart__footer.flex.justify-end.p-3
      .cart__footer_text.text-gray-400 Общая стоимость:
      .cart__footer_total.pl-3.font-bold.transition(:class="totalColorClass")
        span(ref="totalInt") 0
        span .
        span(ref="totalFloat") 00
        span руб.




</template>

<script lang="ts">

  import { defineComponent, computed, ref, reactive, watch } from 'vue';
  import {useStore} from "vuex";

  import anime from "animejs/lib/anime.es";

  import { Ref } from 'vue';
  import IGoodParams from "interfaces/IGoodParams";

  export default defineComponent({
    name: "index",
    setup() {
      const store = useStore()

      const cartItems = computed(() => {
        return store.getters['cart/cart']
      })

      const course = computed(() => {
        return store.getters['list/course']
      })

      const totalEl = ref(null);
      const totalInt = ref(null);
      const totalFloat = ref(null);

      let totalColorClass: Ref<string> = ref('text-gray-400')


      const goodsList = computed(() => {
        return cartItems.value.reduce((acc: any, {id, categoryId, quantity}: IGoodParams) => {
          let { name, price, count } = store.getters['list/rawList'][categoryId].goods[id];
          acc.push({
            name, price, count, categoryId, id, quantity
          });
          return acc;
        }, [])

      })

      const total = computed(() => {
        return goodsList.value.reduce((acc: any, { price, quantity}: any) => {
          return acc += (price * quantity);
        }, 0).toFixed(2)
      })

      watch(course, function (newVal, oldVal) {
        if(oldVal === newVal || total.value == 0) {
          totalColorClass.value = 'text-gray-400';
        } else if(oldVal > newVal && total.value > 0) {
          totalColorClass.value = 'text-green-300';
        } else if(oldVal < newVal && total.value > 0) {
          totalColorClass.value = 'text-red-300';
        }
      })

      watch(total, function (newVal, oldVal) {
        anime({
          targets: totalInt.value,
          textContent: [Math.floor(oldVal), Math.floor(newVal)],
          round: 1,
          easing: 'easeInOutExpo',

        });
        anime({
          targets: totalFloat.value,
          textContent: [`${oldVal}`.split('.')[1], `${newVal}`.split('.')[1]],
          round: 1,
          easing: 'easeInOutExpo',

        });
      })

      const listParams: Ref<any> = ref([
        {
          name: 'Наименование и описание товара',
          field: 'name',
          widthClass: 'basis-5/12',
          type: 'text'
        },
        {
          name: 'Кол-во',
          field: 'quantity',
          widthClass: 'basis-3/12',
          type: 'quantity'
        },
        {
          name: 'Цена',
          field: 'price',
          widthClass: 'basis-3/12',
          type: 'price'
        },
        {
          name: '',
          field: 'delete',
          widthClass: 'basis-1/12',
          type: 'delete'
        },
      ]);

      function changeQuantity(goodsItem: any, event: any) {
        store.commit('cart/changeQuantity', { ...goodsItem, value: event.target.value })
      }

      function onDelete(goodsItem: any) {
        store.commit('cart/deleteGoodsItem', goodsItem)
      }

      return {
        listParams,
        goodsList,
        changeQuantity,
        onDelete,
        total,
        course,
        totalColorClass,
        totalEl,
        totalInt,
        totalFloat,
      }
    }
  })
</script>

<style scoped lang="sass">



</style>