import React from 'react';
import * as io from 'socket.io-client';

import Header from './Header';
import Comments from './Comments';
import PostForm from './PostForm';

/**
 * Main component.
 */
export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            connected: false,
        };

        this.handlePost = this.handlePost.bind(this);
        this.handleConnect = this.handleConnect.bind(this);
        this.handleDisconnect = this.handleDisconnect.bind(this);

        const socket = io.connect(location.origin);
        this.socket = socket;

        socket.on('connect', this.handleConnect);
        socket.on('disconnect', this.handleDisconnect);
    }

    render() {
        return (
            <div className="App">
                <Header connected={this.state.connected} />
                <div className="App__Comments">
                    <Comments socket={this.socket} />
                    <PostForm connected={this.state.connected} onSubmit={this.handlePost} />
                </div>
            </div>
        );
    }

    handlePost(input) {
        this.socket.emit('comment', input);
    }

    handleConnect() {
        this.setState({ connected: true });
    }

    handleDisconnect() {
        this.setState({ connected: false });
    }
}
