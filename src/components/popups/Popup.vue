<template>
    <div class="loading-wrapper">
        <div class="loading-popup success">
            <div class="h-100 m-5 align-items-center text-center m-0">
                <div class="row">
                    <div class="col align-items-center">
                        <div class="float-left">
                            <img class="icon" :src="require('@/assets/images/check-circle.png')" />
                        </div>
                        <div class="text-left d-inline-block">
                            <h2 class="title-success">{{title}}</h2>
                            <span class="message">{{message}}</span>
                        </div>
                    </div>
                </div>

                <div class="text-center mt-4">
                    <span class="hint">{{hint}}</span>
                </div>

                <button class="btn-success">{{confirmationButton}}</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'LoadingPopup',
        props: {
            title: String,
            message: String,
            hint: String,
            type: String,
            confirmationButton: String
        }
    }
</script>

<style scoped>
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

    .title-success {
        color: #89d24c !important;
        margin-bottom: 0px;
        font-size: 46px !important;
        display: flex;
    }

    .loading-popup .icon {
        width: 75px;
        margin: 10px 10px;
    }

    .loading-popup .message {
        color: #444;
        font-weight: lighter;
        font-size: 18px;
    }

    .loading-popup .hint {
        color: #333;
        font-weight: bold;
        font-size: 16px;
    }

    .loading-popup .btn-success {
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

    .btn-success:not(:disabled):not(.disabled):active, .btn-success:not(:disabled):not(.disabled).active, .show > .btn-success.dropdown-toggle {
        color: #fff;
        background-color: #72b53a;
        border-color: #72b53a;
    }

    .btn-success:focus, .btn-success.focus {
        box-shadow: none;
    }
</style>