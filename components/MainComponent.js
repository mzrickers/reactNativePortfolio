import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import GameInfo from './GameInfoComponent';
import { View } from 'react-native';
import { GAMES } from '../shared/games';

class Main extends Component {
    constructor(props) 
    {
        super(props);
        this.state =
        {
            games: GAMES,
            selectedGame: null
        };
    }

    onGameSelect(gameId) {
        this.setState({selectedGame: gameId});
    }

    render()
    {
        return (
            <View style={{flex: 1}}>
                <Directory 
                    games={this.state.games} 
                    onPress={gameId => this.onGameSelect(gameId)}    
                />
                <GameInfo 
                    game={this.state.games.filter(game => game.id === this.state.selectedGame)[0]}
                />
            </View>
        );
    }
}

export default Main;