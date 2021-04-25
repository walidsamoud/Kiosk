<template>
    <div class="col">
        <a :href='href' :class="'btn theme-'+theme+' size-'+size+' hover-'+hover"> {{ name }}</a>
    </div>
</template>

<script>
    export default {
        name: 'Button',
        props: {
            name: String,
            size: String,
            theme: String,
            hover: String,
            href: String,
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
        letter-spacing: 2px;
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
        padding-top: 20px;
    }
    .size-medium{
        font-size: 25px;
        height: 75px;
        padding-top: 15px;
    }
    .size-small{
        font-size: 20px;
        height: 50px;
        padding-top: 10px;
    }
</style>