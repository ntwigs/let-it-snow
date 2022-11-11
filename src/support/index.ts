import { IS_SUPPORTED } from './globals'

const addSupportListener = () => {
  chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    const isSupported = request.message === IS_SUPPORTED
    isSupported && sendResponse(true)
  })
}

addSupportListener()
