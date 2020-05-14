<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import themeConfig from '@/../themeConfig.js'

export default {
  name: 'app',
  components: {
  },
  data:()=>({
  }),
  watch: {
        '$store.state.theme'(val) {
            this.toggleBodyClass(val);
        }
    },
  methods: {
  toggleBodyClass(className) {
            if (className == 'dark') {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
                
            }
        }
    },
  
mounted() {
  this.toggleBodyClass(themeConfig.theme)
},


    
  
}
</script>