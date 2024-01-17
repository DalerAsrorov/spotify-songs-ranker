import { Avatar, Box, Flex, Card as RadixCard, Text } from '@radix-ui/themes'
import { KeyboardEvent, Ref, RefObject, forwardRef } from 'react'

export type CardProps = {
  artist: {
    id: string
    images?: {
      url: string
    }[]
    name: string
    followers?: {
      total: number
    }
  }
  index: number
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>, index: number) => void
  tabIndex?: number
}

export const Card = forwardRef(
  (
    { artist, tabIndex = 0, index, onKeyDown }: CardProps,
    ref: Ref<HTMLDivElement>,
  ) => (
    <RadixCard
      key={artist.id}
      onKeyDown={(e) => onKeyDown(e, index)}
      size="3"
      tabIndex={tabIndex}
      ref={ref}
      variant="ghost"
    >
      <Flex gap="5" align="center">
        <Avatar
          size="5"
          src={artist.images?.[0]?.url}
          radius="full"
          fallback="T"
        />
        <Box>
          <Text as="div" size="2" weight="bold">
            {artist.name}
          </Text>
          <Text as="div" size="2" color="gray">
            {artist.followers?.total} followers
          </Text>
        </Box>
      </Flex>
    </RadixCard>
  ),
)
