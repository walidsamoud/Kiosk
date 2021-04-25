<template>
    <div class="col">
        <input type="checkbox" :value="value" class="checkbox" :id="'checkbox'+id" name="services"/>
        <label :for="'checkbox'+value.id" :id="'label'+value.id" v-on:click="checkService(value.id)" :class="'btn theme-'+theme+' size-'+size+' hover-'+hover"> {{ name }} </label>
    </div>
</template>

<script>
    import $ from "jquery";

    export default {
        name: 'ServiceSelector',
        props: {
            name: String,
            size: String,
            theme: String,
            hover: String,
            value: Object
        },
        methods:{
            checkService: function(id){
                var checkBox = $(":checkbox[value="+id+"]");
                if( !checkBox.prop('checked') ){
                    $('#label'+id).css("border-left", "15px solid rgba(22, 214, 22, 0.7)");
                }else{
                    $('#label'+id).css("border-left", "15px solid #294786");
                }
            }
        }
    }
</script>

<style scoped>
    .btn{
        width: 97%;
        border-radius: 0px;
        font-size: 20px;
        background-color: #193060;
        color: #fff;
        cursor: pointer;
        transition: .3s;
        border: none;
        letter-spacing: 2px;
        display: inline-block;
        border-left: 15px solid #294786 ;
        padding-top: 17px;
        /* rgba(22, 214, 22, 0.534) */
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
        background-color: #193060;
        color: #fff;
    }
    .theme-light{
        background-color: #193060;
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
    .checkbox{
        display: none;
    }
</style>