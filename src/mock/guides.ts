import { images } from "../constants/images";
import { Guide } from "../types";

export const popularGuides: Guide[] = [
  {
    id: "shanghai-three-days",
    title: "上海3天2晚保姆级攻略｜吃住行全指南",
    author: "旅行达人小鹿",
    authorAvatar: images.avatar,
    image: images.shanghaiSkyline,
    tag: "精华",
    likes: 12000,
    views: "19.5万",
    summary: "把外滩、武康路、博物馆和本帮美食串成轻松路线。",
    city: "上海",
    height: 250
  },
  {
    id: "food-top20",
    title: "上海必吃榜TOP20｜本地人私藏美食清单",
    author: "美食探店酱",
    authorAvatar: images.creator,
    image: images.foodTable,
    tag: "美食打卡",
    likes: 986,
    views: "12.8万",
    summary: "从本帮菜到咖啡小馆，适合初次来上海的美食路线。",
    city: "上海",
    height: 225
  },
  {
    id: "photo-spots",
    title: "上海拍照圣地合集｜出片率100%",
    author: "摄影师Ken",
    authorAvatar: images.avatar,
    image: images.cityStreet,
    tag: "CityWalk",
    likes: 764,
    views: "8.6万",
    summary: "6个角度拍出上海城市质感，附黄金时间段。",
    city: "上海",
    height: 275
  }
];

export const communityGuides: Guide[] = [
  ...popularGuides,
  {
    id: "suzhou-one-day",
    title: "苏州周庄一日游攻略｜小桥流水人家",
    author: "阿泽去旅行",
    authorAvatar: images.creator,
    image: images.garden,
    tag: "周边游",
    likes: 812,
    summary: "上海出发当天往返，适合周末慢节奏走走停停。",
    city: "苏州",
    height: 280
  },
  {
    id: "sea-town",
    title: "上海出发2小时！超治愈的海边小城周末就去这里",
    author: "旅行家小鹿",
    authorAvatar: images.avatar,
    image: images.beachRoad,
    tag: "周边游",
    likes: 679,
    summary: "海岸线、民宿、咖啡和自驾路线都整理好了。",
    city: "宁波",
    height: 235
  },
  {
    id: "night-photo",
    title: "外滩夜景拍照指南｜机位+参数全解析",
    author: "摄影师Ken",
    authorAvatar: images.avatar,
    image: images.shanghaiBund,
    tag: "上海攻略",
    likes: 563,
    summary: "适合手机和相机的夜景参数，附避开人群路线。",
    city: "上海",
    height: 260
  },
  {
    id: "moganshan",
    title: "莫干山2天1晚度假攻略｜避暑住民宿",
    author: "山野漫游者",
    authorAvatar: images.creator,
    image: images.mountain,
    tag: "周边游",
    likes: 432,
    summary: "竹林、山景、民宿和轻徒步，适合夏天逃离城市。",
    city: "湖州",
    height: 250
  }
];
