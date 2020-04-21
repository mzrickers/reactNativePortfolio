import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import { GAMES } from '../shared/games';

class Main extends Component {
    constructor(props) 
    {
        super(props);
        this.state =
        {
            games: GAMES
        };
    }

    render()
    {
        return (
            <Directory games={this.state.games} />
        );
    }
}

export default Main;