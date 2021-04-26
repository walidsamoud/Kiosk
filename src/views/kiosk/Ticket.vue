<template>
    <div>
        <div class="services" id="services-box">
            <div class="row ticketDiv">
              <div class="col leftSide">
                <div class="container">
                  <p>Aidez-nous à réduire notre empreinte carbone en optant pour le ticket SMS</p>
                  <div class="small">
                    <small> Le Saviez-Vous? </small><br>
                    <small> Pour chaque 20,000 tickets papier, un arbre est coupé</small>
                  </div>

                  <div class="imageDiv">
                    <img class="image" src="../../assets/images/green-city.gif" alt="">
                  </div>

                  <div class="row print_ticket">
                    <div class="col">
                      <LbrxButton name="Imprimer Ticket" @click="optedForTicket" size="medium" theme="light" hover="true" href="javascript:;"></LbrxButton>
                    </div>
                  </div>

                </div>
              </div>
              <div class="col rightSide">
                <div class="container">
                  <h5 class="right_header">Recevez votre ticket par SMS</h5>
                </div>

                <div class="dialDiv">
                  <LbrxDial :max_digits="8"></LbrxDial>
                </div>
              </div>
            </div>

            <div class="row bottom-btns">
                <div class="col">
                    <LbrxButton name="< Retour" size="medium" theme="light" hover="true" @click="$router.back()" href="javascript:;"></LbrxButton>
                </div>
                <div class="col">
                    <LbrxButton name="" size="medium" theme="dark" hover="false" href="#"></LbrxButton>
                </div>
                <div class="col" v-on:click="submitSelectedServices()">
                    <LbrxButton name="" size="medium" theme="dark" hover="false" href="#"></LbrxButton>
                </div>
            </div>

            <LoadingPopup :active="loading.active" :message="loading.message"></LoadingPopup>

        </div>

        <div id="ticketPrint" style="text-align: center">
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
    </div>
</template>

<script>
import { mapState } from 'vuex';
import LbrxButton from '../../components/buttons/Button.vue';
import LbrxDial from '../../components/Dial/Dial.vue';
import {kioskService} from "../../_services";
import LoadingPopup from "../../components/popups/Loading";
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
        id: null
    },
    kioskConfig: {},
    qrCode: "",
    selectedQueue: null,
  }),
  components:{
    LoadingPopup,
    LbrxButton,
    LbrxDial,
    QrcodeVue
  },
  methods:{
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
      optedForTicket(){
          this.showLoading("Please wait, we are generating your ticket.");
          let payload = {
              queue_id: this.selectedServices[0].queue_id,
              services: this.selectedServices.map(function (obj) {
                  return obj.id;
              }).join(","),
              customer_id: -1,
              member_id: -1,
              anonymous: this.kiosk_info.kiosk.collected_details,
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
          }

          kioskService.joinQueue(payload).then(function (data) {
              this.ticket = data.ticket;
              this.qrCode = process.env.VUE_APP_TICKET_URL+this.ticket.unique_id;
              this.step = 7;

              if(!this.customer.id){
                  setTimeout(function (){ window.print(); }, 500);
              }

              setTimeout(function (){

              }.bind(this), 5000);

          }.bind(this)).catch(function () {
              this.errors.push = true;
          }.bind(this)).finally(function () {
              this.hideLoading();
          }.bind(this))
      },
      optedForSms(){

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
      this.selectedServices = localStorage.getItem("selectedServices") ? JSON.parse(localStorage.getItem("selectedServices")) : [];
      this.kioskConfig = JSON.parse(this.kiosk_info.kiosk.config);
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
    .ticketDiv {
        height: 100vh;
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
      margin-top: 20px;
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

    #ticketPrint {display: none;}
    @media print {
        @page {
            margin: 0.5cm;
            size: 8cm 16cm;
        }
        #services-box {display: none;}
        body {
        }
        * {
            background: white;
            color: #000000;
        }
        #ticketPrint {
            display: block;
            width: 10.5cm;

        }
        .seperator{
            margin-top: 0.3cm;
        }
        hr {
            border: 0.5px solid black;
            border-style: inset;
            border-collapse:collapse;
            line-height: 1px;
        }
        #footer {
            width: 100%;
            height: 4cm;
            margin-top: 10px;
            /* Footer height */
        }





    }
</style>