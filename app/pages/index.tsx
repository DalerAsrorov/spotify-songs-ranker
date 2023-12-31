import { Blockquote, Box, Em, Flex, Section, Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import { Search } from '../components/Search'

export default function Home() {
  return (
    <div style={{ width: '95%', margin: '0 auto' }}>
      <Theme>
        <Flex direction="column" gap="3">
          <Section size="1">
            <Flex direction="column" gap="2">
              <Search />
              <Blockquote color="jade">
                <Em>
                  This search bar allows you to find an artist that you want to
                  find the song stats about. Type any artist of your choice.
                </Em>
              </Blockquote>
            </Flex>
          </Section>
          <Flex direction="row" gap="2" align={'stretch'} justify={'between'}>
            <Box width="100%">
              <div>list</div>
              <div>expand more</div>
            </Box>
            <Box width="100%">artist</Box>
          </Flex>
        </Flex>
      </Theme>
    </div>
  )
}
