<template>
    <vs-popup :active.sync="isActive"  title="Welcome to Liberrex" class="setup" id="quick-setup-box">
        <div>
            <vs-row>
                <vs-col vs-w="12" class="text-center">
                    <h2 class="text-primary mb-2"> {{$t('Dashboard.OnBoarding.QuickSetupTitle')}} </h2>
                    <p class="p-0 text-cyan">
                        {{$t('Dashboard.OnBoarding.QuickSetupText')}}
                    </p>
                    <form-wizard
                            id="wizard-signup"
                            color="rgba(var(--vs-primary), 1)"
                            :title="null"
                            @on-complete="isActive=false"
                            @on-change="tabChangeTrigger"
                            :subtitle="null"
                            :back-button-text="$t('Navigation.Previous')"
                            :next-button-text="$t('Navigation.Next')"
                            :finish-button-text="$t('Auth.RegisterSubmit')"
                            shape="square"
                            stepSize="xs"
                            error-color="#f62c51"
                    >
                        <tab-content icon="ti-calendar" :before-change="updateWorkingDays">
                            <QueueWorkingDay :key="index" v-for="(day, index) in workingDays" :day="day"></QueueWorkingDay>
                        </tab-content>
                        <tab-content icon="ti-flag"  :before-change="createServices">
                            <vs-row>
                                <ul class="list-inline" style="max-height: 350px; overflow-y: scroll;">
                                    <li class="mb-3 mb-lg-0 list-inline-item service-item-checkbox" v-for="(item,index) in industryServices" :key="index">
                                        <vs-checkbox class="justify-content-start" color="success" v-model="services" :vs-value="item.id">{{item.title}}</vs-checkbox>
                                    </li>
                                </ul>
                            </vs-row>
                        </tab-content>
                        <tab-content icon="ti-ticket" :before-change="createQueue">
                            <vs-row class="text-left">
                                <vs-input class="inputx w-100 mb-4" :label="$t('Queue.Create.QueueName')"
                                          :placeholder="$t('Queue.Create.QueueName')" v-model="queue.name"
                                          :danger="errors.name"
                                          :danger-text="$t('Errors.InvalidPolite', {field: $t('Queue.Create.QueueName')})"
                                />

                                <vs-select
                                        :danger="errors.services"
                                        :danger-text="$t('Errors.Required', {field: $t('Queue.Create.AvailableServices')})"
                                        :placeholder="$t('Queue.Create.AvailableServices')"
                                        class="w-100 mb-4"
                                        :label="$t('Queue.Create.AvailableServices')"
                                        autocomplete
                                        multiple
                                        v-model="queue.services"
                                >
                                    <vs-select-item :key="'service_'+index" :value="item.id" :text="item.name" v-for="(item,index) in queue.servicesList" />
                                </vs-select>

                                <vs-select
                                        :danger="errors.members"
                                        :danger-text="$t('Errors.Required', {field: $t('Queue.Create.TeamMembers')})"
                                        :placeholder="$t('Queue.Create.TeamMembers')"
                                        class="w-100 mb-4"
                                        :label="$t('Queue.Create.TeamMembers')"
                                        autocomplete
                                        multiple
                                        v-model="queue.members"
                                >
                                    <vs-select-item :key="'team_'+index" :value="item.id" :text="item.name" v-for="(item,index) in queue.teamMembersList" />
                                </vs-select>

                                <vs-checkbox class="justify-content-start w-100 mb-4" v-model="queue.choosable">
                                    {{$t('Queue.Create.TeamMembersChoosable')}}
                                </vs-checkbox>

                                <label class="vs-input--label mb-2">{{$t('Queue.Create.Counters')}}:</label>
                                <vs-col vs-w="12" v-for="(item,index) in queue.counters" :key="'counter_'+index">
                                    <vs-col vs-lg="11" vs-md="11" vs-sm="10" vs-xs="9">
                                        <vs-input class="inputx w-100 mb-4" :placeholder="$t('Queue.Create.CounterName')"  v-model="item.name" />
                                    </vs-col>
                                    <vs-col vs-lg="1" vs-md="1" vs-sm="2" vs-xs="3">
                                        <vs-button v-if="index+1 == queue.counters.length" color="primary" class="w-100" type="filled" @click="addCounter">
                                            <i class="mdi mdi-plus-box"></i>
                                        </vs-button>
                                        <vs-button v-if="index+1 < queue.counters.length" color="danger" class="w-100" type="filled" @click="deleteCounter(index)">
                                            <i class="mdi mdi-delete"></i>
                                        </vs-button>
                                    </vs-col>
                                </vs-col>
                            </vs-row>
                        </tab-content>
                        <tab-content icon="ti-credit-card">
                            <div class="border p-4 mb-4">
                                <h4 class="font-weight-light">{{$t('Billing.AddBillingMethod.Title')}}</h4>
                                <span class="mb-4 font-weight-light text-black-50">{{$t('Billing.AddBillingMethod.Text')}}</span>
                                <card v-if="publishableKey"
                                      class='stripe-card mt-4 border-bottom pb-2'
                                      :class='{ complete }'
                                      :stripe='publishableKey'
                                      :options='stripeOptions'
                                      @change='complete = $event.complete'
                                      id="add-payment"
                                />
                                <vs-button class='pay-with-stripe mt-4' @click='pay' :disabled='!complete'>{{$t('Billing.AddBillingMethod.AddCardButton')}}</vs-button>
                            </div>
                        </tab-content>
                    </form-wizard>
                </vs-col>
            </vs-row>
        </div>
    </vs-popup>
</template>
<script>
    import { Card, createToken } from 'vue-stripe-elements-plus'
    import { FormWizard, TabContent } from "vue-form-wizard";
    import "vue-form-wizard/dist/vue-form-wizard.min.css";
    import { mapState, mapActions } from 'vuex';
    import QueueWorkingDay from '../../components/queue/QueueWorkingDay'
    import { helpersService, privateServiceService, businessService, billingService, teamService, queueService } from '../../_services'

    // //////////////////////////////////////////
    //
    // //////////////////////////////////////////
    export default {
        name: "QuickSetupModal",
        data: () => ({
            isActive: false,
            industryServices: [],
            services: [],
            servicesList: [],
            publishableKey: '',
            token: null,
            charge: null,
            complete: false,
            stripeOptions: {
                hidePostalCode:true,
                style: {
                    base: {
                        iconColor: '#c4f0ff',
                        color: '#000',
                        fontWeight: 500,
                        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                        fontSize: '16px',
                        fontSmoothing: 'antialiased',
                        ':-webkit-autofill': {
                            color: '#fce883',
                        },
                        '::placeholder': {
                            color: '#87BBFD',
                        },
                    }
                }
                // see https://stripe.com/docs/stripe.js#element-options for details
            },
            errors:{
                name: false,
                services: false,
                members: false,
            },
            queue: {
                name: '',
                choosable: 0,
                queueWorkingDays: [ ],
                servicesList: [],
                teamMembersList: [],
                services: [],
                members: [],
                counters: [{ name: '' }],
            }
        }),
        methods :{
            ...mapActions('account', ['updateUserObject']),
            notify(title, text, type) {
                this.$vs.notify({
                    color: type,
                    title: title,
                    text: text
                });
            },
            showLoading(){
                this.$vs.loading({
                    container: '#quick-setup-box',
                    scale: 0.6
                });
            },
            hideLoading(){
                this.$vs.loading.close('#quick-setup-box > .con-vs-loading')
            },
            show(){
                this.isActive = true
            },
            hide(){
                this.isActive = false
            },
            addCounter(){
                this.queue.counters.push({ value: '' });
            },
            deleteCounter(index){
                this.queue.counters.splice(index, 1);
            },
            updateWorkingDays(){
                this.showLoading();
                let days = [];
                this.workingDays.forEach(obj => {
                    days.push({
                        day: obj.day,
                        start_time: obj.start_time,
                        end_time: obj.end_time,
                        active: obj.active
                    })
                });
                businessService.updateWorkingDays({working_days: JSON.stringify(days)})
                    .then(function (data) {
                        this.notify(this.$t('Toasts.Successful'), this.$t('Company.EditWorkingDays.ToastSuccess'), 'success');
                        let userOld = JSON.parse(localStorage.getItem('user'));
                        userOld.working_days = data.working_days;
                        localStorage.setItem('user', JSON.stringify(userOld));
                        this.updateUserObject();
                    }.bind(this))
                    .catch(function () {
                        this.notify(this.$t('Toasts.Error'), this.$t('Company.EditWorkingDays.ToastFail'), 'danger');
                    }.bind(this))
                    .finally(function () {
                        this.hideLoading()
                    }.bind(this));
                return true;
            },
            pay () {
                this.showLoading();
                // createToken returns a Promise which resolves in a result object with
                // either a token or an error key.
                // See https://stripe.com/docs/api#tokens for the token object.
                // See https://stripe.com/docs/api#errors for the error object.
                // More general https://stripe.com/docs/stripe.js#stripe-create-token.
                createToken().then(function (data){
                    billingService.create({payment_method_id: data.token.id}).then(function () {
                        this.notify(this.$t('Toasts.Successful'), this.$t('Billing.AddBillingMethod.ToastSuccess'), 'success');
                        this.getMethods();
                    }.bind(this)).catch(function () {
                        this.notify(this.$t('Toasts.Error'), this.$t('Billing.AddBillingMethod.ToastFail'), 'danger');
                    }.bind(this)).finally(function () {
                        this.hideLoading();
                    }.bind(this))
                }.bind(this))
            },
            createServices(){
                this.showLoading();
                privateServiceService.multipleCreate({service_ids: this.services.join(',')})
                    .then(function () {
                        this.notify(this.$t('Toasts.Successful'), this.$t('Company.EditWorkingDays.ToastSuccess'), 'success');
                        this.getAllPrivateServices();
                    }.bind(this))
                    .catch(function () {
                        this.notify(this.$t('Toasts.Error'), this.$t('Company.EditWorkingDays.ToastFail'), 'danger');
                    }.bind(this))
                    .finally(function () {
                        this.hideLoading()
                    }.bind(this));
                return true;
            },
            tabChangeTrigger(prev, next){
                switch (next) {
                    case 1: this.services = []; this.getAllIndustryServices(); break;
                    case 2:
                        privateServiceService.getAll().then(function (data) {
                            this.queue.servicesList = [];
                            data.services.data.forEach(obj => {
                                this.queue.servicesList.push({id: obj.service_id, name: obj.title});
                            });
                        }.bind(this)).finally(function () {}.bind(this));
                        teamService.getAll().then(function (data) {
                            this.queue.teamMembersList = data.team.data.map(function (obj) {
                                return {id: obj.id, name: obj.fname+' '+obj.lname}
                            });
                        }.bind(this));
                        break;
                    default: break;
                }
            },
            getAllIndustryServices(){
                helpersService.getAllServices().then(function (data) {
                    this.industryServices = data.services.data;
                }.bind(this));
            },
            getAllPrivateServices(){
                privateServiceService.getAll().then(function (data) {
                    this.servicesList = [];
                    data.services.data.forEach(obj => {
                        this.servicesList.push({id: obj.service_id, name: obj.title});
                    });
                }.bind(this))
            },
            createQueue(){

                this.errors.name = this.queue.name ? false : true
                this.errors.services = this.queue.services.length > 0 ? false : true;
                this.errors.members = this.queue.members.length > 0 ? false : true;

                let {name, services, members} = this.errors;
                let res = !(name || services || members);

                if (!res) {
                    return false;
                }
                this.showLoading();

                let days = [];
                this.workingDays.forEach(obj => {
                    days.push({
                        day: obj.day,
                        start_time: obj.start_time,
                        end_time: obj.end_time,
                        active: obj.active
                    })
                });

                let queue = {
                    title: this.queue.name,
                    services: this.queue.services.join(),
                    members: this.queue.members.join(),
                    counters: this.queue.counters.map(function (obj) { return obj.name; }),
                    choosable: this.queue.choosable,
                    working_days: JSON.stringify(days)
                };

                queueService.create(queue).then(function () {
                    this.notify(this.$t('Toasts.Successful'), this.$t('Queue.Create.ToastSuccess'), 'success');
                }.bind(this)).catch(function () {
                    this.notify(this.$t('Toasts.Error'), this.$t('Queue.Create.ToastFail'), 'danger');
                }.bind(this)).finally(function () {
                    this.hideLoading();
                }.bind(this));

                return true;
            },
        },
        components: {
            FormWizard,
            TabContent,
            QueueWorkingDay,
            Card
        },
        mounted() {
            this.publishableKey = process.env.VUE_APP_STRIPE_KEY;
            this.getAllIndustryServices()
        },
        computed: {
            ...mapState({
                workingDays: state => state.account.user.working_days,
            }),

        }
    };
</script>
<style>
    .setup .vs-popup--header {
        display: none !important;
    }
    .setup .vs-popup {
        min-width: 60%;
    }
    .service-item-checkbox {
        border: 1px solid whitesmoke;
        padding: 4px;
        margin: 5px;
        background: #fbfbfb;
    }
</style>