import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gamers: 1,
            ownGame: false,
            date: '',
            showModal: false
        };
    }

    static navigationOptions = {
        title: 'Reserve Game Table'
    }

    // toggleModal() {
    //     this.setState({showModal: !this.state.showModal});
    // }

    handleReservation() {
        // console.log(JSON.stringify(this.state));
        // this.toggleModal();
        Alert.alert(
            'Begin Search?',
            'Number of Gamers: ' + this.state.gamers + '\n\nHike-In? ' + this.state.ownGame + '\n\nDate: ' + this.state.date,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => this.resetForm()
                },
                {
                    text: 'OK',
                    onPress: () => {
                        this.presentLocalNotification(this.state.date);
                        this.resetForm();
                    }
                }
            ],
            { cancelable: false }
        );
    }

    resetForm() {
        this.setState({
            gamers: 1,
            ownGame: false,
            date: ''
            //showModal: false
        });
    }

    async obtainNotificationPermission() {
        const permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            const permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
            return permission;
        }
        return permission;
    }

    async presentLocalNotification(date) {
        const permission = await this.obtainNotificationPermission();
        if (permission.status === 'granted') {
            Notifications.presentLocalNotificationAsync({
                title: 'Your Game Table Reservation Search',
                body: 'Search for ' + date + ' requested'
            });
        }
    }

    render() {
        return (
            <Animatable.View  
            animation='zoomIn' 
            duration={2000} 
            delay={1000}>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Gamers</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.gamers}
                        onValueChange={itemValue => this.setState({gamers: itemValue})}>
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Bringing your game?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.ownGame}
                        trackColor={{true: '#92CD28', false: null}}
                        onValueChange={value => this.setState({ownGame: value})}>
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date</Text>
                    <DatePicker
                        style={{flex: 2, marginRight: 20}}
                        date={this.state.date}
                        format='YYYY-MM-DD'
                        mode='date'
                        placeholder='Select Date'
                        minDate={new Date().toISOString()}
                        confirmBtnText='Confirm'
                        cancelBtnText='Cancel'
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={date => {this.setState({date: date})}}
                    />
                </View>
                <View style={styles.formRow}>
                    <Button
                        onPress={() => this.handleReservation()}
                        title='Search'
                        color='#92CD28'
                        accessibilityLabel='Tap me to search for available game tables to reserve'
                    />
                </View>
                {/* <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Search Game Table Reservations</Text>
                        <Text style={styles.modalText}>Number of Gamers: {this.state.campers}</Text>
                        <Text style={styles.modalText}>Own Game?: {this.state.hikeIn ? 'Yes' : 'No'}</Text>
                        <Text style={styles.modalText}>Date: {this.state.date}</Text>
                        <Button
                            onPress={() => {
                                this.toggleModal();
                                this.resetForm();
                            }}
                            color='#92CD28'
                            title='Close'
                        />
                    </View>
                </Modal> */}
            </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: { 
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#92CD28',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;