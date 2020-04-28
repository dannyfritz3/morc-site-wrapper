import React from 'react';
import {parseWindDirection} from '../../../utils';

class TrailWeatherOtherData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liveWeatherData: {
                temp: 0,
                precipitation: 0,
                wind_speed: 0,
                wind_direction: ""
            },
            style: {
                padding: "5px",
                float: "left",
                display: "inline",
                height: "30px",
                width: "30px"
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            liveWeatherData: {
                temp: nextProps.liveWeatherData.temp ? parseInt(nextProps.liveWeatherData.temp.value) : 0,
                precipitation: nextProps.liveWeatherData.precipitation ? parseInt(nextProps.liveWeatherData.precipitation.value) :0,
                wind_speed: nextProps.liveWeatherData.wind_speed ? parseInt(nextProps.liveWeatherData.wind_speed.value) : 0,
                wind_direction: nextProps.liveWeatherData.wind_direction ? parseWindDirection(nextProps.liveWeatherData.wind_direction.value) : ""
        }})
    }

    render(props) {
        const computeBackgroundColorGradiantArray = (type) => {
            var startColor;
            var endColor;
            switch(type) {
                case "temp": startColor = "#A4243B"; endColor = "#A4243B"; break;
                case "wind_speed": startColor = ""; endColor = ""; break;
                case "precipitation": startColor = ""; endColor = ""; break;
                default: break;
            };
            var returnStyle = {};
            return [startColor, endColor];
        };

        return (
            <div style={{display: 'inline-block', float: "left", height: '100%', width: '90px'}}>
                <WeatherDataBlock style={this.state.style}
                    iconSrc={require("../../../resource/Icons/WeatherIcons/icons8-thermometer-50.png")}
                    data={this.state.liveWeatherData.temp} unit={String.fromCharCode(`0x2109`)}
                />
                <WeatherDataBlock style={this.state.style}
                    iconSrc={require("../../../resource/Icons/WeatherIcons/icons8-wet-50.png")}
                    data={this.state.liveWeatherData.precipitation} unit={`in/hr`}
                />
                <WeatherDataBlock style={this.state.style}
                    iconSrc={require("../../../resource/Icons/WeatherIcons/icons8-windsock-50.png")}
                    data={this.state.liveWeatherData.wind_speed} unit={`mph ${this.state.liveWeatherData.wind_direction}`}
                />
            </div>
        );
    }
}

class WeatherDataBlock extends React.Component {
    render(props) {

        return (
            <div className="weather-other-data-block" style={{ display: 'block', height: '33px' }}>
                <img style={this.props.style} src={this.props.iconSrc} alt="icon" />
                <div style={{ display: "inline", fontSize: "11px" }}>{this.props.data} <b>{this.props.unit}</b></div>
            </div>
        );
    }
}

export default TrailWeatherOtherData;