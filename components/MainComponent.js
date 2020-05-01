import React, { Component } from 'react';
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import GameInfo from './GameInfoComponent';
import Cafe from './CafeComponent';
import Contact from './ContactComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

const DirectoryNavigator = createStackNavigator(
    {
        Directory: { screen: Directory },
        GameInfo: { screen: GameInfo }
    },
    {
        initialRouteName: 'Directory',
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'green'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
)

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'green'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
)

const CafeNavigator = createStackNavigator(
    {
        Cafe: { screen: Cafe }
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'green'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
)

const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact }
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'green'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
)

const MainNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeNavigator },
        Directory: { screen: DirectoryNavigator },
        Cafe: { screen: CafeNavigator },
        Contact: { screen: ContactNavigator }
    },
    {
        drawerBackgroundColor: 'orange'
    }
);

class Main extends Component {
    render()
    {
        return (
            <View style={{
                flex: 1,
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
                }}>
                <MainNavigator />       
            </View>
        );
    }
}

export default Main;