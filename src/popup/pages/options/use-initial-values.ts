import { useMountEffect } from '@react-hookz/web'
import { useState } from 'react'
import { storageController } from '../../../storage'
import { OptionValues } from '../../../storage/config'

export const useInitialValues = () => {
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)
  const [initialValues, setInitialValues] = useState<OptionValues>(
    {} as OptionValues
  )

  useMountEffect(() => {
    const getValues = async () => {
      try {
        const storedValues = await storageController.getValues([
          'amount',
          'size',
          'speed',
          'isActive',
          'isFollowing'
        ])

        setInitialValues(storedValues as OptionValues)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    getValues()
  })

  return {
    isLoading,
    isError,
    initialValues,
  }
}
