<template>
  <div class="mt-3">
    <div class="mailbox">
      <vs-alert :active="requests.length == 0" color="warning">
        {{$t('Components.Widgets.BookingRequests.Empty')}}
      </vs-alert>
      <div
        class="message-center overflow-auto position-relative"
        v-for="request in requests"
        :request="request"
        :key="request.notificationtitle"
      >
        <!-- Message -->
        <a
          href="javascript:void(0)"
          class="d-flex align-items-center border-bottom d-block px-3 py-2"
        >
          <vs-button
            radius
            color
            :class="[request.btnbg]"
            type="filled"
            :icon="request.btnicon"
          ></vs-button>
          <div class="mail-contnet d-inline-block w-75 pl-2 align-middle">
            <h6 class="message-title mt-1">{{ request.notificationtitle }}</h6>
            <span
              class="mail-desc d-block text-truncate overflow-hidden text-nowrap text-muted"
            >{{ request.notificationdesc }}</span>
            <span
              class="time d-block text-truncate overflow-hidden text-nowrap text-muted"
            >{{ request.notificationtime }}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "RecentBookingRequests",
  props: {
    comment: Object,
    requests: Array
  },
  data: () => ({
    title: "RecentBookingRequests"
  })
};
</script>