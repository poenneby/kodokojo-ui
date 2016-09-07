import {
  CAPTCHA_UPDATE,
  CAPTCHA_RESET
} from '../../commons/constants'

// TODO TU
export function updateCaptcha(captcha) {
  return {
    type: CAPTCHA_UPDATE,
    payload: {
      captcha
    }
  }
}

export function resetCaptcha() {
  return {
    type: CAPTCHA_RESET
  }
}
