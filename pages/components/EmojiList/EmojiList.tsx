import {
  Alert,
  AlertTitle,
  Box,
  Grid,
  CloseButton,
} from '@chakra-ui/react'
import React from 'react'
import { Emoji as EmojiType } from '../../types'
import Emoji from '../Emoji'

const EmojiList = React.memo(({ emoji }: { emoji: EmojiType[]}) => {
  const [copied, setCopied] = React.useState<boolean>(false)

  return (
    <>
      <Grid templateColumns="repeat(10, 1fr)" gap={6}>
        {
          emoji.map((item, key) => (
            <Emoji item={item} key={key} />
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

export default EmojiList