<script>
//Lista de pokemons, busca e ordenação
import MainList from './components/MainList.vue';
//PopUp ao clicar no pokémon
import pokemonCard from './components/pokemonCard.vue';
//Footer da página
import MainFooter from './components/MainFooter.vue';
//Header da página
import MainHeader from './components/MainHeader.vue';
//Importa o metódo que gera a lista de pokemons
import { getList } from './methods/pokeapi';

export default {
  components: {
    MainFooter,
    MainHeader,
    pokemonCard,
    MainList,
  },
  name: 'App',
  data() {
    return {
      // Array de objetos com as informações dos Pokémon
      pokemons: [],
      // Controla a exibição da caixa de detalhes do Pokémon selecionado
      showCard: false,
      // Objeto com as informações do Pokémon selecionado
      selectedPokemon: {},
    }
  },
  methods: {
    //trata o Pokémon recebido por MainList.vue
    setPokemon(pokemon) {
      this.selectedPokemon = pokemon;
      this.showCard = !this.showCard;
    },
    //Chama a função getList importada da pokeapi.js
    async getList(url){
      this.pokemons = await getList(url)
    }
  },
}
</script>

<template>
  <v-app>
    <MainHeader />
    <!-- Mainlist devolve o Pokémon e a geração(url) selecionado para app.vue --> 
    <MainList :pokemons="pokemons" @selectPokemon="setPokemon($event)" @urlAPI="this.getList($event)"/>
    <!-- pokemonCard Recebe o Pokémon selecionado após ser definido na função setPokemon -->
    <pokemonCard :selectedPokemon="selectedPokemon" v-model="showCard" />
    <MainFooter />
  </v-app>
</template>

