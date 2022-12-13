import IGoodsItem from "interfaces/IGoodsItem";

export default interface IGoodsCategory {
  id: number
  title: string
  goods: IGoodsItem[]
}