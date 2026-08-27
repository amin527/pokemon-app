export type DetailedPokemon = {
    id: number;
    name: string;
    height: number;
    weight: number;
    image: string;
    types: string[];
    stats: { name: string, baseValue: number }[];
    abilities: string[];
};