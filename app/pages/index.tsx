import Head from 'next/head';
import { Box, Button, Flex, Section, Text, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';


export default function Home() {
  return (
    <Theme>
      <Flex direction='column' gap='5'>
        <Section size="1">search bar</Section>
        <Flex direction="row" gap="2" align={'stretch'} justify={'between'}>
          <Box width='100%'>
            <div>list</div>
            <div>expand more</div>
          </Box>
          <Box width='100%'>artist</Box>
        </Flex>
      </Flex>
    </Theme>
  );
}
