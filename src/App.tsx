import PokemonGrid from "./components/PokemonGrid/PokemonGrid";

function App() {
  const pokemon = [
    {
      id: 1,
      name: "bulbasaur",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      types: ["grass", "poison"],
    },
    {
      id: 4,
      name: "charmander",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
      types: ["fire"],
    },
    {
      id: 7,
      name: "squirtle",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
      types: ["water"],
    },
  ];
  return (
    <div>
      <PokemonGrid
        pokemon={ pokemon }
      />
    </div>
  );
}

export default App;
