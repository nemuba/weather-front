import { currentWeather } from '@/store/slices/weatherSlice'
import {
  Button, FormControl,
  FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay, useDisclosure
} from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'

function WeatherModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [location, setLocation] = React.useState('')
  const dispatch = useDispatch()

  const handleConsult = (e) => {
    dispatch(currentWeather(location))

    onClose()
  }

  return (
    <>
      <Button mt='20' variant={'solid'} bg='blue.400' color='white' onClick={onOpen}>Search Location</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search your location</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Location</FormLabel>
              <Input ref={initialRef} placeholder='Location' value={location} onChange={e => setLocation(e.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleConsult}>
              Search
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default WeatherModal
