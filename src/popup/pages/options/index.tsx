import { AmountSlider } from '../../blocks/amount-slider'
import { FollowToggle } from '../../blocks/follow-toggle'
import { Header } from '../../blocks/header'
import { SizeSlider } from '../../blocks/size-slider'
import { SnowToggle } from '../../blocks/snow-toggle'
import { SpeedSlider } from '../../blocks/speed-slider'
import { Container } from '../../components/container'
import { Unsupported } from '../unsupported'
import { useInitialValues } from './use-initial-values'

export const Options = (): JSX.Element | null => {
  const { isError, isLoading, initialValues } = useInitialValues()

  if (isLoading) return <Container />
  if (isError) return <Unsupported />

  const { amount, isActive, size, speed, isFollowing } = initialValues

  return (
    <Container>
      <Header title="LET IT SNOW" />
      <AmountSlider initial={amount} />
      <SizeSlider initial={size} />
      <SpeedSlider initial={speed} />
      <SnowToggle initial={isActive} />
      <FollowToggle initial={isFollowing} />
    </Container>
  )
}
