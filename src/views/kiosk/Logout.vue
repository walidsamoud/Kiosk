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

            <vs-button class="btn-block btn btn-outline-light btn-lg submit-button mt-4" type="button" @click="logoutAndLeave">
                {{$t('Kiosk.App.LogoutButton')}}
            </vs-button>


            <vs-button class="btn-block btn btn-outline-light btn-lg submit-button mt-4" type="button" @click="$router.back()">
                {{$t('Kiosk.App.CancelButton')}}
            </vs-button>

        </div>
    </vs-card>
  
</template>

<script>
import { mapState, mapActions } from 'vuex'
import LanguageSelector from '../../components/language/LanguageSelector'
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
    ...mapActions('Kiosk', ['login', 'logout']),
      logoutAndLeave(){
          this.logout().then(function () {
              this.$router.push('/kiosk/login')
          }.bind(this))
      }
  },  
  computed: {
    ...mapState('Kiosk', ['status']),
      ...mapState({
          kiosk_info: state => state.Kiosk.kiosk
      })
  },
  created () {
    // reset login status
    if(!this.kiosk_info) this.$router.push('/kiosk/login')
  },
  components:{
      LanguageSelector
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

