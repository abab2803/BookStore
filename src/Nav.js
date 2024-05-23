import React from 'react';
import { Button, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductsScreen from "./Screens/ProductsScreen";
import ProductDetailScreen from "./Screens/ProductsDetailScreen";
import CartScreen from "./Screens/CartScreen";
import UploadProduct from "./Screens/UploadProduct";
import LoginScreen from "./Screens/LoginScreen";
import { useUser } from './context/UserContext';

const Stack = createStackNavigator();

const Nav = () => {
    const { logout } = useUser();

    const handleLogout = (navigation) => {
        logout();
        navigation.navigate('Login');
    };

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
                        headerLeft: () => (
                            <Button
                                onPress={() => handleLogout(navigation)}
                                title="Logout"
                                color="red"
                            />
                        ),
                        headerRight: () => (
                            <Button
                                onPress={() => navigation.navigate('Cart')}
                                title="Cart"
                                color="#000"
                            />
                        )
                    })}
                />
                <Stack.Screen
                    name="Manage Products"
                    component={UploadProduct}
                    options={({ navigation }) => ({
                        headerLeft: () => (
                            <Button
                                onPress={() => navigation.goBack()}
                                title="Back"
                                color="#000"
                            />
                        ),
                        headerRight: () => (
                            <Button
                                onPress={() => navigation.navigate('Cart')}
                                title="Cart"
                                color="#000"
                            />
                        )
                    })}
                />
                <Stack.Screen
                    name="Product Details"
                    component={ProductDetailScreen}
                    options={({ navigation }) => ({
                        headerLeft: () => (
                            <Button
                                onPress={() => navigation.goBack()}
                                title="Back"
                                color="#000"
                            />
                        ),
                        headerRight: () => (
                            <Button
                                onPress={() => navigation.navigate('Cart')}
                                title="Cart"
                                color="#000"
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
