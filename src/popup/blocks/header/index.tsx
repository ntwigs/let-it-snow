import { Box } from '../../components/box'
import { Text } from '../../components/text'

type Props = {
  title: string
}
export const Header = ({ title }: Props) => {
  return (
    <Box top={3}>
      <Text size="large" color="contrast">
        {title}
      </Text>
    </Box>
  )
}
