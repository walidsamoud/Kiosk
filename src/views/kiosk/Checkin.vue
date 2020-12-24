<template>
    <div>
        <vs-card class="mb-0 full-height login-box" id="checkin-box" fixedHeight :style="background">
            <div slot="header" id="header">
                <h3 class="mb-1">{{kiosk_info.business.name}}
                    <div class="float-right" v-if="step > 0 || bookStep > 0">
                        <LanguageSelector></LanguageSelector> 
                    </div>
                </h3>
            </div>
            <div>
                <div class="p-5" v-if="start" :style="card_color ? card_color : 'background-color: #fff'">
                    <div id="step_0" style="margin-left: auto;margin-right: auto;display: table;">
                        <div>
                            <vs-row style="margin-left: auto;margin-right: auto;display: table;">
                                <h2 :style="text_color == '' ? 'text-align: center;color: black;': 'text-align: center;' +text_color">{{$t('Kiosk.Language')}}</h2>
                            </vs-row>
                            <vs-row style="margin-left: auto;margin-right: auto;display: table;" v-if="!ipadVertical">
                                <ul class="ml-5 mt-5" style="display: inline-flex; list-style: none;">
                                    <li class="mr-5" @click="changeLanguage('ar')">
                                        <img :src="require('@/assets/images/flags/flag-tn.png')" style="max-height: 150px"/>
                                    </li>
                                    <li class="mr-5" @click="changeLanguage('fr')">
                                        <img :src="require('@/assets/images/flags/flag-fr.png')" style="max-height: 150px"/>
                                    </li>
                                    <li class="mr-5" @click="changeLanguage('en')">
                                        <img :src="require('@/assets/images/flags/flag-uk.png')" style="max-height: 150px"/>
                                    </li>
                                </ul>
                            </vs-row>
                            <vs-row style="margin-left: auto;margin-right: auto;display: table;" v-if="ipadVertical">
                                <ul class="ml-5 mt-4" style="list-style: none;">
                                    <li class="mr-5">
                                        <button class="btn btn-lg btn-primary mb-2 mt-2 w-100 footer-button" @click="changeLanguage('ar')">
                                            {{$t('Languages.Arabic')}}
                                        </button>
                                    </li>
                                    <li class="mr-5">
                                        <button class="btn btn-lg btn-primary mt-2 mb-2 w-100 footer-button" @click="changeLanguage('fr')">
                                            {{$t('Languages.French')}}
                                        </button>
                                    </li>
                                    <li class="mr-5">
                                        <button class="btn btn-lg btn-primary mt-2 mb-2 w-100 footer-button" @click="changeLanguage('en')">
                                            {{$t('Languages.English')}}
                                        </button>
                                    </li>
                                </ul>
                            </vs-row>
                        </div>
                        <div>
                            <vs-row class="mt-5 mb-4" >
                                <h3 :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.Ticket.ScanQRCheckin')}}</h3>
                            </vs-row> 
                            <vs-row style="margin-left: auto;margin-right: auto;display: table;">
                                <vs-col>
                                    <qrcode-vue renderAs="svg" :value="chekinQrCode" size="200"></qrcode-vue>
                                </vs-col>
                            </vs-row>
                        </div>
                    </div>
                </div>
                <div class="p-5" v-if="pick" :style="card_color ? card_color : 'background-color: #fff'">
                    <div>
                    <vs-row class="mt-4 border border-light p-4">
                        <vs-col vs-w="6" class="mt-4">
                            <vs-button class="btn btn-lg mt-2 w-100 footer-button" type="border" color="success" icon="directions_walk" @click="startQueue">
                                <i class="fa fa-walk"></i>{{$t('Kiosk.App.JoinWaitingList')}}
                            </vs-button>
                        </vs-col>

                        <vs-col vs-w="6" class="mt-4">
                            <vs-button class="btn btn-lg mt-2 w-100 footer-button" type="border" icon="today" color="danger" @click="startBook">
                                {{$t('Kiosk.App.BookNow')}}
                            </vs-button>
                        </vs-col>
                    </vs-row>
                    </div>
                    <div style="margin-left: auto;margin-right: auto;display: table;">
                        <div>
                            <vs-row class="mt-5 mb-4" >
                                <h3 :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.Ticket.ScanQRCheckin')}}</h3>
                            </vs-row> 
                            <vs-row style="margin-left: auto;margin-right: auto;display: table;">
                                <vs-col>
                                    <qrcode-vue renderAs="svg" :value="chekinQrCode" size="200"></qrcode-vue>
                                </vs-col>
                            </vs-row>
                        </div>
                    </div>
                </div>    
            </div>
            <div>
                <div class="steps-container w-100 row no-gutters justify-content-between align-items-center" v-if="kiosk_info.kiosk.login_required == 0 && step > 0">
                    <div class="step row no-gutters col justify-content-center align-items-center"
                            v-for="(s, index) in steps"
                            v-bind:class="{ disabled: index > stepper }"
                            :key="s">
                        <div class="bullet row justify-content-center align-items-center">
                            <vs-icon icon="done" v-if="index < stepper || stepper === s.length - 1"
                                        size="1x"
                                        class="check-icon"></vs-icon>
                            <div v-else>{{ index + 1 }}</div>
                        </div>
                        <div class="title col-12">
                            {{ s }}
                        </div>
                        <div class="line"
                            v-if="index < steps.length - 1"
                            v-bind:class="{ disabled: index === stepper }">
                        </div>
                    </div>
                </div>
                <div class="steps-container w-100 row no-gutters justify-content-between align-items-center" v-if="kiosk_info.kiosk.login_required == 1 && step > 0">
                    <div class="step row no-gutters col justify-content-center align-items-center"
                            v-for="(s, index) in stepsLogin"
                            v-bind:class="{ disabled: index > step - 1 }"
                            :key="s">
                        <div class="bullet row justify-content-center align-items-center">
                            <vs-icon icon="done" v-if="index < step - 1 || step - 1 === s.length - 1"
                                        size="1x"
                                        class="check-icon"></vs-icon>
                            <div v-else>{{ index + 1 }}</div>
                        </div>
                        <div class="title col-12">
                            {{ s }}
                        </div>
                        <div class="line"
                            v-if="index < steps.length + 1"
                            v-bind:class="{ disabled: index === step - 1 }">
                        </div>
                    </div>
                </div>
                

                <div class="p-5" :style="card_color ? card_color : 'background-color: #fff'">
                    
                    <div id="bookStep_1" v-if="bookStep == 1" :style="card_color ? card_color : 'background-color: #fff'">
                        <h2 class="font-weight-light text-uppercase mt-5" :style="text_color == '' ? 'color: black;': text_color">{{$t('Kiosk.App.ChooseDepartment')}}</h2>
                        <vs-row class="mt-5">
                            <vs-col vs-w="12" class="mt-4" :key="'department_'+index" v-for="(item,index) in kiosk_info.business.departments">
                                <vs-radio class="selector-checkbox-sm" :vs-value="item" v-model="selectedDepartment">
                                      &nbsp;{{item.name}}
                                </vs-radio>
                            </vs-col>
                        </vs-row>
                    </div>

                    <div id="bookStep_2" v-if="bookStep == 2" :style="card_color ? card_color : 'background-color: #fff'">
                        <h2 class="font-weight-light text-uppercase mt-1" :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.SelectServices')}}</h2>
                        <vs-row class="mt-5" vs-type="flex">
                            <div v-for="(item,index) in kiosk_info.business.services" :key="'service_'+index" class="d-flex mt-4">
                                <vs-checkbox class="selector-checkbox-sm" :vs-value="item" v-model="selectedBookServices">
                                    {{item.title}}
                                </vs-checkbox>
                            </div>
                        </vs-row>
                    </div>

                    <div id="bookStep_3" v-if="bookStep == 3" :style="card_color ? card_color : 'background-color: #fff'">
                        <div class="booking-schedule schedule-widget">		
                            <!-- Schedule Header -->
                            <div class="schedule-header">
                                <vs-row>
                                    <div class="col-md-12">
                                    
                                        <!-- Day Slot -->
                                        <div class="day-slot vs-con-loading__container" id="daySlot">
                                            <ul>
                                                <li class="left-arrow">
                                                    <a>
                                                        <vs-icon @click="getPreviousWeekDays" icon="keyboard_arrow_left" color="#BC1254"></vs-icon>
                                                    </a>
                                                </li>
                                                <li :key="'day_'+index" v-for="(item,index) in weekdays">
                                                    <vs-button type="border" :color="new Date(item.toJSON()).toUTCString().substring(0,17) == new Date().toUTCString().substring(0,17) ? 'danger': 'primary'" @click="getAvailableSlots(item)" >
                                                        <span v-if="$moment.locale() == 'ar-tn'">{{$moment(item).format("dddd")}}</span>
                                                        <span v-else>{{$moment(item).format("dddd").substring(0,3)}}</span>
                                                        
                                                        <span class="slot-date" v-if="$moment.locale() == 'ar-tn'">
                                                            {{$moment(item).format("MMMM DD")}}
                                                            <small class="slot-year">{{$moment(item).format("YYYY")}}</small>
                                                        </span>
                                                        <span class="slot-date" v-else>
                                                            {{$moment(item).format("DD MMMM").substring(0,6)}}
                                                            <small class="slot-year">{{$moment(item).format("YYYY")}}</small>
                                                        </span>
                                                    </vs-button>
                                                </li>
                                                <li class="right-arrow">
                                                    <a>
                                                        <vs-icon @click="getNextWeekDays" icon="keyboard_arrow_right" color="#BC1254"></vs-icon>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <!-- /Day Slot -->
                                        
                                    </div>
                                </vs-row>
                            </div>
                            <!-- /Schedule Header -->

                            <!-- Schedule Content -->
                            <div class="schedule-cont">
                                <vs-row>
                                    <div class="col-md-12">
                                    <h2 v-if="breakDay" class="font-weight-light text-danger text-uppercase mt-4 text-center" :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.BreakDay')}}</h2>
                                        <!-- Time Slot -->
                                        <div class="time-slot vs-con-loading__container" id="timeSlot">
                                            <ul class="clearfix">
                                                <li v-for="(item,index) in availableTimeSlots" :key="index" class="mb-1">
                                                    <a :class="item.slot == bookingSlot ? 'timing selected': 'timing'">
                                                        <input
                                                        :disabled="!item.active"
                                                        type="radio"
                                                        v-model="bookingSlot"
                                                        name="timeslot"
                                                        :value="item.slot"
                                                        :id="'timeslot-'+index"
                                                        style="display: none;"
                                                    />
                                                    <label v-if="!item.active" :for="'timeslot-'+index">
                                                        <strike>{{item.slot}}</strike>
                                                    </label>
                                                    <label
                                                        class="time-slot-inactive"
                                                        v-if="item.active"
                                                        :for="'timeslot-'+index"
                                                    >{{item.slot}}</label>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <!-- /Time Slot -->
                                        
                                    </div>
                                </vs-row>
                            </div>
                            <!-- /Schedule Content -->
                            
                        </div>
                    </div>
                    
                    <div id="bookStep_4" v-if="bookStep == 4" :style="card_color ? card_color : 'background-color: #fff'">
                        <h2 class="font-weight-light text-uppercase mt-5" :style="text_color == '' ? 'color: black;': text_color">{{$t('Kiosk.App.EnterPhone')}}</h2>
                        <input class="w-100 mb-4 mt-4 kiosk-input vs-input-large" :class="errors.phone ? 'kiosk-input-error' : ''"
                            :placeholder="phoneNumberMask" v-model="phone_number" type="phone"
                                @focus="showKeyboardNumerical('phone')" ref="phone"
                        />

                        <h2 v-if="kiosk_info.kiosk.require_internal_id == 1" class="font-weight-light text-uppercase mt-4" :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.EnterInternalId')}}</h2>
                        <input v-if="kiosk_info.kiosk.require_internal_id == 1" class="w-100 mb-4 mt-4 kiosk-input vs-input-large" :class="errors.internal_id ? 'kiosk-input-error' : ''"
                            placeholder="IID/001" v-model="internal_id" type="text"
                            @focus="showKeyboardAlphaNumerical('internal_id')" ref="internal_id"
                        />
                    </div>

                    <div id="bookStep_5" v-if="bookStep == 5" :style="card_color ? card_color : 'background-color: #fff'">
                        <h1 class="font-weight-light text-uppercase mt-4" :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.MoreDetailsText')}}</h1>
                        <vs-row>
                            <vs-col vs-w="6">
                                <input class="w-100 mb-4 mt-4 kiosk-input vs-input-large" @focus="showKeyboardAlphaNumerical('fname')"
                                    :placeholder="$t('Kiosk.App.FirstNamePlaceholder')" v-model="fname" type="text"/>
                            </vs-col>
                            <vs-col vs-w="6">
                                <input class="w-100 mb-4 mt-4 kiosk-input vs-input-large" @focus="showKeyboardAlphaNumerical('lname')"
                                    :placeholder="$t('Kiosk.App.LastNamePlaceholder')" v-model="lname" type="text"/>
                            </vs-col>
                            <vs-col vs-w="12">
                                <input class="w-100 mb-4 mt-4 kiosk-input vs-input-large" @focus="showKeyboardAlphaNumerical('email')"
                                    :placeholder="$t('Kiosk.App.EmailPlaceholder')" v-model="email" type="email"/>
                            </vs-col>
                        </vs-row>
                    </div>

                    <div id="bookStep_6" v-if="bookStep == 6" :style="card_color ? card_color : 'background-color: #fff'">
                        <h2 class="font-weight-light text-uppercase mt-4" :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.AlmostDone')}}</h2>
                        <h3 class="font-weight-light text-uppercase mt-1" :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.VerifyData')}}</h3>
                        <vs-row class="mt-4 border border-light p-4">

                            <vs-col vs-w="12" v-if="customer.fname">
                                <h4 :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.FullName')}}: <span class="font-weight-light">{{customer.fname}} {{customer.lname}}</span></h4>
                            </vs-col>
                            <vs-col vs-w="12" class="mt-4">
                                <h4 :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.PhoneNumber')}}: <span class="font-weight-light">{{phone_number}}</span></h4>
                            </vs-col>
                            <vs-col vs-w="12" class="mt-4">
                                <h4 :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.Department')}}: <span class="font-weight-light">{{selectedDepartment.name}}</span></h4>
                            </vs-col>
                            <vs-col vs-w="12" class="mt-4">
                                <h4 :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.SelectedServices')}}: <span class="font-weight-light">{{selectedBookServicesNames}}</span></h4>
                            </vs-col>
                            <vs-col vs-w="12" class="mt-4">
                                <h4 :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.BookingDate')}}: <span class="font-weight-light">{{this.$moment(this.bookingDate).format("DD MMMM YYYY")}}</span></h4>
                            </vs-col>
                            <vs-col vs-w="12" class="mt-4">
                                <h4 :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.BookingHour')}}: <span class="font-weight-light">{{bookingSlot}}</span></h4>
                            </vs-col>
                            <vs-col vs-w="12" class="mt-4">
                                <h4 :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.Duration')}}: <span class="font-weight-light">{{duration}}</span></h4>
                            </vs-col>
                            <!-- <vs-col vs-w="12" class="mt-4">
                                <h4 :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.Price')}}: <span class="font-weight-light">{{price}}</span></h4>
                            </vs-col> -->
                            <vs-col vs-w="12" v-if="errors.push" class="mt-4 p-2 error-message" :style="text_color == '' ? 'color: black;':text_color">
                                <h4>{{$t('Kiosk.App.PushError')}}</h4>
                            </vs-col>

                            <vs-col vs-w="12" class="mt-4" v-if="customer.id">
                                <button class="btn btn-lg btn-success mt-2 w-100 footer-button" @click="requestToBook">
                                    {{$t('Kiosk.App.ConfirmButton')}}
                                </button>
                            </vs-col>

                        </vs-row>
                    </div>

                    <div id="bookStep_7" v-if="bookStep == 7" :style="card_color ? card_color : 'background-color: #fff'">
                        <h2 class="font-weight-light text-uppercase mt-4" :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.AllDoneBook')}}</h2>
                        <vs-row class="mt-4">
                            <vs-col vs-w="12" class="mt-4">
                                <button class="btn btn-lg btn-success mt-2 w-100 footer-button" @click="startAgain">
                                    {{$t('Kiosk.App.StartAgainButton')}}
                                </button>
                            </vs-col>
                        </vs-row>
                    </div>




                    <div id="step_1" v-if="step == 1" :style="card_color ? card_color : 'background-color: #fff'">
                        <h2 class="font-weight-light text-uppercase mt-5" :style="text_color == '' ? 'color: black;': text_color">{{$t('Kiosk.App.EnterPhone')}}</h2>
                        <input class="w-100 mb-4 mt-4 kiosk-input vs-input-large" :class="errors.phone ? 'kiosk-input-error' : ''"
                            :placeholder="phoneNumberMask" v-model="phone_number" type="phone"
                                @focus="showKeyboardNumerical('phone')" ref="phone"
                        />

                        <h2 v-if="kiosk_info.kiosk.require_internal_id == 1" class="font-weight-light text-uppercase mt-4" :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.EnterInternalId')}}</h2>
                        <input v-if="kiosk_info.kiosk.require_internal_id == 1" class="w-100 mb-4 mt-4 kiosk-input vs-input-large" :class="errors.internal_id ? 'kiosk-input-error' : ''"
                            placeholder="IID/001" v-model="internal_id" type="text"
                            @focus="showKeyboardAlphaNumerical('internal_id')" ref="internal_id"
                        />
                    </div>

                    <div id="step_2" v-if="step == 2" :style="card_color ? card_color : 'background-color: #fff'">
                        <h1 class="font-weight-light text-uppercase mt-4" :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.MoreDetailsText')}}</h1>
                        <vs-row>
                            <vs-col vs-w="6">
                                <input class="w-100 mb-4 mt-4 kiosk-input vs-input-large" @focus="showKeyboardAlphaNumerical('fname')"
                                    :placeholder="$t('Kiosk.App.FirstNamePlaceholder')" v-model="fname" type="text"/>
                            </vs-col>
                            <vs-col vs-w="6">
                                <input class="w-100 mb-4 mt-4 kiosk-input vs-input-large" @focus="showKeyboardAlphaNumerical('lname')"
                                    :placeholder="$t('Kiosk.App.LastNamePlaceholder')" v-model="lname" type="text"/>
                            </vs-col>
                            <vs-col vs-w="12">
                                <input class="w-100 mb-4 mt-4 kiosk-input vs-input-large" @focus="showKeyboardAlphaNumerical('email')"
                                    :placeholder="$t('Kiosk.App.EmailPlaceholder')" v-model="email" type="email"/>
                            </vs-col>
                        </vs-row>
                    </div>

                    <div id="step_3" v-if="step == 3" :style="card_color ? card_color : 'background-color: #fff'">
                        <h2 v-if="customer.fname" class="font-weight-light text-uppercase mt-4" :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.HelloCustomer', {customer: customer.fname+' '+customer.lname})}}</h2>
                        <h3 class="font-weight-light text-uppercase mt-1" :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.ChooseWaitingList')}}</h3>
                        <vs-row class="mt-5">
                            <vs-col vs-w="12" class="mt-4" :key="'queue_'+index" v-for="(item,index) in queues">
                                <vs-radio class="selector-checkbox-sm" :vs-value="item" v-model="selectedQueue">
                                    {{item.queue.title}}
                                    <span class="float-right">
                                    | <i class="mdi mdi-clock"></i> {{waitingTimeFormated(item.waiting_time)}}
                                    | <i class="mdi mdi-account-multiple"></i> {{item.totalWaiting}}
                                </span>
                                </vs-radio>
                            </vs-col>
                        </vs-row>
                    </div>

                    <div id="step_4" v-if="step == 4" :style="card_color ? card_color : 'background-color: #fff'">
                        <h2 v-if="customer.fname" class="font-weight-light text-uppercase mt-4" :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.HelloCustomer', {customer: customer.fname+' '+customer.lname})}}!</h2>
                        <h3 class="font-weight-light text-uppercase mt-1" :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.SelectServices')}}</h3>
                        <vs-row class="mt-5" vs-type="flex">
                            <div v-for="(item,index) in selectedQueue.services" :key="'service_'+index" class="d-flex mt-4">
                                <vs-checkbox class="selector-checkbox-sm"  :vs-value="item" v-model="selectedServices">
                                    {{item.title}}
                                </vs-checkbox>
                            </div>
                        </vs-row>
                    </div>

                    <div id="step_5" v-if="step == 5" :style="card_color ? card_color : 'background-color: #fff'">
                        <h2 v-if="customer.fname" class="font-weight-light text-uppercase mt-4" :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.HelloCustomer', {customer: customer.fname+' '+customer.lname})}}!</h2>
                        <h3 class="font-weight-light text-uppercase mt-1" :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.SelectEmployee')}}</h3>
                        <vs-row class="mt-3" vs-type="flex">

                            <div v-for="(item,index) in selectedQueue.queue.members" :key="'member_'+index" class="d-flex mt-4" style="position: relative">
                                <vs-radio :class="selectedMember == item ? 'employee-radio employee-active' : 'employee-radio'"  :vs-value="item" v-model="selectedMember">
                                    <div class="text-center">
                                        <img :src="item.photo ? item.photo : require('@/assets/images/users/1.jpg')" style="width: 100%; height: 150px"/>
                                        <p class="mb-0 p-3">
                                            {{item.fname}} {{item.lname}}
                                        </p>
                                    </div>
                                </vs-radio>
                                <div class="employee-unselect-button" @click="unselectMember" v-if="selectedMember == item">
                                    <i class="mdi mdi-close"></i>
                                </div>
                            </div>

                        </vs-row>
                    </div>

                    <div id="step_6" v-if="step == 6" :style="card_color ? card_color : 'background-color: #fff'">
                        <h2 class="font-weight-light text-uppercase mt-4" :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.AlmostDone')}}</h2>
                        <h3 class="font-weight-light text-uppercase mt-1" :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.VerifyData')}}</h3>
                        <vs-row class="mt-4 border border-light p-4">

                            <vs-col vs-w="12" v-if="customer.fname">
                                <h4 :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.FullName')}}: <span class="font-weight-light">{{customer.fname}} {{customer.lname}}</span></h4>
                            </vs-col>
                            <vs-col vs-w="12" class="mt-4" v-if="kiosk_info.kiosk.login_required == 1">
                                <h4 :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.PhoneNumber')}}: <span class="font-weight-light">{{phone_number}}</span></h4>
                            </vs-col>
                            <vs-col vs-w="12" class="mt-4">
                                <h4 :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.WaitingList')}}: <span class="font-weight-light">{{selectedQueue.queue.title}}</span></h4>
                            </vs-col>
                            <vs-col vs-w="12" class="mt-4">
                                <h4 :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.SelectedServices')}}: <span class="font-weight-light">{{selectedServicesNames}}</span></h4>
                            </vs-col>
                            <vs-col vs-w="12" class="mt-4" v-if="selectedMember">
                                <h4 :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.SelectedMember')}}: <span class="font-weight-light">{{selectedMember.fname}} {{selectedMember.lname}}</span></h4>
                            </vs-col>

                            <vs-col vs-w="12" v-if="errors.push" class="mt-4 p-2 error-message" :style="text_color == '' ? 'color: black;':text_color">
                                <h4>{{$t('Kiosk.App.PushError')}}</h4>
                            </vs-col>

                            <vs-col vs-w="12" class="mt-4" v-if="customer.id">
                                <button class="btn btn-lg btn-success mt-2 w-100 footer-button" @click="joinQueue">
                                    {{$t('Kiosk.App.ConfirmButton')}}
                                </button>
                            </vs-col>

                            <vs-col vs-w="6" class="mt-4" v-if="!customer.id">
                                <button class="btn btn-lg btn-success mt-2 w-100 footer-button" @click="joinQueue">
                                    {{$t('Kiosk.App.JoinGuest')}}
                                </button>
                            </vs-col>

                            <vs-col vs-w="6" class="mt-4" v-if="!customer.id">
                                <button class="btn btn-lg btn-danger mt-2 w-100 footer-button" @click="step = 9">
                                    {{$t('Auth.Login')}}
                                </button>
                            </vs-col>

                        </vs-row>
                    </div>


                    <div id="step_7" v-if="step == 7" :style="card_color ? card_color : 'background-color: #fff'">
                        <h2 class="font-weight-light text-uppercase mt-4" :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.AllDoneBook')}}</h2>
                        <vs-row class="mt-4">
                            <vs-col vs-w="12" class="mt-4">
                                <button class="btn btn-lg btn-success mt-2 w-100 footer-button" @click="startAgain">
                                    {{$t('Kiosk.App.StartAgainButton')}}
                                </button>
                            </vs-col>
                        </vs-row>
                    </div>


                    <div id="step_8" v-if="step == 8" :style="card_color ? card_color : 'background-color: #fff'">
                        <h2 class="font-weight-light text-uppercase mt-4" :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.RequestAssistanceTitle')}}</h2>
                        <h3 class="font-weight-light text-uppercase mt-1" :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.RequestAssistanceText')}}</h3>
                        <vs-row class="mt-4">
                            <vs-col vs-w="12" class="mt-4">
                                <button class="btn btn-lg btn-success mt-2 w-100 footer-button" @click="startAgain">
                                    {{$t('Kiosk.App.StartAgainButton')}}
                                </button>
                            </vs-col>
                        </vs-row>
                    </div>

                    <div id="step_9" v-if="step == 9" :style="card_color ? card_color : 'background-color: #fff'">
                        <h2 class="font-weight-light text-uppercase mt-5" :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.EnterPhone')}}</h2>
                            <input class="w-100 mb-4 mt-4 kiosk-input vs-input-large" :class="errors.phone ? 'kiosk-input-error' : ''"
                                :placeholder="phoneNumberMask" v-model="phone_number" type="phone"
                                    @focus="showKeyboardNumerical('phone')" ref="phone"
                            />

                        <h2 v-if="kiosk_info.kiosk.require_internal_id == 1" class="font-weight-light text-uppercase mt-4" :style="text_color == '' ? 'color: black;':text_color">{{$t('Kiosk.App.EnterInternalId')}}</h2>
                        <input v-if="kiosk_info.kiosk.require_internal_id == 1" class="w-100 mb-4 mt-4 kiosk-input vs-input-large" :class="errors.internal_id ? 'kiosk-input-error' : ''"
                            placeholder="IID/001" v-model="internal_id" type="text"
                            @focus="showKeyboardAlphaNumerical('internal_id')" ref="internal_id"
                        />
                    </div>
                </div>
                <img src="https://liberrex.com/wp-content/uploads/2020/09/logo-1.png" style="margin-top: 3%; max-height: 40px;margin-left: auto;margin-right: auto;display: table;"/>
                <div slot="footer" class="p-2">
                    <button  :class="!JSON.parse(this.kiosk_info.kiosk.config).success ? 'btn btn-lg btn-outline-light btn-primary mb-2 float-right footer-button': 'btn btn-lg btn-outline-light mb-2 float-right footer-button'" :style="!JSON.parse(this.kiosk_info.kiosk.config).success ? '': success_btn" v-if="(step < 7 && step > 0 && step != 6) || step == 9 " @click="goToNextStep">
                        {{$t('Kiosk.App.ContinueButton')}}
                    </button>
                    <button :class="!JSON.parse(this.kiosk_info.kiosk.config).success ? 'btn btn-lg btn-outline-light btn-danger mb-2 float-left footer-button': 'btn btn-lg btn-outline-light mb-2 float-left footer-button'" :style="!JSON.parse(this.kiosk_info.kiosk.config).success ? '': success_btn" v-if="((step > 1 && kiosk_info.kiosk.login_required == 1) ||  (step > 3 && kiosk_info.kiosk.login_required == 0)) && step < 7" @click="goToPrevStep">
                        {{$t('Kiosk.App.ReturnButton')}}
                    </button>

                    <button  :class="!JSON.parse(this.kiosk_info.kiosk.config).success ? 'btn btn-lg btn-outline-light btn-primary mb-2 float-right footer-button': 'btn btn-lg btn-outline-light mb-2 float-right footer-button'" :style="!JSON.parse(this.kiosk_info.kiosk.config).success ? '': success_btn" v-if="bookStep < 6 && bookStep >0" @click="goToNextBookStep">
                        {{$t('Kiosk.App.ContinueButton')}}
                    </button>
                    <button :class="!JSON.parse(this.kiosk_info.kiosk.config).success ? 'btn btn-lg btn-outline-light btn-danger mb-2 float-left footer-button': 'btn btn-lg btn-outline-light mb-2 float-left footer-button'" :style="!JSON.parse(this.kiosk_info.kiosk.config).success ? '': success_btn" v-if="bookStep > 1" @click="goToPrevBookStep">
                        {{$t('Kiosk.App.ReturnButton')}}
                    </button>
                </div>
            </div>
        </vs-card>


        <div class="simple-keyboard" tabindex="1" v-show="showNumericalKeyboard" @blur="hideKeyboardNumerical"
             style="z-index: 9999; position: absolute; bottom: 0px;"></div>


        <div id="ticketPrint" style="text-align: center">
            <img :src="kioskConfig.photo != '' ? kioskConfig.photo : require('@/assets/images/logo/liberrex-grayscale.png')" style="width: 50%; margin-bottom: 1cm"/>
            <br>
            <span style="font-size: 18px">{{$t('Kiosk.Ticket.Welcome')}}</span><br>
            <span style="font-size: 22px; font-weight: bold">{{kiosk_info.business.name}}</span><br>
            <span style="font-size: 18px;">{{selectedQueue ? selectedQueue.queue.title : ''}}</span>
            <hr>
            <table style="width: 100%">
                <tr>
                    <td style="text-align: left; width: 50%">{{checkinDateFormatted}}</td>
                    <td style="text-align: right;  width: 50%">{{checkinTimeFormatted}}</td>
                </tr>
            </table>
            <div class="seperator"></div>
            <span style="font-size: 54px; font-weight: bold">{{ticket.public_identifier}}</span>
            <div class="seperator"></div>
            <hr>
            <table style="width: 100%">
                <tr>
                    <td style="text-align: center; width: 50%">
                        <span style="font-size: 32px; font-weight: bold">{{ticket.total_waiting}}</span><br>
                        <span style="font-size: 15px">{{$t('Kiosk.Ticket.Rank')}}</span>
                    </td>
                    <td style="text-align: center;  width: 50%">
                        <span style="font-size: 32px; font-weight: bold">{{ticketWaitingTimeFormatted}}</span><br>
                        <span style="font-size: 15px">{{$t('Kiosk.Ticket.WaitingTime')}}</span>
                    </td>
                </tr>
            </table>
            <hr>
            <span style="font-size: 24px; font-weight: bold">{{$t('Kiosk.Ticket.Services')}}</span><br>
            <span v-for="(item,index) in ticket.services" :key="index" style="font-size: 18px">
                {{item.title}} <br>
            </span>
            <footer id="footer">
                <qrcode-vue renderAs="svg" :value="qrCode" style="margin-bottom: 10px"></qrcode-vue>
                <span style="font-size: 12px;">{{$t('Kiosk.Ticket.ScanQR')}}</span><br>
                <span style="font-size: 14px">{{$t('Kiosk.Ticket.ThankYou')}}</span>
            </footer>
        </div>
    </div>
</template>

<script>
var keyboard = null;
import { mapState } from 'vuex'
import LanguageSelector from '../../components/language/LanguageSelector'
import {kioskService, bookingService} from "../../_services";
import QrcodeVue from 'qrcode.vue';
import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';


export default {
  name: 'Checkin',
  data:()=>({
    msg: "Checkin",
      phone_number: "",
      internal_id: "",
      country_prefix: "",
      fname: "",
      lname: "",
      email: "",
      keyboardInput: "",
      step: 0,
      bookStep : 0,
      customer: {},
      queues: [],
      kioskConfig: {},
      ticket: {
          business: 1,
          checkinDate: "2020-05-12",
          checkinTime: "02:08:20",
          customer_id: 395,
          estimatedTimeToSpend: "25",
          id: 54,
          member_id: 1,
          total_waiting: 0,
          public_identifier: "001",
          queue_line_id: 45,
          services: "4",
          status: "waiting",
          statusUpdateTimestamp: "",
          unique_id: "a818243e9ee05ff6",
          urgent: "0"
      },
      selectedQueue: null,
      selectedDepartment: null,
      selectedMember: null,
      selectedServices: [],
      selectedBookServices: [],
      inputValidation: {
        phone: false,
      },
      errors: {
        phone: false,
        internal_id: false,
        queue: false,
        join: false,
        department : false,
        time : false
      },
      qrCode: "",
      showNumericalKeyboard: false,
      showAlphaNumericalKeyboard: false,
      steps : ['','','',''],
      stepsLogin :['','','','','',''],
      stepper : 1,
      currentStep: 1,
      services : [],
      guest_mode : 1,
      guestStep : 1,
      chekinQrCode : "",
      ipadVertical : false,
      background : "position: relative;",
      card_color : "",
      text_color : "",
      success_btn : "",
      start : 1,
      pick : 0,
      bookingDate: new Date(),
      disabledDates: {
        to: new Date(), // Disable all dates up to specific date
        days: [] // Disable Saturday's and Sunday's
      },
      availableTimeSlots: [],
      bookingSlot: "00:00",
      weekdays : [],
      startDay : '',
      today : '',
      duration: 0,
      price : 0,
      breakDay : false

  }),
  methods:{
      changeLanguage(locale) {
        this.$i18n.locale = locale;
        localStorage.setItem('Language', locale);
        this.start = 0;

        if(this.kiosk_info.kiosk.allow_booking == 1) {
            this.pick = 1;
        }
        else if (this.kiosk_info.kiosk.allow_booking == 0){
            if(this.kiosk_info.kiosk.login_required == 0){
                if(this.queues.length == 1){
                    if(this.selectedQueue.services.length == 1){
                        this.step = 6;
                        this.stepper = 3;
                    }
                    else{
                        this.step = 4;
                        this.stepper = 1;
                    }
                }
                else {
                    this.step = 3;
                    this.stepper = 0;
                }
            }
            else {
                this.step = 1;
            }
        } 
      },
      showLoading(){
          this.$vs.loading({
              container: '#checkin-box',
              scale: 0.6
          });
      },
      hideLoading(){
          this.$vs.loading.close('#checkin-box > .con-vs-loading')
      },
      goToNextStep(){
          this.errors = {
              phone: false,
              internal_id: false,
              push: false,
          };
          switch (this.step) {
              case 1:
                  if(this.phone_number.length >= 6) {
                      if(this.kiosk_info.kiosk.require_internal_id == 1){
                          if(this.internal_id.length > 3){
                              // do it
                              this.findCustomerByPhoneNumber();
                          }
                          else{ this.errors.internal_id = true; }
                      }
                      else { this.findCustomerByPhoneNumber(); }
                  }
                  else { this.errors.phone = true; }
                  break;
              case 2:
                  if(this.fname.length && this.lname.length) { this.createNewCustomer();}
                  break;
              case 3:
                  if(this.selectedQueue != null){
                    if(this.selectedQueue.services.length == 1){
                            this.selectedServices.push(this.selectedQueue.services[0])
                            this.step = 6;
                            this.stepper = 4;
                    }
                    else { this.step++; 
                    this.stepper++; 
                    }
                  }else{
                      this.errors.queue = true;
                  }
                  break;
              case 4:
                  if(this.selectedServices.length){
                        if(this.selectedQueue.queue.choosable) 
                        {
                            this.step++; 
                            this.stepper++;
                        }
                        else {
                            this.step = this.step+2;
                            this.stepper = this.stepper+2;
                        }
                      
                  }
                  break;
              case 5:
                  this.stepper++;
                  this.step++;
                  break;
              case 6:
                  this.step++;
                  this.stepper++;
                  break;
              case 9:
                  if(this.phone_number.length >= 6) {
                      if(this.kiosk_info.kiosk.require_internal_id == 1){
                          if(this.internal_id.length > 3){
                              // do it
                              this.findCustomerByPhoneNumber();
                          }
                          else{ this.errors.internal_id = true; }
                      }
                      else { this.findCustomerByPhoneNumber(); }
                  }
                  else { this.errors.phone = true; }
                  this.step = 6;
                  this.stepper = 4; 
                  break;
          }
      },
      goToPrevStep(){
          switch (this.step) {
              case 2:
                  this.step--;
                  break;
              case 3:
                  this.stepper = 1;
                  this.step = 1;
                  break;
              case 4:
                  this.stepper--;
                  this.step--;
                  break;
              case 5:
                  this.selectedServices = [];
                  this.stepper--;
                  this.step--;
                  break;
              case 6:
                  this.selectedMember = null;
                  if(this.selectedQueue.queue.choosable) {this.step--; this.stepper--;}
                  else {
                    if(this.selectedQueue.services.length == 1){
                        this.step = 3;
                        this.stepper = 1;
                    }
                    else{
                        this.selectedServices = [];
                        this.step = this.step-2;
                        this.stepper = this.stepper-2;
                    } 
                  }
                  break;
          }
      },
      findCustomerByPhoneNumber(){
          this.showLoading();
          let payload = {
              phone_number: this.phone_number.replace(/\s/g,''),
              internal_id: this.internal_id,
              country_prefix: this.countryPrefix
          }
          kioskService.findCustomerByPhoneNumber(payload).then(function (data) {
            if(data.customer != null) {
                if(this.kiosk_info.kiosk.login_required == 0){
                    this.step = 6;
                    this.stepper = 4;
                    this.customer = data.customer;
                }
                else if(this.kiosk_info.kiosk.require_internal_id == 1 && data.customer.hasBookingToday == 0){
                    this.step = 8;
                }else {
                    this.step = 3;
                    if(this.queues.length == 1){
                        this.selectedQueue = this.queues[0];
                        this.step = 4;
                    }
                    this.customer = data.customer;
                }
            }
            else{
                if(!this.kiosk_info.kiosk.collect_details){
                    this.fname = '';
                    this.lname = '';
                    this.email = '';
                    this.createNewCustomer();
                }
                else {
                    if(this.kiosk_info.kiosk.require_internal_id == 1){
                        this.step = 8;
                    } else {
                        this.step = 2;
                    }
                }

            }
          }.bind(this)).catch(function () {

          }.bind(this)).finally(function () {
              this.hideLoading();
          }.bind(this))
      },
      findCustomer(){
          this.showLoading();
          let payload = {
              phone_number: this.phone_number.replace(/\s/g,''),
              internal_id: this.internal_id,
              country_prefix: this.countryPrefix
          }
          kioskService.findCustomerByPhoneNumber(payload).then(function (data) {
              if(data.customer != null) {
                  this.customer = data.customer;
                  this.bookStep = 6;
              }
              else {
                  this.bookStep = 5;
              }
          }.bind(this)).catch(function () {

          }.bind(this)).finally(function () {
              this.hideLoading();
          }.bind(this));  
      },
      createNewCustomer(){
          this.showLoading();
          let payload = {
              phone_number: this.phone_number.replace(/\s/g,'').replace(this.countryPrefix, '').replace('(0)', ''),
              country_prefix: this.countryPrefix,
              country: this.countryIso,
              fname: this.fname,
              lname: this.lname,
              email: this.email,
              internal_id: this.internal_id,
          }
          kioskService.createCustomer(payload).then(function (data) {
              if(data.customer != null) {
                  if(this.kiosk_info.kiosk.require_internal_id == 1 && data.customer.hasBookingToday == 0){
                      this.step = 8;
                  }else {
                      if(this.kiosk_info.kiosk.login_required == 1){
                          this.step = 3;
                          if (this.queues.length == 1) {
                          this.selectedQueue = this.queues[0];
                          this.step = 4;
                      }
                      }
                      else if (this.kiosk_info.kiosk.login_required == 0) {
                          this.step = 6
                      }
                      
                      
                  }
                  this.customer = data.customer;    
              }
          }.bind(this)).catch(function () {

          }.bind(this)).finally(function () {
              this.hideLoading();
          }.bind(this))
      },
      createCustomer(){
          this.showLoading();
          let payload = {
              phone_number: this.phone_number.replace(/\s/g,'').replace(this.countryPrefix, '').replace('(0)', ''),
              country_prefix: this.countryPrefix,
              country: this.countryIso,
              fname: this.fname,
              lname: this.lname,
              email: this.email,
              internal_id: this.internal_id,
          }
          kioskService.createCustomer(payload).then(function (data) {
              if(data.customer != null) {
                  this.customer = data.customer;
                  this.bookStep = 6;
              }
              }.bind(this)).catch(function () {

          }.bind(this)).finally(function () {
              this.hideLoading();
          }.bind(this))

      },
      getKioskQueues(){
          let queues = JSON.parse(this.kiosk_info.kiosk.config).queues.toString().split(',');
          queues.forEach(id => {
              kioskService.getQueueById(id).then(function (data) {
                  if(data.queue.status  == 1)
                  this.queues.push(data);
                  if(this.kiosk_info.kiosk.login_required == 0){
                    if(this.queues.length == 1){
                        this.selectedQueue = this.queues[0];
                        if(this.selectedQueue.services.length == 1){
                            this.selectedServices.push(this.selectedQueue.services[0])
                        }
                    }
                  }
              }.bind(this))
          })
      },
      joinQueue(){
          this.showLoading();
          let payload = {
              queue_id: this.selectedQueue.queue.id,
              services: this.selectedServicesIds,
              customer_id: this.customer ? this.customer.id : -1,
              member_id: this.selectedMember ? this.selectedMember.id : -1,
              anonymous: this.kiosk_info.kiosk.collected_details,
          }
          if(!this.customer.id){
              switch(this.kiosk_info.kiosk.pseudo){
                case "1":
                    payload.pseudo = this.$t('Kiosk.Pseudos.Customer');
                    break;
                case "2":
                    payload.pseudo = this.$t('Kiosk.Pseudos.Patient');
                    break;
                case "3":
                    payload.pseudo = this.$t('Kiosk.Pseudos.User');
                    break;
              }
          }
        //   console.log(payload);
          kioskService.joinQueue(payload).then(function (data) {
              this.ticket = data.ticket;
              this.qrCode = process.env.VUE_APP_TICKET_URL+this.ticket.unique_id;
              this.step = 7;

              /*
              setTimeout(function (){
                  // Print
                  var w = window.open('', "_blank", "fullscreen=no,toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=-10000, top=-10000,width=10, height=10,visible=none");
                  window.focus();
                  var html = document.getElementById("ticketPrint").outerHTML;
                  w.document.write("<html><head>" +
                      "<style>@media print{@page{margin:.2cm;size:8cm 16cm}#checkin-box{display:none}*{background:#fff;color:#000}#ticketPrint{display:block;width:10.5cm}.seperator{margin-top:0.5cm}hr{border-color:#000!important;border-collapse:collapse;line-height:1px;border-style: inset;}#footer{width:100%;height:4cm; margin-top:20px}}</style>" +
                      "</head><body>"+html+"</body></html>");
                  w.print();
                  //w.close();
              }, 500); // How long do you want the delay to be (in milliseconds)?
               */
              if(!this.customer.id){
                  setTimeout(function (){ window.print(); }, 500);
              }


              setTimeout(function (){
                  // Go back to first page after 5 seconds
                  if(this.step == 7){
                      this.startAgain();
                  }
              }.bind(this), 5000);

          }.bind(this)).catch(function () {
                  this.errors.push = true;
          }.bind(this)).finally(function () {
              this.hideLoading();
          }.bind(this))
      },
      printTicket(){
          window.print();
          setTimeout(function (){
                  // Go back to first page after 5 seconds
                  if(this.step == 10){
                      this.startAgain();
                  }
            }.bind(this), 5000);
      },
      startAgain(){
            this.internal_id = "";
            this.phone_number = "";
            this.country_prefix = "";
            this.fname = "";
            this.lname = "";
            this.email = "";
            this.customer = null;
            this.selectedQueue = null;
            this.selectedMember = null;
            this.selectedServices = [];
            this.selectedDepartment = null;
            this.selectedBookServices = [];
            this.availableTimeSlots = [];
            this.bookingSlot = "00:00";
            this.weekdays = [];
            this.startDay = '';
            this.today = '';
            this.duration = 0;
            this.price = 0;
            location.reload();
      },

      unselectMember(){
          this.selectedMember = null;
      },
      waitingTimeFormated (value) {
          return this.$moment().startOf('day').add(value, 'seconds').format('HH:mm');
      },

      onKeyPress(button, fieldName) {
          switch (button) {
              case '<':
                  switch (fieldName) {
                      case 'phone':
                          this.phone_number = this.phone_number.slice(0, -1);
                          break;
                      case 'internal_id':
                          this.internal_id = this.internal_id.slice(0, -1);
                          break;
                      case 'fname':
                          this.fname = this.fname.slice(0, -1);
                          break;
                      case 'lname':
                          this.lname = this.lname.slice(0, -1);
                          break;
                      case 'email':
                          this.email = this.email.slice(0, -1);
                          break;
                  }
                  break;
              case 'X':
                  this.hideKeyboardNumerical();
                  break;
              default:
                  if(button=="{space}") button = " ";
                  switch (fieldName) {
                      case 'internal_id':
                          this.internal_id = this.internal_id+button;
                          break;
                      case 'phone':
                          this.phone_number = this.phone_number+button;
                          break;
                      case 'fname':
                          this.fname = this.fname+button;
                          break;
                      case 'lname':
                          this.lname = this.lname+button;
                          break;
                      case 'email':
                          this.email = this.email+button;
                          break;
                  }
          }
      },
      onInputChange(input) {
          this.input = input.target.value;
      },
      showKeyboardNumerical(fieldName){
          if(this.kiosk_info.kiosk.show_keyboard){
              keyboard = new Keyboard({
                  onChange: input => this.onChange(input, fieldName),
                  onKeyPress: button => this.onKeyPress(button, fieldName),
                  layout: {
                      default: ["1 2 3", "4 5 6", "7 8 9", "< 0 X"]
                  },
                  theme: "hg-theme-default hg-layout-numeric numeric-theme",
                  inputPattern: /^\d+$/,
                  autoUseTouchEvents: true
              });
              this.showNumericalKeyboard = true;
          }
      },
      showKeyboardAlphaNumerical(fieldName){
          if(this.kiosk_info.kiosk.show_keyboard){
              keyboard = new Keyboard({
                  onChange: input => this.onChange(input, fieldName),
                  onKeyPress: button => this.onKeyPress(button, fieldName),
                  layout: {
                      'default': [
                          '1 2 3 4 5 6 7 8 9 0 - / X',
                          'A Z E R T Y U I O P',
                          'Q S D F G H J K L',
                          'W X C V B N M <',
                          '{space}'
                      ]
                  },
                  theme: "hg-theme-default hg-layout-numeric numeric-theme",
                  inputPattern: /^\d+$/,
                  autoUseTouchEvents: true
              });
              this.showNumericalKeyboard = true;
          }
      },
      hideKeyboardNumerical(){
          this.showNumericalKeyboard = false;
          keyboard.destroy();
      },
      hideKeyboardAlphaNumerical(){
          this.showNumericalKeyboard = false;
          keyboard.destroy();
      },
      startQueue(){
          this.pick = 0;
          if(this.kiosk_info.kiosk.login_required == 0){
                if(this.queues.length == 1){
                    if(this.selectedQueue.services.length == 1){
                        this.step = 6;
                        this.stepper = 3;
                    }
                    else{
                        this.step = 4;
                        this.stepper = 1;
                    }
                }
                else {
                    this.step = 3;
                    this.stepper = 0;
                }
            }
            else {
                this.step = 1;
            }
      },
      startBook(){
        this.pick = 0;
        this.bookStep = 1;
      },
      goToNextBookStep(){
          switch(this.bookStep){
                case 1:
                    if(this.selectedDepartment != null){
                        this.bookStep++;
                    }
                    break;
                case 2:
                    if(this.selectedBookServices.length){
                        this.bookStep++;
                        this.getAvailableSlots();
                    }
                    break;
                case 3:
                    this.selectedBookServices.forEach((obj,index) => {
                        this.price = parseInt(this.price) + parseInt(obj.price);
                        this.duration = this.duration + obj.duration;
                    })
                    if(this.bookingSlot != "00:00") {
                        if(this.customer.fname){
                        this.bookStep = 6;
                        }
                        else {this.bookStep++;}
                    }
                    break;
                case 4:
                    if(this.phone_number.length >= 6) {
                      this.findCustomer();
                    }
                    else { this.errors.phone = true; }
                    break;
                case 5:
                    if(this.fname.length && this.lname.length) { this.createCustomer();}
                    break;
          }
      },
      goToPrevBookStep(){
          switch(this.bookStep){
                case 2: 
                    this.bookStep--;
                    this.selectedBookServices = [];
                    break;
                case 3:
                    this.bookStep--;
                    break;
                case 4:
                    this.weekdays = [];
                    this.getWeekDays();
                    var searchDate = true;
                    var dayIndex = 0;
                    this.bookingDate = new Date();
                    while(searchDate){
                        var dateCheck = this.$moment(this.bookingDate).add(dayIndex, 'day');
                        var weekday = dateCheck.isoWeekday();

                        if(!this.disabledDates.days.includes(weekday == 7 ? 0 : weekday)){
                            this.bookingDate = new Date(dateCheck.format("YYYY-MM-DD"));
                            searchDate = false;
                        }
                        dayIndex++;
                    }
                    this.availableTimeSlots = [];
                    this.getAvailableSlots();
                    this.bookStep--;
                    break;
                case 5:
                    this.customer = {};
                    this.bookStep--;
                    break;
                case 6:
                    this.weekdays = [];
                    this.getWeekDays();
                    var searchDate = true;
                    var dayIndex = 0;
                    this.bookingDate = new Date();
                    while(searchDate){
                        var dateCheck = this.$moment(this.bookingDate).add(dayIndex, 'day');
                        var weekday = dateCheck.isoWeekday();

                        if(!this.disabledDates.days.includes(weekday == 7 ? 0 : weekday)){
                            this.bookingDate = new Date(dateCheck.format("YYYY-MM-DD"));
                            searchDate = false;
                        }
                        dayIndex++;
                    }
                    this.availableTimeSlots = [];
                    this.getAvailableSlots();
                    this.bookStep = 3;
                    break;

          }
      },
      getAvailableSlots(item) {
        this.breakDay = false;
        console.log(this.selectedDepartment);
        if(item){
            this.bookingDate = item;
                this.$vs.loading({
                container: '#timeSlot',
                scale: 0.6
            })
        }
        this.loading = true;
        let data = {
            business_id: this.kiosk_info.business.id,
            date: this.$moment(this.bookingDate).format("YYYY-MM-DD"),
            department: this.selectedDepartment.id
        };
        this.bookingSlot = "00:00";
        bookingService
            .getAvailability(data)
            .then(
            function(data) {
                this.availableTimeSlots = data.slots;
                console.log(this.availableTimeSlots);
                // this.bookingDate = new Date();
            }.bind(this))
            .catch(function() {
                this.availableTimeSlots = [];
                this.breakDay = true;
            }.bind(this)).finally(function () {
                if(item){
                    this.$vs.loading.close('#timeSlot > .con-vs-loading');
                }
          }.bind(this));
      },
      getWeekDays(){
        let numberOfDaysRequired = 7;
        let addDaysBy = 1;
        while(this.weekdays.length < numberOfDaysRequired)
        {
            const d = this.$moment().add(addDaysBy-1, 'days')
            this.weekdays.push(d.toDate())
            addDaysBy++;
        }
        this.startDay = this.$moment().add(6,'days');
      },
      getNextWeekDays(){
        this.$vs.loading({
            container: '#daySlot',
            scale: 0.6
        })
        this.weekdays = [];
        let numberOfDaysRequired = 7;
        while(this.weekdays.length < numberOfDaysRequired)
        {
            const d = this.startDay.add(1, 'days')
            this.weekdays.push(d.toDate())
        }
        setTimeout( ()=> {
            this.$vs.loading.close('#daySlot > .con-vs-loading')
        }, 1000);
      },
      getPreviousWeekDays(){
            if(!this.startDay.isSame(this.$moment().add(6,'days').toDate(), "Day")){
                this.$vs.loading({
                container: '#daySlot',
                scale: 0.6
            })
            this.weekdays = [];
            let numberOfDaysRequired = 7;
            this.startDay.subtract(6,'days')
            while(this.weekdays.length < numberOfDaysRequired)
            {
                const d = this.startDay.subtract(1,'days')
                this.weekdays.push(d.toDate())
                
            }
            this.weekdays.reverse();
            this.startDay.add(6,'days')
            setTimeout( ()=> {
                this.$vs.loading.close('#daySlot > .con-vs-loading')
            }, 1000);
        }
      },
      showBookingSlot(){
          console.log(this.bookingSlot);
      },
      requestToBook(){
        this.showLoading();
        let serv = [];
        this.selectedBookServices.forEach((obj, index) => {
          serv.push(obj.id);
        });
        let services = serv.join(",");
        let start = this.$moment(this.bookingDate).format("YYYY-MM-DD") + " " + this.bookingSlot;

        let date = this.$moment(this.bookingSlot, "HH:mm").add(this.duration, "minutes").format("HH:mm");
        let end = this.$moment(this.bookingDate).format("YYYY-MM-DD") + " " + date;

        let data = new FormData();
        data.append('business_id', this.kiosk_info.business.id);
        data.append('services', services);
        data.append('department_id', this.selectedDepartment ? this.selectedDepartment.id : null);
        data.append('start_datetime', start);
        data.append('end_datetime', end);
        data.append('customer_id', this.customer.id);
        data.append('_method', 'PUT');

        kioskService
            .createBooking(data)
            .then(function(data) {
              console.log(this.data);
              
            }.bind(this))
            .finally(function() { this.hideLoading(); this.bookStep = 7; }.bind(this))
            .catch(function(ex) {}.bind(this));
      },
  },  
  computed: {
      ...mapState({
          kiosk_info: state => state.Kiosk.kiosk,
          theme_info : state => state
      }),
    inputValid(){
      if(this.key && this.secret && !this.requestFailed){
        return false
      } else {
        return true
      }
    },
    phoneNumberMask(){
          let mask = '';
          switch (this.kiosk_info.business.country) {
              case "Tunisie":
                  mask = 'XX XXX XXX';
                  break;
              case "United Kingdom":
                  mask = 'XXX XXX XXXX';
                  break;
          }
          return mask;
    },
    countryPrefix(){
      let prefix = '';
      switch (this.kiosk_info.business.country) {
          case "Tunisie":
              prefix = '+216';
              break;
          case "United Kingdom":
              prefix = '+216';
              break;
      }
      return prefix;
    },
    countryIso(){
      let prefix = '';
      switch (this.kiosk_info.business.country) {
          case "Tunisie":
              prefix = 'TN';
              break;
          case "United Kingdom":
              prefix = 'GB';
              break;
      }
      return prefix;
    },
    selectedServicesNames(){
          return this.selectedServices.map(function (obj) {
              return obj.title;
          }).join(', ')
    },
    selectedBookServicesNames(){
          return this.selectedBookServices.map(function (obj) {
              return obj.title;
          }).join(', ')
    },
    selectedServicesIds(){
          return this.selectedServices.map(function (obj) {
              return obj.id;
          }).join(',')
    },
    ticketWaitingTimeFormatted: function () {
      return this.$moment().startOf('day').add(this.ticket.waiting_time, 'seconds').format('HH:mm');
    },
    serviceTimeFormatted: function () {
      return this.$moment().startOf('day').add(this.ticket.estimatedTimeToSpend, 'minutes').format('HH:mm');
    },
    checkinDateFormatted: function () {
      return this.$moment(this.ticket.checkinDate+' '+this.ticket.checkinTime).format('DD/MM/YYYY');
    },
    checkinTimeFormatted: function () {
      return this.$moment(this.ticket.checkinDate+' '+this.ticket.checkinTime).format('HH:mm');
    },
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
    mounted(){
        if(JSON.parse(this.kiosk_info.kiosk.config).primary != "undefined"){
            this.background = "position: relative; background:"+JSON.parse(this.kiosk_info.kiosk.config).primary+";";
        }
        if(JSON.parse(this.kiosk_info.kiosk.config).secondary != "undefined"){
            this.card_color = "background-color :"+JSON.parse(this.kiosk_info.kiosk.config).secondary+";";
            let header = document.getElementsByClassName('vs-card--header');
            for(let i = 0; i < header.length; i++) {
                header[i].style.background = JSON.parse(this.kiosk_info.kiosk.config).secondary;
            }
        }
        if(JSON.parse(this.kiosk_info.kiosk.config).danger != "undefined"){
            this.text_color = "color :"+JSON.parse(this.kiosk_info.kiosk.config).danger+";";
        }
        if(JSON.parse(this.kiosk_info.kiosk.config).success != "undefined"){
            this.success_btn = "background :"+JSON.parse(this.kiosk_info.kiosk.config).success+";";
        }
        
        this.kiosk_info.business.working_days.forEach((obj, index) => {
            if (obj.active == 0) {
              this.disabledDates.days.push(index == 6 ? 0 : index+1);
            }
        });

        var searchDate = true;
        var dayIndex = 0;

        while(searchDate){
            var dateCheck = this.$moment(this.bookingDate).add(dayIndex, 'day');
            var weekday = dateCheck.isoWeekday();

            if(!this.disabledDates.days.includes(weekday == 7 ? 0 : weekday)){
                this.bookingDate = new Date(dateCheck.format("YYYY-MM-DD"));
                searchDate = false;
            }
            dayIndex++;
        }
        
        console.log(this.$moment.locale());
        this.today = this.$moment();
        this.getWeekDays();

        
        

        this.getKioskQueues();
        this.kioskConfig = JSON.parse(this.kiosk_info.kiosk.config); 
        this.chekinQrCode = process.env.VUE_APP_CHECKIN_URL+this.kiosk_info.business.hashedid;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(window.navigator.userAgent) && window.screen.orientation.angle == 0) {
            this.ipadVertical = true;
        }

    },
  components:{
      LanguageSelector,
      QrcodeVue
  }
}
</script>
<style>
.login-register-bg{
  margin:0 auto;
  background:url(../../assets/images/background/auth-bg.jpg) no-repeat center center;
}
.employee-radio{
    margin: 10px 15px;
    background: #000000a1;
    padding: 0px;
    border: 2px solid black;
    font-size: 18px;
    color: white;
    width: 200px;
}
.employee-active{
    border: 5px solid #ffffffb3;
}
.employee-radio .vs-radio, .vs-radio--input{
    display: none !important;
}
.employee-radio .vs-radio--label {
    margin-left: 0px !important;
    cursor: pointer;
}
.employee-unselect-button{
    border-radius: 50px;
    width: 42px;
    height: 42px;
    background: #ffffff;
    color: black;
    padding: 2px 7px;
    font-size: 28px;
    position: absolute;
    top: -10px;
    left: 0px;
}
    .error-message{
        border: 1px solid red;
        background: #ff00005c;
    }
    #ticketPrint {display: none;}
@media print {
    @page {
        margin: 0.5cm;
        size: 8cm 16cm;
    }
    #checkin-box {display: none;}
    body {
    }
    * {
        background: white;
        color: #000000;
    }
    #ticketPrint {
        display: block;
        width: 10.5cm;

    }
    .seperator{
        margin-top: 0.3cm;
    }
    hr {
        border: 0.5px solid black;
        border-style: inset;
        border-collapse:collapse;
        line-height: 1px;
    }
    #footer {
        width: 100%;
        height: 4cm;
        margin-top: 10px;
        /* Footer height */
    }


    
    
    
}
</style>

