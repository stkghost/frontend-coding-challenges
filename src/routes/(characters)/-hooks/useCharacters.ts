import { useQuery } from "@tanstack/react-query";
import { fetchCharacters } from "@lib/api/characters";
import { useAppStore } from "@lib/hooks/useAppStore";
import { Character } from "@lib/constants/characters";

export const useCharacters = () => {
  const preferredHouse = useAppStore((state) => state.preferredHouse)
  const activeFilter = useAppStore((state) => state.activeFilter)
  const favoriteIds = useAppStore((state) => state.favoriteIds)

  const { data, ...rest } = useQuery<Character[]>({
    // Here I added the preferredHouse as a key so React Query can refetch when a house changes 
    queryKey: ["characters", preferredHouse],
    queryFn: () => fetchCharacters(preferredHouse),
    staleTime: Infinity,
  });

  const withImages = data?.filter((character) => character.image) || [];

  const characters = withImages.filter((character) => {
    if (activeFilter === "students") return character.hogwartsStudent === true;
    if (activeFilter === "staff") return character.hogwartsStaff === true;
    if (activeFilter === "favorite") return favoriteIds.includes(character.id);
    return true;
  });

  return {
    characters,
    ...rest,
  };
};
