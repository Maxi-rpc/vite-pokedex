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
    <div className="border rounded p-2 flex flex-col items-center">
      <img src={pokemon.sprites[0].front} alt={pokemon.name} width={96} height={96} />
      <h3 className="font-semibold">{pokemon.name}</h3>
      <div>
        {pokemon.types.map((t: any, idx: number) => (
          <span key={idx} className="text-xs bg-gray-200 rounded px-2 mx-1">
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CardPokemon;
