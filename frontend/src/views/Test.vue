<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from "vue";
import { UseWS } from "@/scripts/useWS";

onMounted(() => {
    UseWS.connect()
})
onBeforeUnmount(() => {
    UseWS.disconnect()
})
</script>

<template>
    <div class="test">
        Test.vue
    </div>
</template>

<style lang="scss" scoped>
.test {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>