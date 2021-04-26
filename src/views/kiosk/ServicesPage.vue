<template>
    <div class="services">
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

                <div class="col-6 service" v-for="(item, key) in services" :key="key">
                    <LbrxService :name="item.title" size="medium" theme="medium" hover="false"
                                 :value="item" @checked="addSelection(item)" @unchecked="removeSelection(item)">
                    </LbrxService>
                </div>

            </div>
            
        </form>

        <LoadingPopup :active="loading.active" :message="loading.message"></LoadingPopup>

        <div class="row bottom-btns">
            <div class="col">
                <LbrxButton name="" size="medium" theme="dark" hover="false" href="#"></LbrxButton>
            </div>
            <div class="col">
                <LbrxButton name="" size="medium" theme="dark" hover="false" href="#"></LbrxButton>
            </div>
            <div class="col" v-on:click="submitSelectedServices()">
                <LbrxButton :name="$t('Services.Next')" size="medium" theme="light" hover="true" href="javascript:;"></LbrxButton>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import LbrxButton from '../../components/buttons/Button.vue';
import LbrxLanguageSelector from '../../components/LanguageSelector/LanguageSelector.vue';
import LbrxService from '../../components/Services/ServiceSelector.vue';
import {kioskService} from "../../_services";
import LoadingPopup from "../../components/popups/Loading";


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
  }),
  components: {
      LoadingPopup,
    LbrxButton,
    LbrxLanguageSelector,
    LbrxService
  },
  methods:{
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
          localStorage.setItem("selectedServices", JSON.stringify(this.selectedServices));
          this.$router.push({name: "Ticket"}).catch();
      }
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
