<template>
    <div class="DialButton" id="DialButton">
        <a href='javascript:;' :class="'btn theme-'+theme+' size-'+size+' hover-'+hover+ ' '+fontSize " @click="$emit('click')"> 
            <span v-if="placeholder && name.length==0" style="opacity: .7;font-size: 2vh;"  :style="lang=='ar'?'letter-spacing: 0 !important;font-family: Noto Sans Arabic, sans-serif;':''">{{ placeholder }}</span>
            <span v-else :style="lang=='ar'?'letter-spacing: 0 !important;font-family: Noto Sans Arabic, sans-serif;':''">{{ name }}</span>
        </a>
    </div>
</template>

<script>
    export default {
        name: 'DialButton',
        data:()=>({
            lang: localStorage.getItem('Language'),
        }),
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