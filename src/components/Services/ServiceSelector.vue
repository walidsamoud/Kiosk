<template>
    <div class="col" id="ServiceSelector">
        <input type="checkbox" :value="value.id" class="checkbox" :id="'checkbox'+value.id" name="services"/>
        <label 
            :for="'checkbox'+value.id" 
            :id="'label'+value.id" 
            v-on:click="checkService(value.id)" 
            :class="'btn theme-'+theme+' size-'+size+' hover-'+hover"
        > 
                {{ name }} 
        </label>
    </div>
</template>

<script>
    import $ from "jquery";

    export default {
        name: 'ServiceSelector',
        data:()=>({
            config: JSON.parse( JSON.parse(localStorage.getItem('kiosk')).kiosk.config ),
            secondary:'#6c757d'
        }),
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
                    this.$emit("checked");
                }else{
                    $('#label'+id).css("border-left", "15px solid "+this.secondary);
                    this.$emit("unchecked");
                }
            }
        },
        mounted(){
            this.secondary= (this.config.secondary)?this.config.secondary:'#6c757d'
        }
    }
</script>