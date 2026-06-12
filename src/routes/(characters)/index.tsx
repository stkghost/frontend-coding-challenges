import { createFileRoute } from "@tanstack/react-router";
import { FilterBar } from "./-components/FilterBar";
import { CharactersGrid } from "./-components/CharactersGrid";

export const Route = createFileRoute("/(characters)/")({
  component: CharactersIndexView,
});

function CharactersIndexView() {
  return (
    <div className="flex flex-col gap-6">
      <FilterBar />
      <CharactersGrid />
    </div>
  );
}
