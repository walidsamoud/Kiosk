<template>
    <div class="col">
        <button :class="'btn theme-'+theme+' size-'+size+' hover-'+hover"> {{ name }} <i class="fa fa-home"></i></button>
    </div>
</template>

<script>
    export default {
        name: 'Dark button',
        props: {
            name: String,
            size: String,
            theme: String,
            hover: String,
        }
    }
</script>

<style scoped>
    .btn{
        width: 100%;
        border-radius: 0px;
        font-size: 20px;
        background-color: #193060;
        color: #fff;
        cursor: pointer;
        transition: .3s;
        border: none;
    }
    .hover-true:hover{
        opacity: .9;
        color: #fff;
    }
    .theme-dark{
        border: 1px solid #193060;
        background-color: #193060;
        color: #fff;
    }
    .theme-medium{
        background-color: #264076;
        color: #fff;
    }
    .theme-light{
        background-color: #294786;
        color: #fff;
    }
    .size-large{
        font-size: 30px;
        height: 100px;
    }
    .size-medium{
        font-size: 25px;
        height: 75px;
    }
    .size-small{
        font-size: 20px;
        height: 50px;
    }
</style>