<template>
  <div>
    <div class="pt-3 text-center">
      <i class="mdi mdi-calendar-check display-4 text-success d-block"></i>
      <span class="display-4 d-block font-medium">{{data.today}}</span>
      <span>{{$t('Components.Widgets.BookingSummary.Confirmed')}}</span>
      <!-- Progress -->
      <vs-progress :percent="100" color="success" class="mt-5">primary</vs-progress>
      <vs-row class="mt-4 mb-3">
        <vs-col vs-lg="4" vs-xs="12" vs-sm="4" class="border-right text-left">
          <h3 class="mb-0 font-medium">{{data.month}}</h3>{{$t('Components.Widgets.BookingSummary.ThisMonth')}}
        </vs-col>
        <vs-col vs-lg="4" vs-xs="12" vs-sm="4" class="border-right">
          <h3 class="mb-0 font-medium">{{data.week}}</h3>{{$t('Components.Widgets.BookingSummary.ThisWeek')}}
        </vs-col>
        <vs-col vs-lg="4" vs-xs="12" vs-sm="4" class="text-right">
          <h3 class="mb-0 font-medium">{{data.pending}}</h3>{{$t('Components.Widgets.BookingSummary.Pending')}}
        </vs-col>
      </vs-row>
      <vs-button color="primary" type="filled" size="large" class="mt-3" to="/bookings">{{$t('Components.Widgets.BookingSummary.MoreDetails')}}</vs-button>
    </div>
  </div>
</template>
<script>


export default {
  name: "QueuesSummary",
  data: () => ({
    title: "QueuesSummary"
  }),
  components: {

  },
  props: {
    data: Object
  }
};
</script>