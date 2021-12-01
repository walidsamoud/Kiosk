<template>
  <div  id="login-box">
    <div class="split left">
      <div class="centered">
        <img
         src="@/assets/images/liberrex_favicon2.webp" alt="image" />
      </div>
    </div>
    <div class="split right d-flex flex-column">
      <form method="post" class="m-auto">
        <h1 class="p-2 text-center">
          <span style="float: left;">{{$t('Auth.Login')}}</span>
          <div @click="selectServer('ci')" style="float: right;cursor: pointer;">
              <country-flag country='ci' size='normal' v-if="server=='ci'"/>
          </div>
          <div @click="selectServer('tn')" style="float: right;cursor: pointer;">
              <country-flag country='tn' size='normal' v-if="server=='tn'"/>
          </div>
        </h1>
        <div class="container pt-4">
          <div class="p-2">
            <label for="teminalID"><b>{{$t('Auth.TerminalId')}}</b></label>
            <input
              type="text"
              placeholder="Enter Terminal ID"
              name="teminalID"
              id="teminalID"
              required
              v-model="key"
            />
          </div>
          <div class="p-2">
            <label for="secretCode"><b>{{$t('Auth.SecretCode')}}</b></label>
            <input
              type="password"
              placeholder="Enter secret Code"
              name="secretCode"
              id="secretCode"
              required
              v-model="secret"
            />
          </div>
          <div class="p-2 pt-4">
            <LbrxButton @click="checkForm" :name="$t('Auth.login')" size="small" theme="outline" class="w-100 m-0 p-0"></LbrxButton>
          </div>
        </div>
      </form>
      <LoadingPopup :active="loading.active" :message="loading.message"></LoadingPopup>
      <Popup :message="popup.message" :hint="popup.hint" :title="popup.title" :type="popup.type"
             :confirmationButton="popup.confirmation" :active.sync="popup.active" @confirm="popup.callback ? popup.callback : hidePopup()">
      </Popup>
    </div>
  </div>
</template>
<style>
body {
  font-family: Arial;
  color: white;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
button {
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
}
button:hover {
  opacity: 0.8;
}
.split {
  height: 100%;
  width: 50%;
  position: fixed;
}

.left {
  left: 0;
  background-color: rgba(255, 255, 255, 0);
}

.right {
  right: 0;
  background-image: linear-gradient(to right, #008fc9, #0478a5);
  padding: 50px;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: 50px;
  transform: translate(-50%, -50%);
  text-align: left;
}

@media screen and (max-width: 600px){
  .left{
    display: none;
  }
  .split{
    width: 100%;
  }
}
</style>
<script>
import LbrxButton from '../../components/buttons/Button.vue';
import { mapState, mapActions } from 'vuex'
import LoadingPopup from "../../components/popups/Loading";
import Popup from '../../components/popups/Popup.vue';
export default {
  name: "Login",
  data: () => ({
    msg: "Login",
    key: "",
    secret: "",
    requestFailed: false,
    errors: [],
    loading: {
      active: false,
      message: ""
    },
    popup: {
      active: false,
      title: "",
      message: "",
      hint: "",
      type: "",
      confirmation: "",
      callback: null,
    },
    server: localStorage.getItem('server')?localStorage.getItem('server'):'tn'
  }),
  methods: {
    selectServer(sv){
      localStorage.setItem('server', sv)
      this.$router.go()
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
        this.showLoading("Please wait, we are verifying your credentials!");
        //this.$vs.loading({ container: '#login-box', scale: 0.6 });
        this.login({ key, secret }).catch(function (data) {
          this.showPopup("danger", "Ouups!", "Nous ne pouvons pas vous connecter", "Veuillez vérifier vos identifiants de connexion et réessayer", "Fermer", this.hidePopup);
          this.requestFailed = true;
        }.bind(this)).catch(function (ex) {
          console.log(ex);
        }.bind(this)).finally(function () {
          this.hideLoading();
        }.bind(this));
      }
    },
    showLoading(message){
      console.log(message);
      this.loading = {
        active: true,
        message: message
      };
    },
    hideLoading(){
      this.loading = { active: false,  message: "" };
    },
    showPopup(type, title, message, hint, confirmation, callback){
      this.popup = {
        active: true, title: title, message: message, hint: hint, type: type, confirmation: confirmation, callback: callback
      };
    },
    hidePopup(){
      this.popup = {active: false, title: "", message: "", hint: "", type: "", confirmation: "", callback: null };
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
  created() {
    // reset login status
    if(this.kiosk_info) this.$router.push('/home');
    //this.logout();
  },
  mounted() {
    this.$i18n.locale = 'fr';
    localStorage.setItem('Language', 'fr')

    if(this.$route.params.key && this.$route.params.token){
      console.log({ key: this.$route.params.key, token: this.$route.params.token });
      this.showLoading("Veuillez patienter, nous vérifions vos informations d'identification !");
      this.autoLogin({ key: this.$route.params.key, token: this.$route.params.token }).catch(function (data) {

        this.showPopup("danger", "Ouups!", "Nous ne pouvons pas vous connecter", "Please check your login credentials and try again", "Fermer", this.hidePopup);

        this.requestFailed = true;
      }.bind(this)).catch(function (ex) {
        console.log(ex);
      }.bind(this)).finally(function () {
        this.hideLoading();
      }.bind(this));
    }
  },
  components: {
    LoadingPopup,
    LbrxButton,
    Popup
  },
};
</script>

