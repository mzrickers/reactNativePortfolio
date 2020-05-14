import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet, Alert, PanResponder } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import { postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

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

    const view = React.createRef();

    const recognizeDrag = ({dx}) => (dx < -200) ? true : false;

    //const recognizeComment = ({dx}) => (dx > 200) ? true : false;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            view.current.rubberBand(1000)
            .then(endState => console.log(endState.finished ? 'finished' : 'canceled'));
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log('pan responder end', gestureState);
            if (recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + game.name + ' to favorites?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => console.log('Cancel Pressed')
                        },
                        {
                            text: 'OK',
                            onPress: () => props.favorite ?
                                console.log('Already set as a favorite') : props.markFavorite()
                        }
                    ],
                    { cancelable: false }
                );
            }
            return true;
        }
    });

    if (game) {
        return (
            <Animatable.View 
                animation='fadeInDown' 
                duration={2000} 
                delay={1000}
                ref={view}
                {...panResponder.panHandlers}>
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
            </Animatable.View>
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
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
            <Card title='Comments'>
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />     
            </Card>
        </Animatable.View>
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