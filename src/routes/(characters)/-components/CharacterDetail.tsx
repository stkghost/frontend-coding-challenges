import { Character } from "@lib/constants/characters";
import { useAppStore } from "@lib/hooks/useAppStore";
import { cn, formatDate } from "@lib/utils";
import { BookOpen, Sparkles, Star, University, User } from "lucide-react";

const yesNo = (value?: boolean) => (value === undefined ? "—" : value ? "Yes" : "No");
const fallback = (value?: string) => value || "—";

type Props = { character: Character };

export const CharacterDetail = ({ character }: Props) => {
  const alternateNames = character.alternate_names?.filter(Boolean) ?? [];

  const favoriteIds= useAppStore((state ) => state.favoriteIds)
  const toggleFavorite= useAppStore((state ) => state.toggleFavorite)

  const isFavorite = favoriteIds.includes(character.id);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(character.id);
  };


  return (
    <div className="container mx-auto flex flex-col gap-6 px-4 pb-12 md:flex-row md:items-start md:gap-8">
      
      {/* // I created a standalone card because the `CharactedCard` wraps everything in a Link, it would create a self-referential link adding it here */}
      <div className="flex flex-col gap-3 md:w-72 md:shrink-0">
        <div className="relative isolate overflow-hidden rounded-2xl shadow-md shadow-zinc-950">
          {character.image ? (
            <img
              src={character.image}
              alt={character.name}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div className="flex h-80 items-center justify-center bg-stone-800 text-amber-200/30">
              No image
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-gray-950/80 via-transparent" />
          <button
            className="absolute right-3 top-3 text-amber-200/60 transition-colors hover:text-amber-200"
            aria-label="Favourite"
            onClick={handleFavorite}
          >
            <Star size={20} className={cn(isFavorite && "fill-amber-400 text-amber-400")} />
          </button>
          <p className="absolute bottom-0 left-0 p-4 font-light tracking-wide">{character.name}</p>
        </div>

        {alternateNames.length > 0 && (
          <p className="text-sm leading-relaxed text-amber-50/40">
            Also known as:{" "}
            <span className="capitalize">{alternateNames.join(", ")}</span>
          </p>
        )}
      </div>

     
      <div className="flex-1 rounded-2xl bg-[#09090B] p-6 shadow-md shadow-zinc-950">
       
        <section>
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-amber-50/90">
            <User size={16} />
            Basic Information
          </h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <InfoItem label="Species" value={fallback(character.species)} />
            <InfoItem label="Gender" value={fallback(character.gender)} />
            <InfoItem
              label="Date of Birth"
              value={formatDate(character.dateOfBirth) ?? "—"}
            />
            <InfoItem label="Ancestry" value={fallback(character.ancestry)} />
            <InfoItem label="Eye Color" value={fallback(character.eyeColour)} />
            <InfoItem label="Hair Color" value={fallback(character.hairColour)} />
          </div>
        </section>

        <Divider />

       
        <section>
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-amber-50/90">
            <Sparkles size={16} />
            Magical Information
          </h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <InfoItem label="Wizard/Witch" value={yesNo(character.wizard)} />
            <InfoItem label="Patronus" value={fallback(character.patronus)} />
          </div>
        </section>

        <Divider />

        
        <section>
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-amber-50/90">
            <University size={16} />
            Hogwarts
          </h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <InfoItem label="Student" value={yesNo(character.hogwartsStudent)} />
            <InfoItem label="Staff" value={yesNo(character.hogwartsStaff)} />
          </div>
        </section>

        <Divider />

       
        <section>
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-amber-50/90">
            <BookOpen size={16} />
            Portrayed By
          </h3>
          <p className="font-light tracking-wide">{fallback(character.actor)}</p>
          {character.alternate_actors && character.alternate_actors.length > 0 && (
            <p className="mt-2 text-sm text-amber-50/40">
              {character.alternate_actors.join(", ")}
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <p className="mb-0.5 text-xs uppercase tracking-wider text-amber-50/40">{label}</p>
    <p className="capitalize font-light tracking-wide">{value}</p>
  </div>
);

const Divider = () => <div className="my-6 border-t border-white/10" />;
