import { useEffect, useState } from 'react';
import { get_pokemon_thumbail_by_name } from '../services/Api';

interface CardPokemonProps {
  name: string;
}

const CardPokemon = ({ name }: CardPokemonProps) => {
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    async function fetchPokemon() {
      const res = await get_pokemon_thumbail_by_name(name);
      setPokemon(res.datos);
    }
    fetchPokemon();
  }, [name]);

  if (!pokemon) return <div>Cargando...</div>;

  return (
    <div className="backdrop-blur-md bg-white/30 border border-white/40 shadow-lg rounded-xl p-4 flex flex-col items-center transition hover:scale-105">
      <img src={pokemon.sprites[0].front} alt={pokemon.name} width={96} height={96} />
      <h3 className="font-semibold mt-2 capitalize">{pokemon.name}</h3>
      <div className="mt-2">
        {pokemon.types.map((t: any, idx: number) => (
          <span key={idx} className="text-xs bg-white/50 backdrop-blur px-2 py-1 rounded mx-1">
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CardPokemon;
