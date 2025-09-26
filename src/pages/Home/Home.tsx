import { useEffect, useState } from 'react';
import { get_all } from '../../services/Api';
import PokemonCard from '../../components/CardPokemon';

const Home = () => {
  const [pokemons, setPokemons] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await get_all();
      setPokemons(data.results);
    }
    fetchData();
  }, []);

  return (
    <div className="pt-3 px-3">
      <h1 className="text-3xl font-bold">Bienvenido a la Home pública</h1>
      <div>
        <h2 className="text-xl font-semibold mt-4">Pokémon encontrados: {pokemons.length}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {pokemons.slice(0, 12).map((pokemon, idx) => (
            <PokemonCard key={idx} name={pokemon.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
