<template>
    <div class="dial_buttons dial_buttons_bookings" id="Dial">
            <div class="row">
                <div class="col">
                    <DialButton :name="phoneNumber" :placeholder="$t('New.EnterPhoneNumber')" theme="default" size="medium" hover="true" font="large"></DialButton>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <DialButton name="1" theme="default" size="small" hover="true" @click="dialNumber('1')"></DialButton>
                </div>
                <div class="col">
                    <DialButton name="2" theme="default" size="small" hover="true" @click="dialNumber('2')"></DialButton>
                </div>
                <div class="col">
                    <DialButton name="3" theme="default" size="small" hover="true" @click="dialNumber('3')"></DialButton>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <DialButton name="4" theme="default" size="small" hover="true" @click="dialNumber('4')"></DialButton>
                </div>
                <div class="col">
                    <DialButton name="5" theme="default" size="small" hover="true" @click="dialNumber('5')"></DialButton>
                </div>
                <div class="col">
                    <DialButton name="6" theme="default" size="small" hover="true" @click="dialNumber('6')"></DialButton>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <DialButton name="7" theme="default" size="small" hover="true" @click="dialNumber('7')"></DialButton>
                </div>
                <div class="col">
                    <DialButton name="8" theme="default" size="small" hover="true" @click="dialNumber('8')"></DialButton>
                </div>
                <div class="col">
                    <DialButton name="9" theme="default" size="small" hover="true" @click="dialNumber('9')"></DialButton>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <DialButton name="X" theme="outline" size="small" hover="true" @click="clearInput()" class="filled"></DialButton>
                </div>
                <div class="col">
                    <DialButton name="0" theme="default" size="small" hover="true"  @click="dialNumber('0')"></DialButton>
                </div>
                <div class="col">
                    <DialButton name="<" theme="outline" size="small" hover="true"  @click="deleteInput()" class="filled"></DialButton>
                </div>
            </div>
             <div class="row envoyer_sms" @click="$emit('identified')">
                <div class="col-12 mt-2">
                    <DialButton class="filled submit" :name="$t('New.Book')" theme="outline" size="medium" font="large" hover="true"></DialButton>
                </div>
            </div>
            
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import DialButton from './DialButton.vue';

export default defineComponent({
    name: "Dial",
    props: {
        max_digits: Number,
        value: String,
        printAllowed: Boolean
    },
    components: {
        DialButton,
    },
    data:()=>({
        phoneNumber: ""
    }),
    methods: {
        dialNumber(number){
            if(this.phoneNumber.length < this.max_digits){
                this.phoneNumber = this.phoneNumber + number;
                this.$emit('input', this.phoneNumber);
            }

        },
        clearInput(){
            this.phoneNumber = "";
            this.$emit('input', this.phoneNumber);
        },
        deleteInput(){
            this.phoneNumber = this.phoneNumber.slice(0, -1);
            this.$emit('input', this.phoneNumber);
        },
    }
})
</script>

<style scoped>
     .right-print-button{
        display: none;
    }
    @media screen and (max-width:575px){
        .right-print-button{
            display: block;
        }
    }
    .row{
        margin-bottom: 10px;
    }
    .col{
        border: 1px solid var(--primary);
        border-radius: 5px;
    }
    .filled{
        background: var(--primary);
        border: none;
    }
    .submit{
        margin-top: 0px;
        border-radius: 5px;
    }
</style>
