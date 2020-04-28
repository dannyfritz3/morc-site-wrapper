import React from 'react';
import {parseWeatherDate} from '../../../utils';

class TrailWeatherOutlookDay extends React.Component {
    render(props) {
        const determineWeatherIcon = (weatherCode) => {
            var returnSrc;
            switch(weatherCode) {
                case "rain_heavy": returnSrc = require('../../../resource/Icons/WeatherIcons/icons8-heavy-rain-100.png'); break;
                case "rain":
                case "rain_light": returnSrc = require('../../../resource/Icons/WeatherIcons/icons8-rain-100.png'); break;
                case "freezing_rain_heavy":
                case "freezing_rain":
                case "freezing_rain_light":
                case "freezing_drizzle":
                case "drizzle": returnSrc = require('../../../resource/Icons/WeatherIcons/icons8-moderate-rain-100.png'); break;
                case "ice_pellets_heavy":
                case "ice_pellets":
                case "ice_pellets_light":
                case "snow_heavy": returnSrc = require('../../../resource/Icons/WeatherIcons/icons8-sleet-100.png'); break;
                case "snow":
                case "snow_light":
                case "flurries": returnSrc = require('../../../resource/Icons/WeatherIcons/icons8-snow-100.png'); break;
                case "tstorm": returnSrc = require('../../../resource/Icons/WeatherIcons/icons8-storm-100.png'); break;
                case "fog":
                case "fog_light": returnSrc = require('../../../resource/Icons/WeatherIcons/icons8-haze-100.png'); break;
                case "cloudy":
                case "mostly_cloudy": returnSrc = require('../../../resource/Icons/WeatherIcons/icons8-clouds-100.png'); break;
                case "partly_cloudy":
                case "mostly_clear": returnSrc = require('../../../resource/Icons/WeatherIcons/icons8-partly-cloudy-day-100.png'); break;
                case "clear": returnSrc = require('../../../resource/Icons/WeatherIcons/icons8-sun-100.png'); break;
                default: returnSrc = require('../../../resource/Icons/WeatherIcons/icons8-moon-and-stars-100.png'); break;
            }
            return returnSrc;
            // "https://www.shareicon.net/data/128x128/2016/10/29/848790_weather_512x512.png"
        };

        const selectDay = () => {

        };

        return (
            <div onClick={selectDay()} class="outlook" style={this.props.isToday ? {backgroundColor: '#ADAEAB', borderRight: '3px solid #1E2019', position: 'relative'} : {position: 'relative'}}>
                <p style={this.props.isToday ? {backgroundColor: '#1E2019', color: '#BFAE48', fontSize: '15px'} : {fontSize: '15px'}} class="day-header"><b>{parseWeatherDate(this.props.weatherDay)}</b></p>
                <img class="weather-icon" alt="icon"
                src={determineWeatherIcon(this.props.weatherCode)}/>
                <p class="temp-header"><b>{this.props.forecastLow}</b> | <b>{this.props.forecastHigh}</b></p>
            </div>
        );
    }
}

export default TrailWeatherOutlookDay;