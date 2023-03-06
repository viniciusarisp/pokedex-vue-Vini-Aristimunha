<script>
export default {
  name: 'MainList',
  props: ['pokemons'],
  components: {},

  data: () => ({
    //Url do request para a api dependendo de cada geração
    url: 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0',
    // String com o valor da geração selecionada
    selectedGeneration: '1ª Geração (0-151)',
    //Array com os ranges de cada geração de pokemon
    generations: [],
    // Objeto com as informações do Pokémon selecionado
    selectedPokemon: {},
    // Valor da busca
    busca: "",
    //Páginas
    pages: {
        // Índice inicial do array de Pokémon a ser exibido na página
        pageStart: 0,
        // Índice final do array de Pokémon a ser exibido na página
        pageEnd: 24,
        //Página atual
        page: 1,
      }
  }),

  methods: {
    sortById(pokemons) {
      // Ordena a lista de pokémons pelo ID
      pokemons.sort((a, b) => a.id - b.id);
    },
    sortByName(pokemons) {
      // Ordena a lista de pokémons pelo nome
      pokemons.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    },
    showPokemon(pokemon) {
      // Atualiza o pokémon selecionado
      this.selectedPokemon = pokemon;
      //Passa para o app.vue o pokemon selecionado 
      this.$emit('selectPokemon', this.selectedPokemon)
    },
    changePage() {
      //Defino o range da página selecionada
      this.pages.pageStart = 24 * (this.pages.page - 1);
      this.pages.pageEnd = 24 * this.pages.page;
    },
    setGeneration(selectedGeneration) {
      //Separa os números de ID de início e fim de cada geração
      let genNumbers = selectedGeneration.match(/(\d+)/g)
      //Define o começo da geração
      let offset = genNumbers[1]
      //Define a quantidade de pokemons na geração selecionada
      let limit = genNumbers[2]-genNumbers[1]
      //Usa o a quantidade e começo da geração para fazer o request dos pokemons
      this.url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      //Passa o prop de child > parent component da url 
      this.$emit('urlAPI', this.url)
    },
    isShiny(sprite) {
      //Analisa a url da img do pokemon para definir se é shiny
      if (sprite.includes('shiny')) return 'shiny'
    },
  },
  computed: {
    pokesFiltrados() {
      // Filtra a lista de pokémons com base na busca
      const search = this.busca.toLowerCase();
      return this.pokemons.filter(item => {
        const name = item.name.toLowerCase();
        const type = item.types.map(type => type.toLowerCase());
        this.pages.page = 1;
        //Checa se tanto nome como tipo estão inclusos
        return name.includes(search) || type.includes(search);
      });
    }
  },
  beforeMount() {
    //Define como padrão a primeira geração antes de carregar a página
    this.setGeneration(this.selectedGeneration)
  }
}

</script>
<template>
  <v-main class="ma-2">
    <v-text-field 
      v-model="busca" 
      class="" 
      label="Search Pokemon"
      placeholder='"Pikachu", "Grass"' 
      solo>
    </v-text-field>
    <v-card>
      <v-select
        v-model="selectedGeneration"
        class="mx-15"
        chips
        label="Geração"
          :items="['1ª Geração (0-151)', '2ª Geração (151-251)', '3ª Geração (251-386)', '4ª Geração (386-493)', '5ª Geração (493-649)', '6ª Geração (649-721)', '7ª Geração (721-809)','8ª Geração (809-905)']"
        variant="underlined"
        @update:modelValue="setGeneration(selectedGeneration)"
      ></v-select>
      <v-row class=" d-flex flex-column">
          <v-col class="d-flex justify-start align-center">
            <v-btn
              @click="sortByName(pokemons)"
              class="mx-3">
              order by name
            </v-btn>
            <v-btn
              @click="sortById(pokemons)"
              class="mx-3">
              order by ID
            </v-btn>
          </v-col>
        <v-col>
          
        </v-col>
        <v-col 
        class="d-flex justify-end">
          <div class="">
            <v-pagination 
              v-model="pages.page" 
              :length="Math.ceil(pokesFiltrados.length / 24)" 
              :total-visible="3"
              @click="changePage()">
            </v-pagination>
          </div>
        </v-col>
      </v-row>
        <v-row
          class="pa-1 my-4"
        >
          <v-col
            v-for="pokemon in pokesFiltrados.slice(this.pages.pageStart, this.pages.pageEnd)"
            :key="pokemon.name"
            class="d-flex flex-row justify-center"
            elevation="4">
            <v-card
              class='pokemon-card'
              width="190"
              height="250"
              v-on:click="showPokemon(pokemon)"
              elevation="8">
              <v-container :class="pokemon.types[0]">
                <v-row class="d-flex flex-column justify-center" no-gutters>
                  <h3 class="text-capitalize text-center text-no-wrap"> {{ pokemon.name }} </h3>
                  <v-img
                    class=""
                    :aspect-ratio="1/1"
                    :src="pokemon.sprite"
                    :alt="pokemon.name"
                    cover
                    height="170">
                  </v-img>
                </v-row>
                <p class="font-weight-medium text-left"
                :class="isShiny(pokemon.sprite)"
                >
                  #{{ pokemon.id.toString().padStart(3,'0') }}
                </p>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
    </v-card>
  </v-main>
</template>
