<template>
    <div class="dial_buttons">
            <div class="row">
                <div class="col">
                    <DialButton :name="phoneNumber" theme="default" size="medium" hover="true" font="large"></DialButton>
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
                    <DialButton name="X" theme="outline" size="small" hover="true" @click="clearInput()"></DialButton>
                </div>
                <div class="col">
                    <DialButton name="0" theme="default" size="small" hover="true"  @click="dialNumber('0')"></DialButton>
                </div>
                <div class="col">
                    <DialButton name="<" theme="outline" size="small" hover="true"  @click="deleteInput()"></DialButton>
                </div>
            </div>
             <div class="row envoyer_sms">
                <div class="col">
                    <DialButton name="Envoyer SMS" theme="outline" size="medium" hover="true" @click="$emit('submit')"></DialButton>
                </div>
            </div>
            
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import DialButton from '../../components/Dial/DialButton.vue';

export default defineComponent({
    name: "Dial",
    props: {
        max_digits: Number,
    },
    components: {
        DialButton,
    },
    data:()=>({
        phoneNumber: ""
    }),
    methods: {
        dialNumber(number){
            if(this.phoneNumber.length < this.max_digits)
                this.phoneNumber = this.phoneNumber + number;
        },
        clearInput(){
            this.phoneNumber = "";
        },
        deleteInput(){
            this.phoneNumber = this.phoneNumber.slice(0, -1);
        },
    }
})
</script>

<style scoped>
    .dial_buttons{
        padding: 40px 70px 0px 60px;
        max-width: 550px;
        margin: auto;
    }
    .dial_buttons .col{
        padding: 5px;
    }
    .envoyer_sms{
        margin-top: 36px;
    }
</style>
