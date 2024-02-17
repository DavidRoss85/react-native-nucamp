import { useDispatch, useSelector } from 'react-redux';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { Avatar, ListItem } from 'react-native-elements';
import Loading from '../components/LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import * as Animatable from 'react-native-animatable';

const FavoritesScreen = ({ navigation }) => {
    const { campsitesArray, isLoading, errMess } = useSelector(
        (state) => state.campsites
    );
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();

    const renderFavoriteItem = ({ item: campsite }) => {
        return (
            <SwipeRow leftOpenValue={100} rightOpenValue={-100}>
                <View style={styles.swipeView}>
                    <TouchableOpacity
                        style={styles.greenTouchable}
                        onPress={() => Alert.alert(
                            'Test',
                            'This button doesn\'t do much...',
                            [
                                {
                                    text:'[Close]'
                                },
                                {
                                    text: '[See another prompt]',
                                    onPress: ()=> Alert.alert('Alert','A prompt after a prompt!',[{text:'Please no more...'}])
                                },
                                {
                                    text: '[Random button]',
                                    onPress:()=>Alert.alert('Alert','So Random')
                                }
                            ]
                        )}
                    >
                        <Text style={styles.deleteText}>Green</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style ={styles.whiteTouchable}/> 
                    <TouchableOpacity
                        style={styles.deleteTouchable}
                        onPress={() => Alert.alert(
                            'Delete',
                            `Are you sure you want to remove ${campsite.name} from your favorites?`,
                            [
                                {
                                    text:'No'
                                },
                                {
                                    text: 'Yes',
                                    onPress: ()=> dispatch(toggleFavorite(campsite.id))
                                }
                            ]
                        )}
                    >
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>                       
                </View>
                <View>
                    <ListItem
                        onPress={() =>
                            navigation.navigate('Directory', {
                                screen: 'CampsiteInfo',
                                params: { campsite }
                            })
                        }
                    >
                        <Avatar
                            rounded
                            source={{ uri: baseUrl + campsite.image }}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{campsite.name}</ListItem.Title>
                            <ListItem.Subtitle>
                                {campsite.description}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </View>
            </SwipeRow>

        )
    }

    if (isLoading) {
        return <Loading />;
    };

    if (errMess) {
        return (
            <View>
                <Text>{errMess}</Text>
            </View>
        );
    };

    return (
        <Animatable.View animation='fadeInRightBig' duration={2000}>
            <FlatList
                data={campsitesArray.filter((campsite) =>
                    favorites.includes(campsite.id)
                )}
                renderItem={renderFavoriteItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    swipeView: {
        flexDirection:'row',
        flex:1
    },
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    greenView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1
    },
    whiteTouchable:{
        backgroundColor: 'white',
        height: '100%',        
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 2
    },
    greenTouchable: {
        backgroundColor: 'green',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1
    },
    deleteTouchable: {
        backgroundColor: 'red',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    deleteText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 100
    }
});

export default FavoritesScreen;