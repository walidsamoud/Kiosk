<template>
    <div class="services" id="ServicesPage">
        <div class="row">
            <div class="col language_select">
              <LbrxLanguageSelector @change="loadQueues"></LbrxLanguageSelector>
            </div>
        </div>
        <div class="row">
            <div class="col">
              <h2 class="service_h">{{$t('Services.Message')}}</h2>
            </div>
        </div>
        <form id="servicesForm" class="container services_container" method="GET" action="Ticket">
            <div class="row">
                <div class="col-md-3" v-if="services.length==1"></div>
                <div class="col-md-6 service" v-for="(item, key) in services" :key="key">
                    <LbrxService :name="item.title" size="medium" theme="medium" hover="false"
                                 :value="item" @checked="addSelection(item)" @unchecked="removeSelection(item)">
                    </LbrxService>
                </div>

            </div>
            
        </form>

        <LoadingPopup :active="loading.active" :message="loading.message"></LoadingPopup>

        <div class="row bottom-btns">
            <div class="col">
                <LbrxButton name="" size="medium" theme="dark" hover="false" href="#" v-long-press="3000" @long-press-start="onLongPressStart"></LbrxButton>
            </div>
            <div class="col">
                <LbrxButton name="" size="medium" theme="dark" hover="false" href="#"></LbrxButton>
            </div>
            <div class="col" v-on:click="submitSelectedServices()">
                <LbrxButton 
                    :name="(!this.Config.kiosk.allow_sms_ticket && this.Config.kiosk.allow_print_ticket)?$t('Ticket.PrintTicket'):$t('Services.Next')" 
                    size="medium" theme="light" hover="true" href="javascript:;">
                </LbrxButton>
            </div>
        </div>
        <Popup :message="popup.message" :hint="popup.hint" :title="popup.title" :type="popup.type"
                   :confirmationButton="popup.confirmation" :active.sync="popup.active" @confirm="popup.callback ? popup.callback : hidePopup()">
            </Popup>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import LbrxButton from '../../components/buttons/Button.vue';
import LbrxLanguageSelector from '../../components/LanguageSelector/LanguageSelector.vue';
import LbrxService from '../../components/Services/ServiceSelector.vue';
import {kioskService} from "../../_services";
import LoadingPopup from "../../components/popups/Loading";
import Popup from '../../components/popups/Popup.vue';
import LongPress from 'vue-directive-long-press';

export default {
  name: 'ServicesPage',
  data:()=>({
    msg:"ServicesPage",
    key:'',
    secret:'',
    requestFailed: false,
    errors:[],
    queues:[],
    services:[],
    selectedServices:[],
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
  }),
  components: {
    LoadingPopup,
    LbrxButton,
    LbrxLanguageSelector,
    LbrxService,
    Popup,
  },
  directives: {
    'long-press': LongPress
  },
  methods:{
      onLongPressStart () {
          localStorage.removeItem('kiosk')
          this.$router.push('/login')
      },
      loadQueues(){
          let queues = JSON.parse(this.kiosk_info.kiosk.config).queues.toString().split(',');
          this.services = [];
          this.showLoading("Please wait, we are loading available services");
          queues.forEach(id => {
              kioskService.getQueueById(id).then(function (data) {
                  data.services.forEach(function (obj) {
                      obj.queue_id = data.queue_id;
                      this.services.push(obj);
                  }.bind(this));
              }.bind(this)).finally(function () {
                  this.hideLoading();
              }.bind(this))
          })
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
      addSelection(item){
          this.selectedServices.push(item);
      },
      removeSelection(item){
          let filteredServices = this.selectedServices.filter(function (obj) {
              return obj.id != item.id;
          });
          this.selectedServices = filteredServices;
      },
      submitSelectedServices(){
          if(this.selectedServices.length){
              localStorage.setItem("selectedServices", JSON.stringify(this.selectedServices));
              this.$router.push({name: "Ticket"}).catch();
          }else{
              this.showPopup("danger", "Ouups!", "A problem occured", "Please select at least one service to proceed", "Close", this.hidePopup);
          }
          
      },
      showPopup(type, title, message, hint, confirmation, callback){
          this.popup = {
              active: true, title: title, message: message, hint: hint, type: type, confirmation: confirmation, callback: callback
          };
      },
      hidePopup(){
          this.popup = {active: false, title: "", message: "", hint: "", type: "", confirmation: "", callback: null };
      },
  },  
  computed: {
      ...mapState({
          kiosk_info: state => state.Kiosk.kiosk,
          theme_info : state => state
      }),
  },
  created () {

  },
  mounted(){
    this.loadQueues();
  }
}
</script>