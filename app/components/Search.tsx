import { jade } from '@radix-ui/colors'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { Container, Heading, Popover, TextField } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import { useRef, useState } from 'react'
import PulseLoader from 'react-spinners/PulseLoader'
import { createHttpCall } from '../utils/http-call'

export const Search = (props: any) => {
  const [hasOpenSuggestions, setHasOpenSugesstions] = useState(false)
  const [isLoadingArtists, setIsLoadingArtists] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const searchInputRef = useRef()

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

    // todo: replace the mock call with an actual http call to get the matching artists
    createHttpCall(null).then(() => {
      setIsLoadingArtists(false)
    })
  }

  return (
    <div>
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
          style={{ width: '500px' }}
          size="4"
        >
          <Heading color="mint" size="4" weight="regular">
            Search results that match &quot;{searchInput}&quot;
          </Heading>
          <Container>more content</Container>
        </Popover.Content>
      </Popover.Root>
    </div>
  )
}
