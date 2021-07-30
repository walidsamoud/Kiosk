<template>
    <div class="languages row" id="LanguageSelector">
        <span class="language active selected" id="frSpan" >
            <img class="country_flag" :src="selectedLanguage.flag" alt=""> <span class="language-name"> {{selectedLanguage.label}} </span>
            <font-awesome-icon class="caret_left" :icon="['fas', 'caret-left']" /> 
            <font-awesome-icon class="caret_right" :icon="['fas', 'caret-right']" /> 
        </span>

        <span v-for="(item, index) in selectableLanguages" :key="index">
            <span class="separator">|</span>
            <span  class="language" id="enSpan" @click="selectLanguageCallback(item.code)">
                <img class="country_flag" :src="item.flag" alt=""> <span class="language-name"> {{item.label}} </span>
                <font-awesome-icon class="caret_left" :icon="['fas', 'caret-left']" />
                <font-awesome-icon class="caret_right" :icon="['fas', 'caret-right']" />
            </span>
        </span>

    </div>
</template>

<script>
    let flagFr = require("@/assets/images/fr.png");
    let flagTn = require("@/assets/images/tn.png");
    let flagEn = require("@/assets/images/en.png");
    import $ from "jquery";
    export default {
        name: 'LanguageSelector',
        data:()=>({
            languageSelectorVisible: false,
            languages: [
                {label: "English", flag: flagEn, code: "en", selected: false},
                {label: "Français", flag: flagFr, code: "fr", selected: false},
                {label: "العربية", flag: flagTn, code: "ar", selected: false}
            ],
            selectedLanguage: {
                label: "", flag: null, code: "", selected: true
            },
            config: JSON.parse( JSON.parse(localStorage.getItem('kiosk')).kiosk.config )
        }),
        methods:{
            toggleLanguageSelector:function(){
                $('.language:not(.active)').toggle(500);
                $('.separator').toggle(500);
                this.languageSelectorVisible= !this.languageSelectorVisible;
                if( !this.languageSelectorVisible ){
                    //$('.languages').css("border", "none");
                    $('.active .caret_left').css("display", "none");
                    $('.active .caret_right').css("display", "inline");
                    $('.active').addClass("selected");
                }else{
                    $('.languages').css("border", "1px solid "+this.config.primary);
                    $('.active .caret_left').css("display", "inline");
                    $('.active .caret_right').css("display", "none");
                    $('.active').removeClass("selected");
                }
            },
            selectLanguageCallback:function (code) {
               localStorage.setItem("Language", code);
                this.$i18n.locale = code;
                this.languages.forEach(function (language) {
                    if(language.code == code){
                        this.selectedLanguage = language;
                        language.selected = true;
                    } else {
                        language.selected = false;
                    }
                }.bind(this))
                this.$emit("change");
               this.toggleLanguageSelector();
            }
        },
        mounted(){
            var self= this;
            $('.active').click(function(){
                self.toggleLanguageSelector();
            });

            this.languages.forEach(function (language) {
                if(language.code == this.selectedLanguageCode){
                    this.selectedLanguage = language;
                    language.selected = true;
                }
            }.bind(this))
        },
        computed: {
            selectedLanguageCode(){
                return localStorage.getItem("Language") ? localStorage.getItem("Language") : "en";
            },
            selectableLanguages(){
                return this.languages.filter(function (obj) {
                    return obj.selected != true;
                })
            }
        }
    }
</script>

<style scoped>
    
</style>