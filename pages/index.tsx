import React from 'react'
import { Box, Container, Input } from '@chakra-ui/react'
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
    setText(event.target.value)
  }

  const filteredEmoji = React.useMemo(() => {
    return emoji.filter(item => {
      let reg = new RegExp(text, 'gi')

      return item.slug.match(reg) || item.unicodeName.match(reg)
    })
  }, [text])

  return (
    <Container bg="app.background" maxW="full">
      <Container bg="app.background" width="full">
        <Box padding="24px 0 40px 0">
          <Input placeholder='Search Emoji' size="lg" textColor="white" onChange={onSearch} value={text} />
        </Box>
        <Box height="full">
          <EmojiList emoji={filteredEmoji} />
        </Box>
      </Container>
    </Container>
  )
}

export default Home
