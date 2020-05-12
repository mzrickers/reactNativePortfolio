import React, { Component } from 'react';
import { ScrollView, View, Text, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        treats: state.treats
    };
};

function Mission() {
    return(
        <Card title="Treat Yourself!">
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
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{ source: {uri: baseUrl + item.image}}}   
                />
            )
        }

        if (this.props.treats.isLoading) {
            return (
                <ScrollView>
                    <Mission />
                    <Card title="Cafe Treats">
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }
        if (this.props.treats.errMess) {
            return (
                <ScrollView>
                <Mission />
                <Card title="Cafe Treats">
                    <Text>{this.props.treats.errMess}</Text>
                </Card>
            </ScrollView>
            );
        }
        return(
            <ScrollView>
                <Mission />
                <Card title="Cafe Treats">
                    <FlatList
                        data={this.props.treats.treats}
                        renderItem={renderTreat}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(Cafe);