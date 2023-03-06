<script>
  export default {
    name: 'pokemonCard',
    props: ['selectedPokemon'], 
  }
</script>

<template>
  <v-dialog width="500">
    <v-card class="pokedex-card text-center pa-5 d-flex" image="" cover>
      <h1 class="text-capitalize my-2"> {{ selectedPokemon.name }}</h1>
      <img
        :aspect-ratio="1/1"
        :src="selectedPokemon.sprite" 
        :alt="selectedPokemon.name" 
        width="280" 
        class="block ma-auto d-block mb-4 rounded-lg bg-grey-lighten-3" 
      />
      <v-row 
        v-for="(type) in selectedPokemon.types"
      >
        <v-col :class="type" 
          class="rounded-pill my-1 mx-8 text-uppercase font-weight-black" >{{ type }}
        </v-col>
      </v-row>
      <v-row class="rounded-lg mt-4 font-weight-medium mx-5 d-flex align-center justify-space-around">
        <v-col class="bg-grey-lighten-2 text-center mx-5 rounded-xl">
          <h3>Abilities</h3>
          <ul v-for="ability in selectedPokemon.abilities" class="">
            <span>• {{ ability }}</span>
          </ul>
        </v-col>
        <v-col class="bg-grey-lighten-2 text-center mx-5 rounded-xl">
          <p>Weight: {{ selectedPokemon.weight }} kg</p>
          <p>Height: {{ selectedPokemon.height }} m</p>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
