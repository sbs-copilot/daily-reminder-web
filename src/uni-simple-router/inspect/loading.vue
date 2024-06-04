
<template>
    <view class="bg"><view class="loading"></view></view>
</template>
<script>
export default {
    data(){
        return {
            __router_main_mark__:"uni-simple-router-v3"
        }
    },
    onLoad(options){
        const router = uni.$Router;
        if(router && router._launched){
            const start_location_normalized = router.utils.START_LOCATION_NORMALIZED();

            router.currentRoute.value = start_location_normalized;
            router.utils.locationAppHome(router,false,options)();
        }
    },
}
</script>
<style>
.bg{
    background-color: #fffeff;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
.loading {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 60rpx;
    height: 60rpx;
    margin-left: -30rpx;
    margin-top: -30rpx;
    border: 4rpx solid #000;
    border-top-color: rgba(0, 0, 0, 0.1);
    border-right-color: rgba(0, 0, 0, 0.1);
    border-bottom-color: rgba(0, 0, 0, 0.1);
    border-radius: 100%;
    animation: circle infinite 0.75s linear;
}
@keyframes circle {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
