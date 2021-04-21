<template>
   
<div>

</div>
  
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
  },
  components:{
  }
}
</script>

