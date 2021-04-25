<template>
    <div class="services">
        <div class="row">
            <div class="col language_select">
              <LbrxLanguageSelector></LbrxLanguageSelector>
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
                                 :value="item" >
                    </LbrxService>
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
<<<<<<< HEAD
                <LbrxButton :name="$t('Services.Next')" size="medium" theme="light" hover="true" href="#"></LbrxButton>
=======
                <LbrxButton name="Suivant >" size="medium" theme="light" hover="true" href="#"></LbrxButton>
>>>>>>> c7adfa98d447808099f182c7e1c479ccce4fc056
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
  }),
  components: {
    LbrxButton,
    LbrxLanguageSelector,
    LbrxService
  },
  methods:{
      loadQueues(){
          let queues = JSON.parse(this.kiosk_info.kiosk.config).queues.toString().split(',');
          queues.forEach(id => {
              kioskService.getQueueById(id).then(function (data) {
                  data.services.forEach(function (obj) {
                      obj.queue_id = data.queue_id;
                      this.services.push(obj);
                  }.bind(this));
              }.bind(this)).finally(function () {
                  console.log(this.services)
              }.bind(this))
          })
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
