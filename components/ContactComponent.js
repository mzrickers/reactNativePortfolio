import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

class Contact extends Component 
{
    constructor(props) 
    {
        super(props);
    }

    static navigationOptions = {
        title: 'Contact Us'
    }
    
    render() 
    {
        return(
            <ScrollView>
                <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
                    <Card title='Contact Information' wrapperStyle={{margin: 20}}>
                        <Text>42 Boardgame Way</Text>
                        <Text>Boulder, CO 80401</Text>
                        <Text style={{marginBottom: 10}}>USA</Text>
                        <Text>Phone: 1-303-867-5309</Text>
                        <Text>Email: boardgames@nucamp.co</Text>
                    </Card>
                </Animatable.View>
            </ScrollView>
        )
    }
}

export default Contact;