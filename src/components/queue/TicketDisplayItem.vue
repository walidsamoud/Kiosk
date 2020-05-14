<template>
  <div @click="showPopup">
    <vs-card v-if="item.status == 'waiting'">
      <vs-row>
        <vs-col vs-lg="6" vs-md="6" vs-sm="6" vs-xs="6" class="mr-0 border-right text-center">
          <h2 class="ticket-header">#{{rank}}</h2>
          <small class="text-cyan extra-details">{{$t('Components.Queue.TicketItem.Rank')}}</small>
        </vs-col>
        <vs-col vs-lg="6" vs-md="6" vs-sm="6" vs-xs="6" class="mr-0 text-center">
          <h2 class="ticket-header">{{item.public_identifier}}</h2>
          <small class="text-cyan extra-details">{{$t('Components.Queue.TicketItem.TicketNumber')}}</small>
        </vs-col>
      </vs-row>
    </vs-card>

    <vs-card v-if="item.status == 'inservice'" class="inservice">
      <vs-row>
        <vs-col vs-lg="2" vs-md="2" vs-sm="2" vs-xs="3" class="mr-0 border-right text-center">
          <h2 class="ticket-header">#{{rank}}</h2>
          <small class="text-cyan extra-details">{{$t('Components.Queue.TicketItem.Rank')}}</small>
        </vs-col>
        <vs-col vs-lg="2" vs-md="2" vs-sm="2" vs-xs="3" class="mr-0 border-right text-center">
          <h2 class="ticket-header">{{item.public_identifier}}</h2>
          <small class="text-cyan extra-details">{{$t('Components.Queue.TicketItem.TicketNumber')}}</small>
        </vs-col>
        <vs-col vs-lg="8" vs-md="8" vs-sm="8" vs-xs="6" class="pl-4">
          <h4 v-if="item.fname || item.lname">{{item.fname}} {{item.lname}}</h4>
          <h4 v-if="!(item.fname || item.lname)">{{$t('Components.Queue.TicketItem.Anonymous')}}</h4>
          <p class="small mb-0 extra-details">
            <b>{{$t('Components.Queue.TicketItem.CheckInTime')}}: </b> {{item.checkinTime}} |
            <b>{{$tc('Shared.Service', item.service_names.split(",").length)}}: </b> {{item.service_names}} <br>
            <b>{{$t('Components.Queue.TicketItem.EstimatedWaitingTime')}}: </b>
            {{item.estimated_waiting_time}} {{$tc('Shared.Minute', item.estimated_waiting_time)}}
          </p>
        </vs-col>
      </vs-row>
    </vs-card>

    <TicketDetailsPopup @delete="emitDelete" @change="emitUpdate" @update="emitUpdate" :members="members" :choosable="choosable == 1" :rank="rank" :ticket="item" ref="ticketPopup"></TicketDetailsPopup>
  </div>
</template>
<script>

import TicketDetailsPopup from './TicketDetailsPopup'
export default {
  name: "WaitingListItem",
  data: () => ({
    title: "WaitingListItem",
  }),
  props: {
    item: Object,
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
    showPopup(){
      this.$refs.ticketPopup.show();
    },
    emitDelete(){
      this.$emit('delete');
    },
    emitUpdate(){
      this.$emit('update');
    },
    waitingTimeCountdown(){
      let timeLeft = parseInt(this.item.estimated_waiting_time) - 1;
      this.item.estimated_waiting_time = timeLeft > -1 ? timeLeft : 0;
    }
  },

  computed: {
    waitingTimeFormated: function () {
      return this.$moment().startOf('day').add(this.queue.waiting_time, 'minutes').format('HH:mm');
    }
  },
  created(){
    var self = this;
    setInterval(function () {
      self.waitingTimeCountdown()
    }, 60 * 1000)
  },
  mounted() {
  },
  components: {
    TicketDetailsPopup
  }
};

</script>
<style>
  @media screen and (max-width: 500px) {
    .extra-details{
      display: none;
    }
    .ticket-header{
      font-size: 1.125rem
    }
  }
</style>