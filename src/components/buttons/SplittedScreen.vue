<template>
    <div id="SplittedScreen">
        <!-- <LbrxLanguageSelector @change="$router.go()" class="language"></LbrxLanguageSelector> -->
        <div class="row" v-if="kiosk_config.multi_language && kiosk_config.multi_language!='false'" style="position: absolute;right: 30px;z-index: 9999;opacity: 1 !important;">
            <div class="col language_select" style="margin: 10px 25px -10px 25px !important;">
            <LbrxLanguageSelector></LbrxLanguageSelector>
            </div>
        </div>
        <div class="row p-0 m-0">
            <div class="col-md-6 col-lg-6 col-sm-12 p-0 m-0 left" @click="optedFor('Booking')">
                <div class="content">
                    <div class="icon">
                        <img src="/calendar.png" alt="">
                    </div>
                    <span>{{$t('New.RDV')}}</span>
                </div>
            </div>
            <div class="col-md-6 col-lg-6 col-sm-12 p-0 m-0 right" @click="optedFor('Queue')">
                <div class="content">
                    <div class="icon">
                        <img src="/waiting-room.png" alt="">
                    </div>
                    <span>{{$t('New.QUEUE')}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LbrxLanguageSelector from '../../components/LanguageSelector/LanguageSelector.vue';
export default({
    data:()=> ({
        kiosk: JSON.parse(localStorage.getItem('kiosk')).kiosk,
        kiosk_config: JSON.parse( JSON.parse(localStorage.getItem('kiosk')).kiosk.config )
    }),
    methods:{
        optedFor(choice){
            this.$emit('optedFor', choice)
        }
    },
    components:{
        LbrxLanguageSelector
    }
})
</script>

<style scoped lang="scss">
    #SplittedScreen{
        .language{
            position: absolute;
            right: 30px;
            top: 30px;
            color: #fff;
            z-index: 99999;
        }
        .row{
            z-index: 99;
            .left{
                background: var(--primary);
                color: var(--font);
            }
            .right{
                background: var(--secondary);
                color: var(--font);
            }
            div{
                position: relative;
                cursor: pointer;
                transition: .5s;
                .content{
                    text-align: center;
                    height: 100vh;
                    margin-top: 40%;
                    transform: translate(0%, -10%);
                    color: #fff;
                    .icon{
                        width: 100%;
                        margin-bottom: 20px;
                        img{
                            width: 20vw;
                            height: 20vw;
                        }
                    }
                    span{
                        font-size: 4vw;
                        letter-spacing: 3px;
                        text-transform: uppercase;
                    }
                }
            }
            div:hover{
                opacity: .9;
            }
        }
    }
</style>