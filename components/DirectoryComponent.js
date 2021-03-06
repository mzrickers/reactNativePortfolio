import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        games: state.games
    };
};


class Directory extends Component {
  
    static navigationOptions = {
        title: 'Directory'
    };

    render() {
        const { navigate } = this.props.navigation;
        const renderDirectoryItem = ({item}) => {
            return(
                <Animatable.View animation='fadeInRightBig' duration={2000}>
                    <Tile
                        title={item.name}
                        titleStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)', width: '100%', position: 'absolute', bottom: 40}}
                        caption={item.description}
                        captionStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)', width: '100%', position: 'absolute', bottom: 0}}
                        featured
                        onPress={() => navigate('GameInfo', { gameId: item.id })}
                        imageSrc={{uri: baseUrl + item.image}}
                    />
                </Animatable.View>
            );
        };

        if (this.props.games.isLoading) {
            return <Loading />;
        }
        if (this.props.games.errMess) {
            return (
                <View>
                    <Text>{this.props.games.errMess}</Text>
                </View>
            );
        }
        return(
            <FlatList
                data={this.props.games.games}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        )
    }
}

export default connect(mapStateToProps)(Directory);