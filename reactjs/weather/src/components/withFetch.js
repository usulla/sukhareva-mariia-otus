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
        async fetchData() {
            try {
                const data = await fetch(props.url)
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
                console.error(error);
            }
        }
        async componentDidMount() {
            this.fetchData();
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