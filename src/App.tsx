import PokemonCard from "./components/PokemonCard/PokemonCard";

function App() {

  return (
    <div>
      <PokemonCard
        id={25}
        name="Pikachu"
        artwork="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
        types={["electric"]}
      />
    </div>
  )
}

export default App;
