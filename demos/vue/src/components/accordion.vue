<style lang="scss" scoped>
    .accordion {margin: 0; padding: 0; border: 2px solid #D1D1D1; border-radius: 7px; display: block; width: 35em;}
</style>

<template>
    <div class="accordion">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    props: {},
    provide() {
      return { Accordion: this.Accordion };
    }
  };
</script>

