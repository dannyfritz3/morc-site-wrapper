import React from 'react';
import BullitenPostForm from './BullitenPostForm';
import BullitenPost from './BullitenPost';

class TrailBullitenBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bulletinPosts: [],
            bulletinPostComponentArray: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            bulletinPosts: nextProps.bulletinPosts,
        });
        ((bulletinPosts) => {
            var messages = [];
            for (var i = 0; i < bulletinPosts.length; i++) {
                var postUsername = bulletinPosts[i][0];
                var postMessage = bulletinPosts[i][2];
                var postTimestamp = bulletinPosts[i][1];
                messages.push(<BullitenPost postAuthor={postUsername} postMessage={postMessage} postTimestamp={postTimestamp} />);
            }
            this.setState({
                bulletinPostComponentArray: messages
            });
        })(this.state.bulletinPosts);
    }

    render(props) {
        const updateClientBulletinBoard = (clientPost) => {
            var postUsername = clientPost[0];
            var postMessage = clientPost[2];
            var postTimestampArray = clientPost[1];
            var clientPostComponent = <BullitenPost postAuthor={postUsername} postMessage={postMessage} postTimestamp={postTimestampArray} />;
            var updatedArray = this.state.bulletinPosts.concat(clientPostComponent);
            this.setState({posts: updatedArray});
        };

        return (
            <div className="trail-bulliten-board" onClick={(event) => event.stopPropagation()}>
                <div className="adimin-post">
                    <div className="post-admin-author"><b>{this.props.trailAuthor}</b></div>
                    <div className="post-admin-text">{this.props.trailComments}</div>
                </div>
                <div className="trail-bulliten-messages">
                    {this.state.bulletinPosts.length > 0 ? this.state.bulletinPostComponentArray : <EmptyBulletinBoardMessage />}
                </div>
                <BullitenPostForm trailId={this.props.trailId} updateClientBulletinBoard={updateClientBulletinBoard} />
            </div>
        );
    }
}

class EmptyBulletinBoardMessage extends React.Component {
    render() {
        return (
            <div className="blank-bulletin-board-message" style={{
                textAlign: "center"
            }}>
                <p>No posts have been made on this trail recently.</p>
            </div>
        );
    }
}

export default TrailBullitenBoard;