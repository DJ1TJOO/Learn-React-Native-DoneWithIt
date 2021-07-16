import React, { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "@use-expo/font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform, StatusBar } from "react-native";
import * as Linking from "expo-linking";

import WelcomeScreen from "./app/screen/WelcomeScreen";

import LoginScreen from "./app/screen/LoginScreen";
import RegisterScreen from "./app/screen/RegisterScreen";

import ForgotPasswordScreen from "./app/screen/passwords/ForgotPasswordScreen";
import VerifyCodeScreen from "./app/screen/passwords/VerifyCodeScreen";
import ChangePasswordScreen from "./app/screen/passwords/ChangePasswordScreen";

import Account from "./app/Account";

const prefix = Linking.makeUrl("/");

const Stack = createStackNavigator();

export default function App() {
	const [data, setData] = useState(null);

	console.log(prefix);

	const linking = {
		prefixes: [prefix],
		config: {
			screens: {
				Welcome: "welcome",
				Login: "login",
				Register: "register",
				ForgotPassword: {
					path: "forgotpassword/:isCreating?/:businessId/:userId?/:code?",
					parse: {
						isCreating: (string) => string === "true",
						businessId: (string) => string,
						userId: (string) => string,
						code: (string) => string,
					},
					stringify: {
						isCreating: (bool) => bool.toString(),
						businessId: (string) => string,
						userId: (string) => string,
						code: (string) => string,
					},
				},
				Account: "account",
			},
		},
	};

	const handleDeepLink = (e) => {
		setData(Linking.parse(e.url));
	};

	useEffect(() => {
		const getInitialURL = async () => {
			const initialUrl = await Linking.getInitialURL();
			if (initialUrl) setData(Linking.parse(initialUrl));
		};

		Linking.addEventListener("url", handleDeepLink);
		if (!data) {
			getInitialURL();
		}

		return () => {
			Linking.removeEventListener("url");
		};
	}, []);

	if (Platform.OS === "android") {
		// only android needs polyfill
		require("intl"); // import intl object
		require("intl/locale-data/jsonp/en-IN"); // load the required locale details
	}

	let [fontsLoaded] = useFonts({
		"Segoe-UI": require("./app/assets/fonts/Segoe-UI.ttf"),
	});

	StatusBar.setBarStyle("dark-content");

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return (
			<NavigationContainer linking={linking}>
				<Stack.Navigator mode="modal" headerMode="none">
					<Stack.Screen name="Welcome" component={WelcomeScreen} />
					<Stack.Screen name="Login" component={LoginScreen} />
					<Stack.Screen name="Register" component={RegisterScreen} />
					<Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
					<Stack.Screen name="VerifyCode" component={VerifyCodeScreen} options={{ animationEnabled: false }} />
					<Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ animationEnabled: false }} />
					<Stack.Screen
						name="Account"
						component={Account}
						options={{
							gestureEnabled: false,
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}
