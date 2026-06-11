import { images } from "../constants/images";
import { Attraction, DestinationCardData, DestinationDetail, RouteNode } from "../types";

export const localRecommendations: DestinationCardData[] = [
  {
    id: "bund-night",
    name: "外滩夜景",
    subtitle: "灯光璀璨",
    image: images.shanghaiBund,
    tag: "必去打卡",
    rating: 4.8,
    visitedText: "1.2万人去过"
  },
  {
    id: "yuyuan",
    name: "豫园 · 城隍庙",
    subtitle: "老上海烟火气",
    image: images.garden,
    tag: "人气榜",
    rating: 4.7,
    visitedText: "8563人去过"
  },
  {
    id: "museum",
    name: "上海博物馆",
    subtitle: "文化艺术",
    image: images.shanghaiMuseum,
    tag: "文化艺术",
    rating: 4.8,
    visitedText: "6231人去过"
  }
];

export const weekendTrips: DestinationCardData[] = [
  {
    id: "suzhou",
    name: "苏州",
    subtitle: "园林水巷",
    image: images.garden,
    distance: "89km"
  },
  {
    id: "hangzhou",
    name: "杭州",
    subtitle: "西湖慢游",
    image: images.mountain,
    distance: "175km"
  },
  {
    id: "wuzhen",
    name: "乌镇",
    subtitle: "古镇夜色",
    image: images.cityStreet,
    distance: "120km"
  }
];

export const hotDestinations: DestinationCardData[] = [
  {
    id: "beijing",
    name: "北京",
    subtitle: "623.1万人去过",
    image: images.cityStreet
  },
  {
    id: "chengdu",
    name: "成都",
    subtitle: "412.6万人去过",
    image: images.foodTable
  },
  {
    id: "sanya",
    name: "三亚",
    subtitle: "386.8万人去过",
    image: images.beachRoad
  }
];

export const chongqingSpots: DestinationCardData[] = [
  {
    id: "hongyadong",
    name: "洪崖洞",
    subtitle: "12.7万人去过",
    image: images.hongyadong,
    tag: "TOP1",
    rating: 4.8
  },
  {
    id: "jiefangbei",
    name: "解放碑",
    subtitle: "86.5万人去过",
    image: images.chongqingNight,
    tag: "TOP2",
    rating: 4.7
  },
  {
    id: "cableway",
    name: "长江索道",
    subtitle: "62.3万人去过",
    image: images.tram,
    tag: "TOP3",
    rating: 4.7
  },
  {
    id: "ciqikou",
    name: "磁器口古镇",
    subtitle: "53.8万人去过",
    image: images.garden,
    tag: "TOP4",
    rating: 4.6
  }
];

export const chongqingFoods: DestinationCardData[] = [
  {
    id: "hotpot",
    name: "重庆火锅",
    subtitle: "10.2万人推荐",
    image: images.hotpot,
    tag: "必吃",
    rating: 4.9
  },
  {
    id: "noodle",
    name: "重庆小面",
    subtitle: "7.8万人推荐",
    image: images.noodles,
    tag: "地道",
    rating: 4.7
  },
  {
    id: "jianghu",
    name: "江湖菜",
    subtitle: "6.3万人推荐",
    image: images.foodTable,
    tag: "特色",
    rating: 4.6
  },
  {
    id: "skewer",
    name: "山城小吃",
    subtitle: "5.1万人推荐",
    image: images.foodTable,
    tag: "小吃",
    rating: 4.6
  }
];

export const photoSpots: DestinationCardData[] = [
  {
    id: "nanshan",
    name: "南山一棵树观景台",
    subtitle: "俯瞰重庆全景",
    image: images.chongqingBridge,
    tag: "机位"
  },
  {
    id: "qiansimen",
    name: "千厮门大桥",
    subtitle: "拍洪崖洞夜景绝佳机位",
    image: images.hongyadong,
    tag: "机位"
  },
  {
    id: "testbed",
    name: "鹅岭二厂文创公园",
    subtitle: "文艺复古风打卡地",
    image: images.photoWalk,
    tag: "机位"
  },
  {
    id: "zhongshuge",
    name: "钟书阁",
    subtitle: "魔幻书城空间感十足",
    image: images.cityStreet,
    tag: "机位"
  }
];

export const routeNodes: RouteNode[] = [
  {
    id: "shanghai",
    name: "上海",
    label: "起",
    image: images.shanghaiSkyline,
    x: 86,
    y: 25,
    type: "start"
  },
  {
    id: "bund",
    name: "外滩",
    image: images.shanghaiBund,
    x: 72,
    y: 20,
    type: "spot"
  },
  {
    id: "huangshan",
    name: "黄山风景区",
    image: images.mountain,
    x: 58,
    y: 39,
    type: "spot"
  },
  {
    id: "hotpot",
    name: "火锅",
    image: images.hotpot,
    x: 42,
    y: 55,
    type: "food"
  },
  {
    id: "nanshan",
    name: "南山一棵树",
    image: images.chongqingBridge,
    x: 34,
    y: 70,
    type: "photo"
  },
  {
    id: "jiefangbei",
    name: "解放碑",
    image: images.chongqingNight,
    x: 25,
    y: 56,
    type: "spot"
  },
  {
    id: "hongyadong",
    name: "洪崖洞",
    label: "终",
    image: images.hongyadong,
    x: 14,
    y: 60,
    type: "end"
  }
];

export const attractionHongyadong: Attraction = {
  id: "hongyadong",
  name: "洪崖洞民俗风貌区",
  rating: 4.8,
  address: "重庆市渝中区嘉陵江滨江路88号",
  openTime: "10:00-22:30",
  image: images.hongyadong,
  tags: ["夜景", "拍照", "免费打卡", "晚上更美"],
  bestTime: "19:00-21:30 灯光全开最美，建议傍晚到达，夜景更震撼",
  warning: ["节假日人流量大，建议错峰出行", "不要在景区门口买黄牛票"],
  photoSpots: [
    {
      id: "qiansimen",
      name: "千厮门大桥",
      subtitle: "人气机位",
      image: images.chongqingBridge,
      tag: "经典机位"
    },
    {
      id: "river",
      name: "江对岸观景台",
      subtitle: "拍全景绝佳位置",
      image: images.hongyadong,
      tag: "全景视角"
    },
    {
      id: "floor11",
      name: "洪崖洞11楼",
      subtitle: "拍建筑细节绝美",
      image: images.chongqingNight,
      tag: "近景细节"
    },
    {
      id: "riverside",
      name: "滨江步道",
      subtitle: "拍倒影超出片",
      image: images.chongqingBridge,
      tag: "江边倒影"
    }
  ],
  foods: [
    {
      id: "dongzi",
      name: "洞子老火锅",
      subtitle: "89m",
      image: images.hotpot,
      rating: 4.7
    },
    {
      id: "jiucun",
      name: "九村烤脑花",
      subtitle: "132m",
      image: images.foodTable,
      rating: 4.6
    },
    {
      id: "tangyuan",
      name: "山城小汤圆",
      subtitle: "156m",
      image: images.noodles,
      rating: 4.5
    },
    {
      id: "mahua",
      name: "陈昌银麻花",
      subtitle: "203m",
      image: images.foodTable,
      rating: 4.6
    }
  ]
};

export const chongqingDestinationDetail: DestinationDetail = {
  id: "chongqing",
  name: "重庆",
  subtitle: "山城雾都 · 魔幻8D之城",
  heroImage: images.chongqingNight,
  tags: ["火锅", "夜景", "山城", "轻轨穿楼"],
  route: {
    title: "首次来重庆 3天2晚精华路线",
    subtitle: "经典景点 + 地道美食 + 山城夜景",
    image: images.chongqingBridge,
    steps: ["解放碑\nDAY1", "洪崖洞\nDAY1", "磁器口\nDAY2", "长江索道\nDAY2", "南山一棵树\nDAY3"]
  },
  spots: chongqingSpots,
  foods: chongqingFoods,
  photoSpots,
  budget: {
    economy: "¥600-900/天",
    comfort: "¥900-1500/天",
    premium: "¥1500+/天",
    recommended: "¥900-1500"
  }
};
