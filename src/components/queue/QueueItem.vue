<template>
  <vs-col vs-lg="4" vs-md="6" vs-sm="6" vs-xs="12">
    <vs-card>
      <div slot="header">
        <h3>
          {{queue.queue.title}}
        </h3>
      </div>
      <div>
        <vs-row class="text-center">
          <vs-col vs-w="6">
            <h3 style="color: #333"><i class="mdi mdi-account-multiple"></i> {{queue.total_waiting}}</h3>
            <p style="color: #aaa">{{$t('Components.Queue.QueueItem.WaitingInLine')}}</p>
          </vs-col>
          <vs-col vs-w="6" style="border-left: 1px solid #efefef">
            <h3 style="color: #333"><i class="mdi mdi-clock"></i> {{waitingTimeFormated}}</h3>
            <p style="color: #aaa">{{$t('Components.Queue.QueueItem.WaitingTime')}}</p>
          </vs-col>
        </vs-row>
        <vs-row class="mt-2">

          <vs-chip class="mr-1" :key="index" v-for="(service, index) in queue.services">
            <small>{{service.title}}</small>
          </vs-chip>
        </vs-row>
        <vs-row class="mt-2">
          <vs-alert active="true" color="primary" icon="contact_support" >
            <span>{{$tc('Components.Queue.QueueItem.PendingRequests', queue.pending, {total: queue.pending})}}</span>
          </vs-alert>
        </vs-row>
        <vs-row class="mt-2">
          <vs-avatar v-for="(item,index) in queue.queue.members" :key="index"
                     :src="item.photo ? item.photo : require('@/assets/images/users/1.jpg')"
                     size="42px" :title="item.fname+' '+item.lname" :alt="item.fname+' '+item.lname"></vs-avatar>
        </vs-row>
      </div>
      <div slot="footer">
        <vs-row vs-justify="flex-end">
          <vs-button class="mr-2" color="danger" icon="delete" @click="deleteQueue"></vs-button>

          <!--
          <vs-button class="mr-2" color="dark" icon="history"></vs-button>
          <vs-button class="mr-2" color="success" icon="tv" @click="goToDisplay"></vs-button>
          -->

          <vs-button class="mr-2" color="warning" icon="edit" @click="goToEdit"></vs-button>
          <vs-button color="primary" icon="remove_red_eye" @click="goToWaitingList"></vs-button>
        </vs-row>
      </div>
    </vs-card>
  </vs-col>
</template>
<script>

import {queueService} from "../../_services";
export default {
  name: "QueueItem",
  data: () => ({
    title: "QueueItem",
  }),
  props: {
    queue: Object
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
    deleteQueue() {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: this.$t('Components.Queue.QueueItem.DeleteConfirm.Title'),
        text: this.$t('Components.Queue.QueueItem.DeleteConfirm.ConfirmText', {name: this.queue.queue.title}),
        acceptText: this.$t('Toasts.AcceptButton'),
        cancelText: this.$t('Toasts.CancelButton'),
        accept: function () {
          this.showLoading();
          queueService.delete(this.queue.queue.id).then(function () {
            this.$emit('delete');
            this.notify(this.$t('Toasts.Successful'), this.$t('Components.Queue.QueueItem.DeleteConfirm.Successful'), 'success');
          }.bind(this)).catch(function () {
            this.notify(this.$t('Toasts.Error'), this.$t('Components.Queue.QueueItem.DeleteConfirm.Error'), 'danger');
          }.bind(this)).finally(function () {
            this.hideLoading();
          }.bind(this));
        }.bind(this)
      });
    },
    goToEdit(){
      this.$router.push({ path: "/queues/"+this.queue.queue.id+'/edit' });
    },
    goToWaitingList(){
      this.$router.push({ path: "/queues/"+this.queue.queue.id+'/waitinglist' });
    },
    goToDisplay(){
      let routeData = this.$router.resolve({ path: "/queues/"+this.queue.queue.id+'/display' });
      window.open(routeData.href, '_blank');
    }
  },

  computed: {
    waitingTimeFormated: function () {
      return this.$moment().startOf('day').add(this.queue.waiting_time, 'seconds').format('HH:mm');
    }

  },
  mounted() {

  }
};

</script>