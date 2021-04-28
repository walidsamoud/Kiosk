<template>
    <div class="language_buttons" id="home">
        <div class="row background-ad m-0">
            <div class="col">
                <!-- <img class="img-fluid" src="../../assets/images/test_ad.png" alt="..."> -->
                <!-- <img class="img-fluid" src="https://i0.wp.com/concours-tunisie.tn/wp-content/uploads/2019/04/Concours-Tunisie-Telecom.png?fit=1280%2C720&ssl=1" alt=""> -->
                <qrcode-vue class="qr-code" renderAs="svg" :value="'staging.mlbrx.co/c/'+config.business.hashedid" style="margin-bottom: 10px"></qrcode-vue>
                <span class="qr-code-span" style="font-size: 12px;">{{$t('Kiosk.Ticket.ScanQR')}}</span><br>
                <span class="qr-code-span" style="font-size: 14px">{{$t('Kiosk.Ticket.ThankYou')}}</span>
                <!-- <img class="img-fluid" src="https://i0.wp.com/concours-tunisie.tn/wp-content/uploads/2019/04/Concours-Tunisie-Telecom.png?fit=1280%2C720&ssl=1" alt=""> -->
            </div>
        </div>
        <div class="row bottom-btns">
            <div class="col" @click="selectLanguageCallback('en')">
                <Button name="English" size="large" theme="dark"></Button>
            </div>
            <div class="col" @click="selectLanguageCallback('fr')">
                <Button name="Francais" size="large" theme="medium"></Button>
            </div>
            <div class="col" @click="selectLanguageCallback('ar')">
                <Button name="العربية" size="large" theme="light"></Button>
            </div>
        </div>
        <Popup
                message="Vous avez rejoint la file d'attente"
                title="Ouups!"
                type="danger"
                confirmationButton="Reessayer"
                :active.sync="popupActivateState"
                @confirm="confirmed()"
        ></Popup>
    </div>
</template>

<script>
import Button from '../../components/buttons/Button.vue';
import Popup from '../../components/popups/Popup.vue';
import QrcodeVue from 'qrcode.vue';
//import $ from 'jquery';

export default {
  name: 'Home',
  data:()=>({
    msg:"Home",
    key:'',
    secret:'',
    requestFailed: false,
    popupActivateState: true,
    errors:[],
    config: JSON.parse( localStorage.getItem('kiosk') )
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
    confirmed(){
    },
    selectLanguageCallback:function (code) {
        localStorage.setItem("Language", code);
        this.$i18n.locale = code;
        this.$router.push({path: "/services"});       
    }
   
  },  
  computed: {
  
  },
  created () {

   
  },
  mounted(){
    console.log(this.config)
    //  this.$router.push({path: "/services"});
  },
  components: {
    Button,
    Popup,
    QrcodeVue
  }
}
</script>
<style scoped>
  .qr-code{
    position: relative;
    margin-top: 30% ;
    margin-left: 50% ;
    transform: translate(-50%, -50%);
  }
</style>