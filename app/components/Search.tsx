import { jade } from '@radix-ui/colors'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import {
  Avatar,
  Box,
  Card,
  Container,
  Flex,
  Heading,
  Popover,
  Text,
  TextField,
} from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import { useEffect, useRef, useState } from 'react'
import PulseLoader from 'react-spinners/PulseLoader'
import { createHttpCall } from '../utils/http-call'
import { useDebounce } from '../utils/debounce'

const SPOTIFY_SEARCH_API = 'https://api.spotify.com/v1/search'

type SearchProps = {
  token?: string
}
export const Search = (props: SearchProps) => {
  const { token } = props
  const [hasOpenSuggestions, setHasOpenSugesstions] = useState(false)
  const [isLoadingArtists, setIsLoadingArtists] = useState(false)
  const [artists, setArtists] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearch = useDebounce(searchInput, 500)
  const searchInputRef = useRef()
  const [refs, setRefs] = useState([])

  const handleInput = (event) => {
    setSearchInput(event.target.value)
    setIsLoadingArtists(true)

    if (!event.target.value.length) {
      setHasOpenSugesstions(false)
      setIsLoadingArtists(false)
    } else if (event.target.value.length === 1) {
      // focus input back as soon as the popover renders
      setTimeout(() => {
        event.target.focus()
      })
    }
    if (!hasOpenSuggestions) {
      setHasOpenSugesstions(true)
    }
  }

  useEffect(() => {
    if (debouncedSearch.length === 0) {
      setArtists([])
    } else if (debouncedSearch) {
      fetch(
        `${SPOTIFY_SEARCH_API}?q=${encodeURIComponent(
          `artist: ${debouncedSearch}`,
        )}&type=artist`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
        .then((response) => response.json())
        .then((data) => {
          console.log('data', data)
          setArtists(data.artists?.items ?? [])
        })
    }
  }, [debouncedSearch])

  console.log(artists)

  return (
    <>
      <TextField.Root size="3" onInput={handleInput}>
        <TextField.Slot color="jade">
          <MagnifyingGlassIcon />
        </TextField.Slot>
        <TextField.Input
          ref={searchInputRef}
          placeholder="Search for any artist"
        />
        <TextField.Slot>
          <PulseLoader
            color={jade.jade7}
            loading={isLoadingArtists}
            size={4}
            aria-label="loading spinner"
          />
        </TextField.Slot>
      </TextField.Root>
      <Popover.Root open={hasOpenSuggestions}>
        <VisuallyHidden.Root>
          <Popover.Trigger>
            <button>Trigger</button>
          </Popover.Trigger>
        </VisuallyHidden.Root>
        <Popover.Content
          side="bottom"
          alignOffset={5}
          sideOffset={25}
          style={{ width: '60vw' }}
          size="4"
        >
          <Flex gap="5" direction="column">
            <Heading color="mint" size="4" weight="regular">
              Search results that match &quot;{searchInput}&quot;
            </Heading>
            <Container
              onKeyDown={() => {
                console.log('onKeyDown pressed:::')
              }}
            >
              {artists.map((artist, index) => (
                <Card
                  key={artist.id}
                  size="3"
                  variant="ghost"
                  tabIndex={0}
                  onClick={() => {
                    console.log('clicked')
                  }}
                >
                  <Flex gap="5" align="center">
                    <Avatar
                      size="3"
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
                </Card>
              ))}
            </Container>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </>
  )
}
