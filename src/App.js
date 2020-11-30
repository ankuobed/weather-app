import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CircularProgress, Snackbar } from '@material-ui/core'

import Weather from './Weather'

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
    setLoading(true)
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=d4d43b8c981cd5ea4e02dbd9c8a1901f`
    axios.get(url)
      .then(res => {
        const data = res.list.filter(item => {
          const date = new Date(item.dt_txt)
          return date.getHours() === 12
        })
        setLoading(false)
        setList(data)
      })
      .catch(({response}) => {
        setLoading(false)
        if(response) {
          setError(response.data)
        } else {
          setError('network too slow or unavailable')
        }
        
      })
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

      <div className='row container'>
        {
          list.map(item => <Weather key={item.dt} data={item} />)
        }
      </div>
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
  );
}

export default App;
