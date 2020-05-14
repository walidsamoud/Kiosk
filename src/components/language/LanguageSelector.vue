<template>
  <div id="lang-box">
    <vs-dropdown vs-trigger-click class="cursor-pointer ml-md-4">
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
      this.showLoading();
      this.$i18n.locale = locale;
      localStorage.setItem('Language', locale);
      location.reload(true);
    },
    showLoading(){
      this.$vs.loading({
        container: '#lang-box',
        scale: 0.6
      });
    }
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
      else if (locale == "he") return { lang: "עברי" };
      return this.locale;
    },
    textStyle(){
      return this.textstyle ? this.textstyle : 'text-dark';
    }
  },
};
</script>