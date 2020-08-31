import React from "react";
// HOC
const withFetch = props => {
    return (Cmp) => class WithFetch extends React.Component {
        constructor() {
            super();
            this.state = {
                results: []
            };
        }
        controller = new AbortController()
        async fetchData() {
            try {
                const data = await fetch(props.url, { signal: this.controller.signal })
                if (!data.ok) {
                    throw Error(data.statusText)
                }
                const json = await data.json()
                if (json) {
                    this.setState({
                        results: json
                    });
                }
            } catch (error) {
                if (error.name === 'AbortError') return
                throw error
            }
        }
        async componentDidMount() {
            this.fetchData();
        }
        //cancel subscription by abort
        componentWillUnmount() {
            this.controller.abort();
        }
        render() {
            const { results } = this.state;
            return (
                <Cmp results={results} {...this.props} />
            )
        }
    }
}

export default withFetch;