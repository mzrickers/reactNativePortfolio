import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class Contact extends Component 
{
    constructor(props) 
    {
        super(props);
    }

    static navigationOptions = {
        title: 'Contact Us'
    }

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['boardgames@nucamp.co'],
            subject: 'Inquiry',
            body: 'To whom it may concern:'
        })
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
                        <Button
                            title="Send Email"
                            buttonStyle={{backgroundColor: '#92CD28', margin: 40}}
                            icon={<Icon
                                name='envelope-o'
                                type='font-awesome'
                                color='#fff'
                                iconStyle={{marginRight: 10}}
                            />}
                            onPress={() => this.sendMail()}
                        />
                    </Card>
                </Animatable.View>
            </ScrollView>
        )
    }
}

export default Contact;