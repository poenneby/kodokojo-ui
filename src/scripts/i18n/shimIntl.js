export const shimIntl = (callback) => {
  if (!window.Intl) {
    require(['intl'], (Intl) => {
      window.Intl = Intl
      callback()
    })
  } else {
    setTimeout(callback, 0)
  }
}
