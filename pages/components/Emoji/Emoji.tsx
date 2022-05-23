import React from 'react'
import {
  GridItem,
  Text,
} from '@chakra-ui/react'
import { Emoji } from '../../types'

const Emoji = ({ item }: { item: Emoji }) => {
  const [copied, setCopied] = React.useState(false)

  const copyClipboard = (character: string) => {
    return () => {
      navigator.clipboard.writeText(character).then(() => {
        setCopied(true)
      })
    }
  }

  return (
    <GridItem w="100%" h="10" display="flex" bg="app.background" justifyContent="center" alignItems="center" _hover={{ backgroundColor: 'app.primary', cursor: 'pointer', borderRadius: 'md' }} onClick={copyClipboard(item.character)}>
      <Text fontSize="xl">
        {item.character}
      </Text>
    </GridItem>   
  )
}

export default Emoji