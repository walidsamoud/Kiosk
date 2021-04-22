<template>
    <div class="languages row">
        <span>English</span>
        <span>|</span>
        <span>Francais</span>
        <span>|</span>
        <span>العربية</span>
    </div>
</template>

<script>
    export default {
        name: 'Languages select',
        props: {
        }
    }
</script>

<style lang="less" scoped>
    .languages{
        border-radius: 50px;
        display: none;
    }
</style>