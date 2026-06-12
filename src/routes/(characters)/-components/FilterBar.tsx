import { Button } from "@lib/components/Button";
import { useAppStore } from "@lib/hooks/useAppStore";
import { characterFilters, CharacterFilterType } from "@lib/constants/filters";

const labels: Record<CharacterFilterType, string> = {
  students: "Students",
  staff: "Staff",
  favorite: "Favorites",
};

export const FilterBar = () => {
  const activeFilter = useAppStore((state) => state.activeFilter)
  const setActiveFilter = useAppStore((state) => state.setActiveFilter)

  const handleFilter = (filter: CharacterFilterType | null) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  return (
    <div className="container mx-auto flex flex-wrap gap-2 px-4">
      <Button active={activeFilter === null} onClick={() => setActiveFilter(null)}>
        All Characters
      </Button>
      {characterFilters.map((filter) => (
        <Button
          key={filter}
          active={activeFilter === filter}
          onClick={() => handleFilter(filter)}
        >
          {labels[filter]}
        </Button>
      ))}
    </div>
  );
};
