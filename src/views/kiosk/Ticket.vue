<template>
    <div id="Ticket">
        <div class="services" id="services-box">
            <div class="row ticketDiv">
              <div :class="(sms_allowed)?'col-sm-6 leftSide':'col-sm-12 leftSide'"  v-if="print_allowed"  :style="'text-align:'+left_text_align">
                <div class="container" style="max-width: 400px;">
                  <p>{{$t('Ticket.Message1')}}</p>
                  <div class="small" :style="'text-align:'+left_text_align">
                    <small>{{$t('Ticket.Message2')}}</small><br>
                    <small class="msg3">{{$t('Ticket.Message3')}}</small>
                  </div>
                  <div class="imageDiv">
                    <img class="image" src="../../assets/images/green-city.gif" alt="" :style="'width:'+left_img_width">
                  </div>

                  <div class="row print_ticket">
                    <div class="col">
                      <LbrxButton :name="$t('Ticket.PrintTicket')" @click="optedForTicket" size="medium" theme="light" hover="true" href="javascript:;"></LbrxButton>
                    </div>
                  </div>

                </div>
              </div>
              <div :class="(print_allowed)?'col-sm-6 rightSide':'col-sm-12 rightSide'"  v-if="sms_allowed">
                <div class="container">
                  <h5 class="right_header">{{$t('Ticket.Receive')}}</h5>
                </div>

                <div class="dialDiv" style="width: 100%;text-align: center;">
                  <LbrxDial :printAllowed="print_allowed" v-model="phone_number" @submit="optedForSms" @print="optedForTicket" :max_digits="8" style="text-align: center;"></LbrxDial>
                </div>
              </div>

            </div>

            <div class="row bottom-btns">
                <div class="col">
                    <LbrxButton :name="$t('Ticket.Return')" size="medium" theme="light" hover="true" @click="$router.back()" href="javascript:;"></LbrxButton>
                </div>
                <div class="col empty-col">
                    <LbrxButton name="" size="medium" theme="dark" hover="false" href="#"></LbrxButton>
                </div>
                <div class="col empty-col">
                    <LbrxButton name="" size="medium" theme="dark" hover="false" href="#"></LbrxButton>
                </div>
            </div>

            <LoadingPopup :active="loading.active" :message="loading.message"></LoadingPopup>

            <Popup :rank="popup.rank" :message="popup.message" :hint="popup.hint" :title="popup.title" :type="popup.type"
                   :confirmationButton="popup.confirmation" :active.sync="popup.active" @confirm="popup.callback ? popup.callback : hidePopup()">
            </Popup>

        </div>

        <div v-if="Config.kiosk.ticket_style=='Long'" id="ticketPrint" style="text-align: center">
            <img :src="kioskConfig.photo != '' ? kioskConfig.photo : require('@/assets/images/liberrex-grayscale.png')" style="width: 50%; margin-bottom: 1cm"/>
            <br>
            <span style="font-size: 18px">{{$t('Kiosk.Ticket.Welcome')}}</span><br>
            <span style="font-size: 22px; font-weight: bold">{{kiosk_info.business.name}}</span><br>
            <span style="font-size: 18px;">{{selectedQueue ? selectedQueue.queue.title : ''}}</span>
            <hr>
            <table style="width: 100%">
                <tr>
                    <td style="text-align: left; width: 50%">{{checkinDateFormatted}}</td>
                    <td style="text-align: right;  width: 50%">{{checkinTimeFormatted}}</td>
                </tr>
            </table>
            <div class="seperator"></div>
            <span style="font-size: 54px; font-weight: bold">{{ticket.public_identifier}}</span>
            <div class="seperator"></div>
            <hr>
            <table style="width: 100%">
                <tr>
                    <td style="text-align: center; width: 50%">
                        <span style="font-size: 32px; font-weight: bold">{{ticket.total_waiting}}</span><br>
                        <span style="font-size: 15px">{{$t('Kiosk.Ticket.Rank')}}</span>
                    </td>
                    <td style="text-align: center;  width: 50%">
                        <span style="font-size: 32px; font-weight: bold">{{ticketWaitingTimeFormatted}}</span><br>
                        <span style="font-size: 15px">{{$t('Kiosk.Ticket.WaitingTime')}}</span>
                    </td>
                </tr>
            </table>
            <hr>
            <span style="font-size: 24px; font-weight: bold">{{$t('Kiosk.Ticket.Services')}}</span><br>
            <span v-for="(item,index) in ticket.services" :key="index" style="font-size: 18px">
                    {{item.title}} <br>
                </span>
            <footer id="footer">
                <qrcode-vue renderAs="svg" :value="qrCode" style="margin-bottom: 10px"></qrcode-vue>
                <span style="font-size: 12px;">{{$t('Kiosk.Ticket.ScanQR')}}</span><br>
                <span style="font-size: 14px">{{$t('Kiosk.Ticket.ThankYou')}}</span>
            </footer>
        </div>
     
        <div v-else id="ticketPrint" class="horizontal-ticket" style="text-align: center">
            <div class="row w-100 p-0 m-0">
                <div class="col-6 w-100 welcome  p-0 m-0">
                    <img :src="kioskConfig.photo != '' ? kioskConfig.photo : require('@/assets/images/liberrex-grayscale.png')" style="height: 100px; margin-bottom: 0.5cm;float: left !important;"/>
                </div>
                <div class="col-6 w-100 welcome  p-0 m-0">
                    <qrcode-vue renderAs="svg" :value="qrCode" style="float: right !important;"></qrcode-vue>
                </div>
            </div>

            <hr>
            
            <table style="width: 100%">
                <tr>
                    <td style="text-align: center;  width: 100%">
                        <span style="font-size: 15px">{{$t('Kiosk.Ticket.Welcome')}}</span><br>
                        <span style="font-size: 18px; font-weight: bold">{{kiosk_info.business.name}}</span><br>
                        <span style="font-size: 54px; font-weight: bold">{{ticket.public_identifier}}</span><br>
                        {{checkinDateFormatted}} {{checkinTimeFormatted}}

                    </td>
                </tr>
            </table>
            <div class="seperator"></div>
            <hr>
            <table style="width: 100%">
                <tr>
                    <td style="text-align: center; width: 50%">
                        <span style="font-size: 32px; font-weight: bold">{{ticket.total_waiting}}</span><br>
                        <span style="font-size: 15px">{{$t('Kiosk.Ticket.Rank')}}</span>
                    </td>
                    <td style="text-align: center;  width: 50%">
                        <span style="font-size: 32px; font-weight: bold">{{ticketWaitingTimeFormatted}}</span><br>
                        <span style="font-size: 15px">{{$t('Kiosk.Ticket.WaitingTime')}}</span>
                    </td>
                </tr>
            </table>
            <hr>
            <table style="width: 100%">
                <tr>
                    <td style="text-align: left; width: 40%">
                        <span style="font-size: 24px; font-weight: bold">{{$t('Kiosk.Ticket.Services')}}</span><br>
                    </td>
                    <td style="text-align: right;  width: 60%">
                        <span v-for="(item,index) in ticket.services" :key="index" style="font-size: 18px">
                            {{item.title}} <br>
                        </span>
                    </td>
                </tr>
            </table>
            
            <footer id="footer" style="margin-top: 10px;">
                <span style="font-size: 14px;font-weight: bold;">{{$t('Kiosk.Ticket.ThankYou')}}</span>
            </footer>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import LbrxButton from '../../components/buttons/Button.vue';
import LbrxDial from '../../components/Dial/Dial.vue';
import {kioskService} from "../../_services";
import LoadingPopup from "../../components/popups/Loading";
import Popup from '../../components/popups/Popup.vue';
import QrcodeVue from 'qrcode.vue';

//import $ from "jquery"
export default {
  name: 'Ticket',
  data:()=>({
    msg:"Ticket",
    key:'',
    secret:'',
    requestFailed: false,
    errors:[],
    ticket: {
      business: 1,
      checkinDate: "2020-05-12",
      checkinTime: "02:08:20",
      customer_id: 395,
      estimatedTimeToSpend: "25",
      id: 54,
      member_id: 1,
      total_waiting: 0,
      public_identifier: "001",
      queue_line_id: 45,
      services: "4",
      status: "waiting",
      statusUpdateTimestamp: "",
      unique_id: "a818243e9ee05ff6",
      urgent: "0"
    },
    selectedServices: [],
    loading: {
      active: false,
      message: ""
    },
    customer: {
        id: null,
    },
    kioskConfig: {},
    qrCode: "",
    selectedQueue: null,
    popup: {
      active: false,
      rank: 0,
      title: "",
      message: "",
      hint: "",
      type: "",
      confirmation: "",
      callback: null,
    },
    internal_id: null,
    countryPrefix: "+216",
    phone_number: "",
    countryIso: "TN",
    sms_allowed: true,
    print_allowed: true,
    left_img_width: '90%',
    left_text_align: 'left'
  }),
  components:{
    LoadingPopup,
    LbrxButton,
    LbrxDial,
    QrcodeVue,
    Popup
  },
  methods:{
    showLoading(message){
        this.loading = {
            active: true,
            message: message
        };
    },
    hideLoading(){
        this.loading = { active: false,  message: "" };
    },
      optedForTicket(){
          this.showLoading(this.$t('Popup.LoadingMessage'));
          let payload = {
              queue_id: this.selectedServices[0].queue_id,
              services: this.selectedServices.map(function (obj) {
                  return obj.id+'-qte:'+obj.qte;
              }).join(","),
              customer_id: -1,
              member_id: -1,
              anonymous: this.kiosk_info.kiosk.collected_details,
              kiosk_language: localStorage.getItem('Language')
          }

          switch(this.kiosk_info.kiosk.pseudo){
              case "1":
                  payload.pseudo = this.$t('Kiosk.Pseudos.Customer');
                  break;
              case "2":
                  payload.pseudo = this.$t('Kiosk.Pseudos.Patient');
                  break;
              case "3":
                  payload.pseudo = this.$t('Kiosk.Pseudos.User');
                  break;
              default:
                  payload.pseudo = this.$t('Kiosk.Pseudos.Customer');
          }

          kioskService.joinQueue(payload).then(function (data) {
              this.ticket = data.ticket;
              this.qrCode = process.env.VUE_APP_TICKET_URL+this.ticket.unique_id;
              this.step = 7;
              setTimeout(function (){ window.print(); }, 500);
              this.showPopup("success", this.$t('Popup.Congratulations'),this.$t('Popup.TicketSuccess'),this.$t('Popup.SuccessMessage'), this.$t('Popup.Close'), this.hidePopup, this.ticket.queue_rank);
              setTimeout(function (){
                  this.$router.push({path: "/home"})
              }.bind(this), 5000);

          }.bind(this)).catch(function () {

              this.showPopup("danger", "Ouups!", this.$t('Popup.AProblemOccured'), this.$t('Popup.TicketFailure'), this.$t('Popup.Close'), this.hidePopup);
          }.bind(this)).finally(function () {
              this.hideLoading();
          }.bind(this))
      },
      optedForSms(){

          if(this.customer.id == null){
              this.findCustomerByPhoneNumber();
          } else {
              this.showLoading(this.$t('Popup.LoadingMessage'));
              let payload = {
                  queue_id: this.selectedServices[0].queue_id,
                  services: this.selectedServices.map(function (obj) {
                    return obj.id+'-qte:'+obj.qte;
                  }).join(","),
                  customer_id: this.customer.id,
                  member_id: -1,
                  anonymous: this.kiosk_info.kiosk.collected_details,
                  kiosk_language: localStorage.getItem('Language')
              }

              kioskService.joinQueue(payload).then(function (data) {
                  this.ticket = data.ticket;
                  this.qrCode = process.env.VUE_APP_TICKET_URL+this.ticket.unique_id;
                  this.step = 7;

                  this.showPopup("success",this.$t('Popup.Congratulations'),this.$t('Popup.TicketSuccess'), this.$t('Popup.SmSSuccess'), this.$t('Popup.Close'), this.hidePopup, this.ticket.queue_rank);
                  setTimeout(function (){
                      this.$router.push({path: "/home"})
                  }.bind(this), 5000);

              }.bind(this)).catch(function () {
                  this.showPopup("danger", "Ouups!", this.$t('Popup.AProblemOccured'), this.$t('Popup.TicketFailure'), this.$t('Popup.Close'), this.hidePopup);
              }.bind(this)).finally(function () {
                  this.hideLoading();
              }.bind(this))
          }


      },
      showPopup(type, title, message, hint, confirmation, callback, rank = 0){
          this.popup = {
              active: true, title: title, message: message, hint: hint, type: type, confirmation: confirmation, callback: callback, rank: rank
          };
      },
      hidePopup(){
          this.popup = {active: false, title: "", message: "", hint: "", type: "", confirmation: "", callback: null, rank: 0 };
      },
      findCustomerByPhoneNumber(){
          this.showLoading(this.$t('Popup.PhoneChecking'));
          let payload = {
              phone_number: this.phone_number,
              internal_id: this.internal_id,
              country_prefix: this.countryPrefix
          }
          kioskService.findCustomerByPhoneNumber(payload).then(function (data) {
              if(data.customer.length == 0) {
                  this.createNewCustomer();
              } else {
                  this.customer = data.customer[0];
                  this.optedForSms();
              }

          }.bind(this)).catch(function () {

          }.bind(this)).finally(function () {
              this.hideLoading();
          }.bind(this))
      },
      createNewCustomer(){
          this.showLoading("Nous créons un nouveau compte pour vous");
          let payload = {
              phone_number: this.phone_number,
              country_prefix: this.countryPrefix,
              country: this.countryIso,
              fname: "",
              lname: "",
              email: "",
              internal_id: this.internal_id,
          }
          kioskService.createCustomer(payload).then(function (data) {
              if(data.customer != null) {
                  this.customer = data.customer;
                  this.optedForSms();
              }
          }.bind(this)).catch(function () {

          }.bind(this)).finally(function () {
            this.hideLoading();
          }.bind(this))
      },
  },
  computed: {
      ...mapState({
          kiosk_info: state => state.Kiosk.kiosk,
          theme_info : state => state
      }),
      ticketWaitingTimeFormatted: function () {
          return this.$moment().startOf('day').add(this.ticket.waiting_time, 'seconds').format('HH:mm');
      },
      serviceTimeFormatted: function () {
          return this.$moment().startOf('day').add(this.ticket.estimatedTimeToSpend, 'minutes').format('HH:mm');
      },
      checkinDateFormatted: function () {
          return this.$moment(this.ticket.checkinDate+' '+this.ticket.checkinTime).format('DD/MM/YYYY');
      },
      checkinTimeFormatted: function () {
          return this.$moment(this.ticket.checkinDate+' '+this.ticket.checkinTime).format('HH:mm');
      },
  },
  created () {

  },
  mounted(){
      if(!this.Config.kiosk.allow_print_ticket){
          this.print_allowed= false;
      }
      if(!this.Config.kiosk.allow_sms_ticket){
          this.left_img_width= '50%';
          this.left_text_align= 'center';
          this.sms_allowed= false;
      }
      this.selectedServices = localStorage.getItem("selectedServices") ? JSON.parse(localStorage.getItem("selectedServices")) : [];
      this.kioskConfig = JSON.parse(this.kiosk_info.kiosk.config);

      if(!this.Config.kiosk.allow_sms_ticket && this.Config.kiosk.allow_print_ticket){
          this.optedForTicket();
      }
  }
}
</script>
<style scoped> 
    @media screen and (max-width:575px){
        .leftSide{
            display: none;
        }
        .empty-col{
            display: none;
        }
    }
</style>