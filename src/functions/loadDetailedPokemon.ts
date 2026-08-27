import { STAT_DISPLAY_NAMES } from "../constants/StatDisplayNames";
import type { DetailedPokemon } from "../types/DetailedPokemon";
import { getPokemon } from "./API/getPokemon";

type loadDetailedPokemonProps = {
    setPokemon: (value: DetailedPokemon) => void;
    id: string | undefined;
}

export async function loadDetailedPokemon({ setPokemon, id }: loadDetailedPokemonProps): Promise<void> {
    if (id != undefined) {
        const fetchedPokemonData = await getPokemon(id);
        setPokemon({
            id: Number(id),
            name: fetchedPokemonData.name,
            weight: fetchedPokemonData.weight,
            height: fetchedPokemonData.height,
            image: fetchedPokemonData.sprites.other["official-artwork"].front_default,
            types: fetchedPokemonData.types.map((type) => type.type.name),
            stats: fetchedPokemonData.stats.map((stat) => ({
                name: STAT_DISPLAY_NAMES[stat.stat.name as keyof typeof STAT_DISPLAY_NAMES],
                baseValue: stat.base_stat,
            })),
            abilities: fetchedPokemonData.abilities.map((ability) => ability.ability.name)
        })
    }
}