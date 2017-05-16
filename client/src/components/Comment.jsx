import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardHeader, CardText } from 'material-ui/Card';

import moment from 'moment';

export default class Comment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timeElapsed: 0,
        };
    }

    render() {
        const timer = setTimeout(() => {
            this.setState({ timeElapsed: this.state.timeElapsed + 1 });
            clearTimeout(timer);
        }, 1000 * 60);

        const title = (
            <span>
                #{this.props.index}{' '}
                {this.props.theme}
            </span>
        );

        const subtitle = (
            <span>
                {this.props.name},{' '}
                {moment(this.props.timestamp).fromNow().replace(/ /g, ' ')}
            </span>
        );

        return (
            <Card className="Comment">
                <CardHeader title={title} subtitle={subtitle} />
                <CardText>{this.props.comment}</CardText>
            </Card>
        );
    }
}

Comment.propTypes = {
    index: PropTypes.number,
    name: PropTypes.string,
    theme: PropTypes.string,
    comment: PropTypes.string,
    timestamp: PropTypes.number,
};
