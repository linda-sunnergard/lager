import { View, Text, TextInput, Button } from "react-native";
import { showMessage } from "react-native-flash-message";

import { Typography, Forms, Base } from "../../styles";

export default function AuthFields({auth, setAuth, title, submit, navigation}) {

    function validateEmail(text: string) {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!text.match(pattern)) {
            showMessage({
                message: "Icke giltig email",
                description: 'Emailadressen måste uppfylla mallen "abc@def.gh"',
                type: "warning"
            });
        }
    }

    function validatePassword(text: string) {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!\.-]).{4,}$/

        if (!text.match(pattern)) {
            showMessage({
                message: "Icke giltigt lösenord",
                description: "Lösenordet måste innehålla minst fyra tecken, små och stora bokstäver, och ett specialtecken",
                type: "warning"
            });
        }
    }

    return (<View style={{...Base.base}}>
        <Text style={{ ...Typography.header2 }}>{title}</Text>

        <Text>E-post</Text>
        <TextInput
          style={{ ...Forms.input }}
          onChangeText={(content:string) => {
              validateEmail(content);
              setAuth({...auth, email:content })
          }}
          value={auth?.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          testID="email-field"
        />

        <Text>Lösenord</Text>
        <TextInput
          style={{ ...Forms.input }}
          onChangeText={(content:string) => {
              validatePassword(content)
              setAuth({...auth, password:content })
          }}
          value={auth?.password}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          testID="password-field"
        />

        <View style={{ ...Forms.buttons}}>
            <Button
                style={{ ...Forms.button}}
                title={title}
                onPress={() => {
                    submit();
                }}
                accessibilityLabel={`${title} genom att trycka`}
                />
            {title == "Logga in" &&
                <Button
                style={{ ...Forms.button}}
                title="Registrera ny användare"
                onPress={() => {
                    navigation.navigate("Register");
                }}
                />
            }
        </View>
    </View>
    );
};
