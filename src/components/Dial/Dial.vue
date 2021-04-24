<template>
    <div class="dial_buttons">
        <form  method="GET" action="" id="phoneNumberForm">
            <input type="hidden" name="phone" id="phoneNumberInput" required>
        </form>
            <div class="row">
                <div class="col">
                    <DialButton name="" theme="default" size="medium" hover="true"></DialButton>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <DialButton name="1" theme="default" size="small" hover="true"></DialButton>
                </div>
                <div class="col">
                    <DialButton name="2" theme="default" size="small" hover="true"></DialButton>
                </div>
                <div class="col">
                    <DialButton name="3" theme="default" size="small" hover="true"></DialButton>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <DialButton name="4" theme="default" size="small" hover="true"></DialButton>
                </div>
                <div class="col">
                    <DialButton name="5" theme="default" size="small" hover="true"></DialButton>
                </div>
                <div class="col">
                    <DialButton name="6" theme="default" size="small" hover="true"></DialButton>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <DialButton name="7" theme="default" size="small" hover="true"></DialButton>
                </div>
                <div class="col">
                    <DialButton name="8" theme="default" size="small" hover="true"></DialButton>
                </div>
                <div class="col">
                    <DialButton name="9" theme="default" size="small" hover="true"></DialButton>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <DialButton name="X" theme="outline" size="small" hover="true"></DialButton>
                </div>
                <div class="col">
                    <DialButton name="0" theme="default" size="small" hover="true"></DialButton>
                </div>
                <div class="col">
                    <DialButton name="<" theme="outline" size="small" hover="true"></DialButton>
                </div>
            </div>
             <div class="row envoyer_sms">
                <div class="col"  v-on:click="submitPhoneNumber()">
                    <DialButton name="Envoyer SMS" theme="outline" size="medium" hover="true"></DialButton>
                </div>
            </div>
            
    </div>
</template>

<script>
import $ from "jquery";

import { defineComponent } from '@vue/composition-api';
import DialButton from '../../components/Dial/DialButton.vue';

export default defineComponent({
    name: "Dial",
    components: {
        DialButton,
    },
    methods:{
        submitPhoneNumber:function(){
            $('#phoneNumberInput').val( $('#DialButton').html() );
            if( $('#DialButton').html().length==8 ){
                $('#phoneNumberForm').submit();
            }
        },
    }
})
</script>

<style scoped>
    .dial_buttons{
        padding: 40px 70px 0px 60px;
    }
    .dial_buttons .col{
        padding: 5px;
    }
    .envoyer_sms{
        margin-top: 36px;
    }
</style>
