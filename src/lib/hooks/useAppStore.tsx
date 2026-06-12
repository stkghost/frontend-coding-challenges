import { create } from "zustand";
import { persist } from "zustand/middleware";
import { HouseType } from "@lib/constants/houses";
import { CharacterFilterType } from "@lib/constants/filters";

interface AppState {
  preferredHouse: HouseType | null | undefined;
  setPreferredHouse: (house: HouseType | null | undefined) => void;
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
  activeFilter: CharacterFilterType | null;
  setActiveFilter: (filter: CharacterFilterType | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      preferredHouse: undefined,
      setPreferredHouse: (preferredHouse) => set(() => ({ preferredHouse })),
      favoriteIds: [],
      toggleFavorite: (id) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(id)
            ? state.favoriteIds.filter((fid) => fid !== id)
            : [...state.favoriteIds, id],
        })),
      activeFilter: null,
      setActiveFilter: (activeFilter) => set(() => ({ activeFilter })),
    }),
    {
      name: "the-harry-potter-app-storage",
    }
  )
);
