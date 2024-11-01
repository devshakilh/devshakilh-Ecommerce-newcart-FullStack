// hooks/useLocation.js
import { useEffect, useState } from 'react'
import axios from 'axios'

const useLocation = () => {
  const [country, setCountry] = useState('')
  const [flag, setFlag] = useState('')
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get('https://ipapi.co/json/')
        const { country_code, country_name, language_code } = response.data

        if (country_code) {
          setCountry(country_name)
          // Update URL for the flag service you're using
          setFlag(`https://flagpedia.net/data/flags/h80/${country_code.toLowerCase()}.png`)
          setLanguage(language_code || 'en')
        }
      } catch (error) {
        console.error('Error fetching location:', error)
      }
    }

    fetchLocation()
  }, [])

  return { country, flag, language }
}

export default useLocation
