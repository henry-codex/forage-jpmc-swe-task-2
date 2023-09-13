import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
    data: ServerRespond[],
    showGraph: boolean,
    // Add a new property to keep track of the interval ID
    intervalId?: NodeJS.Timeout | null,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            data: [],
            showGraph: false,
            intervalId: null, // Initialize intervalId as null
        };
    }

    /**
     * Render Graph react component with state.data passed as a property data
     */
    renderGraph() {
        if (this.state.showGraph) {
            return <Graph data={this.state.data} />;
        }
    }

    /**
     * Get new data from the server and update the state with the new data
     */
    getDataFromServer() {
        // Clear the previous interval if it exists
        if (this.state.intervalId) {
            clearInterval(this.state.intervalId);
        }

        // Start a new interval to fetch data every 100ms
        const intervalId = setInterval(() => {
            DataStreamer.getData((serverResponds: ServerRespond[]) => {
                this.setState({
                    data: serverResponds,
                    showGraph: true,
                });
            });
        }, 100);

        // Save the interval ID in the state
        this.setState({ intervalId });
    }

    /**
     * Render the App react component
     */
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    Bank & Merge Co Task 2
                </header>
                <div className="App-content">
                    <button
                        className="btn btn-primary Stream-button"
                        onClick={() => {
                            this.getDataFromServer();
                        }}
                    >
                        Start Streaming Data
                    </button>
                    <div className="Graph">
                        {this.renderGraph()}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
