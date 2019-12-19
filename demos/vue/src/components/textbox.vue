<style lang="scss" scoped>
    .content { border: 1px solid red; width: 9em; padding: .5em;}

    /** styles used for demo */
    .content {color: darkblue; background-color: #00B7FF;}
</style>

<template>
    <div class="content">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {},
        provide() {
            return { Textbox: this.Textbox };
        }
    };
</script>

