<template>
  <vs-col vs-w="12">
    <vs-card>
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
              <span v-if="request.email != ''" class="border-right pr-2 ml-2">
              <i class="mdi mdi-email"></i> {{request.email}}
            </span>
            <span class="ml-2">
              <i class="mdi mdi-clock"></i> {{createdAt}}
            </span>
            </small>
          </vs-col>
        </vs-row>
        <vs-row>
          <vs-col vs-w="12"><b>{{$tc('Shared.Service', request.service_names.split(",").length)}}:</b> {{request.service_names}}</vs-col>
        </vs-row>
      </div>
      <div slot="footer">
        <vs-row vs-justify="flex-end">
          <vs-button class="mr-2" type="gradient" color="danger" icon="close" @click="reject"></vs-button>
          <vs-button class="mr-2" color="success" icon="check" @click="approve"></vs-button>
        </vs-row>
      </div>
    </vs-card>
  </vs-col>
</template>
<script>

import {queueRequestService} from "../../_services";

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
        container: '#queue-box',
        scale: 0.6
      });
    },
    hideLoading(){
      this.$vs.loading.close('#queue-box > .con-vs-loading')
    },
    reject(){
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: this.$t('Components.Queue.RequestItem.Decline.Title'),
        text: this.$t('Components.Queue.RequestItem.Decline.Text', {name: this.request.fname+' '+this.request.lname}),
        acceptText: this.$t('Toasts.AcceptButton'),
        cancelText: this.$t('Toasts.CancelButton'),
        accept: function () {
          this.showLoading()
          queueRequestService.decline(this.request).then(function () {
            this.$emit('reject');
            this.notify(this.$t('Toasts.Successful'), this.$t('Components.Queue.RequestItem.Decline.ToastSuccess'), 'warning');
          }.bind(this)).catch(function () {
            this.notify(this.$t('Toasts.Error'), this.$t('Components.Queue.RequestItem.Decline.ToastFail'), 'danger');
          }.bind(this)).finally(function () {
            this.hideLoading();
          }.bind(this))
        }.bind(this)
      });
    },
    approve(){
      this.$vs.dialog({
        type: 'confirm',
        color: 'success',
        title: this.$t('Components.Queue.RequestItem.Approve.Title'),
        text: this.$t('Components.Queue.RequestItem.Approve.Text', {name: this.request.fname+' '+this.request.lname}),
        acceptText: this.$t('Toasts.AcceptButton'),
        cancelText: this.$t('Toasts.CancelButton'),
        accept: function () {
          this.showLoading()
          queueRequestService.approve(this.request).then(function () {
            this.$emit('approve');
            this.notify(this.$t('Toasts.Successful'), this.$t('Components.Queue.RequestItem.Approve.ToastSuccess'), 'success');
          }.bind(this)).catch(function () {
            this.notify(this.$t('Toasts.Error'), this.$t('Components.Queue.RequestItem.Approve.ToastFail'), 'danger');
          }.bind(this)).finally(function () {
            this.hideLoading();
          }.bind(this))
        }.bind(this)
      });
    }
  },

  computed: {
    createdAt: function () {
      return this.$moment(this.request.created_at).fromNow();
    }
  },
  mounted() {

  }
};

</script>