<template>
  <div>
    <vs-row>
      <vs-col vs-w="12" class="mt-4">
        <vs-col vs-lg="12" vs-xs="12" class="text-center">
          <small class="text-black-50">{{$t('Copyright')}}</small>
        </vs-col>
        <vs-col vs-lg="12" vs-xs="12" class="text-center">
          <small class="text-black-50 border-right pr-2 pl-2">
            <router-link  target="_blank" to="/privacy">{{$t('Privacy')}}</router-link>
          </small>
          <small class="text-black-50 pl-2">
            <router-link  target="_blank" to="/terms">{{$t('Terms')}}</router-link>
          </small>
        </vs-col>
      </vs-col>
    </vs-row>
  </div>
</template>
<script>
export default {
  name: "AuthCopyright",
  data: () => ({
    title: "AuthCopyright",
  })
};
</script>