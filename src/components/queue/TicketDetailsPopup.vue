<template>
  <div>
    <vs-popup class="ticketPopup"
              :title="$t('Components.Queue.TicketPopup.Title')"
              :active.sync="isActive"
              @close="reset"
    >
      <vs-row>
        <vs-col vs-lg="12" class="border-bottom text-center mb-2 pb-2">
          <h2 v-if="ticket.fname || ticket.lname">{{ticket.fname}} {{ticket.lname}}</h2>
          <h2 v-if="!(ticket.fname || ticket.lname)">{{$t('Components.Queue.TicketItem.Anonymous')}}</h2>
          <p>
            <span v-if="ticket.phone_number && ticket.phone_number.length" class="border-right pr-2">
              <i class="mdi mdi-phone"></i> {{ticket.phone_number}}
            </span>
            <span v-if="ticket.email && ticket.email.length" class="ml-2">
              <i class="mdi mdi-email"></i> {{ticket.email}}
            </span>
          </p>
        </vs-col>
      </vs-row>
      <vs-row class="border-bottom">
        <vs-col vs-lg="6" vs-xs="6" class="mb-2 pb-2 border-right text-center">
          <h2 class="">#{{rank}}</h2>
          <small class="text-cyan">{{$t('Components.Queue.TicketItem.Rank')}}</small>
        </vs-col>
        <vs-col vs-lg="6" vs-xs="6" class="mb-2 pb-2 text-center">
          <h2 class="">{{ticket.public_identifier}}</h2>
          <small class="text-cyan">{{$t('Components.Queue.TicketItem.TicketNumber')}}</small>
        </vs-col>
      </vs-row>
      <vs-row class="mt-2 mb-2 pt-2 pb-2 border-bottom">
        <vs-col vs-lg="6" vs-xs="6" class="mr-0 border-right text-center">
          <h2 class="">{{waitingTimeFormated}}</h2>
          <small class="text-cyan">{{$t('Components.Queue.TicketItem.EstimatedWaitingTime')}}</small>
        </vs-col>
        <vs-col vs-lg="6" vs-xs="6" class="mr-0 text-center">
          <h2 class="">{{ticket.checkinTime.substring(0,5)}}</h2>
          <small class="text-cyan">{{$t('Components.Queue.TicketItem.CheckInTime')}}</small>
        </vs-col>
      </vs-row>
      <vs-row  class="mt-2 mb-2 pt-2 pb-2">
        <vs-col vs-w="12" class="pl-4 text-center">
          <h4>{{$tc('Shared.Service', ticket.service_names.split(",").length)}}: </h4>
          <p>{{ticket.service_names}}</p>
        </vs-col>

        <vs-col vs-w="12" class="text-center" v-if="choosable && ticket.member_id != -1">
          <div class="d-flex align-items-center text-center border border-dark">
            <vs-avatar class="" :src="ticket.requested_member.photo ? ticket.requested_member.photo : require('@/assets/images/users/1.jpg')" size="42px"></vs-avatar>
            <h4 class="pl-4">{{ticket.requested_member.fname}} {{ticket.requested_member.lname}}</h4>
          </div>
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col vs-w="12">
          <vs-select
                     :placeholder="$t('Components.Queue.TicketPopup.Actions.Placeholder')"
                     class="w-100 mb-4"
                     :label="$t('Components.Queue.TicketPopup.Actions.Label')"
                     v-model="action"
                     @change="actionChange"
          >
            <vs-select-item value="redirect" :text="$t('Components.Queue.TicketPopup.Actions.Redirect')"/>
            <vs-select-item value="pushback" :text="$t('Components.Queue.TicketPopup.Actions.PushBack')"/>
            <vs-select-item value="swap" :text="$t('Components.Queue.TicketPopup.Actions.Swap')"/>
            <vs-select-item v-if="choosable" value="selectmember" :text="$t('Components.Queue.TicketPopup.Actions.UpdateMember')"/>
            <vs-select-item value="noshow" :text="$t('Components.Queue.TicketPopup.Actions.NoShow')"/>
            <vs-select-item value="delete" :text="$t('Components.Queue.TicketPopup.Actions.Delete')"/>
          </vs-select>
        </vs-col>
        <vs-col vs-w="12" v-if="updateMemberActive">
          <vs-checkbox class="justify-content-start w-100 mb-4" v-model="selectMember">
            {{$t('Components.Queue.AddCustomerPrompt.MemberCheckboxLabel')}}
          </vs-checkbox>

          <vs-select v-if="selectMember"
                     :placeholder="$t('Components.Queue.AddCustomerPrompt.MemberPlaceholder')"
                     class="w-100 mb-4"
                     :label="$t('Components.Queue.AddCustomerPrompt.MemberLabel')"
                     autocomplete
                     v-model="member"
          >
            <vs-select-item :key="'member_'+index" :value="item.id" :text="item.fname+' '+item.lname" v-for="(item,index) in members" />
          </vs-select>
        </vs-col>
        <vs-col vs-w="12" v-if="swapActive">
          <vs-select :placeholder="$t('Components.Queue.TicketPopup.SwapPlaceholder')"
                     class="w-100 mb-4"
                     :label="$t('Components.Queue.TicketPopup.SwapLabel')"
                     autocomplete
                     v-model="swapTicket"
          >
            <vs-select-item :key="'ticket_'+index" :value="item.ticket_id" :text="(item.fname ? item.fname+' '+item.lname : $t('Components.Queue.TicketItem.Anonymous'))+ (item.phone_number ? '( ' + item.phone_number+' )' : '')" v-for="(item,index) in waiting_list" />
          </vs-select>
        </vs-col>
        <vs-col vs-w="12">
          <vs-button color="dark" type="border" class="w-100" @click="submitAction">
            <i class="mdi mdi-check-circle"></i> {{$t('Components.Queue.TicketPopup.Actions.SubmitButton')}}
          </vs-button>
        </vs-col>
        <vs-col vs-lg="12">
          <vs-popup :title="$t('Components.Queue.TicketPopup.RedirectTitle')" :active.sync="redirectPopupActive">
            <vs-select
                    :placeholder="$t('Components.Queue.TicketPopup.RedirectTargetQueuePlaceholder')"
                    class="w-100 mb-4"
                    :label="$t('Components.Queue.TicketPopup.RedirectTargetQueueLabel')"
                    autocomplete
                    v-model="queue"
            >
              <vs-select-item :key="index" :value="queue.id" :disabled="queue.id == queue_id" :text="queue.title" v-for="(queue,index) in queues" />
            </vs-select>
            <vs-button color="success" type="filled" class="w-100" @click="redirectCustomer">
              <i class="mdi mdi-directions"></i> {{$t('Components.Queue.TicketPopup.RedirectButton')}}
            </vs-button>
          </vs-popup>
        </vs-col>
      </vs-row>
    </vs-popup>
  </div>
</template>
<script>

import {queueService} from "../../_services";
export default {
  name: "TicketDetailsPopup",
  data: () => ({
    title: "TicketDetailsPopup",
    isActive: false,
    redirectPopupActive: false,
    swapActive: false,
    updateMemberActive: false,
    queue_id: 0,
    member: -1,
    queues: [],
    waiting_list: [],
    queue: {},
    action: null,
    selectMember: 0,
    swapTicket: 0,
  }),
  props: {
    ticket: Object,
    rank: Number,
    members: Array,
    choosable: Boolean
  },
  methods: {
    notify(title, text, type) {
      this.$vs.notify({
        color: type,
        title: title,
        text: text
      });
    },
    showLoading(){
      this.$vs.loading({
        container: '#queue-box',
        scale: 0.6
      });
    },
    hideLoading(){
      this.$vs.loading.close('#queue-box > .con-vs-loading')
    },
    show(){
      this.isActive = true
    },
    hide(){
      this.isActive = false
    },
    deleteTicket() {

      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: this.$t('Components.Queue.TicketItem.Delete.Title'),
        text: this.$t('Components.Queue.TicketItem.Delete.Text'),
        acceptText: this.$t('Toasts.AcceptButton'),
        cancelText: this.$t('Toasts.CancelButton'),
        accept: function () {
          this.showLoading();
          let ticket = {
            queue_id: this.queue_id,
            customer_id: this.ticket.id
          };
          queueService.revokeTicket(ticket).then(function () {
            this.hide();
            this.$emit('delete');
            this.notify(this.$t('Toasts.Successful'), this.$t('Components.Queue.TicketItem.Delete.ToastSuccess'), 'success');
          }.bind(this)).catch(function () {
            this.notify(this.$t('Toasts.Error'), this.$t('Components.Queue.TicketItem.Delete.ToastFail'), 'danger');
          }.bind(this)).finally(function () {
            this.hideLoading();
          }.bind(this));
        }.bind(this)
      });
    },
    pushBack() {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: this.$t('Components.Queue.TicketItem.PushBack.Title'),
        text: this.$t('Components.Queue.TicketItem.PushBack.Text'),
        acceptText: this.$t('Toasts.AcceptButton'),
        cancelText: this.$t('Toasts.CancelButton'),
        accept: function () {
          this.showLoading();
          queueService.pushBack(this.queue_id, this.ticket.ticket_id).then(function () {
            this.hide();
            this.$emit('change');
            this.notify(this.$t('Toasts.Successful'), this.$t('Components.Queue.TicketItem.PushBack.ToastSuccess'), 'success');
          }.bind(this)).catch(function () {
            this.notify(this.$t('Toasts.Error'), this.$t('Components.Queue.TicketItem.PushBack.ToastFail'), 'danger');
          }.bind(this)).finally(function () {
            this.hideLoading();
          }.bind(this))
        }.bind(this)
      });
    },
    markAsNoShow() {
      this.$vs.dialog({
        type: 'confirm',
        color: 'dark',
        title: this.$t('Components.Queue.TicketItem.NoShow.Title'),
        text: this.$t('Components.Queue.TicketItem.NoShow.Text'),
        acceptText: this.$t('Toasts.AcceptButton'),
        cancelText: this.$t('Toasts.CancelButton'),
        accept: function () {
          this.showLoading();
          queueService.markAsNoShow(this.queue_id, this.ticket.id).then(function () {
            this.hide();
            this.$emit('delete');
            this.notify(this.$t('Toasts.Successful'), this.$t('Components.Queue.TicketItem.NoShow.ToastSuccess'), 'success');
          }.bind(this)).catch(function () {
            this.notify(this.$t('Toasts.Error'), this.$t('Components.Queue.TicketItem.NoShow.ToastFail'), 'danger');
          }.bind(this)).finally(function () {
            this.hideLoading();
          }.bind(this))
        }.bind(this)
      });
    },
    swapCustomers() {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: this.$t('Components.Queue.TicketItem.SwapCustomers.Title'),
        text: this.$t('Components.Queue.TicketItem.SwapCustomers.Text'),
        acceptText: this.$t('Toasts.AcceptButton'),
        cancelText: this.$t('Toasts.CancelButton'),
        accept: function () {
          this.showLoading();
          queueService.swap(this.queue_id, this.ticket.ticket_id, this.swapTicket).then(function () {
            this.hide();
            this.$emit('change');
            this.notify(this.$t('Toasts.Successful'), this.$t('Components.Queue.TicketItem.SwapCustomers.ToastSuccess'), 'success');
          }.bind(this)).catch(function () {
            this.notify(this.$t('Toasts.Error'), this.$t('Components.Queue.TicketItem.SwapCustomers.ToastFail'), 'danger');
          }.bind(this)).finally(function () {
            this.hideLoading();
          }.bind(this))
        }.bind(this)
      });
    },
    redirectCustomer(){

      this.showLoading();
      this.redirectPopupActive = true;

      let ticket = {
        queue_id: this.queue_id,
        customer_id: this.ticket.id,
        target_id: this.queue
      };
      queueService.redirect(ticket).then(function () {
        this.redirectPopupActive = false;
        this.hide();
        this.$emit('delete');
        this.redirectPopupActive = false;
        this.notify(this.$t('Toasts.Successful'), this.$t('Components.Queue.TicketItem.Redirect.ToastSuccess'), 'success');
      }.bind(this)).catch(function () {
        this.notify(this.$t('Toasts.Error'), this.$t('Components.Queue.TicketItem.Redirect.ToastFail'), 'danger');
      }.bind(this)).finally(function () {
        this.hideLoading();
      }.bind(this));
    },
    submitAction(){
      switch (this.action) {
        case 'delete':
          this.deleteTicket();
          break;
        case 'redirect':
          this.redirectPopupActive = true;
          break;
        case 'pushback':
          this.pushBack();
          break;
        case 'swap':
          this.swapCustomers();
          break;
        case 'noshow':
          this.markAsNoShow();
          break;
        case 'selectmember':
          this.submitUpdateMember();
          break;
      }
    },
    actionChange(){

      // Close everything first
      this.swapActive = false;
      this.updateMemberActive = false;

      switch (this.action) {
        case 'swap':
          this.swapActive = true;
          queueService.getWaitingList(this.$route.params.id).then(function (data) {
            this.waiting_list = data.waiting_list.filter(function (obj) {
              return obj.ticket_id != this.ticket.ticket_id
            }.bind(this));
          }.bind(this))
          break;
        case 'selectmember':
          this.updateMemberActive = true;
          break;
      }
    },
    submitUpdateMember(){
      this.showLoading();
      let payload = {
        member_id: this.selectMember ? (this.member != -1 ? this.member : -1) : -1,
      };
      queueService.updateMember(this.queue_id, this.ticket.id, payload).then(function () {
        this.redirectPopupActive = false;
        this.hide();
        this.$emit('update');
        this.redirectPopupActive = false;
        this.notify(this.$t('Toasts.Successful'), this.$t('Components.Queue.TicketItem.Redirect.ToastSuccess'), 'success');
      }.bind(this)).catch(function () {
        this.notify(this.$t('Toasts.Error'), this.$t('Components.Queue.TicketItem.Redirect.ToastFail'), 'danger');
      }.bind(this)).finally(function () {
        this.hideLoading();
      }.bind(this));
    },
    reset(){
      this.action = null;
      this.redirectPopupActive = false;
      this.swapActive = false;
      this.updateMemberActive = false;
      this.member = -1;
      this.queue = {};
      this.selectMember = 0;
      this.swapTicket = 0;
    }
  },
  computed: {
    waitingTimeFormated: function () {
      return this.$moment().startOf('day').add(this.ticket.cumulative_waiting_time, 'minutes').format('HH:mm');
    }
  },
  mounted() {
    this.selectMember = this.ticket.member_id ? 1 : 0;
    this.member = this.ticket.member_id ? this.ticket.member_id : -1;
    this.queue_id = this.$route.params.id;
    queueService.getAllWithSummary().then(function (data) {
      this.queues = data.queues.map(obj => {
        return obj.queue;
      });
    }.bind(this))
  }
};
</script>
<style>
  .ticketPopup > .vs-popup{
    width: 400px;
  }
</style>