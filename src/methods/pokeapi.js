//biblioteca axios para fazer requisições HTTP
import axios from 'axios';

export async function getList(url) {
  try {
    // Faz uma requisição GET à URL passada como parâmetro
    const response = await axios.get(url);
    // Faz uma requisição GET para cada item da lista retornada pela primeira requisição
    const requests = response.data.results.map(item => axios.get(item.url));
    // Aguarda a conclusão de todas as requisições
    const results = await Promise.all(requests);
    // Atualiza a lista de pokémons com os dados obtidos nas requisições
    return results.map(itemResponse => parsePokemon(itemResponse.data));
  } catch (error) {
    console.error(error);
  }
}

export function parsePokemon(pokemon) {
  return {
    "id": pokemon.id,
    "name": pokemon.name,
    "height": pokemon.height / 10, //converter para M
    "weight": pokemon.weight / 10, // converter para kg
    "abilities": pokemon.abilities.map(item => item.ability.name),
    "types": pokemon.types.map(item => item.type.name),
    "sprite": Math.random() > 0.1 ? 
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png` 
    : 
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemon.id}.png`,
  }
}
