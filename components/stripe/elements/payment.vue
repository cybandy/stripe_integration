<script setup >
import {loadStripe} from '@stripe/stripe-js/dist/pure.esm.js'
// setup 
const ELEMENT_TYPE = 'payment';
const props = defineProps({
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
      // required: true,
      default: () => ({}),
    },
    confirmParams: {
      type: Object,
      // required: true,
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
    success:Boolean,
    customerAddressInfo:{
      type:Object,
      required:true
    }
  })

const form = computed(()=>{
  return document.getElementById('stripe-payment-element-form')
})
if(props.disableAdvancedFraudDetection){
  loadStripe.setLoadParameters({ advancedFraudSignals: false });
}

const stripeOptions = {
  stripeAccount: props.stripeAccount,
  apiVersion: props.apiVersion,
  locale: props.locale
}

const stripe = await loadStripe(props.pk)


const elements = stripe.elements({
  clientSecret: props.elementsOptions.clientSecret,
  appearance: props.elementsOptions.appearance || {}
})
const element = elements.create(ELEMENT_TYPE, props.createOptions)

onMounted(()=>{
  element.mount('#stripe-payment-element-mount-point');
})

element.on('change', event => {
      var displayError = document.getElementById(
        'stripe-payment-element-errors',
      );
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
      // this.onChange(event);
    });


// payment handler 
const emits = defineEmits(['update:success'])


const address = props.customerAddressInfo
async function handlePayment(e){
  e.preventDefault()
  // todo
  const {error, paymentIntent} = await stripe.confirmPayment(
    {
      elements,
      // clientSecret: props.elementsOptions.clientSecret,
      confirmParams:{
        return_url: `${window.origin}/checkout/success`,
        // shipping:{
        //   city: address.city,
        //   country: address.country_code.toUpperCase(),
        //   postal_code: address.postal_code,
        //   line1: address.address_1,
        //   line2: address.address_2,
        //   name: `${address.first_name} ${address.last_name}`
        // }
      }
    }
  )
  // const {error, paymentIntent} = await stripe.confirmP
  if(error){
    const errorElement = document.getElementById('stripe-payment-element-errors')
    errorElement.textContent = error.message
    emits('update:success', false)
    return
  }else if(paymentIntent){
    emits('update:success', true)
  }
}
console.log(props.elementsOptions.clientSecret)
console.log(element)
</script>

<template>
  <div>
    <form @submit="handlePayment" id="stripe-payment-element-form"
      class="space-y-5"
    >
      <div id="stripe-payment-element-mount-point" />
      <slot name="stripe-payment-element-errors">
        <div id="stripe-payment-element-errors" role="alert" />
      </slot>
      <div class="flex">
        <UButton variant="solid" ref="submitButtonRef" type="submit" label="Pay" icon="i-heroicons-currency-euro-20-solid" />
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>
