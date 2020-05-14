<template>
    <vs-card class="mb-0 full-height login-box" id="login-box" fixedHeight>
        <div slot="header">
            <h3 class="mb-1">{{$t('Kiosk.App.Login')}}
                <div class="float-right">
                    <LanguageSelector></LanguageSelector>
                </div>
            </h3>
        </div>
        <div class="p-4">
            <div class="text-center m-2 mb-5">
                <img src="https://cloud.liberrex.com/images/logo/footer-logo.png" width="155">
            </div>
            <vs-alert v-if="errors.length" class="mb-3 mt-2"  color="danger" :active="inputValid">
                <b>{{$t('Auth.ErrorTitle')}}:</b>
                <ul class="common-list">
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                </ul>
            </vs-alert>
            <form @submit="checkForm" novalidate="true">

                <vs-input icon-after="true" size="large" class="w-100 mb-4 mt-2 vs-input-large" icon="vpn_key" :placeholder="$t('Kiosk.App.Key')" v-model="key" type="text"/>
                <vs-input icon-after="true" size="large" class="w-100 vs-input-large" type="password" icon="lock" :placeholder="$t('Kiosk.App.Secret')" v-model="secret"/>

                <vs-button class="btn-block btn btn-outline-light btn-lg submit-button mt-4" type="submit" @click.stop.prevent="checkForm">
                    {{$t('Kiosk.App.LoginButton')}}
                </vs-button>
            </form>


        </div>
    </vs-card>
  
</template>

<script>
import { mapState, mapActions } from 'vuex'
import LanguageSelector from '../../components/language/LanguageSelector'
import AuthCopyright from '../../components/copyright/AuthCopyright'
export default {
  name: 'Login',
  data:()=>({
    msg: "Login",
    key:'',
    secret:'',
    requestFailed: false,
    errors:[],
  }),
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
    ...mapActions('Kiosk', ['login', 'logout']),
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
    if(this.kiosk_info) this.$router.push('/checkin')
    //this.logout();
  },
  components:{
      LanguageSelector,
      AuthCopyright
  }
}
</script>
<style>
.login-register-bg{
  margin:0 auto;
  background:url(../../assets/images/background/auth-bg.jpg) no-repeat center center;
}
.login-box{
    border-radius:0px;
    background: #000000a3;
}
.vs-card--header{
    background: #00000030;
    color: #fff;
}

.vs-card--header * {
    color: #fff !important;
}

</style>

