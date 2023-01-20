import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {Home} from "../screens/Home";
import {New} from "../screens/New";
import {Habits} from "../screens/Habits";

const {Navigator, Screen} = createNativeStackNavigator()

export function AppRoutes() {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen
                name="home"
                component={Home}
            />
            <Screen
                name="new"
                component={New}
            />
            <Screen
                name="habit"
                component={Habits}
            />
        </Navigator>
    )
}
