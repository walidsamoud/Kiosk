<template>
  <vs-col vs-w="12" class="mt-4 border p-3">
    <div>
      <vs-row>
        <vs-col vs-w="12">
          <h4>{{request.fname}} {{request.lname}}</h4>
        </vs-col>
        <vs-col vs-w="12">
          <small>
            <span v-if="request.phone_number != '' && request.phone_number != null" class="border-right pr-2">
              <i class="mdi mdi-phone"></i> {{request.phone_number}}
            </span>
            <span v-if="request.email != ''" class="ml-2">
              <i class="mdi mdi-email"></i> {{request.email}}
            </span>
          </small>
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col vs-w="12"><b>{{$t('Shared.Date')}}:</b> {{requestedDate}}</vs-col>
      </vs-row>
      <vs-row>
        <vs-col vs-w="12"><b>{{$tc('Shared.Service', request.service_names.split(",").length)}}:</b> {{request.service_names}}</vs-col>
      </vs-row>
      <vs-row>
        <small>
          <span class="ml-2">
              <i class="mdi mdi-clock"></i> {{createdAt}}
            </span>
        </small>
      </vs-row>
      <vs-row vs-justify="flex-end">
        <vs-button class="mr-2" type="gradient" color="danger" icon="close" @click="reject"></vs-button>
        <vs-button class="mr-2" color="success" icon="check" @click="approve"></vs-button>
      </vs-row>
    </div>

  </vs-col>
</template>
<script>

import {bookingRequestService} from "../../_services";

export default {
  name: "RequestItem",
  data: () => ({
    title: "RequestItem",
  }),
  props: {
    request: Object
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
        container: '#booking-box',
        scale: 0.6
      });
    },
    hideLoading(){
      this.$vs.loading.close('#booking-box > .con-vs-loading')
    },
    reject(){
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: this.$t('Components.Booking.RequestItem.Decline.Title'),
        text: this.$t('Components.Booking.RequestItem.Decline.Text', {name: this.request.fname+' '+this.request.lname}),
        acceptText: this.$t('Toasts.AcceptButton'),
        cancelText: this.$t('Toasts.CancelButton'),
        accept: function () {
          this.showLoading();
          bookingRequestService.decline(this.request).then(function () {
            this.$emit('reject');
            this.notify(this.$t('Toasts.Successful'), this.$t('Components.Booking.RequestItem.Decline.ToastSuccess'), 'warning');
          }.bind(this)).catch(function () {
            this.notify(this.$t('Toasts.Error'), this.$t('Components.Booking.RequestItem.Decline.ToastFail'), 'danger');
          }.bind(this)).finally(function () {
            this.hideLoading();
          }.bind(this));
        }.bind(this)
      });
    },
    approve(){
      this.$vs.dialog({
        type: 'confirm',
        color: 'success',
        title: this.$t('Components.Booking.RequestItem.Approve.Title'),
        text: this.$t('Components.Booking.RequestItem.Approve.Text', {name: this.request.fname+' '+this.request.lname}),
        acceptText: this.$t('Toasts.AcceptButton'),
        cancelText: this.$t('Toasts.CancelButton'),
        accept: function () {
          this.showLoading();
          bookingRequestService.approve(this.request).then(function () {
            this.$emit('approve');
            this.notify(this.$t('Toasts.Successful'), this.$t('Components.Booking.RequestItem.Approve.ToastSuccess'), 'success');
          }.bind(this)).catch(function () {
            this.notify(this.$t('Toasts.Error'), this.$t('Components.Booking.RequestItem.Approve.ToastFail'), 'danger');
          }.bind(this)).finally(function () {
            this.hideLoading();
          }.bind(this));
        }.bind(this)
      });
    }
  },

  computed: {
    requestedDate: function () {
      return this.$moment(this.request.start_datetime).format('dddd, DD MMMM YYYY [at] HH:mm');
    },
    createdAt: function () {
      return this.$moment(this.request.created_at).fromNow();
    }
  },
  mounted() {

  }
};

</script>