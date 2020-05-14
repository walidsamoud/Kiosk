<template>
  <div>
    <vs-card class="mt-2">

      <vs-row style="align-items: center;">
        <vs-col vs-w="4">
          <vs-checkbox class="justify-content-start" color="primary"  v-model="day.active">
            <b class="ml-2">{{$t('Days.'+day.day)}}</b>
          </vs-checkbox>
        </vs-col>

        <vs-col vs-w="1">{{$t('Company.Open')}}</vs-col>
        <vs-col vs-w="3">
          <vs-select  v-model="day.start_time" size="small" :disabled="day.active==0">
            <vs-select-item :key="item" :value="item" :text="item" v-for="item in slots" />
          </vs-select>
        </vs-col>

        <vs-col vs-w="1">{{$t('Company.Close')}}</vs-col>
        <vs-col vs-w="3">
          <vs-select  v-model="day.end_time" size="small" :disabled="day.active==0">
            <vs-select-item :key="item" :value="item" :text="item" v-for="item in slots" />
          </vs-select>
        </vs-col>
      </vs-row>

    </vs-card>
  </div>
</template>
<script>

export default {
  name: "WorkingDay",
  data: () => ({
    title: "WorkingDay",
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
  mounted() {
    this.day.start_time = this.day.start_time.substring(0,5);
    this.day.end_time = this.day.end_time.substring(0,5);
  }
};

</script>