<template>
  <header class="gridx" id="navbar-box">
    <vs-navbar
      v-model="indexActive"
      :color="topbarColor"
      class="topnavbar"
      text-color="rgba(255,255,255,0.7)"
      active-text-color="rgba(255,255,255,1)"
    >
      <!---
      Template logo
      -->
      <div slot="title" class="themelogo">
        <img :src="logo" v-if="logo" alt="Dashboard" class="logo-icon"/>
        <span v-if="title"><img :src="title" v-if="title" alt="Dashboard" class="logo-text"/></span>
      </div>
      <!---
      Mobile toggle
      -->
      <div slot="title">
        <div class="hiddenDesktop cursor-pointer" @click.stop="activeSidebar">
          <vs-icon icon="menu"></vs-icon>
        </div>
      </div>
      <!---
      Desktop Toggle
      -->
      <div class="hiddenMobile cursor-pointer" @click="reduceSidebar" v-show="!showToggle">
        <vs-icon icon="menu"></vs-icon>
      </div>
      <div class="hiddenMobile cursor-pointer" @click="fullSidebar" v-show="showToggle">
        <vs-icon icon="menu"></vs-icon>
      </div>
      <!---
      Craete new dd
      -->
      <LanguageSelector textstyle="text-light"></LanguageSelector>

      <vs-spacer></vs-spacer>


      <!---
      Search new dd

      <vs-dropdown vs-trigger-click left class="cursor-pointer pr-2 pl-2 ml-1 mr-1">
        <a class="text-white-dark" href="#" href.prevent>
          <vs-icon icon="search"></vs-icon>
        </a>
        <vs-dropdown-menu class="topbar-dd">
          <div class="p-2 m-1">
            <vs-input class placeholder="Search & hit enter" v-model="searchvalue" />
          </div>
        </vs-dropdown-menu>
      </vs-dropdown>
      -->


      <!---
      New mail Dropdown
      -->

      <a href="javascript:;" class="text-white-dark" @click="startTour">
        <vs-icon icon="info"></vs-icon>
      </a>

      <vs-dropdown id="notifications-popup" vs-trigger-click left class="cursor-pointer pr-2 pl-2 ml-1 mr-1">
        <a class="text-white-dark" href="#">
          <vs-icon icon="notifications"></vs-icon>
          <span class="dot-count vs-avatar--count badgeNumber dot-count-danger" v-if="unreadNotifications>0">{{unreadNotifications}}</span>
        </a>
        <vs-dropdown-menu class="topbar-dd common-dd mailbox">

          <div v-bar class="vs-scrollable" style="height: 200px;">
            <div>
              <RecentNotification :notifications="notifications"></RecentNotification>
            </div>
          </div>
          <div>
            <a class="d-block text-center text-dark p-3" href="javascript:void(0);">
              <strong>{{$t('Notifications.SeeAll')}}</strong>
              <vs-icon icon="keyboard_arrow_right" class="ml-1"></vs-icon>
            </a>
          </div>
        </vs-dropdown-menu>
      </vs-dropdown>
      <!---
      New Messages Dropdown

       <vs-dropdown vs-trigger-click left class="cursor-pointer pr-2 pl-2 ml-1 mr-1">
        <a class="text-white-dark" href="#">
          <vs-icon icon="mode_comment"></vs-icon>
          <span class="dot-count vs-avatar--count badgeNumber dot-count-danger">5</span>
        </a>
        <vs-dropdown-menu class="topbar-dd common-dd mailbox">
          <div class="drop-title bg-danger p-3 text-white">
            <h4 class="mb-0 mt-1">5 New</h4>
            <span class="font-light">Messages</span>
          </div>
          <div v-bar class="vs-scrollable" style="height: 200px;">
            <div>
              <RecentMessages></RecentMessages>
            </div>
          </div>
          <div>
            <a class="d-block text-center text-dark p-3" href="javascript:void(0);">
              <strong>Check all messages</strong>
              <vs-icon icon="keyboard_arrow_right" class="ml-1"></vs-icon>
            </a>
          </div>
        </vs-dropdown-menu>
      </vs-dropdown>
      -->

      <!---
      Craete new dd
      -->
      <vs-dropdown id="profile-menu" vs-trigger-click left class="cursor-pointer pr-2 pl-2 ml-1 mr-md-3">
        <a class="text-white-dark user-image" href="#">
          <img :src="account_info.photo > 0 ? account_info.photo : require('@/assets/images/users/1.jpg')" alt="User" />
        </a>
        <vs-dropdown-menu class="user-dd common-dd topbar-dd">
          <div class=" bg-dark text-white">
            <div class="d-flex align-items-center p-3 bg-dark text-white mb-2">
              <div class>
                <img
                  :src="account_info.photo > 0 ? account_info.photo : require('@/assets/images/users/1.jpg')"
                  alt="user"
                  class="rounded-circle"
                  width="60"
                />
              </div>
              <div class="ml-2">
                <h4 class="mb-0 text-white">{{account_info.fname}} {{account_info.lname}}</h4>
                <p class="mb-0">
                  <small>{{account_info.email}}</small>
                </p>
              </div>
            </div>

            <vs-dropdown-item to="/profile">
              <vs-icon icon="person_outline" class="mr-1"></vs-icon>
              {{$t('Navbar.MyProfile')}}
            </vs-dropdown-item>

            <vs-dropdown-item @click="handleLogout">
              <vs-icon icon="logout" class="mr-1"></vs-icon>
              {{$t('Navbar.Logout')}}
            </vs-dropdown-item>

          </div>
        </vs-dropdown-menu>
      </vs-dropdown>
    </vs-navbar>
  </header>
</template>

<script>
//import RecentMessages from "../../../views/widgets/other-widgets/recent-messages/RecentMessages";
import RecentNotification from "../../../views/widgets/other-widgets/recent-notifications/RecentNotifications";
import LanguageSelector from "../../../components/language/LanguageSelector";
import { mapState } from 'vuex'
import { notificationService } from '../../../_services'
import {notificationPlay} from '../../../_helpers'
import router from "../../../_helpers/router";
import { mapActions } from 'vuex'

export default {
  name: "Navbar",
  props: {
    topbarColor: {
      type: String,
      default: "#02A3DE"
    },
    title: {
      type: String
    },
    logo: {
      type: String
    },
    // Obj for Userdropdown
    user: Object
  },
  data: () => ({
    indexActive: 0,
    showToggle: false,
    searchvalue: "",
    // Data For User Dropdown
    users: [
      {
        img: "/3.jpg",
        name: "Steave Jobs",
        email: "varun@gmail.com",
        dditem1: "My Profile",
        dditem2: "My Balance",
        dditem3: "Inbox",
        dditem4: "Account Setting"
      }
    ],
    // Notifications
    notifications: [],
    unreadNotifications: 0,
  }),

  methods: {
    ...mapActions('account', ['logout']),
    notify(title, text, type, icon='notifications') {
      this.$vs.notify({
        color: type,
        title: title,
        text: text,
        icon: icon,
        time: 5000
      });
      notificationPlay();
      this.getNotificationsPerPage(1);
    },
    startTour() {
      if(router.currentRoute.path !== '/dashboard'){
        router.push({ path: "/dashboard" }).then(() => {
          localStorage.setItem('skipTour','false');
          this.$tours['Dashboard'].start();
        });
      } else {
        localStorage.setItem('skipTour','false');
        this.$tours['Dashboard'].start();
      }

    },
    //This is for sidebar trigger in mobile
    activeSidebar() {
      this.$store.commit("IS_SIDEBAR_ACTIVE", true);
    },
    //This is for sidebar trigger in Desktop
    reduceSidebar() {
      this.$store.commit("TOGGLE_REDUCE_SIDEBAR", true);
      this.$store.dispatch("updateSidebarWidth", "mini");
      this.showToggle = true;
    },
    fullSidebar() {
      this.$store.commit("TOGGLE_REDUCE_SIDEBAR", false);
      this.$store.dispatch("updateSidebarWidth", "default");
      this.showToggle = false;
    },
    subscribeToPusher () {
      // Channel
      this.$pusher.subscribe('private-business-'+this.business_info.id);
      // Queue Request Events
      this.$pusher.bind('queue-request-created', function () { this.notify(this.$t('Notifications.Pusher.QueueRequest.Created.Title'), this.$t('Notifications.Pusher.QueueRequest.Created.Text'), 'primary'); }.bind(this));
      this.$pusher.bind('queue-request-deleted', function () { this.notify(this.$t('Notifications.Pusher.QueueRequest.Deleted.Title'), this.$t('Notifications.Pusher.QueueRequest.Deleted.Text'), 'primary'); }.bind(this));
      // Booking Request Events
      this.$pusher.bind('booking-request-created', function () { this.notify(this.$t('Notifications.Pusher.BookingRequest.Created.Title'), this.$t('Notifications.Pusher.BookingRequest.Created.Text'), 'primary'); }.bind(this));
      this.$pusher.bind('booking-request-deleted', function () { this.notify(this.$t('Notifications.Pusher.BookingRequest.Deleted.Title'), this.$t('Notifications.Pusher.BookingRequest.Deleted.Text'), 'primary'); }.bind(this));
      // Queue Ticket Events
      this.$pusher.bind('ticket-created', function () {  this.notify(this.$t('Notifications.Pusher.Ticket.Created.Title'), this.$t('Notifications.Pusher.Ticket.Created.Text'), 'primary');  }.bind(this));
      this.$pusher.bind('ticket-deleted', function () { this.notify(this.$t('Notifications.Pusher.Ticket.Deleted.Title'), this.$t('Notifications.Pusher.Ticket.Deleted.Text'), 'primary'); }.bind(this));
      // Booking Events
      this.$pusher.bind('booking-created', function () {  this.notify(this.$t('Notifications.Pusher.Booking.Created.Title'), this.$t('Notifications.Pusher.Booking.Created.Text'), 'primary');  }.bind(this));
      this.$pusher.bind('booking-deleted', function () { this.notify(this.$t('Notifications.Pusher.Booking.Deleted.Title'), this.$t('Notifications.Pusher.Booking.Deleted.Text'), 'primary'); }.bind(this));
    },
    unsubscribeFromPusher () {
      this.$pusher.unsubscribe('private-business-'+this.business_info.id);
      //this.$pusher.unbind('new_notification')
    },
    goToPage(url){
      this.$router.push(url);
    },
    getNotificationsPerPage(page){
      notificationService.getPage(page).then(function (data) {
        this.unreadNotifications = data.unread;
        if(data.notifications.data.length == 0){
          this.notifications.push({
            notificationtitle: "No Notifications",
            notificationdesc: "Just see the my new admin!"
          });
          return;
        }
        this.notifications = data.notifications.data;

      }.bind(this))
    },
    handleLogout(){
      this.$vs.loading({
        container: '#navbar-box',
        scale: 0.6
      });
      this.logout().then(function () {
        this.$router.push('/login');
      }.bind(this)).finally(function () {
        this.$vs.loading.close('#navbar-box > .con-vs-loading');
      }.bind(this));
    }
  },
  computed: {
    ...mapState({
      account_info: state => state.account.user.user,
      business_info: state => state.account.user.business,
    })
  },
  components: {
    //RecentMessages,
    RecentNotification,
    LanguageSelector
  },
  created(){
    this.subscribeToPusher();
  },
  beforeDestroy(){
    this.unsubscribeFromPusher();
  },
  mounted() {
    this.getNotificationsPerPage(1);
  }
};
</script>
