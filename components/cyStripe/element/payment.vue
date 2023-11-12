<script setup lang=ts>
import { loadStripe } from "@stripe/stripe-js/";

// setup
const elementType = 'payment'
const props = defineProps(
  {
    pk: {
      type: String,
      required: true,
    },
    testMode: {
      type: Boolean,
      default: false,
    },
    elementsOptions: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    confirmParams: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    redirect: {
      type: String,
      default: 'always',
    },
    createOptions: {
      type: Object,
      default: () => ({}),
    },
    stripeAccount: {
      type: String,
      default: undefined,
    },
    apiVersion: {
      type: String,
      default: undefined,
    },
    locale: {
      type: String,
      default: 'auto',
    },
    disableAdvancedFraudDetection: {
      type: Boolean,
    },
  },
)
// data
const loading = ref(false)
// const stripe = ref(null)
// const elements = ref(null)
// const element = ref(null)

// form ref
const form = ref<HTMLFormElement>()
const mount_element_mount_point = ref<HTMLElement | string>('')

// type script error
// if(props.disableAdvancedFraudDetection){
//   loadStripe.setLoadParameters({advancedFraudSignals:false})
// }
const stripeOptions = ref({
  stripeAccount: props.stripeAccount,
  apiVersion: props.apiVersion,
  locale: props.locale
})

const stripe = ref(await loadStripe(props.pk, stripeOptions.value as any))
const elements = ref(stripe.value?.elements(props.elementsOptions))
const element = ref(elements.value?.create(elementType, props.createOptions))
element.value?.mount(mount_element_mount_point.value)
</script>

<template>
  <div>
    <form ref="form" action="">
      <div ref="mount_element_mount_point">

        <slot name="stripe-payment-element-errors">
          <div id="stripe-payment-element-errors" role="alert" />
        </slot>
      </div>
    </form>
  </div>
</template>

<style scoped>
</style>
