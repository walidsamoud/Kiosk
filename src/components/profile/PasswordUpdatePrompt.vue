<template>
  <div>
    <vs-prompt
            color="primary"
            @cancel="reset"
            @accept="updatePassword"
            @close="reset"
            :is-valid="validPassword"
            :title="$t('Profile.UpdatePasswordPrompt.Title')"
            :accept-text="$t('Profile.UpdatePasswordPrompt.ConfirmButton')"
            :cancel-text="$t('Profile.UpdatePasswordPrompt.CancelButton')"
            :active.sync="isActive">
      <div class="con-exemple-prompt">
        <vs-input :placeholder="$t('Profile.CurrentPassword')" class="w-100 mb-4 mt-4" v-model="current_password" type="password"/>
        <vs-input :placeholder="$t('Profile.NewPassword')" class="w-100 mb-4" v-model="password" type="password"/>
        <vs-input :placeholder="$t('Profile.PasswordConfirm')" class="w-100 mb-4" v-model="password_confirm"  type="password"/>
        <vs-alert :active="!validPassword" color="danger" icon="new_releases" >
          {{$t('Profile.PasswordErrorMessage')}}
        </vs-alert>
      </div>
    </vs-prompt>
  </div>
</template>
<script>
import { userService } from '../../_services'
export default {
  name: "PasswordUpdatePrompt",
  data: () => ({
    title: "PasswordUpdatePrompt",
    isActive: false,
    password: '',
    password_confirm: '',
    current_password: ''
  }),
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
        container: '#profile-box',
        scale: 0.6
      });
    },
    hideLoading(){
      this.$vs.loading.close('#profile-box > .con-vs-loading')
    },
    show(){
      this.isActive = true
    },
    hide(){
      this.isActive = false
    },
    updatePassword(){
      this.showLoading();
      let payload = {oldpassword: this.current_password, newpassword: this.password};
      userService.updatePassword(payload).then(function () {
        this.reset();
        this.hide();
        this.notify(this.$t('Toasts.Successful'), this.$t('Profile.UpdatePasswordPrompt.ToastSuccess'), 'success');
      }.bind(this)).catch(function () {
        this.notify(this.$t('Toasts.Error'), this.$t('Profile.UpdatePasswordPrompt.ToastFail'), 'danger');
      }.bind(this)).finally(function () {
        this.hideLoading();
      }.bind(this))

    },
    reset(){
      this.password='';
      this.password_confirm='';
      this.current_password='';
    }
  },
  computed: {
    validPassword() {
      return (this.password.length > 0 && this.password_confirm.length > 0)
              && (this.password.length > 5)
              && (this.password == this.password_confirm);
    }
  }
};
</script>