<script lang="ts" setup>

</script>

<template>
    <div class="logical-root">
        <router-view/>
    </div>
</template>

<style lang="scss" scoped>
@use "src/styles/mixins";

.logical-root {
    @include mixins.scrollBarStyle();
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>