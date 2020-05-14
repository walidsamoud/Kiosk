<template>
	<div id="customizer-panel">
	<vs-button @click.stop="active=!active" color="primary" class="btn-customizer" type="filled"><vs-icon icon="help"></vs-icon></vs-button>
	<vs-sidebar position-right parent="body" default-index="1"  color="primary" class="customizer-panel" spacer v-model="active">
		<div class="d-flex">
			<h4 class="font-weight-bold">{{$t('Help.NeedHelp')}}</h4>
			<span @click.stop="active=!active" class="cursor-pointer ml-auto"><vs-icon icon="close"></vs-icon></span>
		</div>
    <vs-divider></vs-divider>
    <h5 class="mt-4 mb-3">{{$t('Help.TechnicalProblemTitle')}}</h5>
    <p class="mb-4"> {{$t('Help.TechnicalProblemText')}}</p>
    <vs-divider></vs-divider>
    <!-- THEME -->
    <div class="mt-4">
        <!-- <vs-switch v-model="theme_dark" vs-icon-off="wb_sunny" vs-icon-on="brightness_2" color="dark" /> -->
        <h5 class="mb-2">{{$t('Help.UserGuideTitle')}}</h5>
        <p class="mb-4">{{$t('Help.UserGuideText')}} <a href="#">{{$t('Help.UserGuideLinkText')}}</a> </p>
    </div>
    <vs-divider></vs-divider>
    <h5 class="mt-4 mb-3">{{$t('Help.MembershipTitle')}}</h5>
        <p class="mb-4">{{$t('Help.MembershipText')}}</p>
        <vs-button @click="goToMembership()" color="primary" class="w-100"> {{$t('Help.MembershipButton')}} </vs-button>
    </vs-sidebar>
  </div>

</template>

<script>
	export default {
	name : 'Customizer',
	data:()=>({
		themeColors: ['#4e31ef', '#36bea6', '#f62d51', '#ffbc34', '#212529'],
		topbarColor: '#2962ff',
		updatedThemeColor: '#2962ff',
		active:false
	}),

	computed: {
		topbarColorControl: {
            get() { return this.topbarColor; },
            set(val) { this.$emit('updateTopbarColor', val) }
        },
        theme: {
            get() {
                return this.$store.state.theme;
            },
            set(val) {
                this.$store.commit('SET_THEME', val);
            }
        },
        themeColor: {
            get() { return this.$store.state.themeColor },
            set(val) { this.$store.commit('SET_THEME_COLOR', val) }
        },
	},
	methods: {
		themeColorControl(color) {
            this.themeColor = color;
            this.$vs.theme({ primary: color });
        },
        goToMembership(){
		    this.active = false;
		    this.$router.push({path: '/settings/membership', query: {force: "LIBERUP"}});
        }
	}
}
</script>
