import React from 'react';
import TrailWeatherOutlookDay from './TrailWeatherOutlookDay';
import TrailWeatherOtherData from './TrailWeatherOtherData';

class TrailWeatherOutlook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liveWeatherData: {
                temp: 0,
                precipitation: 0,
                wind_speed: 0,
                wind_direction: ""
            },
            forecastTemps: [],
            weatherOutlookComponentArray: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            liveWeatherData: {
                temp: nextProps.liveWeatherData.temp ? nextProps.liveWeatherData.temp.value : 0,
                precipitation: nextProps.liveWeatherData.precipitation ? nextProps.liveWeatherData.precipitation.value :0,
                wind_speed: nextProps.liveWeatherData.wind_speed ? nextProps.liveWeatherData.wind_speed.value : 0,
                wind_direction: nextProps.liveWeatherData.wind_direction ? nextProps.liveWeatherData.wind_direction.value : ""
            },
            forecastTemps: nextProps.forecastTemps
        });
        debugger;
        ((forecastTemps) => {
            var arr = [];
            for (var i = 0; i < forecastTemps.length; i++) {
                var forecastDay = forecastTemps[i].observation_time;
                var forecastHigh = parseInt(forecastTemps[i].temp[1].max.value);
                var forecastLow = parseInt(forecastTemps[i].temp[0].min.value);
                var weatherCode = forecastTemps[i].weather_code.value;
                arr.push(
                    <TrailWeatherOutlookDay weatherDay={forecastDay} forecastHigh={forecastHigh}
                        forecastLow={forecastLow} weatherCode={weatherCode} isToday={i === 0}
                    />
                );
            }
            this.setState({
                weatherOutlookComponentArray: arr
            });
        })(this.state.forecastTemps);
    }
  
    render(props) {
        return (
            <div class="weather-div">
                <div class="weather-outlook-div">
                    <TrailWeatherOtherData liveWeatherData={this.props.liveWeatherData} />
                    <div style={{display: "inline-block", height: "100%"}}>
                        {this.state.weatherOutlookComponentArray}
                    </div>
                </div>
            </div>
        );
    }
}

export default TrailWeatherOutlook;