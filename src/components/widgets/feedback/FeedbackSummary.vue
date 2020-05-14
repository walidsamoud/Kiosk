<template>
  <div>
    <vs-card>
      <div slot="header">
        <span>
          <i class="mdi mdi-star rating-star" :key="index+'-avg-full'" v-for="index in rating"></i>
          <i class="mdi mdi-star-outline rating-star" :key="index+'-avg-empty'" v-for="index in (5-rating)"></i>
          <span>
            <h4 class="float-right font-weight-light rating-average">{{rating}} / 5</h4>
          </span>
        </span>
        <h6 class="font-weight-light">{{$tc('Components.Widgets.FeedbackSummary.TotalText', total, {total: total})}}</h6>
      </div>
      <div>
        <vs-row>
          <vs-col vs-w="12" :key="gindex+'-global'" v-for="(gitem,gindex) in data.labels">
            <span>
              <i class="mdi mdi-star rating-star-small" :key="uindex+'-unique'" v-for="(uitem,uindex) in gindex+1"></i>
              <i class="mdi mdi-star-outline rating-star-small" :key="eindex+'-empty'" v-for="(eitem,eindex) in (5-(gindex+1))"></i>
            </span>
            <span class="float-right text-black-50">
              {{gindex+1}} {{$t('Components.Widgets.FeedbackSummary.Star')}} | {{$t('Components.Widgets.FeedbackSummary.Total')}}: {{data.data[gindex]}}
            </span>
          </vs-col>
        </vs-row>
      </div>
    </vs-card>
  </div>
</template>
<script>

export default {
  name: "FeedbackSummary",
  data: () => ({
    title: "FeedbackSummary",
    passwordUpdateStatus: false
  }),
  props:{
    data: Object,
    rating: Number,
    total: Number,
  },
  mounted() {
  },
  methods: {

  },
  components:{

  }
};
</script>
<style>
  .rating-star{
    color: gold;
    font-size: 32px;
  }
  .rating-star-small{
    color: gold;
    font-size: 24px;
  }
  .rating-average{
    font-size: 46px;
    color:lightgray;
  }
</style>