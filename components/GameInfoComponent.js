import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { GAMES } from '../shared/games';


function RenderGame({game}) {
    if (game) {
        return (
            <Card   
                featuredTitle={game.name}
                image={require('./images/cafe.jpeg')}>
                <Text style={{margin: 10}}>
                    {game.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}


class GameInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: GAMES
        }
    }

    static navigationOptions = {
        title: 'Game Information'
    }

    render() {
        const gameId = this.props.navigation.getParam('gameId');
        const game = this.state.games.filter(game => game.id === gameId)[0];
        return <RenderGame game={game} />;
    } 
}



export default GameInfo;