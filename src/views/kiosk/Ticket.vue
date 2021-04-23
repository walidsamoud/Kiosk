<template>
    <div class="services">
        <div class="row ticketDiv">
          <div class="col leftSide">
            <div class="container">
              <p>Aidez-nous à réduire notre empreinte carbone en optant pour le ticket SMS</p>
              <div class="small">
                <small> Le Saviez-Vous? </small><br>
                <small> Pour chaque 20,000 tickets papier, un arbre est coupé</small>
              </div>

              <div class="imageDiv">
                <img class="image" src="../../assets/images/illustrations-co2-process2@2x 1.png" alt="">
              </div>

              <div class="row print_ticket">
                <div class="col">
                  <LbrxButton name="Imprimer Ticket" size="medium" theme="light" hover="true" href="services"></LbrxButton>
                </div>
              </div>
          
            </div>
          </div>
          <div class="col rightSide">
            <div class="container">
              <h5 class="right_header">Recevez votre ticket par SMS</h5>
            </div>

            <div class="dialDiv">
              <LbrxDial></LbrxDial>
            </div>
          </div>
        </div>
        <div class="row bottom-btns">
            <div class="col">
                <LbrxButton name="< Retour" size="medium" theme="light" hover="true" href="services"></LbrxButton>
            </div>
            <div class="col">
                <LbrxButton name="" size="medium" theme="dark" hover="false" href="#"></LbrxButton>
            </div>
            <div class="col" v-on:click="submitSelectedServices()">
                <LbrxButton name="" size="medium" theme="dark" hover="false" href="#"></LbrxButton>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import LbrxButton from '../../components/buttons/Button.vue';
import LbrxDial from '../../components/Dial/Dial.vue';

import $ from "jquery"
export default {
  name: 'Ticket',
  data:()=>({
    msg:"Ticket",
    key:'',
    secret:'',
    requestFailed: false,
    errors:[],
  }),
  components:{
    LbrxButton,
    LbrxDial
  },
  methods:{
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
      $('.ticketDiv').css("height", screen.height-75);

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
    .ticketDiv .rightSide{
      background: linear-gradient(to right ,#264076, #3457a2);
    }
    .ticketDiv .container{
      width: 80%;
    }
    .ticketDiv .leftSide{
      margin-top: 40px;
      font-size: 20px;
      text-align: left;
      letter-spacing: 1px;
    }
    .ticketDiv .leftSide .small{
      margin-top: 40px;
      font-size: 15px;
      text-align: left;
      letter-spacing: 1px;
    }
    .image{
      width: 100%;
    }
    .print_ticket{
      margin-top: 40px;
    }
    .ticketDiv .rightSide{
      padding-top: 60px;
      font-size: 20px;
      text-align: left;
      letter-spacing: 1px;
    }
    .right_header{
      text-align: center;
      color: #fff;
      letter-spacing: 1px;
    }
</style>