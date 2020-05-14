<template>
  <div>
    <div class="profile-pic mb-3 mt-3" align="center">
      <img :src="user.photo.length > 0 ? user.photo : require('@/assets/images/users/1.jpg')" width="150" class="rounded-circle" alt="user" />
      <h4 class="mt-3 mb-0">{{user.fname+' '+user.lname}}</h4>
      <a href="mailto:danielkristeen@gmail.com">{{user.email}}</a>
    </div>
    <div class="d-flex justify-content-center">
      <div class="badge badge-pill badge-light px-3 py-2"><b>{{$t('Profile.MemberSince')}}:</b> {{user.created_at.substring(0,10)}}</div>
    </div>
    <hr class="custom-hr" />
    <div class="px-3 py-2">
      <vs-row>
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="6"
          vs-sm="12"
          vs-xs="12"
          class="text-center border-right"
        >
          <a href="javascript:;" @click="openModal" class="text-dark d-flex align-items-center justify-content-center">
            <i class="mdi mdi-lock mr-1"></i>{{$t('Profile.UpdatePasswordButton')}}
          </a>
        </vs-col>
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="6"
          vs-sm="12"
          vs-xs="12"
          class="text-center"
        >
          <a href="javascript:;" class="text-dark d-flex align-items-center justify-content-center" @click="deleteAccount">
            <i class="mdi mdi-delete mr-1"></i>{{$t('Profile.DeleteAccountButton')}}
          </a>
        </vs-col>
      </vs-row>
    </div>

    <PasswordUpdatePrompt ref="password"></PasswordUpdatePrompt>
  </div>
</template>
<script>
import PasswordUpdatePrompt from "../../profile/PasswordUpdatePrompt";
export default {
  name: "ProfileSummary",
  data: () => ({
    title: "ProfileSummary",
    passwordUpdateStatus: false
  }),
  props:{
    user: Object
  },
  mounted() {
  },
  methods: {
    openModal() {
      this.$refs.password.show()
    },
    notify(title, text, type) {
      this.$vs.notify({
        color: type,
        title: title,
        text: text
      });
    },
    showLoading(){
      this.$vs.loading({
        container: '#profile-box',
        scale: 0.6
      });
    },
    hideLoading(){
      this.$vs.loading.close('#profile-box > .con-vs-loading')
    },
    deleteAccount(){
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: this.$t('Profile.DeleteAccount.Title'),
        text: this.$t('Profile.DeleteAccount.Text'),
        acceptText: this.$t('Toasts.AcceptButton'),
        cancelText: this.$t('Toasts.CancelButton'),
        accept: function () {

        }
      })
    }
  },
  components:{
    PasswordUpdatePrompt
  }
};
</script>