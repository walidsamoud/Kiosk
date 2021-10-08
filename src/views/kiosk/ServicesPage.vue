<template>
    <div class="services" id="ServicesPage" style="z-index: 999999999;">
        <div class="row">
            <div class="col language_select">
              <LbrxLanguageSelector @change="loadQueues"></LbrxLanguageSelector>
            </div>
        </div>
        <div class="row">
            <div class="col">
              <h2 class="service_h"  :style="kiosk_language=='ar'?'letter-spacing: 0 !important;font-size: 20px;margin-top: -5px;':'font-size: 10px;margin-top: -10px;'">
                  {{$t('Services.Message')}}
              </h2>
            </div>
        </div>
        <form id="servicesForm" class="container services_container" method="GET" action="Ticket" style="margin-top: -10px;">
            <div class="row">
                <div class="col-md-3" v-if="services.length==1"></div>
                <div :class="services.length>=6?'col-md-4 service':'col-md-6 service'" v-for="(item, key) in services" :key="key">
                    <LbrxService 
                                 :name="item.title" size="small" theme="small" hover="false"
                                 :value="item" @checked="addSelection" @unchecked="removeSelection(item)" 
                    >
                    </LbrxService>
                    <!-- v-long-press="3000" @long-press-start="openQtePopup(item)" -->
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

        <PopupQte :item="popup_qte.item" :message="popup_qte.message" :hint="popup_qte.hint" :title="popup_qte.title" :type="popup_qte.type"
           :confirmationButton="popup_qte.confirmation" :active.sync="popup_qte.active" @confirm="addSelection">
        </PopupQte>

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
import PopupQte from '../../components/popups/PopupServiceQte.vue';
import LongPress from 'vue-directive-long-press';
// import $ from 'jquery'

export default {
  name: 'ServicesPage',
  data:()=>({
      secondary:'#6c757d',
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
    popup_qte: {
      item: {},
      active: false,
      title: "",
      message: "",
      hint: "",
      type: "",
      confirmation: "",
      callback: 'qteSelected',
    },
    kiosk_language: localStorage.getItem('Language')
  }),
  components: {
    LoadingPopup,
    LbrxButton,
    LbrxLanguageSelector,
    LbrxService,
    Popup,
    PopupQte
  },
  directives: {
    'long-press': LongPress
  },
  methods:{
      qteSelected(item, qte=1){
          alert(item)
          alert(qte)
      },
      openQtePopup(item) {
          this.showPopupQte(item, "success", "Confirmation", "", "Combien de fois voulez-vous faire ce service", "Selectionner", this.hidePopupQte);
      },
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
      addSelection(item, qte=1){
          this.removeSelection(item)
          item.qte= qte
          console.log(item)
          this.selectedServices.push(item);

        //   if(fromPopup){
        //       var checkBox = $(":checkbox[value="+item.id+"]");
        //       checkBox.prop('checked', true)
        //       $('#label'+item.id).css("border-left", "15px solid rgba(22, 214, 22, 0.7)");
        //       this.$emit("checked");
        //   }
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
              this.showPopup("danger", "Ouups!", "Un problème est survenu", "Veuillez sélectionner au moins un service pour continuer", "Fermer", this.hidePopup);
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

      showPopupQte(item, type, title, message, hint, confirmation, callback){
          this.popup_qte = {
              item: item, active: true, title: title, message: message, hint: hint, type: type, confirmation: confirmation, callback: callback
          };
      },
      hidePopupQte(){
          this.popup_qte = {active: false, title: "", message: "", hint: "", type: "", confirmation: "", callback: null };
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

<style scoped>
.service{
    padding-top: 10px;
}
</style>