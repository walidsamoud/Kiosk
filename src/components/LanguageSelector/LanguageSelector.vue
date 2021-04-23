<template>
    <div class="languages row">
        <span class="language active" id="frSpan" >
            <img class="country_flag" src="../../assets/images/fr.png" alt=""> Francais 
            <font-awesome-icon class="caret_left" :icon="['fas', 'caret-left']" /> 
            <font-awesome-icon class="caret_right" :icon="['fas', 'caret-right']" /> 
        </span>
        <span class="separator">|</span>
        <span class="language" id="enSpan" v-on:mouseover="openLanguageSelector('en')">
            <img class="country_flag" src="../../assets/images/en.png" alt=""> English
            <font-awesome-icon class="caret_left" :icon="['fas', 'caret-left']" /> 
            <font-awesome-icon class="caret_right" :icon="['fas', 'caret-right']" /> 
        </span>
        <span class="separator">|</span>
        <span class="language" id="arSpan" v-on:mouseover="openLanguageSelector('ar')">
            <img class="country_flag" src="../../assets/images/tn.png" alt=""> العربية
            <font-awesome-icon class="caret_left" :icon="['fas', 'caret-left']" /> 
            <font-awesome-icon class="caret_right" :icon="['fas', 'caret-right']" /> 
        </span>
    </div>
</template>

<script>
    import $ from "jquery";
    export default {
        name: 'Languages select',
        methods:{
    
            toggleLanguageSelector:function(){
                $('.language:not(.active)').toggle(300);
                $('.separator').toggle(300);

                if( !$('.language:not(.active)').is(':visible') ){
                    alert(0)
                    $('.languages').css("border", "none");
                }
            }
        },
        mounted(){
            // alert('a');
            // this.changeLanguage();
            var self= this;
            $('.active').click(function(){
                self.toggleLanguageSelector();
            })
        }
    }
</script>

<style scoped>
    .languages{
        display: inline-block;
        border: 1px solid #193060;
        border-radius: 40px;
        padding: 10px 15px;
        font-size: 22px;
    }
    .languages span{
        letter-spacing: 2px;
    }
    .language{
        display: none;
        cursor: pointer;
    }
    .separator{
        display: none;
    }
    .country_flag{
        width: 40px;
    }
    .separator{
        padding: 0 25px;
        color: #192f6048;
    }
    .active{
        display: inline;
        background-color: #193060;
        padding: 12px 25px 20px 20px;
        margin-left: -15px;
        margin-right: -32px;
        color: #fff;
        border-radius: 50px;
    }
    .active .caret_right{
        display: inline-block;
    }
    .caret_left, .caret_right{
        margin: -2px;
        margin-left: 10px;
        margin-right: 10px;
    }
    .caret_left{
        display: none;
    }
    
</style>