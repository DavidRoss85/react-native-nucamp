import { Platform, View, StyleSheet, Image, Text } from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { fetchPartners } from '../features/partners/partnersSlice';
import { fetchCampsites } from '../features/campsites/campsitesSlice';
import { fetchPromotions } from '../features/promotions/promotionsSlice';
import { fetchComments } from '../features/comments/commentsSlice';

import HomeScreen from './HomeScreen';
import CampsiteInfoScreen from "./CampsiteInfoScreen";
import DirectoryScreen from './DirectoryScreen';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';
import ReservationScreen from './ReservationScreen';
import logo from '../assets/images/logo.png'

const Drawer = createDrawerNavigator();

const screenOptions = {
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: '#5637DD' }
}

const HomeNavigator = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={screenOptions}
            initialRouteName='HomePage'
        >
            <Stack.Screen
                name='HomePage'
                component={HomeScreen}
                options={({ navigation }) => ({
                    title: 'Home',
                    headerLeft: () => {
                        return (
                            <Icon
                                name='home'
                                type='font-awesome'
                                iconStyle={styles.stackIcon}
                                onPress={() => navigation.toggleDrawer()}
                            />
                        )
                    }
                })}
            />
        </Stack.Navigator>
    )
}

const DirectoryNavigator = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName='DirectoryPage'
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name='DirectoryPage'
                component={DirectoryScreen}
                options={({ navigation }) => ({
                    title: 'Directory',
                    headerLeft: () => {
                        return (
                            <Icon
                                name='list'
                                type='font-awesome'
                                iconStyle={styles.stackIcon}
                                onPress={() => navigation.toggleDrawer()}
                            />
                        )
                    }
                })}
            />
            <Stack.Screen
                name='CampsiteInfo'
                component={CampsiteInfoScreen}
                options={({ route }) => ({
                    title: route.params.campsite.name
                })}
            />
        </Stack.Navigator>
    )
}

const AboutNavigator = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName='AboutPage'
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name='AboutPage'
                component={AboutScreen}
                options={({ navigation }) => ({
                    title: 'About',
                    headerLeft: () => {
                        return (
                            <Icon
                                name='info-circle'
                                type='font-awesome'
                                iconStyle={styles.stackIcon}
                                onPress={() => navigation.toggleDrawer()}
                            />
                        )
                    }
                })}
            />
        </Stack.Navigator>
    )
}

const ContactNavigator = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName='ContactPage'
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name='ContactPage'
                component={ContactScreen}
                options={({ navigation }) => ({
                    title: 'Contact Us',
                    headerLeft: () => {
                        return (
                            <Icon
                                name='address-card'
                                type='font-awesome'
                                iconStyle={styles.stackIcon}
                                onPress={() => navigation.toggleDrawer()}
                            />
                        )
                    }
                })}
            />
        </Stack.Navigator>
    )
}

const ReservationNavigator = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName='ReservationPage'
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name='ReservationPage'
                component={ReservationScreen}
                options={({ navigation }) => ({
                    title: 'Reservation Search',
                    headerLeft: () => {
                        return (
                            <Icon
                                name='tree'
                                type='font-awesome'
                                iconStyle={styles.stackIcon}
                                onPress={() => navigation.toggleDrawer()}
                            />
                        )
                    }
                })}
            />
        </Stack.Navigator>
    )
}

const CustomDrawerContent = (props) => {

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerHeader}>
                <View style={{ flex: 1 }}>
                    <Image source={logo} style={styles.drawerImage} />
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={styles.drawerHeaderText}>NuCamp</Text>
                </View>
            </View>
            <DrawerItemList {...props} labelStyle={{ fontWeight: 'bold' }} />
        </DrawerContentScrollView>
    )
}
const Main = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCampsites());
        dispatch(fetchPromotions());
        dispatch(fetchPartners());
        dispatch(fetchComments());
    }, [dispatch]);

    return (
        <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
            <Drawer.Navigator
                initialRouteName='Home'
                drawerContent={CustomDrawerContent}
                drawerStyle={{ backgroundColor: '#CEC8FF' }}
            >
                <Drawer.Screen
                    name='Home'
                    component={HomeNavigator}
                    options={{
                        title: 'Home',
                        drawerIcon: ({ color }) => {
                            return (
                                <Icon
                                    name='home'
                                    type='font-awesome'
                                    size={24}
                                    iconStyle={{ width: 24 }}
                                    color={color}
                                />
                            )
                        }
                    }}
                />
                <Drawer.Screen
                    name='Directory'
                    component={DirectoryNavigator}
                    options={{
                        title: 'Directory',
                        drawerIcon: ({ color }) => {
                            return (
                                <Icon
                                    name='list'
                                    type='font-awesome'
                                    size={24}
                                    iconStyle={{ width: 24 }}
                                    color={color}
                                />
                            )
                        }
                    }}
                />
                <Drawer.Screen
                    name='ReserveCampsite'
                    component={ReservationNavigator}
                    options={{
                        title: 'Reserve Campsite',
                        drawerIcon: ({ color }) => {
                            return (
                                <Icon
                                    name='tree'
                                    type='font-awesome'
                                    size={24}
                                    iconStyle={{ width: 24 }}
                                    color={color}
                                />
                            )
                        }
                    }}
                />
                <Drawer.Screen
                    name='About'
                    component={AboutNavigator}
                    options={{
                        title: 'About',
                        drawerIcon: ({ color }) => {
                            return (
                                <Icon
                                    name='info-circle'
                                    type='font-awesome'
                                    size={24}
                                    iconStyle={{ width: 24 }}
                                    color={color}
                                />
                            )
                        }
                    }}
                />
                <Drawer.Screen
                    name='Contact'
                    component={ContactNavigator}
                    options={{
                        title: 'Contact Us',
                        drawerIcon: ({ color }) => {
                            return (
                                <Icon
                                    name='address-card'
                                    type='font-awesome'
                                    size={24}
                                    iconStyle={{ width: 24 }}
                                    color={color}
                                />
                            )
                        }
                    }}
                />
            </Drawer.Navigator>
        </View>
    )

};

const styles = StyleSheet.create({
    drawerHeader: {
        backgroundColor: '#5637DD',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    },
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    }
})

export default Main;