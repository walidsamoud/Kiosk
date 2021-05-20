<template>
    <div class="col" id="Button">
        <a :href='href' :class="'btn theme-'+theme+' size-'+size+' hover-'+hover" @click="$emit('click')"> {{ name }}</a>
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