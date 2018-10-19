import React from 'react';
import PropTypes from 'prop-types';
export * from './MixPanelComponent';
export const MixPanelContext = React.createContext();

class MixPanelProvider extends React.Component {
    state = {
        trackedEvents: {},
        mutationObserver: null,
        isLoaded: false
    }

    componentDidMount() {
        const mutationObserver = new MutationObserver(this.mixPanelHasLoaded);

        mutationObserver.observe(document.documentElement, {
            childList: true,
            subtree: true
        });

        this.setState({ mutationObserver });
    }

    render() {
        return (
            <MixPanelContext.Provider
                value={ {
                    state: this.state,
                    trackedEvents: this.state.trackedEvents,
                    isLoaded: this.state.isLoaded,
                    trackEvent: this.trackEvent
                } }>
                {this.props.children}
            </MixPanelContext.Provider>
        );
    }

    mixPanelHasLoaded = mutations => {
        const scriptMutations = mutations.filter(mutation => mutation.addedNodes.length
            && mutation.addedNodes[0].nodeName === 'SCRIPT'
            && mutation.addedNodes[0].src.includes('mixpanel'));
        if (scriptMutations.length) {
            this.state.mutationObserver.disconnect();
            this.setState({ isLoaded: true });
        }
    }

    trackEvent = (event) => this.setState({ trackedEvents: { ...this.state.trackedEvents, [event.name]: event } })
}

MixPanelProvider.propTypes = {
    children: PropTypes.node
};

export default MixPanelProvider;

