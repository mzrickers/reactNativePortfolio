import React, { Component } from 'react';
import { ScrollView, View, Text, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { TREATS } from '../shared/treats';

 function Mission() {
    return(
        <Card title="Our Mission">
            <Text>
                We have a wide assortment array of treats and Board Games.  
                Fun for the whole family or just a group of friends.
            </Text>
        </Card>
    )
}

class Cafe extends Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {
            treats: TREATS
        }
    }

    static navigationOptions = {
        title: 'Cafe'
    }

   

    render() 
    {

        const renderTreat = ({item}) => {
            return(
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{ source: require('./images/coffee.jpg')}}   
                />
            )
        }

        return(
            <ScrollView>
                <Mission />
                <Card title="Cafe Treats">
                    <FlatList
                        data={this.state.treats}
                        renderItem={renderTreat}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>
        )
    }
}

export default Cafe;