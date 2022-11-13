import { Options } from '../options'
import { Unsupported } from '../unsupported'
import { Container } from '../../components/container'
import { useSupport } from './use-support'

export const Start = () => {
  const { isLoading, isError } = useSupport()

  if (isLoading) return <Container />
  if (isError) return <Unsupported />

  return <Options />
}
