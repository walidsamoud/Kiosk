<template>
    <div class="DialButton" id="DialButton">
        <a href='javascript:;' :class="'btn theme-'+theme+' size-'+size+' hover-'+hover+ ' '+fontSize " @click="$emit('click')"> 
            <span v-if="placeholder && name.length==0" style="opacity: .7;font-size: 2vh;">{{ placeholder }}</span>
            <span v-else>{{ name }}</span>
        </a>
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
            font: String,
            placeholder: String
        },
        computed: {
            fontSize: function () {
                return this.font ? "font-"+this.font : "";
            }
        }
    }
</script>