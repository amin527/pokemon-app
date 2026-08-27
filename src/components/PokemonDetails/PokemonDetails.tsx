import { useParams } from "react-router";
import { getPokemon } from "../../functions/API/getPokemon";
import { useEffect, useState } from "react";
import type { DetailedPokemon } from "../../types/detailedPokemon";
import TopNavbar from "../TopNavbar/TopNavbar";
import "./PokemonDetails.css"

function PokemonDetails() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState<DetailedPokemon | null>(null)

    async function loadDetailedPokemon(): Promise<void> {
        if (id != undefined) {
            const fetchedPokemonData = await getPokemon(1);
            setPokemon({
                id: Number(id),
                name: fetchedPokemonData.name,
                weight: fetchedPokemonData.weight,
                height: fetchedPokemonData.height,
                image: fetchedPokemonData.sprites.other["official-artwork"].front_default,
                types: fetchedPokemonData.types.map((type) => type.type.name),
                stats: fetchedPokemonData.stats.map((stat) => ({ name: stat.stat.name, baseValue: stat.base_stat })),
                abilities: fetchedPokemonData.abilities.map((ability) => ability.ability.name)
            })
        }
    }

    useEffect(() => { loadDetailedPokemon(); }, [])
    return (
        <div className="pokemon-details-component">
            <TopNavbar></TopNavbar>
            {pokemon &&
                <div className="pokemon-details">
                    <div className="pokemon-details__image"><img src={pokemon.image} /></div>
                    <div className="pokemon-details__info">
                        <div className="pokemon-details__basic-info">
                            <div className="pokemon-details__title">Base Info</div>
                            <div className="pokemon-details__id">ID: {pokemon.id}</div>
                            <div className="pokemon-details__name">Name: {pokemon.name}</div>
                            <div className="pokemon-details__height">Height: {pokemon.height}</div>
                            <div className="pokemon-details__weight">Weight: {pokemon.weight}</div>
                            <div className="pokemon-details__types">
                                Types: {pokemon.types.map((type) => <span>{type} </span>)}
                            </div>
                        </div>
                        <div className="pokemon-details__stats">
                            <div className="pokemon-details__title">Stats</div>
                            {pokemon.stats.map((stat) => (
                                <div key={stat.name}> {stat.name}: {stat.baseValue}</div>
                            ))}
                        </div>
                        <div className="pokemon-details__abilities">
                            <div className="pokemon-details__title">Abilities</div>
                            {pokemon.abilities.map((ability) => <div>{ability}</div>)}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
export default PokemonDetails