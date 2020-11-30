import React, { useState, useEffect } from 'react'
import { CircularProgress, Snackbar } from '@material-ui/core'

import Weather from './Weather'
import WeatherPlaceholder from './WeatherPlaceholder'

function App() {

  useEffect(() => {
    document.title = 'Weather App'
  })

  const [city, setCity] = useState('')
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if(city) {
      setLoading(true)
      const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=d4d43b8c981cd5ea4e02dbd9c8a1901f`

      fetch(url)
        .then(res => res.json())
        .then(({list}) => {
          const data = list.filter(item => {
          const date = new Date(item.dt_txt)
          return date.getHours() === 12
        })
        setLoading(false)
        setList(data)
      })
      .catch(() => {
        setLoading(false)
        setError('Error')
      })
    }
  }

  return (
    <div className="App">
     <header>
       <h1>5-Day Forecast</h1>
     </header>

    <main className='container'>
      <form onSubmit={handleSubmit}>
        <input 
        type='text'
        placeholder='city'
        value={city}
        onChange={(e) => setCity(e.target.value)}
        />
        <button>{loading? <CircularProgress color='inherit' size={20} /> : 'Get weather'}</button>
      </form>
     
      <p className='city'>{city}</p>

      {
        loading?
        <WeatherPlaceholder /> :
        <div className='row container'>
          {
            list.map(item => <Weather key={item.dt} data={item} />)
          }
        </div>
      }

    </main>

    <Snackbar
      open={error}
      onClose={() => setError('')}
      autoHideDuration={3000}
    >
      <div className='error'>
        {error}
      </div>
    </Snackbar>
    </div>
  )
}

export default App
