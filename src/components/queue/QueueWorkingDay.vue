<template>
  <div>
    <vs-row style="align-items: center;" class="mb-3">
      <vs-col  vs-lg="4" vs-md="4" vs-sm="12" vs-xs="12">
        <vs-checkbox class="justify-content-start" color="primary"  v-model="day.active">
          <b class="ml-1">{{$t('Days.'+day.day)}}</b>
        </vs-checkbox>
      </vs-col>

      <vs-col vs-lg="1" vs-md="1" vs-sm="4" vs-xs="4">{{$t('Time.From')}}</vs-col>
      <vs-col vs-lg="3" vs-md="3" vs-sm="8" vs-xs="8">
        <vs-select  v-model="day.start_time" size="small" :disabled="day.active==0">
          <vs-select-item :key="item" :value="item" :text="item" v-for="item in slots" />
        </vs-select>
      </vs-col>

      <vs-col vs-lg="1" vs-md="1" vs-sm="4" vs-xs="4">{{$t('Time.To')}}</vs-col>
      <vs-col vs-lg="3" vs-md="3" vs-sm="8" vs-xs="8">
        <vs-select  v-model="day.end_time" size="small" :disabled="day.active==0">
          <vs-select-item :key="item" :value="item" :text="item" v-for="item in slots" />
        </vs-select>
      </vs-col>
    </vs-row>
  </div>
</template>
<script>

export default {
  name: "QueueWorkingDay",
  data: () => ({
    title: "QueueWorkingDay",
  }),
  props: {
    day: Object
  },
  methods: {

  },
  computed: {

    slots(){
      var x = {
        nextSlot: 30,
        breakTime: [
        ],
        startTime: '00:00',
        endTime: '23:59'
      };

      var slotTime = this.$moment(x.startTime, "HH:mm");
      var endTime = this.$moment(x.endTime, "HH:mm");

      function isInBreak(slotTime, breakTimes) {
        return breakTimes.some((br) => {
          return slotTime >= this.$moment(br[0], "HH:mm") && slotTime < this.$moment(br[1], "HH:mm");
        });
      }

      let times = [];
      while (slotTime < endTime)
      {
        if (!isInBreak(slotTime, x.breakTime)) {
          times.push(slotTime.format("HH:mm"));
        }
        slotTime = slotTime.add(x.nextSlot, 'minutes');
      }

      return times;
    }

  },
  created() {
    this.day.start_time = this.day.start_time.substring(0,5);
    this.day.end_time = this.day.end_time.substring(0,5);
  }
};

</script>