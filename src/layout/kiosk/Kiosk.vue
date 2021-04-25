<template>
  <div :class="theme">
    <router-view></router-view>
  </div>
</template>
<script>
  import {  mapActions } from 'vuex'
  export default {
    name: 'Checkin',
    data:()=>({
      msg: "Checkin"
    }),
    computed: {
      
      
      
    },
    methods: {
      ...mapActions('Kiosk', ['refresh']),
    },
    mounted() {
      
    }
  }
</script>
