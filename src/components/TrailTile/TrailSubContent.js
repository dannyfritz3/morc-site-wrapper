import React from 'react';
import TrailBullitenBoard from './BulletinBoard/TrailBullitenBoard';
import TrailWeatherOutlook from './TrailWeather/TrailWeatherOutlook';

class TrailTileSubContent extends React.Component {
    render(props) {
        return (
            <div className="trail-tile-sub-content">
                <TrailWeatherOutlook forecastTemps={this.props.forecastTemps} liveWeatherData={this.props.liveWeatherData} />
                <div className="other-info">
                    <TrailBullitenBoard trailAuthor={this.props.trailAuthor} trailComments={this.props.trailComments} trailId={this.props.trailId} bulletinPosts={this.props.bulletinPosts} />
                </div>
            </div>
        )
    }
}

export default TrailTileSubContent;