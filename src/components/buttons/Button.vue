<template>
    <div class="col" id="Button">
        <a 
            :href='href' 
            :class="'btn theme-'+theme+' size-'+size+' hover-'+hover" 
            @click="$emit('click')"
            :style="lang=='ar'?'letter-spacing: 0 !important;font-family: Noto Sans Arabic, sans-serif;':''"
        > {{ name }}</a>
    </div>
</template>

<script>
    export default {
        name: 'Button',
        data:()=>({
            lang: localStorage.getItem('Language'),
        }),
        props: {
            name: String,
            size: String,
            theme: String,
            hover: String,
            href: String,
        }
    }
</script>