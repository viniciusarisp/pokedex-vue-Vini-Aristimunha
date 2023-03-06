<script>
  export default {
    name: 'MainHeader',
    components: {},
    data: () => ({}),
  }
</script>

<template>
  <div class="bg-red-darken-4 text-center d-flex flex-column elevation-8 rounded-b-xl">
    <v-img 
      :aspect-ratio="16 / 9" 
      class="img-header my-5 mx-auto w-25"
      src="https://user-images.githubusercontent.com/29473781/180619084-a56960ab-7efa-4e34-9d33-4e3e581d62ff.png"
      alt="pokedex logo" 
    />
  </div>
</template>
