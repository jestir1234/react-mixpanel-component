import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { MixPanelContext } from '.';

export class MixPanel extends Component {
    state = {
        callbackQueu: []
    }
    componentDidMount() {
        if (this.props.callbacks.length) {
            this.setState({ callbackQueu: this.props.callbacks });
        }
    }
    render() {
        return (
            <MixPanelContext.Consumer>
                {mixPanelContext => {
                    if (mixPanelContext.isLoaded && this.state.callbackQueu.length) {
                        this.triggerCallbacks(mixPanelContext);
                        return null;
                    }
                    return (
                        <Fragment>
                            {this.props.render(this.setEvent(mixPanelContext))}
                        </Fragment>
                    );
                }}
            </MixPanelContext.Consumer>
        );
    }

    triggerCallbacks = mixPanelContext => {
        this.state.callbackQueu.forEach(callback => {
            if (typeof callback === 'function') {
                callback();
            }

            if (typeof callback === 'object') {
                mixPanelContext.trackEvent(callback.event);
                window.mixpanel.track(callback.event.name, {
                    ...callback.event.customProperties
                });
            }
        });

        this.setState({ callbackQueu: [] });
    }

    setEvent = mixPanelContext => {
        if (!mixPanelContext.isLoaded) {
            return eventHandler => {
                eventHandler();
            };
        }

        const { event } = this.props;

        return eventHandler => {
            mixPanelContext.trackEvent(event);
            window.mixpanel.identify();
            window.mixpanel.track(event.name, {
                ...event.customProperties
            });
            eventHandler();
        };
    }
}

MixPanel.propTypes = {
    render: PropTypes.func,
    event: PropTypes.object,
    callbacks: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object
    ]))
};

MixPanel.defaultProps = {
    render: () => {},
    callbacks: []
};

