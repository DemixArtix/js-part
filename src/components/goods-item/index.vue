<template lang="pug">
.goods-item.flex.pl-2.justify-between.items-center.border.bg-gray-50(class="text-[11px]")
  .goods-item__name.text-left(class="basis-8/12") {{goodsItem.name}}
  .goods-item__price.bg-gray-100.p-2(class="basis-4/12").flex.justify-end.items-center
    span.mr-4.font-semibold {{goodsItem.price}}
    .goods-item__add.cursor-pointer(@click="onAddToCart()")
      g-icon(name="ui/cart" class="transition hover:fill-green-400")

</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import {useStore} from "vuex";
  import IGoodParams from "interfaces/IGoodParams";

  export default defineComponent({
    name: "index",
    props: {
      categoryId: {
        type: Number
      },
      goodsItem: {
        type: Object,
        default: () => ({})
      }
    },
    setup(props) {
      const store = useStore();

      function onAddToCart() {
        store.commit('cart/addToCart', {
          categoryId: props.categoryId,
          id: props.goodsItem.id,
          quantity: 1,
          count: props.goodsItem.count,
        } as IGoodParams)
      }

      return {
        onAddToCart
      }
    }
  })
</script>

<style scoped lang="sass">

</style>