import TopNavbar from "../TopNavbar/TopNavbar";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { loadDetailedPokemon } from "../../functions/loadDetailedPokemon";
import { getPokemonByType } from "../../functions/API/getPokemonByType";
import { formatPokemon } from "../../functions/formatPokemon";
import type { DetailedPokemon } from "../../types/DetailedPokemon";
import type { Pokemon } from "../../types/Pokemon";
import "./PokemonDetails.css"
import PokemonCard from "../PokemonCard/PokemonCard";


function PokemonDetails() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState<DetailedPokemon | null>(null)
    const [similarPokemon, setSimilarPokemon] = useState<Pokemon[] | null>(null);
    const primaryType = pokemon?.types[0];

    console.log(pokemon)

    useEffect(() => { loadDetailedPokemon({ setPokemon, id }); }, [])

    useEffect(() => {
        if (!pokemon || !primaryType) return;

        async function loadSimilarPokemon() {
            const fetchedPokemonList = await getPokemonByType(primaryType);

            if (!fetchedPokemonList || !pokemon) return;

            const firstThreePokemon = fetchedPokemonList
                .filter((fetchedPokemon) => fetchedPokemon.name !== pokemon.name)
                .slice(0, 3);

            const formattedPokemonList = firstThreePokemon.map((pokemon) =>
                formatPokemon(pokemon),
            );

            setSimilarPokemon(formattedPokemonList);
        }

        loadSimilarPokemon();
    }, [primaryType, pokemon?.name]);

    return (
        <div className="pokemon-details-component">
            <TopNavbar></TopNavbar>
            {pokemon &&
                <div className="pokemon-details-component__content">
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
                                    Types: {pokemon.types.map((type, index) => <span key={index}>{type}</span>)}
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
                                {pokemon.abilities.map((ability, index) => <div key={index}>{ability}</div>)}
                            </div>
                        </div>
                    </div>
                    <div className="similar-pokemon">
                        {similarPokemon?.map((pokemon) =>
                            <PokemonCard
                                key={pokemon.id}
                                id={pokemon.id}
                                name={pokemon.name}
                                image={pokemon.image}
                                types={pokemon.types}
                            />)}
                    </div>
                </div>
            }
        </div>
    )
}
export default PokemonDetails