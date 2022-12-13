<template lang="pug">
.container.flex
  .goods__list(class="basis-7/12")
    //.grid.grid-cols-2.gap-1
    goodsCategory(v-for="category in list" :category="category" :key="category.id")
  cart(class="basis-5/12")
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import goodsCategory from 'components/goods-category/index.vue'
import cart from 'components/cart/index.vue'
import {useStore} from "vuex";
import IGoodsCategory from "interfaces/IGoodsCategory";

export default defineComponent({
  name: 'App',
  created() {
    //@ts-ignore
    this.$store.dispatch('list/init')
  },
  components: {
    goodsCategory,
    cart
  },
  setup() {
    const store = useStore()

    const list = computed<IGoodsCategory[]>(() => {
      return store.getters['list/list'];
    })

    return {
      list
    }
  }
});
</script>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px

.goods__list
  display: grid
  grid-auto-flow: row dense
  grid-template-columns: repeat(2, minmax(0, 1fr))
  grid-column-gap: 0.2rem
  grid-row-gap: 1px
  grid-auto-rows: 1px

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active
  transition: all 0.5s ease


.list-enter-from,
.list-leave-to
  opacity: 0
  transform: translateX(30px)
</style>
