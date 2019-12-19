import Vue from 'vue'
import AccordionDemo from './accordion-demo.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(AccordionDemo),
}).$mount('#accordion-demo')
