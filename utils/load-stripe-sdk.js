import { STRIPE_JS_SDK_URL } from "./constants";

export const loadStripeSdk = ({ version = 'v3', disableAdvancedFraudDetection = true }, callback) => {
  if (process.client) {
    if (window?.Stripe) {
      callback()
      return;
    }
    const url = ref(`${STRIPE_JS_SDK_URL}/${version}`)
    if (disableAdvancedFraudDetection) {
      url.value += '?advancedFraudSignals=false'
    }
    const e = document.createElement('script')
    e.src = url.value;
    e.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(e);
    e.addEventListener('load', callback());

  } else {
    return
  }
}
