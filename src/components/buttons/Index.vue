<template>
    <div>
        <button :class="'btn theme-'+theme+' size-'+size"> {{ name }} </button>
    </div>
</template>

<script>
    export default {
        name: 'DarkButton',
        props: {
            name: String,
            size: String,
            theme: String
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
    }
    .btn:hover{
        opacity: .9;
        color: #fff;
    }
    .theme-dark{
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