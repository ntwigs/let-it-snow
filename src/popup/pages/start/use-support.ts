import { useState, useEffect } from 'react'
import { IS_SUPPORTED } from '../../../support/globals'

type Support = {
  isError: boolean
  isLoading: boolean
}
export const useSupport = (): Support => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isError, setError] = useState<boolean>(false)

  useEffect(() => {
    const sendSupportCheck = async () => {
      try {
        const [tabData] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        })

        if (!tabData.id) throw new Error()

        const result = await chrome.tabs.sendMessage(tabData.id, {
          message: IS_SUPPORTED,
        })

        if (!result) {
          setError(true)
        }
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    sendSupportCheck()
  }, [])

  return {
    isLoading,
    isError,
  }
}
