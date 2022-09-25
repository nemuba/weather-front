import { Box, Flex, Text } from '@chakra-ui/react';

function NavBar () {
  return (
    <Flex bg="blue.400" p='4' minWidth='max-content' justify='flex-start' pl='20'>
      <Box>
          <Text fontSize='2xl' fontWeight='bold' color='white'>Weather</Text>
      </Box>
    </Flex>
  )
}

export default NavBar;
