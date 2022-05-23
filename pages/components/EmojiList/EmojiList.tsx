import {
  Grid,
} from '@chakra-ui/react'
import React from 'react'
import { Emoji as EmojiType } from '../../types'
import Emoji from '../Emoji'

const EmojiList = React.memo(({ emoji }: { emoji: EmojiType[]}) => {
  return (
    <>
      <Grid templateColumns="repeat(8, 1fr)" gap={6}>
        {
          emoji.map((item, key) => (
            <Emoji item={item} key={key} />
          ))
        }
      </Grid>
    </>
  )
})

export default EmojiList