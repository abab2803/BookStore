import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from "@react-navigation/native-stack";


import CartScreen from "./Screens/CartScreen";
import ProductsScreen from "./Screens/ProductsScreen";
import ProductsDetailScreen from "./Screens/ProductsDetailScreen";
import Uploadproduct from "./Screens/UploadProduct"
import {StyleSheet} from "react-native";

const Stack = createNativeStackNavigator();

const Nav = () => {
    return(
        <NavigationContainer>
           <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
               <Stack.Screen name="Library" component={ProductsScreen} />
               <Stack.Screen name="Create Products" component={Uploadproduct} />
               <Stack.Screen name="Product Details" component={ProductsDetailScreen} />
               {/*<Stack.Screen name="Add Carts" component={CartScreen}  /> */}

           </Stack.Navigator>
        </NavigationContainer>

    );
}

export default Nav;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        textAlign: "center"

    },

});
