import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        games: state.games,
        comments: state.comments
    };
};

function RenderGame(props) {
    const {game} = props;

    if (game) {
        return (
            <Card   
                featuredTitle={game.name}
                image={{uri: baseUrl + game.image}}>
                <Text style={{margin: 10}}>
                    {game.description}
                </Text>
                <Icon
                    name={props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    raised
                    reverse
                    onPress={() => props.favorite ?
                        console.log('Already set as a favorite') : props.markFavorite()}
                />
            </Card>
        );
    }
    return <View />;
}

function RenderComments({comments}) {

    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        )
    }

    return (
        <Card title='Comments'>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />

            
        </Card>
    )
}


class GameInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorite: false
        }
    }

    markFavorite() {
        this.setState({favorite: true});
    }

    static navigationOptions = {
        title: 'Game Information'
    }

    render() {
        const gameId = this.props.navigation.getParam('gameId');
        const game = this.props.games.games.filter(game => game.id === gameId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.gameId === gameId);
        return (
            <ScrollView>
                <RenderGame game={game} 
                    favorite={this.state.favorite}
                    markFavorite={() => this.markFavorite()}
                
                />
                <RenderComments comments={comments} />
            </ScrollView>
        );
    } 
}



export default connect(mapStateToProps)(GameInfo);