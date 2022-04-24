import { View, Text, TextInput, Button } from "react-native";
import { Typography, Forms, Base } from "../../styles";

export default function AuthFields({auth, setAuth, title, submit, navigation}) {
    return (<View style={{...Base.base}}>
        <Text style={{ ...Typography.header2 }}>{title}</Text>

        <Text>E-post</Text>
        <TextInput
          style={{ ...Forms.input }}
          onChangeText={(content:string) => {
              setAuth({...auth, email:content })
          }}
          value={auth?.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text>Lösenord</Text>
        <TextInput
          style={{ ...Forms.input }}
          onChangeText={(content:string) => {
              setAuth({...auth, password:content })
          }}
          value={auth?.password}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <View style={{ ...Forms.buttons}}>
          <Button
              style={{ ...Forms.button}}
              title={title}
              onPress={() => {
                submit();
              }}
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
