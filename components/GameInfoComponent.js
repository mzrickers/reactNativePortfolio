import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';


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


function GameInfo(props) {
    return <RenderGame game={props.game} />;
}



export default GameInfo;