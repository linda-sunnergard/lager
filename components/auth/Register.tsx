import { useState } from "react";

import authModel from "../../models/auth.ts";
import Auth from "../../interfaces/auth.ts";
import AuthFields from "./AuthFields.tsx";

export default function Register({ navigation }) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doRegister() {
      if (auth.email && auth.password) {
        const result = await authModel.register(auth.email, auth.password);
        navigation.navigate("Login");
      }
    }

    return (
      <AuthFields
          auth={auth}
          setAuth={setAuth}
          submit={doRegister}
          title="Registrera"
          navigation={navigation}
      />
    );
};
