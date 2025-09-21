import axios from 'axios';

const API_URL = "https://pokeapi.co/api/v2/";
const API_POKEMON = API_URL + "pokemon/";

export async function get_all() {
  const url = `${API_POKEMON}?limit=100000&offset=0`;
  const response = await axios.get(url);
  return response.data;
}

export const get_pokemon_thumbail_by_name = async (pokename = "lucario") => {
	try {
		const res = await axios.get(API_POKEMON + pokename);
		const { status, data } = res;

		const { id, name, sprites, types } = data;
		const { front_default, back_default, front_shiny, back_shiny } = sprites;

		const normal = {
			front: front_default,
			back: back_default,
		};
		const shiny = {
			front: front_shiny,
			back: back_shiny,
		};

		const datos = {
			id: id,
			name: name,
			sprites: [normal, shiny],
			types: types,
		};
		return { status, datos };
	} catch (error) {
		const status = 404;
		return { status, error };
	}
};