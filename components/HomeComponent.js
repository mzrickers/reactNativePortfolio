import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        games: state.games,
        decors: state.decors,
        treats: state.treats
    };
};


function RenderItem(props) {
    const {item} = props;

    if (props.isLoading) {
        return <Loading />;
    }
    if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }
    if (item) {
        return(
            <Card
                featuredTitle={item.name}
                image={{uri: baseUrl + item.image}}>
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

    static navigationOptions = {
        title: 'Home'
    }
    
    render() {
        return(
            <ScrollView>
                <RenderItem 
                    item={this.props.games.games.filter(game => game.featured)[0]} 
                    isLoading={this.props.games.isLoading}
                    errMess={this.props.games.errMess}    
                />
                <RenderItem
                    item={this.props.treats.treats.filter(treat => treat.featured)[0]} 
                    isLoading={this.props.treats.isLoading}
                    errMess={this.props.treats.errMess}   
                />
                <RenderItem
                    item={this.props.decors.decors.filter(decor => decor.featured)[0]} 
                    isLoading={this.props.decors.isLoading}
                    errMess={this.props.decors.errMess}    
                />
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(Home);