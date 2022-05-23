import React from 'react'
import { Box, Container, Flex, Input, Text } from '@chakra-ui/react'
import EmojiList from './components/EmojiList'
import { Emoji } from './types'
import { publicUrl } from './constants'

export async function getServerSideProps() {
  try {
    const response =
      await fetch(publicUrl)
        .then(response => response.json())
        .then(data => data)

      return {
        props: {
          data: response
        }
      }
  } catch (error) {
    console.error(error)
  }
}

const Home = ({ data }: { data: Emoji[]}) => {

  const [emoji] = React.useState<Emoji[]>(data)
  const [text, setText] = React.useState<string>('')

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setText(value)
  }

  const filterEmoji = () => {
    return emoji.filter(item => {
      let reg = new RegExp(text, 'gi')

      return item.slug.match(reg) || item.unicodeName.match(reg)
    })
  }

  const filteredEmoji = React.useMemo(filterEmoji, [text])

  return (
    <Container width="full" maxW="full" bg="app.background" height="100%" padding="0">
      <Box>
        <Flex
          backgroundColor="blackAlpha.500"
          minH="60px"
          width="full"
          maxW="full"
          align="center"
          px="4"
        >
          <Container>
            <Text color="app.primary" fontSize="xl" fontWeight="bold">NextMoji</Text>
          </Container>
        </Flex>
      </Box>

      <Container bg="app.background">
        <Box padding="24px 0 40px 0">
          <Input placeholder='Search Emoji' size="lg" textColor="white" onChange={onSearch} value={text} borderColor="app.primary" width="full" maxW="full" _placeholder={{ fontSize: 'md', opacity: 0.5 }} />
        </Box>
        <Box height="full">
          <EmojiList emoji={filteredEmoji} />
        </Box>
      </Container>
    </Container>
  )
}

export default Home
