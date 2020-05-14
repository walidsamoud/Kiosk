<template>
  <div>
    <vs-prompt
            color="primary"
            @cancel="reset"
            @accept="pushCustomer"
            @close="reset"
            :title="$t('Components.Queue.AddCustomerPrompt.Title')"
            :accept-text="$t('Components.Queue.AddCustomerPrompt.PushButton')"
            :cancel-text="$t('Components.Queue.AddCustomerPrompt.CancelButton')"
            :active.sync="isActive">
      <div class="con-exemple-prompt">

        <vs-select
                v-if="!addNewCustomer"
                autocomplete
                :placeholder="$t('Components.Queue.AddCustomerPrompt.CustomerPlaceholder')"
                class="w-100 mb-4"
                :label="$t('Components.Queue.AddCustomerPrompt.CustomerLabel')"
                v-model="customer"
        >
          <vs-select-item :key="index" :value="item.id" :text="item.name" v-for="(item,index) in customersList" />
        </vs-select>

        <vs-checkbox class="justify-content-start w-100 mb-4" v-model="addNewCustomer">
          {{$t('Components.Queue.AddCustomerPrompt.AddNewCustomerCheckboxText')}}
        </vs-checkbox>

        <div v-if="addNewCustomer">
          <vs-row>
            <vs-col vs-w="6"><vs-input :label="$t('Customer.FirstName')" v-model="fname" class="w-100 mb-2" /></vs-col>
            <vs-col vs-w="6"><vs-input :label="$t('Customer.LastName')" v-model="lname" class="w-100 mb-2" /></vs-col>
          </vs-row>
          <vs-input type="email" :label="$t('Customer.Email')" v-model="email" class="w-100 mb-2" />
          <vs-input type="tel" :label="$t('Customer.PhoneNumber')" v-model="phone_number" class="w-100 mb-2" />
          <vs-input :label="$t('Customer.InternalId')" v-model="internalId" class="w-100 mb-2"
                    :description-text="$t('Customer.InternalIdHint')"/>
        </div>


        <vs-select
                :placeholder="$t('Components.Queue.AddCustomerPrompt.ServicesPlaceholder')"
                class="w-100 mb-4"
                :label="$t('Components.Queue.AddCustomerPrompt.ServicesLabel')"
                autocomplete
                multiple
                v-model="services"
        >
          <vs-select-item :key="'service_'+index" :value="item.id" :text="item.title" v-for="(item,index) in servicesList" />
        </vs-select>

        <vs-checkbox class="justify-content-start w-100 mb-4" v-model="selectMember">
          {{$t('Components.Queue.AddCustomerPrompt.MemberCheckboxLabel')}}
        </vs-checkbox>

        <vs-select v-if="selectMember"
                :placeholder="$t('Components.Queue.AddCustomerPrompt.MemberPlaceholder')"
                class="w-100 mb-4"
                :label="$t('Components.Queue.AddCustomerPrompt.MemberLabel')"
                autocomplete
                v-model="member"
        >
          <vs-select-item :key="'member_'+index" :value="item.id" :text="item.fname+' '+item.lname" v-for="(item,index) in teamMembers" />
        </vs-select>

      </div>
    </vs-prompt>
  </div>
</template>
<script>
import { queueService } from '../../_services'
import { customerService } from '../../_services'
export default {
  name: "AddCustomerPrompt",
  data: () => ({
    title: "AddCustomerPrompt",
    isActive: false,
    customersList: [],
    services: [],
    customer: {},
    addNewCustomer: false,
    selectMember: false,
    fname: "",
    lname: "",
    phone_number: "",
    address: "",
    email: "",
    internalId: "",
    member: -1,
  }),
  props: {
    servicesList: Array,
    teamMembers: Array,
    queue_id: Number
  },
  methods: {
    notify(title, text, type) {
      this.$vs.notify({
        color: type,
        title: title,
        text: text
      });
    },
    showLoading(){
      this.$vs.loading({
        container: '#queue-box',
        scale: 0.6
      });
    },
    hideLoading(){
      this.$vs.loading.close('#queue-box > .con-vs-loading')
    },
    show(){
      this.isActive = true
    },
    hide(){
      this.isActive = false
    },
    pushCustomer(){

      this.show();
      this.showLoading();

      let customer = {
      queue_id: this.queue_id,
      services: this.services.join(),
      customer_id: this.customer,
      member_id: this.selectMember ? this.member : -1,
      create_customer: this.addNewCustomer ? 1 : 0,
      fname: this.fname,
      lname: this.lname,
      phone: this.phone,
      email: this.email,
      lbrx_id: this.internalId,
      phone_number: this.phone_number
      }

      queueService.push(customer).then(function () {
        this.$emit('create');
        this.hide();
        this.notify(this.$t('Toasts.Successful'), this.$t('Components.Queue.AddCustomerPrompt.ToastSuccessMessage'), 'success');
      }.bind(this)).catch(function () {
        this.notify(this.$t('Toasts.Error'), this.$t('Components.Queue.AddCustomerPrompt.ToastErrorMessage'), 'danger');
      }.bind(this)).finally(function () {
        this.hideLoading();
      }.bind(this))

    },
    reset(){
      this.services = [];
      this.customer = {};
      this.addNewCustomer = false;
      this.selectMember = false;
      this.fname = "";
      this.lname = "";
      this.phone_number = "";
      this.address = "";
      this.email = "";
      this.internalId = "";
      this.member = -1;
    }
  },
  computed: {

  },
  mounted() {
    customerService.getAll().then(function (data) {
      this.customersList = [];
      data.customers.data.forEach(obj => {
        this.customersList.push({id: obj.id, name: obj.fname+' '+obj.lname+' ( '+obj.phone_number+' )'});
      });
    }.bind(this));
  }
};
</script>