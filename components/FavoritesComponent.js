import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        games: state.games,
        favorites: state.favorites
    };
};

class Favorites extends Component {

    static navigationOptions = {
        title: 'My Favorites'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderFavoriteItem = ({item}) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{source: {uri: baseUrl + item.image}}}
                    onPress={() => navigate('GameInfo', {gameId: item.id})}
                />
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
        return (
            <FlatList
                data={this.props.games.games.filter(
                    game => this.props.favorites.includes(game.id)
                )}
                renderItem={renderFavoriteItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps)(Favorites);