<script>
  export default {
    name: 'MainFooter',
    components: {},
    data: () => ({
      icons: [
        { iconsrc: 'mdi-linkedin', socialsrc: 'http://www.linkedin.com/in/viniaris' },
        { iconsrc: 'mdi-github', socialsrc: 'http://github.com/viniciusarisp' },
        { iconsrc: 'mdi-whatsapp', socialsrc: 'http://wa.me/+5567981814185' },
      ],
    }),
  }
</script>

<template>
  <v-footer class="bg-red-darken-4 text-center d-flex flex-column h-auto elevation-8 rounded-t-xl">
    <div>
      <v-btn 
        v-for="icon in icons" 
        :key="icon" 
        class="mx-4" 
        :icon="icon.iconsrc" 
        variant="text" 
        :href="icon.socialsrc"
        target="_blank">
      </v-btn>
    </div>
    <p>
      Pokedex created with vue 3 and vuetify.
    </p>
    <div>
      {{ new Date().getFullYear() }} — <strong>Vinicius Aristimunha Pinto</strong>
    </div>
    <div>
      Seletivo front-end Before
    </div>
  </v-footer>
</template>
