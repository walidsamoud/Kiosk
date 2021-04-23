<template>
    <div class="DialButton">
        <a :href='href' :class="'btn theme-'+theme+' size-'+size+' hover-'+hover"> {{ name }}</a>
    </div>
</template>

<script>
    export default {
        name: 'DialButton',
        props: {
            name: String,
            theme: String,
            hover: String,
            size: String,
        }
    }
</script>

<style scoped>
    .btn{
        width: 100%;
        border-radius: 0px;
        font-size: 25px;
        color: #fff;
        cursor: pointer;
        transition: .3s;
        border: none;
        letter-spacing: 2px;
        border-radius: 5px;
        height: 50px;
        padding-top: -10px;
    }
    .theme-outline.hover-true:hover{
        opacity: .8;
        color: #fff;
    }
    .theme-default.hover-true:hover{
        opacity: .8;
        color: #264076;
    }
    .theme-outline{
        border: 1px solid #fff;
        background-color: transparent;
        color: #fff;
    }
    .theme-default{
        background-color: #fff;
        color: #264076;
    }
    .size-large{
        font-size: 30px;
        height: 100px;
        padding-top: 20px;
    }
    .size-medium{
        font-size: 25px;
        height: 74px;
        padding-top: 15px;
    }
    .size-small{
        height: 50px;
    }
</style>