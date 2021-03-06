import React, { Component } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        games: state.games,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    deleteFavorite: gameId => (deleteFavorite(gameId))
};

class Favorites extends Component {

    static navigationOptions = {
        title: 'My Favorites'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderFavoriteItem = ({item}) => {
            const rightButton = [
                {
                    text: 'Delete',
                    type: 'delete',
                    onPress: () => {
                        Alert.alert(
                            'Delete Favorite?',
                            'Are you sure you wish to delete the favorite game ' + item.name + '?',
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log(item.name + ' Not Deleted'),
                                    style: 'cancel'   
                                },
                                {
                                    text: 'OK',
                                    onPress: () => this.props.deleteFavorite(item.id)
                                }
                            ],
                            { cancelable: false }
                        )
                    }
                }
            ];
            return (
                <Swipeout right={rightButton} autoClose={true}>
                    <Animatable.View animation='fadeInRightBig' duration={2000}>
                        <ListItem
                            title={item.name}
                            subtitle={item.description}
                            leftAvatar={{source: {uri: baseUrl + item.image}}}
                            onPress={() => navigate('GameInfo', {gameId: item.id})}
                        />
                    </Animatable.View>
                </Swipeout>
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

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);