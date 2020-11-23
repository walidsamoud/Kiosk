<template>
  <div :class="theme">
    <router-view></router-view>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'Checkin',
    data:()=>({
      msg: "Checkin"
    }),
    computed: {
      ...mapState({
        kiosk_info: state => state.Kiosk.kiosk
      }),
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
<style>
  .kiosk_layout {
    /* background-image: url(data:image/jpeg;base64,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);
    background-size: 100% 100%; */
  }
  .kiosk_layout_orangina {
    background-image: url(../../assets/images/background/kiosk-orange.jpg);
    background-size: 100% 100%;
  }
  .kiosk_layout_dracula {
    background-image: url(../../assets/images/background/kiosk-black.jpg);
    background-size: 100% 100%;
  }
  .kiosk_layout_light {
    background-image: url(../../assets/images/background/kiosk-light.jpg);
    background-size: 100% 100%;
  }
  .kiosk_layout_greena {
    background-image: url(../../assets/images/background/kiosk-green.jpg);
    background-size: 100% 100%;
  }
  .kiosk_layout_lemon {
    background-image: url(../../assets/images/background/kiosk-yellow.svg);
    background-size: 100% 100%;
  }
  .kiosk-input {
    font-size: 46px;
    padding: 10px;
    background: white;
    color: black;
    border: none !important;
    border-bottom: 1px solid grey !important;
  }
  .kiosk-input.kiosk-input-error{
    background: rgba(192, 75, 57, 0.14);
    border-bottom: 1px solid red !important;
  }
  .kiosk-input::placeholder {
    color: rgba(170, 170, 170, 0.49);
  }
  .kiosk-input .input-span-placeholder {
    font-size: 46px;
  }
  .vs-card--footer{
    width: 100% !important;
  }
  .con-vs-card{
    background: #ebf0f4;
  }
  .login-box{
    border-radius:0px;
    background: #ebf0f4;
  }
  .vs-card--header{
    background: #fff;
    color: #000;
  }
  .footer-button{
    min-width: 200px;
    font-size: 24px;
  }
  .selector-button {
    min-width: 200px;
    font-size: 24px;
    font-size: 46px;
    background: #ffffff24;
    color: white;
    border: none !important;
    border-bottom: 1px solid white !important;
  }
  .selector-checkbox-sm {
    min-width: 100px;
    font-size: 24px;
    padding: 10px 20px;
    background: #ffffff24;
    color: black;
    border: none !important;
    border-bottom: 1px solid black !important;
  }
  .selector-checkbox-sm .vs-radio--label{
    width: 100%;
  }
  div.v-stepper > div.v-stepper-root > div.v-step > label.label > span.index{
      color: black;
  }
  div.v-stepper > div.v-stepper-root > div.v-step {
      pointer-events: none;
  }
  div.v-stepper {
    width: 90%;
    margin-left: auto;
    margin-bottom: 1%;
  }

  
</style>
<style lang="scss">
.step {
    margin-bottom: 1%;
    .bullet {
      border-radius: 50%;
      background-color: white;
      color: black;
      box-shadow: 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
      font-weight: bold;
      width: 3rem;
      height: 3rem;
    }

    .title {
      font-size: small;
      color: white;
      text-align: center;
      margin-top: 0.3rem;
    }

    position: relative;

    .line {
      width: 72%;
      height: 4%;
      background-color: lighten(#00d992, 20%);
      position: absolute;
      top: 50%;
      left: 65%;
      z-index: 1;
      &.disabled {
        background-color: lighten(grey, 40%);
      }
    }
    .check-icon {
      color: #00d992;
    }

    // For disabling everything for next steps
    &.disabled {
      .line, .bullet {
        background-color: lighten(grey, 40%);
      }

      .title {
        color: lighten(#26318d, 40%);
      }
    }
      
  }
</style>