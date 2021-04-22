<template>
    <div class="language_buttons">
        <div class="row background-ad">
            <div class="col">
                <!-- <img class="img-fluid" src="../../assets/images/test_ad.png" alt="..."> -->
                <img class="img-fluid" src="https://i0.wp.com/concours-tunisie.tn/wp-content/uploads/2019/04/Concours-Tunisie-Telecom.png?fit=1280%2C720&ssl=1" alt="">
            </div>
        </div>
        <div class="row bottom-btns">
            <div class="col">
                <Button name="English" size="large" theme="dark"></Button>
            </div>
            <div class="col">
                <Button name="Francais" size="large" theme="medium"></Button>
            </div>
            <div class="col">
                <Button name="العربية" size="large" theme="light"></Button>
            </div>
        </div>
    </div>
</template>

<script>
import Button from '../../components/buttons/Index.vue';

import $ from 'jquery';

export default {
  name: 'Home',
  data:()=>({
    msg:"Home",
    key:'',
    secret:'',
    requestFailed: false,
    errors:[],
  }),
  methods:{
    checkForm:function() {
     
    },
    /* eslint-disable */
    validEmail:function(email) {
     
    },
    /* eslint-disable */
    submit(){
      
    },
   
  },  
  computed: {
  
  },
  created () {

   
  },
  mounted(){
     
  },
  components: {
    Button
  },
  mounted: function(){
    $('.img-fluid').css("height", screen.height-100);
  }
}
</script>

<style scoped>
    *{
         overflow: hidden;
    }
    html,body { height: 100%; width: 100%; margin: 0px; padding: 0px;}
    .language_buttons{
        margin-top: -60px;
    }
    .background-ad{
        text-align: center;
        width: 100%;
        z-index: 1;
    }
    .background-ad img{
        top: 0;
        padding: 0;
        background-size: contain;
        width: 100%;
    }
    .bottom-btns{
        position: fixed;
        bottom: 0px;
        margin: 0;
        width: 100%;
        z-index: 9;
    }
    .col{
        width: 100%;
        padding-right:0;
        padding-left:0;
    }
</style>