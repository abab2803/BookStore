import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductsScreen from "./Screens/ProductsScreen";
import ProductDetailScreen from "./Screens/ProductsDetailScreen";
import CartScreen from "./Screens/CartScreen";
import UploadProduct from "./Screens/UploadProduct";

const Stack = createStackNavigator();

const Nav = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={({ navigation }) => ({
                    headerTitleAlign: 'center',
                    headerRight: () => (
                        <Button
                            onPress={() => navigation.navigate('Cart')}
                            title="Cart"
                            color="#000" // Customize color
                        />
                    )
                })}
            >
                <Stack.Screen name="Library" component={ProductsScreen} />
                <Stack.Screen name="Manage Products" component={UploadProduct} />
                <Stack.Screen name="Product Details" component={ProductDetailScreen} />
                <Stack.Screen name="Cart" component={CartScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Nav;
