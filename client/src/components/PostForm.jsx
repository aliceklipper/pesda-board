import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class PostForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: {
                name: 'Anon',
                theme: 'Re: Pesda',
                comment: '',
            },
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleThemeChange = this.handleThemeChange.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <section className="PostForm">
                <TextField
                    floatingLabelText="Name"
                    value={this.state.input.name}
                    onChange={this.handleNameChange}
                    fullWidth={true}
                />
                <TextField
                    floatingLabelText="Topic"
                    value={this.state.input.theme}
                    onChange={this.handleThemeChange}
                    fullWidth={true}
                />
                <TextField
                    floatingLabelText="Comment"
                    value={this.state.input.comment || ''}
                    onChange={this.handleCommentChange}
                    multiLine={true}
                    rows={3}
                    rowsMax={8}
                    fullWidth={true}
                />
                <RaisedButton
                    label="Post comment"
                    primary={true}
                    fullWidth={true}
                    onTouchTap={this.handleSubmit}
                    disabled={!this.props.connected}
                />
            </section>
        );
    }

    handleNameChange(event) {
        this.setState({ input: Object.assign({}, this.state.input, { name: event.target.value }) });
    }

    handleThemeChange(event) {
        this.setState({ input: Object.assign({}, this.state.input, { theme: event.target.value }) });
    }

    handleCommentChange(event) {
        this.setState({ input: Object.assign({}, this.state.input, { comment: event.target.value }) });
    }

    handleSubmit() {
        const input = Object.assign({}, this.state.input);
        input.name = input.name || 'Anon';
        input.theme = input.theme || 'Re: Zero';

        this.props.onSubmit(input);
        this.setState({
            input: Object.assign({}, this.state.input, { comment: '' }),
        });
    }
}

PostForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    connected: PropTypes.bool,
};
