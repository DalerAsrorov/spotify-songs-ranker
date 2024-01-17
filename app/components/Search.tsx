import { jade } from '@radix-ui/colors'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { Container, Flex, Heading, Popover, TextField } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import {
  KeyboardEvent,
  RefObject,
  createRef,
  useEffect,
  useRef,
  useState,
} from 'react'
import PulseLoader from 'react-spinners/PulseLoader'
import { Card } from '../components/Card'
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
  const searchInputRef = useRef<HTMLInputElement>()
  const [refs, setRefs] = useState<RefObject<HTMLDivElement>[]>([])

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

  const handleKeyDown = (
    e: KeyboardEvent<HTMLDivElement & HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'ArrowUp' && (index === 0 || index === -1)) {
      setTimeout(() => {
        searchInputRef.current.focus()
      })
    } else if (e.key === 'ArrowDown') {
      refs[index + 1].current.focus()
    } else if (e.key === 'ArrowUp') {
      refs[index - 1].current.focus()
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
          const results = data.artists?.items
          const refs: RefObject<HTMLDivElement>[] = results.map((_) =>
            createRef<HTMLDivElement>(),
          )
          setRefs([...refs])
          setArtists(results ?? [])
        })
    }
  }, [debouncedSearch])

  return (
    <>
      <TextField.Root size="3" onInput={handleInput}>
        <TextField.Slot color="jade">
          <MagnifyingGlassIcon />
        </TextField.Slot>
        <TextField.Input
          ref={searchInputRef}
          onKeyDown={(e) => handleKeyDown(e, -1)}
          placeholder="Search for any artist"
          onFocus={(e) =>
            e.currentTarget.setSelectionRange(
              e.currentTarget.value.length,
              e.currentTarget.value.length,
            )
          }
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
            <Container>
              {artists.map((artist, index) => (
                <Card
                  key={artist.id}
                  artist={artist}
                  index={index}
                  onKeyDown={handleKeyDown}
                  ref={refs[index]}
                />
              ))}
            </Container>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </>
  )
}
