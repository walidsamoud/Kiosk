<template lang="html">
   <div id="parentx">
    
    <vs-sidebar default-index="1" :parent="parent"  :hiddenBackground="doNotClose" color="primary" class="left-sidebar" spacer v-model="isSidebarActive" :click-not-close="doNotClose" :reduce="isSidebarReduced">
      
      <div class="header-sidebar text-center" slot="header">
        <vs-avatar size="70px" :src="business_info.thumbnail"/>
        <h4>{{business_info.name}}<br/>
          <small>{{business_info.industry}}</small>
        </h4>
      </div>
      
      <div v-bar class="vs-scrollable">
      <div>
      <template v-for="(sidebarLink, index) in sidebarLinks">
        <!-- Small Cap -->
        <span v-if="sidebarLink.title"  :key="index + '.' + index" class="small-cap">{{ $t(sidebarLink.i18n) || sidebarLink.title }}</span>
        <template v-else-if="!sidebarLink.title && isAuthorized(sidebarLink)">
          <!-- Single Menu -->
          <vs-sidebar-item :key="sidebarLink.index" :icon-pack="sidebarLink.icon" :index="sidebarLink.index" v-if="!sidebarLink.child" :to="sidebarLink.url">
            <span class="hide-in-minisidebar">{{ $t(sidebarLink.i18n) || sidebarLink.name }}</span>
          </vs-sidebar-item>
          <!-- Dropdown Menu -->
          <template v-else >
            <vs-sidebar-group :title="$t(sidebarLink.i18n) || sidebarLink.name" :key="sidebarLink.index" :icon-pack="sidebarLink.icon" :open="isSubLinkActive(sidebarLink)">
              <li v-for="(subLink) in sidebarLink.child" :key="subLink.index" v-show="isAuthorized(subLink)">
                  <vs-sidebar-item :icon-pack="subLink.icon" :to="subLink.url" :index="subLink.index">
                    <span class="hide-in-minisidebar">{{ $t(subLink.i18n) || subLink.name }}</span>
                  </vs-sidebar-item>
              </li>
          </vs-sidebar-group>
          <!-- /Dropdown Menu -->  
        </template>
        </template>
         
      </template> 
      </div>
      </div>
      
      <div class="footer-sidebar p-2 text-center" slot="footer">
        <small>Copyright © 2020 - <b>LIBERREX LTD</b></small>
      </div>
      
    </vs-sidebar>

  </div>


</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "SideBar",
  props: {
    parent: {
      type: String
    },
    sidebarLinks: {
      type: Array,
      required: true
    },
    subLink: {
      type: Object
    },
    index: {
      default: null,
      type: [String, Number]
    }
  },
  data: () => ({
    doNotClose: false,
    windowWidth: window.innerWidth,
    round: true
  }),
  computed: {
    ...mapState({
      account_info: state => state.account.user.user,
      business_info: state => state.account.user.business,
    }),
    //This is for mobile trigger
    isSidebarActive: {
      get() {
        return this.$store.state.isSidebarActive;
      },
      set(val) {
        this.$store.commit("IS_SIDEBAR_ACTIVE", val);
      }
    },
    getActive: function getActive() {
      return this.$destroy();
    },
    //This is for mini sidebar
    reduceSidebar() {
      return Boolean(this.isSidebarReduced);
    },
    isSidebarReduced: {
      get() {
        return this.$store.state.isSidebarReduced;
      },
      set(val) {
        this.$store.commit("TOGGLE_REDUCE_SIDEBAR", val);
      }
    },
    //This is for active group link
    isSubLinkActive() {
      return sidebarLink => {
        let open = false;
        if (sidebarLink.child) {
          sidebarLink.child.forEach(link => {
            if (this.$route.fullPath == link.url) {
              open = true;
            }
          });
        }
        
        return open;
      };
    }
  },
  watch: {
    '$route'() {
        if(this.windowWidth < 1170 ) this.$store.commit('IS_SIDEBAR_ACTIVE', false);
    },
  },
  methods: {
    handleWindowResize(event) {
      this.windowWidth = event.currentTarget.innerWidth;
      this.setSidebarWidth();
    },
    setSidebarWidth() {
      if (this.windowWidth < 1170) {
        this.$store.commit("IS_SIDEBAR_ACTIVE", false);
        (this.doNotClose = false),
        this.$store.dispatch("updateSidebarWidth", "no-sidebar");
        
      } else {
        this.$store.commit("IS_SIDEBAR_ACTIVE", true);
        this.doNotClose = true;
        
        if (this.isSidebarReduced)
          this.$store.dispatch("updateSidebarWidth", "mini");
        else this.$store.dispatch("updateSidebarWidth", "default");
      }
    },
    isAuthorized(item) {
      return item.authorize.find((obj) => obj == this.account_info.role) || item.authorize.find((obj) => obj == '*');
}
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.handleWindowResize);
    });
    this.setSidebarWidth();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleWindowResize);
    this.setSidebarWidth();
  }
};
</script>