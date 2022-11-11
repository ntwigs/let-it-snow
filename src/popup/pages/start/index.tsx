import { Options } from '../options'
import { Unsupported } from '../unsupported'
import { useEffect, useState } from 'react'
import { IS_SUPPORTED } from '../../../support/globals'
import { Container } from '../../components/container'

type Support = {
  isError: boolean
  isLoading: boolean
}
const useSupport = (): Support => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isError, setError] = useState<boolean>(false)

  useEffect(() => {
    const sendSupportCheck = async () => {
      try {
        const [tabData] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        })

        const result = await chrome.tabs.sendMessage(tabData.id!, {
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

export const Start = () => {
  const { isLoading, isError } = useSupport()

  if (isLoading) return <Container />
  if (isError) return <Unsupported />

  return <Options />
}
