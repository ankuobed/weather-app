import React from 'react'
import moment from 'moment'


export default function Weather({ data }) {
    // Getting the day 
    const date = new Date(data.dt_txt);
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const day = days[date.getDay()]
    const icon = data.weather[0].icon
    const weather = data.weather[0].description
    const temp = Math.round(data.main.temp)

    return (
        <div className='weather-item'>
            <p className='day'>{day}</p>
            <p className='date'>{moment(data.dt_txt).format('MMMM Do')}</p>
            <div className='img-container'><img src={` http://openweathermap.org/img/wn/${icon}@2x.png`} alt='' /></div>
            <p className='temp'>{temp}&deg;C</p>
            <p class='weather'>{weather}</p>
        </div>
    )
}

// d4d43b8c981cd5ea4e02dbd9c8a1901f