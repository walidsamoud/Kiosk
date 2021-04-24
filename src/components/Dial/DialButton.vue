<template>
    <div class="DialButton">
        <a :href='href' :class="'btn theme-'+theme+' size-'+size+' hover-'+hover" :id="'DialButton'+name" v-on:click="type(name)"> {{ name }}</a>
    </div>
</template>

<script>
    import $ from "jquery";

    export default {
        name: 'DialButton',
        props: {
            name: String,
            theme: String,
            hover: String,
            size: String,
        },
        methods:{
            type: function(symbol){
                if(symbol<=9 || symbol>=0){
                    $('#DialButton').html( $('#DialButton').html()+symbol  );
                }else if(symbol=='X'){
                    $('#DialButton').html('');
                }else if(symbol=='<'){
                    $('#DialButton').html( $('#DialButton').html().substring(0, $('#DialButton').html().length - 1) );
                }else{
                    return false;
                }
            }
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