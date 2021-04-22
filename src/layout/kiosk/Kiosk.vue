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
      
      theme: function () {
        if(this.kiosk_info == null) return "kiosk_layout_dracula";
        let theme = JSON.parse(this.kiosk_info.kiosk.config).theme;
        switch (theme) {
          case "dark":
            return "kiosk_layout_dracula";
          case "orange":
            return "kiosk_layout_orangina";
          case "light":
            return "kiosk_layout_light";
          case "greena":
            return "kiosk_layout_greena";
          case "lemon":
            return "kiosk_layout_lemon";
        }
        return "kiosk_layout";
      }
    },
    methods: {
      ...mapActions('Kiosk', ['refresh']),
    },
    mounted() {
      if(this.kiosk_info)
        this.refresh();
    }
  }
</script>
