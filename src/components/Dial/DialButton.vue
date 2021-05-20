<template>
    <div class="DialButton" id="DialButton">
        <a href='javascript:;' :class="'btn theme-'+theme+' size-'+size+' hover-'+hover+ ' '+fontSize " @click="$emit('click')"> {{ name }}</a>
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
        },
        computed: {
            fontSize: function () {
                return this.font ? "font-"+this.font : "";
            }
        }
    }
</script>