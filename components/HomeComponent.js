import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { GAMES } from '../shared/games';
import { DECORS } from '../shared/decors';
import { COMMENTS } from '../shared/comments';
import { TREATS } from '../shared/treats';


function RenderItem({item}) {
    if (item) {
        return(
            <Card
                featuredTitle={item.name}
                image={require('./images/cafe.jpeg')}    >
                <Text
                    style={{margin: 10}}>
                    {item.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            games: GAMES,
            decors: DECORS,
            comments: COMMENTS,
            treats: TREATS
        }
    }

    static navigationOptions = {
        title: 'Home'
    }
    
    render() {
        return(
            <ScrollView>
                <RenderItem 
                    item={this.state.games.filter(game => game.featured)[0]} />
                <RenderItem
                    item={this.state.treats.filter(treat => treat.featured)[0]} />
                <RenderItem
                    item={this.state.decors.filter(decor => decor.featured)[0]} />
            </ScrollView>
        )
    }
}

export default Home;