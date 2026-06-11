import { colors } from "../constants/colors";
import { images } from "../constants/images";
import { BudgetItem, FeatureEntry, TravelOption, Trip } from "../types";

export const homeFeatures: FeatureEntry[] = [
  { id: "ai", title: "AI行程", icon: "sparkles", accent: "blue" },
  { id: "budget", title: "预算助手", icon: "wallet", badge: "智能估算", accent: "orange" },
  { id: "map", title: "地图导航", icon: "map", accent: "blue" },
  { id: "ticket", title: "景点门票", icon: "ticket", accent: "blue" },
  { id: "hotel", title: "酒店住宿", icon: "bed", accent: "blue" },
  { id: "food", title: "美食推荐", icon: "restaurant", accent: "orange" },
  { id: "car", title: "打车出行", icon: "car", accent: "blue" },
  { id: "list", title: "旅行清单", icon: "clipboard", accent: "blue" }
];

export const travelOptions: TravelOption[] = [
  {
    id: "rail-g2191",
    type: "rail",
    fromTime: "06:45",
    toTime: "13:34",
    fromStation: "上海虹桥",
    toStation: "重庆北",
    code: "G2191",
    duration: "6时49分",
    price: 553
  },
  {
    id: "flight-ca4556",
    type: "flight",
    fromTime: "08:10",
    toTime: "11:05",
    fromStation: "上海浦东",
    toStation: "重庆江北",
    code: "CA4556",
    duration: "2时55分",
    price: 720
  }
];

export const tripBudget: BudgetItem[] = [
  { id: "traffic", label: "交通", amount: 1346, percent: 45, color: colors.primary, icon: "train" },
  { id: "hotel", label: "住宿", amount: 960, percent: 32, color: colors.orange, icon: "bed" },
  { id: "food", label: "餐饮", amount: 420, percent: 14, color: colors.green, icon: "restaurant" },
  { id: "ticket", label: "门票", amount: 254, percent: 9, color: colors.purple, icon: "ticket" },
  { id: "taxi", label: "打车/其他", amount: 0, percent: 0, color: colors.textMuted, icon: "car" }
];

export const shanghaiTrip: Trip = {
  id: "shanghai-3d2n",
  title: "上海 3天2晚 行程详情",
  dateRange: "6月10日 - 6月12日（周一 - 周三）",
  companion: "2人出行",
  travelStyle: "自由行",
  cover: images.shanghaiSkyline,
  totalBudget: 2980,
  budget: tripBudget,
  bookings: [
    {
      id: "train",
      type: "train",
      title: "高铁票",
      detail: "上海虹桥 → 南京南\n6月10日 09:30 出发",
      status: "已确认"
    },
    {
      id: "hotel",
      type: "hotel",
      title: "酒店",
      detail: "上海外滩亚朵S酒店\n6月10日 - 6月12日 · 2晚",
      status: "已确认"
    },
    {
      id: "ticket",
      type: "ticket",
      title: "门票",
      detail: "上海博物馆等 2项\n6月11日 · 共2张",
      status: "已确认"
    }
  ],
  days: [
    {
      day: "D1",
      title: "城市漫步 & 地道美食",
      image: images.shanghaiBund,
      distanceKm: 8.5,
      foodCost: 268,
      checkins: 8,
      stops: [
        { time: "09:00", title: "外滩", description: "万国建筑群，感受上海历史风情" },
        { time: "12:00", title: "南京东路步行街", description: "购物天堂，老字号美食聚集地" },
        { time: "18:00", title: "豫园 & 城隍庙", description: "江南园林与特色小吃体验" },
        { time: "20:00", title: "陆家嘴夜景", description: "登高看灯光秀，欣赏魔都夜景" }
      ]
    },
    {
      day: "D2",
      title: "博物馆之旅 & 拍照打卡 & 夜景",
      image: images.shanghaiMuseum,
      distanceKm: 7.2,
      foodCost: 258,
      checkins: 6,
      stops: [
        { time: "09:30", title: "上海博物馆", description: "了解上海历史与文化" },
        { time: "12:30", title: "武康路 & 安福路", description: "文艺街区，拍照打卡圣地" },
        { time: "15:30", title: "甜爱路 & 田子坊", description: "小众路线，感受老上海的味" },
        { time: "19:00", title: "外滩夜游", description: "游船夜景，绚丽灯光尽收眼底" }
      ]
    },
    {
      day: "D3",
      title: "购物休闲 & 返程前打卡",
      image: images.cityStreet,
      distanceKm: 6.1,
      foodCost: 198,
      checkins: 5,
      stops: [
        { time: "09:30", title: "静安寺 & 久光百货", description: "购物休闲，奢侈品与潮牌聚集" },
        { time: "12:00", title: "新天地", description: "石库门建筑，美食与时尚结合" },
        { time: "15:00", title: "北外滩打卡", description: "网红机位，拍摄摩天轮" },
        { time: "17:30", title: "前往虹桥站/机场返程", description: "结束愉快的上海之旅" }
      ]
    }
  ]
};
