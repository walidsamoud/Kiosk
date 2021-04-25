<template>
    <div class="services">
        <div class="row">
            <div class="col language_select">
              <LbrxLanguageSelector></LbrxLanguageSelector>
            </div>
        </div>
        <div class="row">
            <div class="col">
              <h2 class="service_h">Veuillez sélectionner un ou plusieurs services</h2>
            </div>
        </div>
        <form id="servicesForm" class="container services_container" method="GET" action="Ticket">
            <div class="row">
              <div class="col service">
                <LbrxService name="Payment de facture" size="medium" theme="medium" hover="false" id="1"></LbrxService>
              </div>
              <div class="col service">
                <LbrxService name="Recharge" size="medium" theme="medium" hover="false" id="2"></LbrxService>
              </div>
            </div>
            <div class="row">
              <div class="col service">
                <LbrxService name="Carte SIM" size="medium" theme="medium" hover="false" id="3"></LbrxService>
              </div>
              <div class="col service">
                <LbrxService name="Pack internet" size="medium" theme="medium" hover="false" id="4"></LbrxService>
              </div>
            </div>
            <div class="row">
              <div class="col service">
                <LbrxService name="Reclamation" size="medium" theme="medium" hover="false" id="5"></LbrxService>
              </div>
              <div class="col service">
                <LbrxService name="Autre demande" size="medium" theme="medium" hover="false" id="6"></LbrxService>
              </div>
            </div>
            
        </form>
        <div class="row bottom-btns">
            <div class="col">
                <LbrxButton name="" size="medium" theme="dark" hover="false" href="#"></LbrxButton>
            </div>
            <div class="col">
                <LbrxButton name="" size="medium" theme="dark" hover="false" href="#"></LbrxButton>
            </div>
            <div class="col" v-on:click="submitSelectedServices()">
                <LbrxButton name="Suivante >" size="medium" theme="light" hover="true" href="#"></LbrxButton>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import LbrxButton from '../../components/buttons/Button.vue';
import LbrxLanguageSelector from '../../components/LanguageSelector/LanguageSelector.vue';
import LbrxService from '../../components/Services/ServiceSelector.vue';

import $ from 'jquery';

export default {
  name: 'ServicesPage',
  data:()=>({
    msg:"ServicesPage",
    key:'',
    secret:'',
    requestFailed: false,
    errors:[],
  }),
  components: {
    LbrxButton,
    LbrxLanguageSelector,
    LbrxService
  },
  methods:{
    submitSelectedServices:function(){
      $('#servicesForm').submit();
    },
    checkForm:function(e) {
      this.errors = [];
      if(!this.key) {
        this.errors.push(this.$t('Errors.Required', {field: this.$t('Kiosk.App.Key')}));
      } else if(!this.secret)
          this.errors.push(this.$t('Errors.Required', {field: this.$t('Kiosk.App.Key')}));
      else {
          this.handleSubmit();
        //this.$router.push('/dashboards/classic-dashboard');
      }
      if(!this.errors.length) return true;
      e.preventDefault();
      
    },
    /* eslint-disable */
    validEmail:function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
    return re.test(email);
    },
    /* eslint-disable */
    submit(){
      if(this.validEmail(this.key)){
        this.handleSubmit();
      }else {
          this.errors.push(this.$t('Errors.Invalid', {field: this.$t('Auth.Email')}));
      }
    },
    ...mapActions('Kiosk', ['login', 'autoLogin', 'logout']),
    handleSubmit () {
        this.requestFailed = false;
        this.submitted = true;
        const { key, secret } = this;
        if (key && secret) {
            this.$vs.loading({
                container: '#login-box',
                scale: 0.6
            });
            this.login({ key, secret }).catch(function (data) {
                this.errors.push(this.$t('Errors.LoginFail'));
                this.requestFailed = true;
            }.bind(this)).catch(function (ex) {
                console.log(ex);
            }.bind(this)).finally(function () {
                this.$vs.loading.close('#login-box > .con-vs-loading');
            }.bind(this));
        }
    }
  },  
  computed: {
    ...mapState('Kiosk', ['status']),
      ...mapState({
          kiosk_info: state => state.Kiosk.kiosk
      }),
    inputValid(){
      if(this.key && this.secret && !this.requestFailed){
        return false
      } else {
        return true
      }
    }
  },
  created () {

    // reset login status
    if(this.kiosk_info) this.$router.push('/checkin');
    //this.logout();
  },
  mounted(){
      $('.img-fluid').css("height", screen.height-100);

      if(this.$route.params.key && this.$route.params.token){
          console.log({ key: this.$route.params.key, token: this.$route.params.token })
          this.$vs.loading({ container: '#login-box', scale: 0.6 });
          this.autoLogin({ key: this.$route.params.key, token: this.$route.params.token }).catch(function (data) {
              this.errors.push(this.$t('Errors.LoginFail'));
              this.requestFailed = true;
          }.bind(this)).catch(function (ex) {
              console.log(ex);
          }.bind(this)).finally(function () {
              this.$vs.loading.close('#login-box > .con-vs-loading');
          }.bind(this));
      }
  }
}
</script>

<style scoped>
    *{
         overflow: hidden;
    }
    html,body { height: 100%; width: 100%; margin: 0px; padding: 0px;}


    .bottom-btns{
        position: fixed;
        bottom: 0px;
        margin: 0;
        width: 100%;
        z-index: 9;
        background-color: #193060;
    }
    .col{
        width: 100%;
        padding-right:0;
        padding-left:0;
    }
    .service_h{
      padding: 25px;
      font-size: 35px;
      text-align: center;
      letter-spacing: 2px;
    }
    .language_select{
      text-align: right;
      padding: 20px 30px;
      margin: 10px 25px;
    }
    .services_container{
      margin-top: 30px;
    }
    .services_container .service{
        padding: 0px 20px 20px 20px;
    }
</style>
