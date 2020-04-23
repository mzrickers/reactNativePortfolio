import React, { Component } from 'react';
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import GameInfo from './GameInfoComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

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

const MainNavigator = createBottomTabNavigator(
    {
        Home: { screen: HomeNavigator },
        Directory: { screen: DirectoryNavigator }
    },
    {
        activeBackgroundColor: 'dark green'
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