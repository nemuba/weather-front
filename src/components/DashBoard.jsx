import { currentResultWeather, currentWeather, fetchWeathers, removeWeather } from '@/store/slices/weatherSlice'
import { CloseIcon, RepeatIcon } from '@chakra-ui/icons'
import { Box, Center, Image, Spinner, Table, TableContainer, Tbody, Td, Text, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ButtonWeather from './Weather/Button'
import WeatherModal from './WeatherModal'

const DashBoard = () => {
  const { data, tokens, loading: isLoading } = useSelector(state => state.weathers)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    dispatch(fetchWeathers())
    setLoading(false)
  }, [])

  const updateConsult = (location) => {
    dispatch(currentWeather(location))
  }

  const handleRemoveWeather = (id) => {
    dispatch(removeWeather(id))
  }

  useEffect(()=>{
    if(!tokens) return;

    setLoading(true)
    const interval = setInterval(()=>{
      tokens.forEach(token =>{
        dispatch(currentResultWeather(token))
      })
      setLoading(false)
    },5000)

    return ()=> {
      clearInterval(interval)
    }
  },[tokens])
  

  return(
    <Box bg='gray.100' w='100%' h='100vh'>
      <Center mx='20' justifyContent={'space-between'}>
        <Text mt='20' fontSize='2xl'>Consults</Text>
        <WeatherModal />
      </Center>
      <Box px='20' mt='10'>
        <TableContainer>
          <Table border='1px solid #ccc' variant='simple' colorScheme='teal'>
          <Thead>
            <Tr>
              <Td>Location</Td>
              <Td>Temperature</Td>
              <Td>Status</Td>
              <Td>Image</Td>
              <Td>Actions</Td>
            </Tr>
          </Thead>
          <Tbody>
            { data && data.map((item, idx) => (
              <Tr key={idx}>
                <Td>{ item?.location}</Td>
                <Td>{ item?.data?.current?.temperature}</Td>
                <Td>{ item?.data?.current?.weather_descriptions}</Td>
                <Td><Image rounded='lg' src={item?.data?.current?.weather_icons[0]}/></Td>
                <Td>
                  <ButtonWeather title='reload' titleLoading='reloading ...' icon={<RepeatIcon/>} handler={updateConsult} attribute={item.location}/>
                  <ButtonWeather title='remove' titleLoading='removing ...' icon={<CloseIcon/>} handler={handleRemoveWeather} attribute={item.id}/>
                </Td>
              </Tr>
            ))}
            { isLoading && (<Tr><Td colSpan={4} align={'center'}><Spinner mt={2}/> Loading ...</Td></Tr>)}
          </Tbody>
        </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default DashBoard
