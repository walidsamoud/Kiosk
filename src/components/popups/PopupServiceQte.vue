<template>
    <div class="loading-wrapper" v-if="isActive">
        <div :class="'loading-popup popup-' + type">
            <div class="h-100 m-5 align-items-center text-center m-0">
                <div class="row">
                    <div class="col align-items-center">
                        <div class="text-left d-inline-block">
                            <h2 class="popup-title" style="font-size: 17px;">{{title}}</h2>
                            <span class="message">{{message}}</span>
                        </div>
                    </div>
                </div>

                <div class="text-center mt-4" v-if="hint">
                    <span class="hint">{{hint}}</span>
                </div>

                <div class="text-center mt-4 mb-4">
                    <input 
                        type="number"
                        step="1"
                        placeholder="Nb de fois"
                        minlength="1"
                        maxlength="10"
                        style="border: 1px solid #bbb;border-radius: 5px;padding: 5px;width: 50%;text-align: center;"
                        v-model="qte"
                    />
                </div>
                
                <label style="bottom: -7px;" :for="'checkbox'+item.id" class="btn-confirm" @click="clicked()">{{confirmationButton}}</label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'LoadingPopup',
        data:()=>({
            qte: 1
        }),
        props: {
            active: Boolean,
            title: String,
            message: String,
            hint: String,
            type: String,
            confirmationButton: String,
            item: Object
        },
        methods: {
            clicked(){
                this.$emit('update:active', false);
                this.$emit('confirm', this.item, this.qte, true);
            }
        },
        computed: {
            isActive(){
                return this.active;
            }
        }
    }
</script>

<style>
    .loading-wrapper{
        background: rgba(0, 0, 0, 0.70);
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
    }

    .loading-popup{
        width: 60%;
        min-width: 320px;
        max-width: 500px;
        height: 300px;
        background: #ffffff;
        border-radius: 20px;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        color: #264076;
    }

    .loader{
        width: 50px;
        height: 50px;
    }

    .popup-success .popup-title {
        color: #89d24c !important;
        margin-bottom: 0px;
        font-size: 42px !important;
        display: flex;
    }

    .popup-success  .icon {
        width: 70px;
        margin: 10px 10px;
    }

    .popup-success  .message {
        color: #444;
        font-weight: lighter;
        font-size: 18px;
    }

    .popup-success  .hint {
        color: #333;
        font-weight: bold;
        font-size: 16px;
    }

    .popup-success .btn-confirm {
        position: absolute;
        bottom: 0;
        left: 0;
        border-radius: 0px 0px 20px 20px;
        padding: 15px;
        width: 100%;
        border: none;
        background: #89d24c;
        color: #fff;
        font-weight: 400;
        font-size: 22px;
    }

    .popup-success .btn-confirm:not(:disabled):not(.disabled):active, .btn-confirm:not(:disabled):not(.disabled).active, .show > .btn-confirm.dropdown-toggle {
        color: #fff;
        background-color: #72b53a;
        border-color: #72b53a;
    }

    .popup-success .btn-confirm:focus, .btn-confirm.focus {
        box-shadow: none;
    }

    .popup-danger .popup-title {
        color: #DC3545 !important;
        margin-bottom: 0px;
        font-size: 42px !important;
        display: flex;
    }

    .popup-danger  .icon {
        width: 70px;
        margin: 10px 10px;
    }

    .popup-danger  .message {
        color: #444;
        font-weight: lighter;
        font-size: 18px;
    }

    .popup-danger  .hint {
        color: #333;
        font-weight: bold;
        font-size: 16px;
    }

    .popup-danger .btn-confirm {
        position: absolute;
        bottom: 0;
        left: 0;
        border-radius: 0px 0px 20px 20px;
        padding: 15px;
        width: 100%;
        border: none;
        background: #DC3545;
        color: #fff;
        font-weight: 400;
        font-size: 22px;
    }

    .popup-danger .btn-confirm:not(:disabled):not(.disabled):active, .btn-confirm:not(:disabled):not(.disabled).active, .show > .btn-confirm.dropdown-toggle {
        color: #fff;
        background-color: #DC3545;
        border-color: #DC3545;
    }

    .popup-danger .btn-confirm:focus, .btn-confirm.focus {
        box-shadow: none;
    }

</style>