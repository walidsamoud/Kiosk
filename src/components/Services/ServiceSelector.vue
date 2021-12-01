<template>
    <div class="col" id="ServiceSelector" style="display: flex;min-height: 70px !important;height: 100%;">
        <input ref="cb" type="checkbox" :value="value.id" class="checkbox" :id="'checkbox'+value.id" name="services"/>
        <label 
            :for="'checkbox'+value.id" 
            :id="'label'+value.id" 
            v-on:click="checkService(value.id)" 
            :class="'btn theme-'+theme+' size-'+size+' hover-'+hover"
            style="font-size: 100%;height: 100%;"
            :style="lang=='ar'?'letter-spacing: 0 !important;font-family: Noto Sans Arabic, sans-serif;font-size: 20px;':''"
        > 
                <span style="top: 50%;left: 50%;transform: translate(-50%, -50%);width: 80%;height: 100%;">{{ name }}<small :class="'qte'+value.id" style="display: none;" >&nbsp;(x{{qte}}) &nbsp;</small></span>
        </label>
        <div :class="'plus'+value.id" @click="openQtePopup(value)" class="pluss" :style="'background: '+secondary+'8f;cursor:pointer;width: 50px;height: 70px;text-align: center;font-size: 30px;color: #fff;position: absolute;display:none;right: 15px;'">
            <span style="position:absolute;top:50%;transform: translate(-50%, -50%);">+</span>
        </div>

        <PopupQte :item="popup_qte.item" :message="popup_qte.message" :hint="popup_qte.hint" :title="popup_qte.title" :type="popup_qte.type"
           :confirmationButton="popup_qte.confirmation" :active.sync="popup_qte.active" @confirm="checkService" @close="closeQtePopup">
        </PopupQte>
    </div>
</template>

<script>
    import $ from "jquery";
    import PopupQte from '../popups/PopupServiceQte.vue';

    export default {
        name: 'ServiceSelector',
        data:()=>({
            config: JSON.parse( JSON.parse(localStorage.getItem('kiosk')).kiosk.config ),
            lang: localStorage.getItem('Language'),
            secondary:'#6c757d',
            popup_qte: {
            item: {},
                active: false,
                title: "",
                message: "",
                hint: "",
                type: "",
                confirmation: "",
                callback: 'qteSelected',
            },
            qte: 1
        }),
        components:{
            PopupQte
        },
        props: {
            name: String,
            size: String,
            theme: String,
            hover: String,
            value: Object
        },
        methods:{
            checkService: function(id, qte=1, fromPopup=false){
                this.qte= qte
                
                var checkBox = $(":checkbox[value="+id+"]");
                if( !checkBox.prop('checked') || fromPopup ){
                    $('#label'+id).css("border-left", "15px solid rgba(22, 214, 22, 0.7)");
                    this.$emit("checked",this.value, this.qte);
                    $('.qte'+id).show()
                    $('.plus'+id).show()
                    // if(fromPopup){
                    //     checkBox.prop('checked', true)
                    // }
                }else{
                    $('#label'+id).css("border-left", "15px solid "+this.secondary);
                    this.$emit("unchecked");
                    $('.qte'+id).hide()
                    $('.plus'+id).hide()
                    // if(fromPopup){
                    //     checkBox.prop('checked', false)
                    // }
                }

                
            },
            showPopupQte(item, type, title, message, hint, confirmation, callback){
                this.popup_qte = {
                    item: item, active: true, title: title, message: message, hint: hint, type: type, confirmation: confirmation, callback: callback
                };
            },
            hidePopupQte(){
                this.popup_qte = {active: false, title: "", message: "", hint: "", type: "", confirmation: "", callback: null };
            },
            openQtePopup(item) {
                this.showPopupQte(item, "success", "Confirmation", "", "Combien de fois voulez-vous faire ce service", "Selectionner", this.hidePopupQte);
            },
            closeQtePopup(){
                this.hidePopupQte()
            }
        },
        mounted(){
            this.secondary= (this.config.secondary)?this.config.secondary:'#6c757d'
        }
    }
</script>
<style scoped>

</style>