import { images } from "../constants/images";
import { AppSettings, FavoriteItem, UserOrder, UserProfile } from "../types";

export const userProfile: UserProfile = {
  nickname: "喜欢旅行的枫叶",
  level: "Lv5 旅行达人",
  avatar: images.avatar,
  following: "128",
  followers: "2.3w",
  likes: "8.6w",
  footprintCities: 28,
  distance: "128,763 公里",
  walletBalance: 2680,
  coupons: 5,
  income: 3452,
  points: 128
};

export const userOrders: UserOrder[] = [
  {
    id: "order-train-001",
    title: "上海虹桥 → 重庆北 高铁票",
    status: "已确认",
    amount: 553,
    date: "2026-06-10"
  },
  {
    id: "order-hotel-001",
    title: "重庆解放碑观景酒店",
    status: "待入住",
    amount: 960,
    date: "2026-06-10"
  }
];

export const favoriteItems: FavoriteItem[] = [
  {
    id: "chongqing",
    type: "destination",
    title: "重庆",
    subtitle: "火锅、夜景、山城",
    image: images.chongqingNight
  },
  {
    id: "hongyadong",
    type: "spot",
    title: "洪崖洞民俗风貌区",
    subtitle: "夜景、拍照、免费打卡",
    image: images.hongyadong
  }
];

export const appSettings: AppSettings = {
  notificationEnabled: true,
  privateMode: false,
  currency: "CNY",
  language: "zh-CN"
};
