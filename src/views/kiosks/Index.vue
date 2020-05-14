<template>
  <vs-row vs-justify="center" id="kiosks-box">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-lg="12" vs-xs="12">
      <vs-card>
        <v-tour name="KiosksA" :steps="steps">
          <template slot-scope="tour">
            <transition name="fade">
              <v-step
                      v-if="tour.currentStep === index"
                      v-for="(step, index) of tour.steps"
                      :key="index"
                      :step="step"
                      :previous-step="tour.previousStep"
                      :next-step="tour.nextStep"
                      :stop="tour.stop"
                      :is-first="tour.isFirst"
                      :is-last="tour.isLast"
                      :labels="tour.labels"
              >
                <template v-if="tour.currentStep === 0">
                  <div slot="actions" class="v-step__buttons">
                    <button @click="promptShow" class="v-step__button">Next</button>
                  </div>
                </template>
                <template v-if="tour.currentStep === 1">
                  <div slot="actions" class="v-step__buttons">
                    <button @click="goToEdit" class="v-step__button">Next</button>
                  </div>
                </template>
              </v-step>
            </transition>
          </template>
        </v-tour>
        <vs-table
                @search="handleSearch"
                @sort="handleSort"
                v-model="selected"
                :total="totalItems"
                max-items="10"
                search
                :data="kiosks">
          <div slot="header">
            <vs-button id="create-kiosks-button" icon="add" color="primary" @click="activePrompt = true">{{$t('Kiosk.AddKioskButton')}}</vs-button>
            <!---Add Kiosk --->
            <vs-prompt
                    color="primary"
                    @accept="acceptAlert"
                    @close="close"
                    @cancel="close"
                    :active.sync="activePrompt"
                    :title="$t('Kiosk.AddKioskPrompt.Title')"
                    :accept-text="$t('Kiosk.AddKioskPrompt.SubmitButton')"
                    :cancel-text="$t('Kiosk.AddKioskPrompt.CancelButton')"
            >
              <div>
                <div>
                  <div class="con-exemple-prompt px-4 py-3">

                    <vs-input
                            :danger="errors.name"
                            :danger-text="$t('Errors.InvalidPolite', {field: $t('Kiosk.AddKioskPrompt.Name')})"
                            :label="$t('Kiosk.AddKioskPrompt.Name')" v-model="promptData.name" class="w-100 mb-2" />
                    <vs-select
                            :danger="errors.queues"
                            :danger-text="$t('Errors.InvalidPolite', {field: $t('Kiosk.AddKioskPrompt.Queues')})"
                            :placeholder="$t('Kiosk.AddKioskPrompt.Queues')"
                            class="w-100 mb-2 mt-3"
                            :label="$t('Kiosk.AddKioskPrompt.Queues')"
                            autocomplete
                            multiple
                            v-model="promptData.queues"
                    >
                      <vs-select-item :key="index" :value="queue.id" :text="queue.title" v-for="(queue,index) in queues" />
                    </vs-select>
                    <vs-select class="w-100 mb-2 mt-3" :label="$t('Kiosk.AddKioskPrompt.Theme')" v-model="promptData.theme">
                      <vs-select-item
                              :key="index"
                              :value="item.value"
                              :text="item.text"
                              v-for="(item,index) in themes"
                      />
                    </vs-select>
                    <vs-input type="file" class="w-100 mb-2 mt-3" id="fileInput" :label="$t('Kiosk.AddKioskPrompt.Photo')" v-model="promptData.photo"/>
                    <vs-select class="w-100 mb-2 mt-3" :label="$t('Kiosk.AddKioskPrompt.Status')" v-model="promptData.status">
                      <vs-select-item :value="0" :text="$t('Kiosk.AddKioskPrompt.StatusInactive')"/>
                      <vs-select-item :value="1" :text="$t('Kiosk.AddKioskPrompt.StatusActive')"/>
                    </vs-select>
                    <vs-checkbox label="Collect customer details" class="justify-content-start w-100 mb-2 mt-4" v-model="promptData.collectDetails">
                      {{$t('Kiosk.AddKioskPrompt.CollectCustomerDetails')}}
                    </vs-checkbox>
                  </div>
                </div>
              </div>
              <v-tour name="KiosksB" :steps="steps">
                <template slot-scope="tour">
                  <transition name="fade">
                    <v-step
                            v-if="tour.currentStep === index"
                            v-for="(step, index) of tour.steps"
                            :key="index"
                            :step="step"
                            :previous-step="tour.previousStep"
                            :next-step="tour.nextStep"
                            :stop="tour.stop"
                            :is-first="tour.isFirst"
                            :is-last="tour.isLast"
                            :labels="tour.labels"
                    >
                      <template v-if="tour.currentStep === 0">
                        <div slot="actions" class="v-step__buttons">
                          <button @click="promptShowNew" class="v-step__button">Next</button>
                        </div>
                      </template>
                      <template v-if="tour.currentStep === 1">
                        <div slot="actions" class="v-step__buttons">
                          <button @click="goToEdit" class="v-step__button">Next</button>
                        </div>
                      </template>
                    </v-step>
                  </transition>
                </template>
              </v-tour>
            </vs-prompt>

            <!---Show Sectet --->
            <vs-prompt
                    color="success"
                    :active.sync="createShowSecret"
                    :title="$t('Kiosk.ShowSecretPrompt.Title')"
                    :cancel-text="$t('Kiosk.ShowSecretPrompt.CancelButton')"
                    buttonAccept="false"
            >
              <div>
                <div class="mb-4">
                  <h4 class="font-weight-light">{{$t('Kiosk.ShowSecretPrompt.Key')}}</h4>
                  <h3 class="mt-2">{{createKeyValue}}</h3>
                </div>

                <div class="mb-4">
                  <h4 class="font-weight-light">{{$t('Kiosk.ShowSecretPrompt.Secret')}}</h4>
                  <h3 class="mt-2 mb-2">{{createSecretValue}}</h3>
                  <span class="text-danger mt-2">{{$t('Kiosk.ShowSecretPrompt.SecretSave')}}</span>
                </div>
              </div>
            </vs-prompt>

            <vs-prompt
                    color="warning"
                    @accept="updateService"
                    @close="close"
                    @cancel="close"
                    :active.sync="activeUpdatePrompt"
                    :title="$t('Kiosk.EditKioskPrompt.Title')"
                    :accept-text="$t('Kiosk.EditKioskPrompt.SubmitButton')"
                    :cancel-text="$t('Kiosk.EditKioskPrompt.CancelButton')"
            >
              <div >
                <div>
                  <div class="con-exemple-prompt px-4 py-3">

                    <vs-input
                            :danger="errors.name"
                            :danger-text="$t('Errors.InvalidPolite', {field: $t('Kiosk.AddKioskPrompt.Name')})"
                            :label="$t('Kiosk.AddKioskPrompt.Name')"
                            v-model="editPromptData.name" class="w-100 mb-4" />
                    <vs-select
                            :danger="errors.queues"
                            :danger-text="$t('Errors.InvalidPolite', {field: $t('Kiosk.AddKioskPrompt.Queues')})"
                            :placeholder="$t('Kiosk.AddKioskPrompt.Queues')"
                            class="w-100 mb-4"
                            :label="$t('Kiosk.AddKioskPrompt.Queues')"
                            autocomplete
                            multiple
                            v-model="editPromptData.queues"
                    >
                      <vs-select-item :key="index" :value="queue.id" :text="queue.title" v-for="(queue,index) in queues" />
                    </vs-select>
                    <vs-select class="w-100 mt-4" :label="$t('Kiosk.AddKioskPrompt.Theme')" v-model="editPromptData.theme">
                      <vs-select-item
                              :key="index"
                              :value="item.value"
                              :text="item.text"
                              v-for="(item,index) in themes"
                      />
                    </vs-select>
                    <vs-input type="file" class="w-100 mt-4" id="editFileInput" :label="$t('Kiosk.AddKioskPrompt.Photo')" v-model="editPromptData.photo"/>
                    <vs-checkbox color="danger" class="justify-content-start w-100 mb-2 mt-2" v-if="editPromptData.photoUrl.length" v-model="editPromptData.photoDelete">{{$t('Kiosk.EditKioskPrompt.PhotoUploadedDelete')}}</vs-checkbox>
                    <p v-if="editPromptData.photoUrl.length" class="mt-2">
                      <a :href="editPromptData.photoUrl" target="_blank">{{$t('Kiosk.EditKioskPrompt.PhotoUploaded')}}</a>
                    </p>
                    <vs-select class="w-100 mt-4" :label="$t('Kiosk.AddKioskPrompt.Status')" v-model="editPromptData.status">
                      <vs-select-item :value="0" :text="$t('Kiosk.AddKioskPrompt.StatusInactive')"/>
                      <vs-select-item :value="1" :text="$t('Kiosk.AddKioskPrompt.StatusActive')"/>
                    </vs-select>
                    <vs-checkbox label="Collect customer details" class="justify-content-start w-100 mb-2 mt-4" v-model="editPromptData.collectDetails">
                      {{$t('Kiosk.AddKioskPrompt.CollectCustomerDetails')}}
                    </vs-checkbox>
                  </div>
                </div>
              </div>
            </vs-prompt>
          </div>
          <template slot="thead">
            <vs-th sort-key="name">{{$t('Kiosk.Table.Name')}}</vs-th>
            <vs-th sort-key="key">{{$t('Kiosk.Table.Key')}}</vs-th>
            <vs-th sort-key="status">{{$t('Kiosk.Table.Status')}}</vs-th>
            <vs-th sort-key="created_at">{{$t('Kiosk.Table.CreatedAt')}}</vs-th>
            <vs-th >{{$t('Kiosk.Table.Options')}}</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

              <vs-td :data="data[indextr].name">
                <div class="d-flex align-items-center">
                  <h5 class="mb-0 font-12">{{data[indextr].name}}</h5>
                </div>
              </vs-td>

              <vs-td :data="data[indextr].key">
                <div class="d-flex align-items-center">
                  <span class="">{{data[indextr].key}}</span>
                </div>
              </vs-td>

              <vs-td :data="data[indextr].status">
                <div class="d-flex align-items-center">
                    <vs-chip v-if="data[indextr].status == 0" color="danger">
                        {{$t('Kiosk.AddKioskPrompt.StatusInactive')}}
                    </vs-chip>

                    <vs-chip v-if="data[indextr].status == 1" color="success">
                        {{$t('Kiosk.AddKioskPrompt.StatusActive')}}
                    </vs-chip>
                </div>
              </vs-td>

              <vs-td :data="data[indextr].created_at">
                <div class="d-flex align-items-center">
                  <i class="mdi mdi-calendar-text mr-2 display-8"></i>
                  {{formatDate(data[indextr].created_at)}}
                </div>
              </vs-td>

              <vs-td>
                <div class="btn-alignment">
                  <vs-button radius color="warning" type="border" icon="edit" id="edit-kiosk-button" @click="openEdit(data[indextr])"></vs-button>
                  <vs-button radius color="primary" type="border" icon="lock" @click="resetSecret(data[indextr])"></vs-button>
                  <vs-button radius color="danger" type="border" icon="delete" @click="deleteKiosk(data[indextr])"></vs-button>
                </div>
              </vs-td>

            </vs-tr>
          </template>
        </vs-table>
        <vs-pagination :total="totalPages" @change="handleChangePage" v-model="currentPage"></vs-pagination>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
import { kioskService, queueService } from '../../_services'
import router from "../../_helpers/router";
// moment

export default {
  name: "Services",
  data: () => ({
    title: "Services",
    activePrompt: false,
    activeUpdatePrompt: false,
    createShowSecret: false,
    createSecretValue: '',
    createKeyValue: '',
    services: [],
    kiosks: [],
    industryServices: [],
    promptData: {name: '', photo: '', theme: 'liberrex', status: 1, collectDetails: 0, queues: []},
    editPromptData: {id: -1, name: '', photo: '', photoUrl: '', photoDelete:false, theme: 'liberrex', status: 1, collectDetails: 0, queues: []},
    selected: {},
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    maxItems:0,
    steps: [
      {
        target: 'header div .vs-button-primary',  // We're using document.querySelector() under the hood
        header: {
          title: 'Get Started',
        },
        params: {
          placement: 'right' // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
        }

      },
      {
        target: '#edit-kiosk-button',
        params: {
          placement: 'auto'
        }
      }
    ],
    themes: [
      {value: 'liberrex', text: 'Liberrex Default'},
      {value: 'light', text: 'Snowy'},
      {value: 'dark', text: 'Dracula'},
      {value: 'orange', text: 'Orangina'},
      {value: 'terra', text: 'Terra'}
    ],
    queues: [],
    errors:{
      name:false,
      queues:false
    }
  }),
  methods: {
    notify(title, text, type) {
      this.$vs.notify({
        color: type,
        title: title,
        text: text
      });
    },
    validateFields() {
      this.errors.name = this.promptData.name ? false : true
      this.errors.queues = this.promptData.queues.length > 0 ? false : true;

      let {name, queues} = this.errors;
      return !(name || queues);
    },
    validateEditPromptFields() {
      this.errors.name = this.editPromptData.name ? false : true
      this.errors.queues = this.editPromptData.queues.length > 0 ? false : true;

      let {name, queues} = this.errors;
      return !(name || queues);
    },
    reset(){
      this.promptData= {name: '', photo: '', theme: 'liberrex', status: 1, collectDetails: 0, queues: []}
    },
    showLoading(){
      this.$vs.loading({
        container: '#kiosks-box',
        scale: 0.6
      });
    },
    hideLoading(){
      this.$vs.loading.close('#kiosks-box > .con-vs-loading')
    },
    handleSelected(){
      /* eslint-disable */
      console.log(this.selected);
    },
    promptShow(){
      this.$tours['KiosksA'].stop();
      this.activePrompt=true
      this.steps[0].content=this.$t('Customer.Prompt.Content');
      this.steps[0].target='.vs-button-primary';
      this.steps[0].params.placement='auto';
      setTimeout(() => this.$tours['KiosksB'].start(), 500);
    },
    promptShowNew(){
      this.$tours['KiosksB'].stop();
      this.activePrompt = false;
      setTimeout(() => this.$tours['KiosksA'].start(1), 500);

    },
    goToEdit(){
      router.push({ path: "/feedback?istour=on" });
    },
    acceptAlert() {
      let res = this.validateFields();
      if (!res) {
        this.activePrompt = true;
        return false;
      }
      this.showLoading();

      let kioskData = new FormData();
      kioskData.append('name', this.promptData.name);
      kioskData.append('queues', this.promptData.queues.join(','));
      kioskData.append('theme', this.promptData.theme);
      kioskData.append('status', this.promptData.status);
      kioskData.append('collect_details', this.promptData.collectDetails ? 1 : 0);
      if(document.getElementById("fileInput").files[0]){
        kioskData.append('photo', document.getElementById("fileInput").files[0]);
      }
      kioskData.append('_method', 'PUT');

      kioskService.create(kioskData).then(function (data) {
          this.activePrompt = false;
          this.close();
          this.currentPage = 1;
          this.handleChangePage(this.currentPage);
          this.createKeyValue = data.key;
          this.createSecretValue = data.secret;
          this.createShowSecret = true;
        this.notify(this.$t('Toasts.Successful'), this.$t('Kiosk.AddKioskPrompt.ToastSuccess'), 'success');
      }.bind(this)).catch(function () {
        this.notify(this.$t('Toasts.Error'), this.$t('Kiosk.AddKioskPrompt.ToastFail'), 'danger');
      }.bind(this)).finally(function () {
        this.hideLoading();
      }.bind(this));
    },
    close() {
        this.createShowSecret = false;
        this.createKeyValue = '';
        this.createSecretValue = '';
        this.promptData = {name: '', photo: '', theme: 'liberrex', status: 1, queues: []};
    },
    handleSearch(keyword) {
      if(keyword == ''){
          kioskService.getAll().then(function (data) {
          this.kiosks = data.kiosks.data;
          this.totalItems = data.kiosks.total;
          this.totalPages = data.kiosks.last_page;
          this.maxItems = data.kiosks.per_page;
        }.bind(this));
      }
        kioskService.filter(keyword).then(function (data) {
        this.kiosks = data.kiosks.data;
        this.totalItems = data.kiosks.total;
      }.bind(this));
    },
    handleChangePage(page) {
        kioskService.getPage(page).then(function (data) {
        this.kiosks = data.kiosks.data;
      }.bind(this));
    },
    updateService(){
        let res = this.validateEditPromptFields();
        if (!res) {
          this.activeUpdatePrompt = true
          return false;
        }
        this.showLoading();
        let kioskData = new FormData();
        kioskData.append('name', this.editPromptData.name);
        kioskData.append('queues', this.editPromptData.queues.join(','));
        kioskData.append('theme', this.editPromptData.theme);
        kioskData.append('status', this.editPromptData.status);
        kioskData.append('deletePhoto', this.editPromptData.photoDelete);
        kioskData.append('collect_details', this.editPromptData.collectDetails ? 1 : 0);
        if(document.getElementById("editFileInput").files[0]){
          kioskData.append('photo', document.getElementById("editFileInput").files[0]);
        }
        kioskService.update(this.editPromptData.id, kioskData).then(function (data) {
          this.handleChangePage(this.currentPage);
          this.activeUpdatePrompt = false;
        this.notify(this.$t('Toasts.Successful'), this.$t('Kiosk.EditKioskPrompt.ToastSuccess'), 'success');
      }.bind(this)).catch(function () {
        this.notify(this.$t('Toasts.Error'), this.$t('Kiosk.EditKioskPrompt.ToastFail'), 'danger');
      }.bind(this)).finally(function () {
          this.hideLoading();
        }.bind(this));
    },
    handleSort(key, active) {
      /* eslint-disable */
      console.log({key, active});
    },
    formatDate: function (value) {
      let date = this.$moment(value).format('DD MMMM YYYY [at] HH:mm');
      return date;
    },
    resetSecret(kiosk){
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: this.$t('Kiosk.ResetSecretPrompt.Title'),
        text: this.$t('Kiosk.ResetSecretPrompt.Text', {name: kiosk.name}),
        acceptText: this.$t('Toasts.AcceptButton'),
        cancelText: this.$t('Toasts.CancelButton'),
        accept: function () {
          this.showLoading();
          kioskService.resetPassword(kiosk.id).then(function (data) {
            this.handleChangePage(this.currentPage);
            this.createKeyValue = data.key;
            this.createSecretValue = data.secret;
            this.createShowSecret = true;
            this.notify(this.$t('Toasts.Successful'), this.$t('Kiosk.ResetSecretPrompt.ToastSuccess'), 'success');
          }.bind(this)).catch(function () {
            this.notify(this.$t('Toasts.Error'), this.$t('Kiosk.ResetSecretPrompt.ToastFail'), 'danger');
          }.bind(this)).finally(function () {
            this.hideLoading();
          }.bind(this));
        }.bind(this)
      });
    },
    deleteKiosk(kiosk) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: this.$t('Kiosk.DeleteKioskPrompt.Title'),
        text: this.$t('Kiosk.DeleteKioskPrompt.Text', {name: kiosk.name}),
        acceptText: this.$t('Toasts.AcceptButton'),
        cancelText: this.$t('Toasts.CancelButton'),
        accept: function () {
            this.showLoading();
            kioskService.delete(kiosk.id).then(function (data) {
            this.handleChangePage(this.currentPage);
            this.notify(this.$t('Toasts.Successful'), this.$t('Kiosk.DeleteKioskPrompt.ToastSuccess'), 'success');
          }.bind(this)).catch(function () {
            this.notify(this.$t('Toasts.Error'), this.$t('Kiosk.DeleteKioskPrompt.ToastFail'), 'danger');
          }.bind(this)).finally(function () {
              this.hideLoading();
            }.bind(this));
        }.bind(this)
      });
    },
    openEdit(selected){
      let kioskConfig = JSON.parse(selected.config);
      this.editPromptData.id = selected.id;
      this.editPromptData.name = selected.name;
      this.editPromptData.queues = [...kioskConfig.queues.toString().split(',')];
      this.editPromptData.theme = kioskConfig.theme;
      this.editPromptData.status = selected.status;
      this.editPromptData.collectDetails = selected.collect_details;
      this.editPromptData.photoUrl = kioskConfig.photo ? kioskConfig.photo : "";
      this.activeUpdatePrompt = true;
    }
  },
  computed: {

  },
  mounted(){

    kioskService.getAll().then(function (data) {
      this.kiosks = data.kiosks.data;
      this.totalItems = data.kiosks.total;
      this.totalPages = data.kiosks.last_page;
      this.maxItems = data.kiosks.per_page;
    }.bind(this));

    queueService.getAllWithSummary().then(function (data) {
      this.queues = data.queues.map(obj => {
        return obj.queue;
      });
    }.bind(this));
    this.$t('Kiosk.Content').map((content,index)=> (
            this.steps[index].content = content
    ));
    this.$route.query.istour && localStorage.getItem('skipTour') !='true' ? this.$tours['KiosksA'].start() : '';
  }
};
</script>
