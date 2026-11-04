import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavouritePokemonState = {
  favouritePokemon: number[];
  toggleFavouritePokemon: (pokemonId: number) => void;
};

export const useFavouritePokemon = create<FavouritePokemonState>()(
  persist(
    (set) => ({
      favouritePokemon: [],
      toggleFavouritePokemon: (pokemonId) =>
        set((state) => ({
          favouritePokemon: state.favouritePokemon.includes(pokemonId)
            ? state.favouritePokemon.filter((id) => id !== pokemonId)
            : [...state.favouritePokemon, pokemonId],
        })),
    }),
    { name: "favourite-pokemon" },
  ),
);
