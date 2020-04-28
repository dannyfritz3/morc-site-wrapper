import React from 'react';
import '../../styles/TrailTile.css';
import TrailTitle from './TrailTitle';
import TrailCondition from './TrailCondition';
import TrailSubContent from './TrailSubContent';
import axios from 'axios';

class TrailTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bulletinPosts: [],
            bulletinBoardReceived: false,
            windowWidth: this.props.windowWidth,
            windowHeight: this.props.windowHeight,
            weatherData: {rainfall: 0, windspeed: 0, cloudcover: 0},
            forecastTemps: [],
            liveWeatherData: {
                temp: 0,
                precipitation: 0,
                wind_speed: 0,
                wind_direction: ""
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            windowWidth: nextProps.windowWidth,
            winodwHeight: nextProps.windowHeight
        })
    }

    render(props) {
        const clickTrailTile = async (event) => {
            var el = event.currentTarget;
            if (!el.classList.contains("active-tile")) {
                el.classList.remove("inactive-tile");
                el.classList.add("active-tile");
                getBulletinMessages();
                getWeatherData();
            } else {
                el.classList.remove("active-tile");
                el.classList.add("inactive-tile");
            }
        };

        const getBulletinMessages = () => {
            var posts = [];
            axios.get("http://localhost:4000/getBulletinBoard/" + this.props.trail_id).then((response) => {
                this.setState({
                    posts: response.data
                });
                posts = response.data
                poplulateMessagesComponentArray(posts);
            });
        };

        const poplulateMessagesComponentArray = (posts) => {
            var messages = [];
            for (var i = 0; i < posts.length; i++) {
                var postUsername = posts[i][0];
                var postMessage = posts[i][2];
                var postTimestamp = posts[i][1];
                messages.push(<BullitenPost postAuthor={postUsername} postMessage={postMessage} postTimestamp={postTimestamp} />);
            }
            this.setState({
                componentArray: messages
            });
        };

        const getWeatherData = async () => {
            var location = `${this.props.location}, MN`;
            await axios.get("http://localhost:4000/getWeatherData/" + location).then((response) => {
                this.setState({
                    forecastTemps: response.data.forecastedWeatherData, 
                    liveWeatherData: response.data.liveWeatherData
                });
            });
        };

        const getBulletinMessages = () => {
            axios.get("http://localhost:4000/getBulletinBoard/" + this.props.trail_id).then((response) => {
                this.setState({
                    bulletinPosts: response.data
                });
            });
        };

        return (
            <div style={this.state.windowWidth < 600 ? {transform: 'scale(0.75)'} : {transform: 'scale(1)'}} className="trail-tile inactive-tile" onClick={(e) => clickTrailTile(e)}>
                <div className="trail-tile-header">
                    <TrailTitle trailName={this.props.name} trailLocation={this.props.location} reimtbX={this.props.reimtbX} reimtbY={this.props.reimtbY} changeMapHandler={this.props.changeMapEvent} />
                    <TrailCondition trailCondition={this.props.condition === "Melting Do Not Ride" ? "Melting" : this.props.condition} trailTimestamp={this.props.parsedTimestamp} />
                </div>
                <div onClick={(event) => {event.stopPropagation()}}>
                    <TrailSubContent trailComments={this.props.comments} trailAuthor={this.props.username}
                        trailRid={this.props.trailforksMapId} trailId={this.props.trail_id}
                        bulletinPosts={this.state.bulletinPosts} liveWeatherData={this.state.liveWeatherData}
                        forecastTemps={this.state.forecastTemps}
                    />
                </div>
            </div>
        );
    }
}

export default TrailTile;