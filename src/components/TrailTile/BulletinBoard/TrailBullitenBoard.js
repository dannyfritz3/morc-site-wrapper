import React from 'react';
import BullitenPostForm from './BullitenPostForm';
import BullitenPost from './BullitenPost';
import axios from 'axios';

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

    }

    render(props) {
        const updateClientBulletinBoard = (clientPost) => {
            var postUsername = clientPost[0];
            var postMessage = clientPost[2];
            var postTimestampArray = clientPost[1];
            var clientPostComponent = <BullitenPost postAuthor={postUsername} postMessage={postMessage} postTimestamp={postTimestampArray} />;
            var updatedArray = this.state.bulletinPosts.concat(clientPostComponent);
            this.setState({bulletinPosts: updatedArray});
        };

        const getBulletinMessages = () => {
            axios.get("http://localhost:4000/getBulletinBoard/" + this.props.trail_id).then((response) => {
                this.setState({
                    bulletinPosts: response.data
                });
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
        };

        const clickBulletinAdminBox = async (event) => {
            debugger;
            var el = event.currentTarget;
            if (!el.classList.contains("active-bulletin-board")) {
                el.classList.remove("inactive-bulletin-board");
                el.classList.add("active-bulletin-board");
                getBulletinMessages();
            } else {
                el.classList.remove("active-bulletin-board");
                el.classList.add("inactive-bulletin-board");
            }
        }

        return (
            <div className="trail-bulliten-board" onClick={(event) => event.stopPropagation()}>
                <div className="admin-block">
                    <div className="admin-post">
                        <div className="post-admin-author"><b>{this.props.trailAuthor}</b></div>
                        <div className="post-admin-text">{this.props.trailComments}</div>
                    </div>
                    <div className="post-admin-footer" onClick={(e) => clickBulletinAdminBox(e)} style={{ textAlign: "right", width: "100%", backgroundColor: "#ADAEAB" }}>
                        <img className="warning-icon" src={require("../../../resource/icons8-error-32.png")} />
                    </div>

                </div>
                <div className="expandable-bulletin-board  inactive-bulletin-board">
                    <div className="trail-bulliten-messages">
                        {this.state.bulletinPosts.length > 0 ? this.state.bulletinPostComponentArray : <EmptyBulletinBoardMessage />}
                    </div>
                    <BullitenPostForm trailId={this.props.trailId} updateClientBulletinBoard={updateClientBulletinBoard} />
                </div>
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