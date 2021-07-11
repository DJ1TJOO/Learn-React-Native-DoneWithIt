import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Wrapper from "../../components/Wrapper";
import Heading from "../../components/Heading";
import FormButton from "../../components/form/FormButton";
import Colors from "../../config/Colors";
import FontSizes from "../../config/FontSizes";
import FormInput from "../../components/form/FormInput";
import FormDate from "../../components/form/FormDate";
import FormSelect from "../../components/form/FormSelect";

const ChangeMemberScreen = ({ navigation, route }) => {
	const teams = ["team", "team2", "team3"];
	const rights = ["Geen rechten", "right", "right2", "right3"];

	return (
		<Wrapper showHeader={true} navigation={navigation}>
			<Heading title={route.params?.firstname + " " + route.params?.lastname} />
			<FormInput label="Voornaam" value={route.params?.firstname} />
			<FormInput label="Achternaam" value={route.params?.lastname} />
			<FormInput label="Email" value={route.params?.email} />
			<FormDate label="Geboorte datum" date={new Date(route.params?.born)} />
			<FormInput label="Functie omschrijving" value={route.params?.function} />
			{/* TODO: select */}
			<FormSelect label="Team(s)" multiple={true} defaultValue={["Geen team"]} data={teams} value={route.params?.teams} />
			<FormSelect label="Rechten" defaultValue={"Geen rechten"} value={route.params?.rights} data={rights} />
			<FormButton>Aanpassen</FormButton>
		</Wrapper>
	);
};

const styles = StyleSheet.create({
	label: {
		color: Colors.textPrimary,
		fontSize: FontSizes.subtitle,
		fontFamily: "Segoe-UI",
	},
	value: {
		color: Colors.textSecondary,
		fontSize: FontSizes.subtitle,
		fontFamily: "Segoe-UI",
		marginBottom: 10,
	},
});

export default ChangeMemberScreen;
