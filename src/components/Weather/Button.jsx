import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const ButtonWeather = ({title, titleLoading , handler, attribute, icon}) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch(null)

  const handleClick = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    handler(attribute);
    
    setTimeout(() => {
      setLoading(false)
    }, 5000);
    
  }

  return (
    <Button 
      leftIcon={icon}
      isLoading={loading}
      loadingText={titleLoading}
      onClick={handleClick}
    >
      {title}
    </Button>
  )
}

export default ButtonWeather;
