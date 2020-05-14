import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import { postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        games: state.games,
        comments: state.comments,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    postFavorite: gameId => (postFavorite(gameId)),
    postComment: (gameId, rating, author, text) => (postComment(gameId, rating, author, text))
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
                <View style={styles.cardRow}>
                    <Icon
                        name={props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        raised
                        reverse
                        onPress={() => props.favorite ?
                            console.log('Already set as a favorite') : props.markFavorite()}
                    />
                    <Icon
                        style={styles.cardItem}
                        name='pencil'
                        type='font-awesome'
                        color='green'
                        raised
                        reverse
                        onPress={() => props.onShowModal()}
                    />
                </View>
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
                <Rating
                    startingValue={item.rating}
                    imageSize={10}
                    style={{alignItems: 'flex-start', paddingVertical: '5%'}}
                    readonly
                />
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
            showModal: false,
            rating: 5,
            author: '',
            text: ''
        }
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal})
    }

    handleComment(gameId) {
        this.props.postComment(gameId, this.state.rating, this.state.author, this.state.text);
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            showModal: false,
            rating: 5,
            author: '',
            text: ''
        });
    }

    markFavorite(gameId) {
        this.props.postFavorite(gameId);
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
                    favorite={this.props.favorites.includes(gameId)}
                    markFavorite={() => this.markFavorite(gameId)} 
                    onShowModal={() => this.toggleModal()}           
                />
                <RenderComments comments={comments} />
                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}>
                    <View style={styles.modal}>
                        <Rating
                            showRating
                            startingValue={this.state.rating}
                            imageSize={40}
                            onFinishRating={(rating) => this.setState({rating: rating})}
                            style={{paddingVertical: 10}}
                        />
                        <Input
                            value={this.state.author}
                            placeholder='Author'
                            leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                            leftIconContainerStyle={{paddingRight: 10}}
                            onChangeText={value => this.setState({author: value})}
                        />
                        <Input
                            value={this.state.text}
                            placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment-o'}}
                            leftIconContainerStyle={{paddingRight: 10}}
                            onChangeText={value => this.setState({text: value})}
                        />
                        <View>
                            <Button
                                title='Submit'
                                color='green'
                                onPress={() => {
                                    this.handleComment(gameId);
                                    this.resetForm();
                                }}                    

                            />
                        </View>
                        <View style={{margin: 10}}>
                            <Button
                                onPress={() => {
                                    this.toggleModal();
                                    this.resetForm();
                                }}
                                color='#808080'
                                title='Cancel'
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    } 
}

const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    cardItem: {
        flex: 1,
        margin: 10
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(GameInfo);