
<template>
    <div id="Booking">
        <div class="row" v-if="kiosk_config.multi_language && kiosk_config.multi_language!='false' && step<4">
            <div class="col language_select" style="margin: 10px 25px -10px 25px !important;">
            <LbrxLanguageSelector @change="refreshLang"></LbrxLanguageSelector>
            </div>
        </div>
        <div class="booking-div box departments" v-if="step == 0" style="padding-top: 30px;">
            <div class="title" v-if="!selecting_member">
                {{$t('New.ChooseDepartment')}}
            </div>
            <div class="title" v-else>
                {{$t('New.ChooseMember')}}
            </div>
            <div class="row" v-if="!selecting_member">
                <div class="department" v-for="dep in kiosk.business.departments" :key="'dep'+dep.id" @click="selectDepartment(dep.id, dep.services, dep.dep_members)">
                    <div class="content">
                        <div class="icon">
                            <font-awesome-icon class="building" :icon="['fas', 'building']" /> 
                        </div>
                        <span>{{dep.name}}</span>
                    </div>
                </div>
            </div>
            <div class="row" v-else>
                <div class="department" v-for="member in dep_members" :key="'member'+member.id" @click="selectMember(member.id, member.booking_days)">
                    <div class="content">
                        <div class="icon">
                            <font-awesome-icon class="building" :icon="['fas', 'building']" /> 
                        </div>
                        <span>{{member.fname}} {{member.lname}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="booking-div box" v-if="step == 1" style="padding-top: 30px;">
            <div class="row dates">
                <div class="top-date col-lg-12  col-md-12 col-sm-12">
                    <span class="year">{{year}}</span>
                    <span class="month">{{fullMonth}}</span>
                </div>
                <div class="flesh left-flesh" v-if="today>today_fixed && today!=today_fixed" @click="goToLeft()">
                    <img src="/left-chevron.png" alt="">
                </div>
                <div class="flesh left-flesh" v-else style="opacity: .3;cursor: not-allowed;">
                    <img src="/left-chevron.png" alt="">
                </div>
                <div class="flesh right-flesh" @click="goToRight()">
                    <img src="/right-chevron.png" alt="">
                </div>
                <div class="col-lg-2  col-md-2 col-sm-4">
                    <div :class="(selected_date==today?'date selected':'date')+' '+(dayIsOpen(today)?'date-open':'date-closed')" @click="selectDate(today)">
                        <span class="numberr">{{dayNumber(today)}}</span>
                        <span class="name">{{dayName(today)}}</span>
                    </div>
                </div>
                <div class="col-lg-2  col-md-2 col-sm-4">
                    <div :class="(selected_date==tomorrow?'date selected':'date')+' '+(dayIsOpen(tomorrow)?'date-open':'date-closed')" @click="selectDate(tomorrow)">
                        <span class="numberr">{{dayNumber(tomorrow)}}</span>
                        <span class="name">{{dayName(tomorrow)}}</span>
                    </div>
                </div>
                <div class="col-lg-2  col-md-2 col-sm-4">
                    <div :class="(selected_date==after_tomorrow?'date selected':'date')+' '+(dayIsOpen(after_tomorrow)?'date-open':'date-closed')" @click="selectDate(after_tomorrow)">
                        <span class="numberr">{{dayNumber(after_tomorrow)}}</span>
                        <span class="name">{{dayName(after_tomorrow)}}</span>
                    </div>
                </div>
                <div class="col-lg-2  col-md-2 col-sm-4">
                    <div :class="(selected_date==after_tomorrow2?'date selected':'date')+' '+(dayIsOpen(after_tomorrow2)?'date-open':'date-closed')" @click="selectDate(after_tomorrow2)">
                        <span class="numberr">{{dayNumber(after_tomorrow2)}}</span>
                        <span class="name">{{dayName(after_tomorrow2)}}</span>
                    </div>
                </div>
                <div class="col-lg-2  col-md-2 col-sm-4">
                    <div :class="(selected_date==after_tomorrow3?'date selected':'date')+' '+(dayIsOpen(after_tomorrow3)?'date-open':'date-closed')" @click="selectDate(after_tomorrow3)">
                        <span class="numberr">{{dayNumber(after_tomorrow3)}}</span>
                        <span class="name">{{dayName(after_tomorrow3)}}</span>
                    </div>
                </div>
                <div class="col-lg-2  col-md-2 col-sm-4">
                    <div :class="(selected_date==after_tomorrow4?'date selected':'date')+' '+(dayIsOpen(after_tomorrow4)?'date-open':'date-closed')" @click="selectDate(after_tomorrow4)">
                        <span class="numberr">{{dayNumber(after_tomorrow4)}}</span>
                        <span class="name">{{dayName(after_tomorrow4)}}</span>
                    </div>
                </div>
               
            </div>
            <hr>
            <div  class="row slots">
                <div v-if="already_have_booking && already_have_booking.length" style="text-align: center;width: 100%;">
                    <span class="text-danger" style="font-size: 15px;">Vous avez déja un rendez-vous pour <b>{{already_have_booking[0].start_datetime}}</b></span>
                </div>
                <div v-else v-for="slot in slots" :key="slot.id" style="width: 20%;">
                        <div :class="slot.slot==selected_slot?'slot selected':'slot'"  v-if="slot.active" @click="selectSlot(slot.slot)">
                            <span>{{slot.slot}}</span>
                        </div>
                        <div :class="'slot disabled'"  v-else>
                            <span>{{slot.slot}}</span>
                        </div>
                </div>
                
                <div v-if="!selected_date && slots.length==0 && !loading_slots" style="text-align: center;width: 100%;font-size: 15px;">
                    Choisissez une date
                </div>
                <div v-if="selected_date && slots.length==0 && !loading_slots" style="text-align: center;width: 100%;">
                    <span style="font-size: 15px;">{{$t('New.NoSlots')}}</span>
                    <!-- <span class="btn btn-danger closed">Fermé</span> -->
                </div>
                <div v-if="selected_date && slots.length==0 && loading_slots" style="text-align: center;width: 100%;">
                    <img src="/loader-circle.gif" alt="" style="width: 30px;padding: 20px 0 10px 0;">
                </div>

                <!-- <div class="button mt-4" v-if="selected_slot" style="width: 100%;">
                    <button class="btn btn-info" @click="confirmDate()">Confirmer la date</button>
                </div> -->
            </div>
        </div>

        <div  class="box" id="step_2" v-if="step == 2">
            <div class="date-booking">
                <div class="day" style="letter-spacing: 1px;">
                    {{dayFullName(selected_date)}}, {{dayNumber(selected_date)}} {{fullMonth}} {{year}} {{selected_slot}}
                </div>
            </div>
                <div class="text-center">
                    <h4 class="font-weight-light ttext-dark mt-1 font">{{$t('Kiosk.App.SelectServices')}}</h4>
                </div>
                <div class="row services mt-5" vs-type="">
                    <form id="servicesForm" class="container services_container" method="GET" action="Booking" :style="(kiosk_config.multi_language && kiosk_config.multi_language!='false')?'':'max-height: 65vh !important;'">
                        <div class="row">
                            <div class="col-md-3" v-if="kiosk.business.services.length==1"></div>
                            <div 
                                :class="kiosk.business.services.length>=6?'col-md-4 service':'col-md-6 service'" 
                                v-for="
                                    (item, key) in selected_department_services.length?selected_department_services:kiosk.business.services.map((service)=>{
                                        service.title = service.translations?JSON.parse(service.translations)[this.$i18n.locale]:service.title;
                                        return service;
                                    })
                                " 
                                :key="key"
                            >
                                <LbrxService 
                                            :name="item.title" size="small" theme="small" hover="false"
                                            :value="item" @checked="addSelection" @unchecked="removeSelection(item)" 
                                >
                                </LbrxService>
                                <!-- v-long-press="3000" @long-press-start="openQtePopup(item)" -->
                            </div>

                        </div>
                    </form>
                </div>
        </div>

        <div class="row dial" id="step_3" v-if="step == 3">
            <div :class="'col-md-12 col-sm-12 rightSide'">
                <div class="container text-center">
                    <h5 class="right_header">{{$t('New.EnterPhoneNumber')}}</h5>
                </div>

                <div class="dialDiv" style="width: 100%;text-align: center;">
                    <LbrxDialBooking v-model="user.phone_number" @identified="findCustomerByPhoneNumber" :max_digits="8" style="text-align: center;"></LbrxDialBooking>
                </div>
            </div>
        </div>

        <div class="row identification" id="step_4" v-if="step == 4">
            <div class="col-md-6 col-sm-12 left">
                <div class="title">
                    {{$t('New.WelcomeTo')}} {{kiosk.business.name}}<br>
                </div>
                <div class="subtitle">
                    {{$t('New.ClientDoesntExist')}}
                </div>

                <div class="infos">
                    <div class="row">
                        <div class="col inputSpan">
                            {{user.phone_number && user.phone_number.length?user.phone_number:$t('New.EnterPhoneNumber')}}
                        </div>
                    </div>
                    <div class="row" @click="KeyBoardOptingFor='fname'">
                        <div class="col inputSpan">
                            {{user.fname && user.fname.length?user.fname:$t('New.EnterYourFirstName')}}
                            <img src="/right-chevron.png" alt="" v-if="KeyBoardOptingFor!='lname'">
                        </div>
                    </div>
                    <div class="row" @click="KeyBoardOptingFor='lname'">
                        <div class="col inputSpan">
                            {{user.lname && user.lname.length?user.lname:$t('New.EnterYourLastName')}}
                            <img src="/right-chevron.png" alt="" v-if="KeyBoardOptingFor=='lname'">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-sm-12 right">
                <KeyBoard :optingFor="KeyBoardOptingFor" @KeyboardKeyUp="KeyboardKeyUp"/>
            </div>
        </div>

        <div class="row bottom-btns">
            <div class="col">
                <LbrxButton :name="step>=0?$t('Ticket.Return'):''" size="medium" :theme="step>1?'dark':'dark'" hover="false" href="#" @click="step>0?step--:$emit('optedFor', null);selected_slot=null" v-long-press="3000" @long-press-start="onLongPressStart"></LbrxButton>
            </div>
            <div class="col">
                <LbrxButton name="" size="medium" theme="dark" hover="false" href="#"></LbrxButton>
            </div>
            <div class="col" v-on:click="reserver()">
                <LbrxButton 
                    :name="step==2 || step==4?$t('New.Book'):''"
                    size="medium" :theme="step==2 || step==4?'light':'dark'" hover="true" href="javascript:;">
                </LbrxButton>
            </div>
        </div>

        <Popup :message="popup.message" :hint="popup.hint" :title="popup.title" :type="popup.type"
            :confirmationButton="popup.confirmation" :active.sync="popup.active" @confirm="popup.callback ? popup.callback : hidePopup()">
        </Popup>

        <LoadingPopup :active="loading.active" :message="loading.message"></LoadingPopup>
    </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/es'

import {bookingService, kioskService} from '../../_services'
import LbrxLanguageSelector from '../LanguageSelector/LanguageSelector.vue';
import LbrxButton from '../buttons/Button.vue';
import LongPress from 'vue-directive-long-press';
import LbrxService from '../Services/BookingServiceSelector.vue';
import Popup from '../popups/Popup.vue';
import LoadingPopup from "../popups/Loading";
import LbrxDialBooking from '../Dial/DialBooking.vue';
import KeyBoard from '../KeyBoard/Index.vue';
export default({
    data:()=>({
        step: 0,
        selected_date: moment().format('DD MMM YYYY'),
        today_fixed: moment().format('DD MMM YYYY'),
        today: moment().format('DD MMM YYYY'),
        tomorrow: moment().add(1, 'days').format('DD MMM YYYY'),
        after_tomorrow: moment().add(2, 'days').format('DD MMM YYYY'),
        after_tomorrow2: moment().add(3, 'days').format('DD MMM YYYY'),
        after_tomorrow3: moment().add(4, 'days').format('DD MMM YYYY'),
        after_tomorrow4: moment().add(5, 'days').format('DD MMM YYYY'),
        slots: [],
        selected_slot: null,
        loading_slots: false,
        selected_services: [],
        already_have_booking: [],

        kiosk: JSON.parse(localStorage.getItem('kiosk')),
        kiosk_config: JSON.parse( JSON.parse(localStorage.getItem('kiosk')).kiosk.config ),

        selected_department: null,
        selectedServices: [],

        dep_members: [],
        selected_member: null,
        selecting_member: false,
        available_dates: [],

        popup: {
            active: false,
            title: "",
            message: "",
            hint: "",
            type: "",
            confirmation: "",
            callback: null,
        },

        loading: {
            active: false,
            message: ""
        },

        user: {
            phone_number: '',
            countryPrefix: '+216',
            fname: '',
            lname: ''
        },
        countryIso: "TN",
        KeyBoardOptingFor: null
    }),
    directives: {
        'long-press': LongPress
    },
    methods:{
        dayIsOpen(date){
            if(this.available_dates.length){
                let dayOfWeek = moment(date, 'DD MMM YYYY').isoWeekday();
                return this.available_dates[dayOfWeek-1].active
            }else{
                return true
            }
        },
        refreshLang(){
            this.selected_department_services = this.selected_department_services.map((service)=>{
                service.title = service.translations?JSON.parse(service.translations)[this.$i18n.locale]:service.title;
                return service;
            })

            moment.locale('fr')
        },
        reserver(){
            if(this.step==2){
                this.identify()
            }else{
                this.createNewCustomer()
            }
        },
        KeyboardKeyUp(clickedChar){
            if(this.KeyBoardOptingFor=='lname'){
                if(clickedChar=='Space'){
                    this.user.lname += ' '
                }else if(clickedChar=='*'){
                    this.user.lname = ''
                }else if(clickedChar=='<'){
                    this.user.lname = this.user.lname.substr(0, this.user.lname.length-1)
                }else{
                    this.user.lname += clickedChar
                }
            }else{
                if(clickedChar=='Space'){
                    this.user.fname += ' '
                }else if(clickedChar=='*'){
                    this.user.fname = ''
                }else if(clickedChar=='<'){
                    this.user.fname = this.user.fname.substr(0, this.user.fname.length-1)
                }else{
                    this.user.fname += clickedChar
                }
            }
        },
        selectDepartment(dep_id, dep_services, dep_members){
            this.selected_department = dep_id
            this.selected_department_services = dep_services.map((service)=>{
                service.title = service.translations?JSON.parse(service.translations)[this.$i18n.locale]:service.title;
                return service;
            })

            this.dep_members = dep_members
            if(this.dep_members.length==1){
                this.selected_member = this.dep_members[0].id
                this.step = 1
                this.available_dates = this.dep_members[0].booking_days
                this.selectDate(this.selected_date)
            }else if(this.dep_members.length==0){
                this.step = 1
                this.selectDate(this.selected_date)
            }else{
                this.selecting_member = true
            }
        },
        selectMember(member_id, available_dates){
            this.selected_member = member_id
            this.selecting_member = false
            this.step = 1
            this.selectDate(this.selected_date)

            this.available_dates = available_dates
        },
        showLoading(message){
            this.loading = {
                active: true,
                message: message
            };
        },
        hideLoading(){
            this.loading = { active: false,  message: "" };
        },
        addSelection(item, qte=1){
            this.removeSelection(item)
            item.qte= qte
            console.log(item)
            this.selectedServices.push(item);
        },
        removeSelection(item){
            let filteredServices = this.selectedServices.filter(function (obj) {
                return obj.id != item.id;
            });
            this.selectedServices = filteredServices;
        },
        retourr(){
            this.step--
            if(this.step == 0){
                this.$emit('backHome')
            }
        },
        refresh(){
            this.$router.go()
        },
        identify(){
            if(this.selectedServices.length){
                this.step++
            }else{
                this.showPopup("danger", "Ouups!", "Un problème est survenu", "Veuillez sélectionner au moins un service pour continuer", "Fermer", this.hidePopup);
            }
        },
        findCustomerByPhoneNumber(){
            if(this.user.phone_number.length==8){
                this.showLoading(this.$t('Popup.PhoneChecking'));
                let payload = {
                    phone_number: this.user.phone_number,
                    internal_id: null,
                    country_prefix: '+216'
                }
                kioskService.findCustomerByPhoneNumber(payload).then(function (data) {
                    if(data.customer.length == 0) {
                        this.requestName();
                        this.hideLoading();
                    } else {
                        this.user = data.customer[0];
                        this.bookAppointment();
                    }

                }.bind(this)).catch(function () {
                    this.requestName();
                    // this.createNewCustomer();
                }.bind(this)).finally(function () {
                }.bind(this))
            }
        },
        requestName(){
            this.step++
        },
        createNewCustomer(){
            this.showLoading("Nous créons un nouveau compte pour vous");
            let payload = {
                phone_number: this.user.phone_number,
                country_prefix: this.user.countryPrefix,
                country: this.countryIso,
                fname: this.user.fname,
                lname: this.user.lname,
                email: "",
                internal_id: this.internal_id,
            }
            kioskService.createCustomer(payload).then(function (data) {
                if(data.customer != null) {
                    this.customer = data.customer;
                    this.bookAppointment();
                }
            }.bind(this)).catch(function () {

            }.bind(this)).finally(function () {
                this.hideLoading();
            }.bind(this))
        },
        bookAppointment(){
            if(this.user.id == null){
                this.findCustomerByPhoneNumber();
            } else {
                this.showLoading(this.$t('Popup.LoadingMessage'));

                let services = this.selectedServices.map(function (obj) { return obj.id; }).join(',')
                var duration = 0
                this.selectedServices.map(function (obj) { 
                    duration += obj.duration
                    return obj.id; 
                })
                let start =
                    this.$moment(this.selected_date, 'DD MMM YYYY').format("YYYY-MM-DD") +
                    " " +
                    this.selected_slot;

                let date = this.$moment(this.selected_slot, "HH:mm").add(duration, "minutes").format("HH:mm");
                let end = this.$moment(this.selected_date, 'DD MMM YYYY').format("YYYY-MM-DD") + " " + date;
                
                let data = { 
                    services: services, 
                    business_id: this.kiosk.kiosk.business_id,
                    department_id: this.selected_department,
                    member_id: null,
                    start_datetime: start,
                    end_datetime: end,
                    method: '_PUT',
                    user_id: this.user.id,
                };
                console.log(data)

                kioskService.createBooking(data).then(function(){
                    this.showPopup("success",this.$t('Popup.Congratulations'),this.$t('New.BookingSuccessTitle'), this.$t('Popup.BookingSuccess'), this.$t('Popup.Close'), this.hidePopup);
                    setTimeout(function (){
                        this.$router.go()
                    }.bind(this), 3000);
                }.bind(this)).catch(function(){
                  this.showPopup("danger", "Ouups!", this.$t('Popup.AProblemOccured'), this.$t('New.BookingFailure'), this.$t('Popup.Close'), this.hidePopup);
                }.bind(this)).finally(function(){
                    this.hideLoading();
                }.bind(this))
            }
        },
        confirmDate(){
            this.step= 2
        },
        selectSlot(slot){
            this.selected_slot= slot
            this.step= 2
        },
        goToRight(){
            this.today= moment(this.today, 'DD MMM YYYY').add(1, 'days').format('DD MMM YYYY');
            this.tomorrow= moment(this.tomorrow, 'DD MMM YYYY').add(1, 'days').format('DD MMM YYYY');
            this.after_tomorrow= moment(this.after_tomorrow, 'DD MMM YYYY').add(1, 'days').format('DD MMM YYYY');
            this.after_tomorrow2= moment(this.after_tomorrow2, 'DD MMM YYYY').add(1, 'days').format('DD MMM YYYY');
            this.after_tomorrow3= moment(this.after_tomorrow3, 'DD MMM YYYY').add(1, 'days').format('DD MMM YYYY');
            this.after_tomorrow4= moment(this.after_tomorrow4, 'DD MMM YYYY').add(1, 'days').format('DD MMM YYYY');
        },
        goToLeft(){
            this.today= moment(this.today, 'DD MMM YYYY').subtract(1, 'days').format('DD MMM YYYY');
            this.tomorrow= moment(this.tomorrow, 'DD MMM YYYY').subtract(1, 'days').format('DD MMM YYYY');
            this.after_tomorrow= moment(this.after_tomorrow, 'DD MMM YYYY').subtract(1, 'days').format('DD MMM YYYY');
            this.after_tomorrow2= moment(this.after_tomorrow2, 'DD MMM YYYY').subtract(1, 'days').format('DD MMM YYYY');
            this.after_tomorrow3= moment(this.after_tomorrow3, 'DD MMM YYYY').subtract(1, 'days').format('DD MMM YYYY');
            this.after_tomorrow4= moment(this.after_tomorrow4, 'DD MMM YYYY').subtract(1, 'days').format('DD MMM YYYY');
        },
        selectDate(date){
            if(this.dayIsOpen(date)){
                this.selected_date= date
                this.loading_slots= true
                this.slots= []
                this.selected_slot= null
                this.already_have_booking= []

                let data= {
                    // business_id: this.Vendor.id,
                    business_id: this.kiosk.kiosk.business_id,
                    date: moment(this.selected_date, 'DD MMM YYYY').format('YYYY-MM-DD'),
                    department: this.selected_department,
                    selected_member: this.selected_member,
                    user: null,
                }
                
                bookingService.getAvailability(data).then(function(data){
                    console.log(data)
                    this.slots= data.slots
                    this.already_have_booking= data.already_have_booking.map((obj)=>{
                        obj.start_datetime= moment(obj.start_datetime).format('dddd, DD MMMM YYYY à HH:mm')
                        return obj
                    })
                }.bind(this)).finally(function(){
                    this.loading_slots= false
                }.bind(this))
            }
        },
        dayNumber(date) {
            return moment(date, 'DD MMM YYYY').format('DD')
        },
        dayName(date) {
            return moment(date, 'DD MMM YYYY').format('ddd')
        },
        dayFullName(date) {
            return moment(date, 'DD MMM YYYY').format('dddd')
        },
        onLongPressStart () {
            localStorage.removeItem('kiosk')
            this.$router.push('/login')
        },
        showPopup(type, title, message, hint, confirmation, callback){
            this.popup = {
                active: true, title: title, message: message, hint: hint, type: type, confirmation: confirmation, callback: callback
            };
        },
        hidePopup(){
            this.popup = {active: false, title: "", message: "", hint: "", type: "", confirmation: "", callback: null };
        },
    },
    mounted(){
        moment.locale('fr')
        if(this.kiosk.business.departments.length==1){
            this.selected_department = this.kiosk.business.departments[0].id
            this.selected_department_services = this.kiosk.business.departments[0].services.map((service)=>{
                service.title = service.translations?JSON.parse(service.translations)[this.$i18n.locale]:service.title;
                return service;
            })
            this.step = 1
            this.selectDate( moment().format('DD MMM YYYY') )
        }
    },
    computed: {
        year: function () {
            return moment(this.selected_date, 'DD MMM YYYY').format('YYYY')
        },
        month: function () {
            return moment(this.selected_date, 'DD MMM YYYY').format('MMM')
        },
        fullMonth: function () {
            return moment(this.selected_date, 'DD MMM YYYY').format('MMMM')
        },
    },
    components:{
        LbrxLanguageSelector,
        LbrxButton,
        LbrxService,
        Popup,
        LoadingPopup,
        LbrxDialBooking,
        KeyBoard
    }
})
</script>

<style scoped lang="scss">
#Booking{
position: relative;
height: 100vh;
.dial{
    margin-top: 20%;
    transform: translate(0, -50%);
}
.box{
    width: 100%;
    background: #fff;
    padding: 50px;
    margin-bottom: 20px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
}
.booking-div{
    text-align: center;
    padding: 50px;
}
.btn-primary{
    border-radius: 5px;
    height: 35px;
}
.btn-info{
    background: var(--primary);
    width: 100%;
    border: none;
    border-radius: 5px;
    font-size: 15px;
}
.dates{
    position: relative;
    transition: .5s;
}
.dates .date{
    font-size: 18x;
    font-weight: bold;
    cursor: pointer;
    padding: 5px 10px;
    width: 100%;
    text-align: center;
    border-radius: 5px;
    position: relative;
    transition: .5s;
    padding-bottom: 15px;
    letter-spacing: 1px;
    color: #333;
}
.dates .date .numberr{
    display: block;
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-left: 50%;
    transform: translate(-50%);
    border-radius: 0;
    letter-spacing: 1px;
    color: #333;
}
.dates .selected{
    background: var(--primary);
    .numberr{
        color: #fff !important;
    }
    color: #fff !important;
}
.flesh{
    position: absolute;
    font-weight: 900;
    background: var(--primary);
    font-size: 20px;
    padding: 5px;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    transition: .5s;
    width: 70px;
    height: 70px;
    padding-bottom: 5px;
    padding-top: 17px;
    img{
        width: 20px;
    }
}
.left-flesh{
    left: 10px;
}
.right-flesh{
    right: 10px;
}
.flesh:hover{
    background: var(--secondary);
}
.year{
    text-align: center;
}
.slots{
    display: flex;
    text-align: center;
    width: 100%;
}
.slots .slot{
    padding: 15px 10px;
    border: 1px solid var(--primary);
    margin-left: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
    transition: .5s;
    text-align: center;
    width: 90%;
    font-size: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    cursor: pointer;
    color: var(--primary);
}
.selected{
    background: var(--primary);
    color: #fff !important;
}
.disabled{
    background: rgba(255, 0, 0, 0.05);
    color: red;
    border: 1px solid red !important;
}
.top-date{
    padding: 0 0 10px 0;
}
.top-date .year{
    font-size: 25px;
    font-weight: bold;
    display: block;
    color: var(--primary);
}
.top-date .month{
    font-size: 20px;
    color: var(--primary);
}
.btn-danger{
    border-radius: 5px;
    width: 100%;
}
.date-booking{
    width: 100%;
    text-align: center;
    font-weight: bold;
    margin-bottom: 20px;
}
.date-booking .day{
    font-size: 25px;
    color: var(--primary);
}
.date-booking .month{
    font-size: 20px;
}
.btn-return{
    background: red;
    border-radius: 5px;
    color: #fff;
    padding: 5px 20px;
    font-size: 15px;
}

.departments{
    margin-top: 30px;
    .title{
        font-size: 17px;
        letter-spacing: 2px;
        color: #333;
    }
    .row{
        display: flex;
        justify-content: center;
        .department{
            margin-top: 30px;
            width: 25%;
            padding: 10px;
            .content{
                width: 100%;
                border: 1px solid var(--primary);
                position: relative;
                padding: 30px;
                border-radius: 5px;
                cursor: pointer;
                transition: .3s;
                height: 100%;
                .icon{
                    display: none;
                    margin-bottom: 40px;
                    .building{
                        font-size: 22px;
                        color: var(--primary);
                    }
                }
                span{
                    color: var(--primary);
                    letter-spacing: 1px;
                    font-size: 18px;
                }
            }
            .content:hover{
                background: var(--primary);
                .icon{
                    .building{
                        color: #fff !important;
                    }
                }
                span{
                    color: #fff !important;
                }
            }
        }
    }
}
.identification{
    height: 100vh;
    .left{
        text-align: center;
        padding: 50px;
        .title{
            font-size: 20px;
            letter-spacing: 2px;
        }
        .subtitle{
            font-size: 17px;
            letter-spacing: 1px;
            margin-top: 20px;
        }
        .infos{
            margin-top: 50px;
            .row{
                margin-bottom: 20px;
                .inputSpan{
                    background: linear-gradient(to right, var(--primary), var(--secondary)) ;
                    color: var(--info);
                    padding: 20px;
                    border-radius: 10px !important;
                    img{
                        width: 20px;
                        float: right;
                        margin-right: 10px;
                    }
                }
            }
        }
    }
    .right{
        background: linear-gradient(to right, var(--secondary), var(--primary)) ;
        color: var(--font);
    }
}
.date-closed{
    background: rgba(255, 0, 0, 0.05);
    color: red;
    border: 1px solid red !important;
}
}
</style>