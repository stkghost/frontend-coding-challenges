import { createFileRoute, notFound } from "@tanstack/react-router";
import { fetchCharacter } from "@lib/api/characters";
import { CharacterDetail } from "./-components/CharacterDetail";

export const Route = createFileRoute("/(characters)/$characterId")({
  loader: async ({ context: { queryClient }, params: { characterId } }) => {
    const character = await queryClient.ensureQueryData({
      queryKey: ["character", characterId],
      queryFn: () => fetchCharacter(characterId),
    });
    if (!character) throw notFound();
    return character;
  },
  notFoundComponent: CharacterNotFound,
  component: CharacterDetailView,
});

function CharacterDetailView() {
  const character = Route.useLoaderData();
  return <CharacterDetail character={character} />;
}

function CharacterNotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <p className="text-lg text-amber-200/60">Character not found.</p>
      <p className="text-sm text-amber-200/30">
        The character you&apos;re looking for doesn&apos;t exist.
      </p>
    </div>
  );
}
