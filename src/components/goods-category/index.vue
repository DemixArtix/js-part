<template lang="pug">
.goods-category(ref="categoryEl" :style="{ gridRowEnd: `span ${gridRowEnd}` }" @transitionend="setSpans")
  .goods-category__title.text-left.font-bold.bg-blue-100.px-2.py-1.flex.items-center.border-t-rounded(
    class="text-[13px]"
    ref="titleEl"
  )
    .goods-category__arrow.mt-1.w-2.h-2.border-l-2.border-t-2.mr-2.border-zinc-600.rotate-45.cursor-pointer.origin-center.transition(
      @click="showGoods = !showGoods"
      :class="{'!rotate-[225deg]': !showGoods, 'mt-0': !showGoods }"
    )
    span {{category.title}}
  transition-group(
    name="list"
    @leave="setSpans"
    @enter="setSpans"
  )
    goodsItem(v-if="showGoods" v-for="goodsItem in category.goods" ref="goodsItemEl" :key="goodsItem.id" :goodsItem="goodsItem" :categoryId="category.id")

</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, onUpdated } from 'vue'
  import goodsItem from 'components/goods-item/index.vue'

  export default defineComponent({
    name: "index",
    components: { goodsItem },
    props: {
      category: {
        type: Object,
        default: () => ({})
      }
    },
    setup() {
      let showGoods = ref(true);
      let categoryEl = ref(true);
      let titleEl = ref(true);
      let goodsItemEl = ref(true);
      let gridRowEnd = ref(0);

      onMounted(() => {
        setSpans(null, () => {})
      })

      onUpdated(() => {
        setSpans(null, () => {})
      })

      function setSpans(el: any, done: any) {
        let title: any = titleEl.value;
        let goodsItems: any = goodsItemEl.value;
        gridRowEnd.value = Number(((goodsItems.reduce((acc: any, item: any) => {
          return acc += +item.$el.offsetHeight
        }, 0) + title.offsetHeight) / 2 + 1).toFixed(0))
        setTimeout(done, 500)
      }


      return {
        showGoods,
        categoryEl,
        titleEl,
        goodsItemEl,
        gridRowEnd,
        setSpans
      }
    }
  })
</script>

<style scoped lang="sass">
</style>