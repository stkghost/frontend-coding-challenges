import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { cn } from "@lib/utils";
import { Character } from "@lib/constants/characters";
import { useAppStore } from "@lib/hooks/useAppStore";

type CharacterCardProps = {
  character: Character;
  className?: string;
};

export const CharacterCard = ({ character, className }: CharacterCardProps) => {
  
  const favoriteIds = useAppStore((state) => state.favoriteIds)
  const toggleFavorite = useAppStore((state) => state.toggleFavorite)
  
  const isFavorite = favoriteIds.includes(character.id);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(character.id);
  };

  return (
    <Link to="/$characterId" params={{ characterId: character.id }}>
      <article
        className={cn(
          "relative isolate flex h-87.5 flex-col justify-end overflow-hidden rounded-2xl px-3 py-6 shadow-md shadow-zinc-950",
          className
        )}
      >
        <img
          src={character.image || undefined}
          alt={character.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-stone-900/20" />
        <button
          onClick={handleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="absolute right-3 top-3 z-10 text-amber-200/60 transition-colors hover:text-amber-200"
        >
          <Star
            size={20}
            className={cn(isFavorite && "fill-amber-400 text-amber-400")}
          />
        </button>
        <h3 className="z-10 font-light tracking-wide">{character.name}</h3>
      </article>
    </Link>
  );
};
