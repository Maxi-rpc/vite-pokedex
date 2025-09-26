import axios from 'axios';

const API_URL = "https://pokeapi.co/api/v2/";
const API_POKEMON = API_URL + "pokemon/";

type PaginatedResponse<T = any> = {
  status: number;
  data?: T;
  error?: any;
};

export async function get_all() {
  const result = await get_paginated(100000, 0);
  if (result.status >= 200 && result.status < 300 && result.data !== undefined) {
    return result.data;
  }
  throw result.error ?? new Error(`Request failed with status ${result.status}`);
}

export async function get_paginated<T = any>(limit: number, offset: number): Promise<PaginatedResponse<T>> {
  const url = `${API_POKEMON}?limit=${limit}&offset=${offset}`;
  try {
    const response = await axios.get<T>(url);
    return { status: response.status, data: response.data };
  } catch (error) {
    const status = (axios.isAxiosError(error) && error.response?.status) ? error.response.status : 500;
    return { status, error };
  }
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
		return { status, data: datos };
	} catch (error) {
		const status = (axios.isAxiosError(error) && error.response?.status) ? error.response.status : 500;
		return { status, error };
	}
};