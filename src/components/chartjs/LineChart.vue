<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  data() {
    return {
      gradient: null,
      gradient2: null,
      labels: [],
      totalBookings: [],
      totalQueues: [],
    };
  },
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgba(41, 98, 255, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(41, 98, 255, 0.25)");
    this.gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
    this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
    this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");


  },
  methods: {
      renderLineChart(){
          this.data.bookings.forEach((obj) => {
              this.labels.push(obj.day);
              this.totalBookings.push(obj.total);
              /*
              this.totalQueues.push(this.data.queues[index].total);
              if(!this.labels.find(element => element == this.data.queues[index].day)){
                  this.labels.push(this.data.queues[index].day);
              }
               */
          });
          this.renderChart(
              {
                  labels: this.labels,
                  datasets: [
                      {
                          label: "Queue",
                          borderColor: "#2962ff",
                          pointBackgroundColor: "white",
                          borderWidth: 2,
                          backgroundColor: this.gradient,
                          data: this.totalQueues
                      },
                      {
                          label: "Booking",
                          borderColor: "#05CBE1",
                          pointBackgroundColor: "white",
                          borderWidth: 2,
                          backgroundColor: this.gradient2,
                          data: this.totalBookings
                      }
                  ]
              },
              { responsive: true, maintainAspectRatio: false }
          );
      }
  },
  watch: {
    data: {
        handler: function () {
            this.renderLineChart();
        }
    }
  },
  props: {
        data: Object
  }
};
</script>