import {
  Grid,
} from '@chakra-ui/react'
import React from 'react'
import { Emoji as EmojiType } from '../../types'
import Emoji from '../Emoji'

interface IEmoji {
  emoji: EmojiType[]
}

const EmojiList: React.FC<IEmoji> = React.memo(({ emoji }) => {
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

EmojiList.displayName = 'EmojiList'

export default EmojiList
