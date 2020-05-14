import React, { Component } from 'react';
import { ScrollView, View, Text, FlatList } from 'react-native';
import { Card, ListItem, Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        treats: state.treats
    };
};

function Mission() {
    return(
        <Card title="Treat Yourself!" titleStyle={{fontSize: 50, fontWeight: 'bold'}}>
            <Text>
                We have a wide assortment array of treats and Board Games.  
                Fun for the whole family or just a group of friends.
            </Text>
        </Card>
    )
}

class Cafe extends Component {
   

    static navigationOptions = {
        title: 'Cafe'
    }


    render() {
       
        const renderTreat = ({item}) => {
            return(
                // <ListItem
                //     title={item.name}
                //     subtitle={item.description}
                //     leftAvatar={{ source: {uri: baseUrl + item.image}}}   
                // />
                <Tile
                    title={item.name}
                    titleStyle={{fontSize: 40, fontWeight: 'bold'}}
                    caption={item.description}
                    imageSrc={{uri: baseUrl + item.image}}
                />
            )
        }

        if (this.props.treats.isLoading) {
            return (
                <ScrollView>
                    <Mission />
                    <Card title="Cafe Treats" titleStyle={{fontSize: 40, fontWeight: 'bold'}}>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }
        if (this.props.treats.errMess) {
            return (
                <ScrollView>
                    <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                        <Mission />
                        <Card title="Cafe Treats" titleStyle={{fontSize: 40, fontWeight: 'bold'}}>
                            <Text>{this.props.treats.errMess}</Text>
                        </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }
        return(
            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                    <Mission />
                    <Card title="Cafe Treats" titleStyle={{fontSize: 40, fontWeight: 'bold'}}>
                        <FlatList
                            data={this.props.treats.treats}
                            renderItem={renderTreat}
                            keyExtractor={item => item.id.toString()}
                        />
                    </Card>
                </Animatable.View>
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(Cafe);