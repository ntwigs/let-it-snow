import { config, Options, OptionValues } from './config'

const getValues = async <T extends Partial<Options>>(
  keys: T[]
): Promise<Record<T, OptionValues[T]>> => {
  return (await chrome.storage.local.get(keys)) as Record<T, OptionValues[T]>
}

const setValue = async (value: Partial<OptionValues>): Promise<void> => {
  await chrome.storage.local.set(value)
}

const onChange = (fn: CallableFunction) => {
  ;(chrome.storage.onChanged.addListener as CallableFunction)(fn)
}

const seed = async (): Promise<void> => {
  const result = await chrome.storage.local.get()
  if (Object.keys(result).length <= 0) {
    await chrome.storage.local.set({
      amount: config.amount.default,
      speed: config.speed.default,
      size: config.size.default,
      isActive: config.isActive.default,
    })
  }
}

export const storageController = {
  getValues,
  setValue,
  onChange,
  seed,
}
