<template>
    <div class="language_buttons">
        <div class="r">
            <langAr></langAr>
        </div>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import LangAr from './../../components/buttons/Lang_ar.vue';

export default defineComponent({
    name: "TestContainer",
    components: {
        LangAr
    },
})
</script>

<style scoped>
    .language_buttons{
        position: absolute;
        bottom: 0px;
    }
</style>
