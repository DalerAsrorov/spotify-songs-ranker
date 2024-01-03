import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Blockquote, Box, Em, Flex, Popover, Section, TextField, Theme } from '@radix-ui/themes';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import '@radix-ui/themes/styles.css';
import { useRef, useState } from 'react';

const Search = (props: any) => {
  const [hasOpenSuggestions, setHasOpenSugesstions] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const searchInputRef = useRef()

  const handleInput = (event) => {
    setSearchInput(event.target.value)

    if (!event.target.value.length) {
      setHasOpenSugesstions(false)
    } else if (event.target.value.length === 1) {
      setTimeout(() => {
        event.target.focus()
      })
    }
    if (!hasOpenSuggestions) {
      setHasOpenSugesstions(true)
    }
  }

  return (
    <>
      <TextField.Root size='3' onInput={handleInput}>
        <TextField.Slot color='jade'>
          <MagnifyingGlassIcon />
        </TextField.Slot>
        <TextField.Input ref={searchInputRef} placeholder="Search for any artist" />
      </TextField.Root>
      <Popover.Root open={hasOpenSuggestions}>
        <VisuallyHidden.Root>
          <Popover.Trigger>
            <button>Trigger</button>
          </Popover.Trigger>
        </VisuallyHidden.Root>
        <Popover.Content side='bottom' alignOffset={5} sideOffset={25} style={{ width: '500px' }}>
          <div>{searchInput}</div>
        </Popover.Content>
      </Popover.Root>
    </>
  )
}


export default function Home() {
  return (
    <div style={{ width: '95%', margin: '0 auto' }}>
      <Theme>
        <Flex direction='column' gap='3'>
          <Section size="1">
            <Flex direction='column' gap='2'>
              <Search />
              <Blockquote color='jade'>
                <Em>This search bar allows you to find an artist that you want to find the song stats about. Type any artist of your choice.</Em>
              </Blockquote>
            </Flex>
          </Section>
          <Flex direction="row" gap="2" align={'stretch'} justify={'between'}>
            <Box width='100%'>
              <div>list</div>
              <div>expand more</div>
            </Box>
            <Box width='100%'>artist</Box>
          </Flex>
        </Flex>
      </Theme>
    </div>
  );
}
