<template>
  <div id="lang-box" style="position: absolute; right: 0px; top: 10px;">
    <ul style="display: inline-flex; list-style: none;">
      <li class="mr-4" @click="changeLanguage('ar')">
          <img :src="require('@/assets/images/flags/flag-tn.png')" style="max-height: 48px"/>
      </li>
      <li class="mr-4" @click="changeLanguage('fr')">
        <img :src="require('@/assets/images/flags/flag-fr.png')" style="max-height: 48px"/>
      </li>
      <li class="mr-4" @click="changeLanguage('en')">
        <img :src="require('@/assets/images/flags/flag-uk.png')" style="max-height: 48px"/>
      </li>

    </ul>
    <vs-dropdown vs-trigger-click class="cursor-pointer ml-md-4" v-if="false">
      <a class="small-icon font-weight-light font-12" :class="textStyle" href="#">
        <i class="mdi mdi-earth"></i> {{getCurrentLanguage.lang}}
        <vs-icon icon="expand_more"></vs-icon>
      </a>
      <vs-dropdown-menu class="topbar-dd">
        <vs-dropdown-item @click="changeLanguage('en')">English</vs-dropdown-item>
        <vs-dropdown-item @click="changeLanguage('fr')">Français</vs-dropdown-item>
        <vs-dropdown-item @click="changeLanguage('es')">Española</vs-dropdown-item>
        <vs-dropdown-item @click="changeLanguage('pt')">Portugues</vs-dropdown-item>
        <vs-dropdown-item @click="changeLanguage('de')">Deutsche</vs-dropdown-item>
        <vs-dropdown-item @click="changeLanguage('ru')">Русский</vs-dropdown-item>
        <vs-dropdown-item @click="changeLanguage('ar')">العريية</vs-dropdown-item>
        <!-- <vs-dropdown-item @click="changeLanguage('he')">עברי</vs-dropdown-item> -->
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>
<script>
export default {
  name: "LanguageSelector",
  data: () => ({
    title: "LanguageSelector",
  }),
  props: {
    textstyle: String
  },
  methods: {
    changeLanguage(locale) {
      this.$i18n.locale = locale;
      localStorage.setItem('Language', locale);
      //location.reload(true);
    },
  },
  computed: {
    getCurrentLanguage() {
      const locale = this.$i18n.locale;
      if (locale == "en") return { lang: "English" };
      else if (locale == "fr") return { lang: "Français" };
      else if (locale == "es") return { lang: "Española" };
      else if (locale == "pt") return { lang: "Portugues" };
      else if (locale == "de") return { lang: "Deutsche" };
      else if (locale == "ru") return { lang: "Русский" };
      else if (locale == "ar") return { lang: "العريية" };
      return this.locale;
    },
    textStyle(){
      return this.textstyle ? this.textstyle : 'text-dark';
    }
  },
};
</script>