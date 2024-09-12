<template>
    <div>
      <VueMultiselect
        v-model="value"
        :options="options"
        :multiple="true"
        track-by="library"
        :custom-label="customLabel"
      />
      <pre>{{ value }}</pre>
    </div>
  </template>
  
  <script>
import VueMultiselect from 'vue-multiselect'
  export default {
    components: { VueMultiselect },
    data() {
      return {
        value: { language: 'JavaScript', library: 'Vue-Multiselect' },
        options: [
          { language: 'JavaScript', library: 'Vue.js' },
          { language: 'JavaScript', library: 'Vue-Multiselect' },
          { language: 'JavaScript', library: 'Vuelidate' }
        ]
      }
    },
    methods: {
      customLabel(option) { 
        return `${option.library} - ${option.language}`
      }
    }
  }
  </script>


  exportExcel() {
    import("../../Plugins/Export2Excel").then((excel)) => (
        this.$store.dispatch('product/GET_PRODUCT').then(response => {
            console.log(response.data.product)
            //data js
            const OBJ = response.data.product;
            //header in Excel
            const Header = ["Type","Name","Description","IS Active"]
            //field for map with ob data json
            const field =["type","name","description","is_active"]; 
            //
  }