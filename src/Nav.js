import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductsScreen from "./Screens/ProductsScreen";
import ProductDetailScreen from "./Screens/ProductsDetailScreen";
import CartScreen from "./Screens/CartScreen";
import UploadProduct from "./Screens/UploadProduct";
import LoginScreen from "./Screens/LoginScreen";

const Stack = createStackNavigator();

const Nav = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerTitleAlign: 'center',
                }}
            >
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                />
                <Stack.Screen
                    name="Library"
                    component={ProductsScreen}
                    options={({ navigation }) => ({
                        headerRight: () => (
                            <Button
                                onPress={() => navigation.navigate('Cart')}
                                title="Cart"
                                color="#000" // Customize color
                            />
                        )
                    })}
                />
                <Stack.Screen
                    name="Manage Products"
                    component={UploadProduct}
                    options={({ navigation }) => ({
                        headerRight: () => (
                            <Button
                                onPress={() => navigation.navigate('Cart')}
                                title="Cart"
                                color="#000" // Customize color
                            />
                        )
                    })}
                />
                <Stack.Screen
                    name="Product Details"
                    component={ProductDetailScreen}
                    options={({ navigation }) => ({
                        headerRight: () => (
                            <Button
                                onPress={() => navigation.navigate('Cart')}
                                title="Cart"
                                color="#000" // Customize color
                            />
                        )
                    })}
                />
                <Stack.Screen
                    name="Cart"
                    component={CartScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Nav;
