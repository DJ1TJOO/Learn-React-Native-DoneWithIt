import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, TextInput, View } from "react-native";

import Colors from "../../config/Colors";
import FontSizes from "../../config/FontSizes";

const FormInput = ({ label, hideText, helpLabel, helpOnPress }) => {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<View style={styles.container}>
			{label && <Text style={styles.label}>{label}</Text>}
			<TextInput
				style={[styles.input, isFocused && styles.inputFocused]}
				secureTextEntry={!!hideText}
				onFocus={() => setIsFocused(true)}
				onBlur={() => {
					setIsFocused(false);
				}}
				keyboar
			/>
			{helpLabel && (
				<TouchableOpacity onPress={helpOnPress}>
					<Text style={styles.helpButtonText}>{helpLabel}</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},
	label: {
		color: Colors.textPrimary,
		fontSize: FontSizes.title,
		fontFamily: "Segoe-UI",
	},
	helpButtonText: {
		color: Colors.primary,
		fontSize: FontSizes.subtitle,
		fontFamily: "Segoe-UI",
	},
	input: {
		color: Colors.textSecondary,
		fontSize: FontSizes.title,
		fontFamily: "Segoe-UI",
		borderRadius: 6,
		borderWidth: 2,
		borderColor: Colors.tertiary,
		paddingHorizontal: 5,
		height: 38,
	},
	inputFocused: {
		color: Colors.textPrimary,
		borderColor: Colors.textPrimary,
	},
});

export default FormInput;
