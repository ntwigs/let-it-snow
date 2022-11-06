export const withError = async <Result>(
  fn: CallableFunction
): Promise<[Result, null] | [null, Error]> => {
  try {
    const result = (await fn()) as Result
    return [result, null]
  } catch (e: unknown) {
    return [null, e as Error]
  }
}
