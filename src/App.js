import React, { Component } from 'react';
import Table from './components/Table';
import Drawer from './components/Drawer';
import './App.scss';

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>Список задач</h1>
                <Drawer />
                <div className="App-Content">
                    <Table />
                </div>
            </div>
        );
    }
}

export default App;
