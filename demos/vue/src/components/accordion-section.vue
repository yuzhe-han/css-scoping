<style lang="scss" scoped>
    button { border-style: solid none none none; }
    .trigger, .panel { border-top: 1px solid #D1D1D1; }
    .trigger { background: #E1EDFE; display: block; font-size: 1rem; font-weight: normal; margin: 0; padding: 1em 1.5em; position: relative; text-align: left; width: 100%; outline: none; }
    .trigger:focus, .button:hover { background: #a9c8f5; }
    .trigger:focus .title { border-color: #79ADFB; }
    .icon {border: solid #9E9E9E; border-width: 0 2px 2px 0; height: 0.5rem; pointer-events: none; position: absolute; right: 2em; top: 50%; transform: translateY(-60%) rotate(45deg); width: 0.5rem;}
    .trigger:focus .icon, .button:hover .icon { border-color: #79ADFB; }
    .trigger[aria-expanded="true"] .icon { transform: translateY(-50%) rotate(-135deg); }
    .panel { margin: 0; padding: .5em 2em; line-height: 1;}
    .title {display: block; pointer-events: none; border: transparent 2px solid; border-radius: 5px; padding: 0.25em 2em 0.25em 0.25em; outline: none;}
    .content {border: 1px solid red; width: 9em; padding: .5em;}

    /* same selector name as the containing page */
    .title { color: purple; }
    .content { color: red; background-color: lightblue;   }
</style>

<template>
    <div>
        <button class='trigger' @click="open()" ref="trigger" aria-expanded="true">
            <span class="title">
              <slot name="title">section title missing</slot>
              <span class="icon"></span>
            </span>
        </button>
        <div id="sect" ref="panel" class="panel">
            <div v-if="includeAccordionContent" class="content"> Accordion Content</div>
            <br />
            <slot v-if="includeSlotContent" name="content">section panel missing</slot>
            <slot name="description">section description is missing</slot>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
        includeAccordionContent: {
            type: Boolean,
            default: true
        },
        includeSlotContent: {
            type: Boolean,
            default: true
        }
    },
    inject: [],
    methods: {
      open() {
          let trigger = this.$refs.trigger;
          let isExpanded = trigger.getAttribute('aria-expanded') == 'true';
          if (!isExpanded) {
              trigger.setAttribute('aria-expanded', 'true');
              this.$refs.panel.removeAttribute('hidden');
          }
          else {
              trigger.setAttribute('aria-expanded', 'false');
              this.$refs.panel.setAttribute('hidden', '');
          }
      },
    },
  };
</script>

