import { create } from "zustand";

interface UserState {
  favoriteIds: string[];
  likedGuideIds: string[];
  toggleFavorite: (id: string) => void;
  toggleGuideLike: (id: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  favoriteIds: [],
  likedGuideIds: [],
  toggleFavorite: (id) =>
    set((state) => ({
      favoriteIds: state.favoriteIds.includes(id)
        ? state.favoriteIds.filter((item) => item !== id)
        : [...state.favoriteIds, id]
    })),
  toggleGuideLike: (id) =>
    set((state) => ({
      likedGuideIds: state.likedGuideIds.includes(id)
        ? state.likedGuideIds.filter((item) => item !== id)
        : [...state.likedGuideIds, id]
    }))
}));
