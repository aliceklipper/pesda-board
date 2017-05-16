import React from 'react';
import PropTypes from 'prop-types';

import Comment from './Comment';

export default class Comments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            justConnected: false,
        };

        this.handleComments = this.handleComments.bind(this);
        this.handleConnect = this.handleConnect.bind(this);

        const socket = this.props.socket;
        this.socket = socket;

        socket.on('comments', this.handleComments);
        socket.on('connect', this.handleConnect);
    }

    render() {
        return (
            <section className="Comments">
                {this.state.comments
                    .sort((a, b) => {
                        return a.timestamp - b.timestamp;
                    })
                    .map((comment, i) => (
                        <Comment
                            index={i}
                            key={i}
                            name={comment.name}
                            theme={comment.theme}
                            comment={comment.comment}
                            timestamp={comment.timestamp}
                        />
                    ))}
            </section>
        );
    }

    handleComments(comments) {
        this.setState({
            comments: this.state.justConnected ? comments : this.state.comments.concat(comments),
            justConnected: false,
        });
    }

    handleConnect() {
        this.setState({ justConnected: true });
    }
}

Comments.propTypes = {
    socket: PropTypes.object,
};
