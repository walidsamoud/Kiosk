import Vue from 'vue'
import Vuesax from 'vuesax'
Vue.use(Vuesax, {
  theme:{
    colors:{
      primary:'#49b7ff',
      success:'#36bea6',
      danger:'#f62d51',
      warning:'#ffbc34',
      dark:'#212529'
    }
  }
})


// CONFIGS
const themeConfig = {
  theme: 'light',	               // options: dark and light theme
	logotitle: "Liberrex Business",
	sidebarCollapsed: false,			// options: true (mini-sidebar), false(default)
	topbarColor: "#49b7ff",				// options: anycolor you can use
  themeColor:"#49b7ff"          // options: anycolor you can use
}

export default themeConfig