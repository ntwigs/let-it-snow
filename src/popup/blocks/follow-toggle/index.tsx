import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Box } from '../../components/box'
import { Toggle } from '../../components/toggle'
import { Text } from '../../components/text'
import { Section } from '../../components/section'
import { useDebouncedEffect } from '@react-hookz/web'
import { storageController } from '../../../storage'

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center; ;
`

const DEBOUNCE_TIME = 10
type Props = {
  initial: boolean
}
export const FollowToggle = ({ initial }: Props): JSX.Element => {
  const [isFollowing, setFollowing] = useState(initial)

  const onClick = useCallback(() => {
    setFollowing((isFollowing) => !isFollowing)
  }, [])

  useDebouncedEffect(
    () => {
      storageController.setValue({ isFollowing })
    },
    [isFollowing],
    DEBOUNCE_TIME
  )

  return (
    <Section>
      <Box x={2} bottom={2}>
        <Row>
          <Text>{isFollowing ? `Following` : ` Not following`}</Text>
          <Toggle isActive={isFollowing} onClick={onClick} />
        </Row>
      </Box>
    </Section>
  )
}
