import React from 'react'
import { Alert, AlertTitle, Box, Center, CloseButton, Container, Grid, GridItem, Input, Text } from '@chakra-ui/react'

const URL = `https://emoji-api.com/emojis?access_key=${process.env.NEXT_PUBLIC_API_KEY}`

export async function getServerSideProps() {
  try {
    const response =
      await fetch(URL)
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

interface Emoji {
  slug: string;
  group: string;
  subGroup: string;
  unicodeName: string;
  character: string;
  codePoint: string;
}

const EmojiList = React.memo(({ emoji }: { emoji: Emoji[]}) => {
  const [copied, setCopied] = React.useState<boolean>(false)

  const copyClipboard = (character: string) => {
    return () => {
      navigator.clipboard.writeText(character).then(success => {
        setCopied(true)
      })
    }
  }

  return (
    <>
      <Grid templateColumns="repeat(10, 1fr)" gap={6}>
        {
          emoji.map((item, key) => (
            <GridItem w="100%" h="10" display="flex" bg="app.background" key={key} justifyContent="center" alignItems="center" _hover={{ backgroundColor: 'app.primary', cursor: 'pointer' }} onClick={copyClipboard(item.character)}>
              <Text>
                {item.character}
              </Text>
            </GridItem>
          ))
        }
      </Grid>
      {
        copied && (
          <Box padding="10px 0">
            <Alert status='success' rounded="sm">
              <AlertTitle>Emoji is copied!</AlertTitle>

              <CloseButton position="absolute" right="10px" onClick={() => setCopied(false)} />
            </Alert>
          </Box>
        )
      }
      
    </>
  )
})

const Home = ({ data }: { data: Emoji[]}) => {
  const [emoji] = React.useState<Emoji[]>(data)
  const [text, setText] = React.useState<string>('')

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  const filteredEmoji = React.useMemo(() => {
    return emoji.filter(item => item.slug.includes(text))
  }, [text])

  return (
    <Container bg="app.background">
      <Box padding="24px 0 40px 0">
        <Input placeholder='Search Emoji' size="lg" textColor="white" onChange={onSearch} value={text} />
      </Box>
      <Box height="full">
        <EmojiList emoji={filteredEmoji} />
      </Box>
    </Container>
  )
}

export default Home
