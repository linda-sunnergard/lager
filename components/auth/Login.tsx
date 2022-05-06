import { useState } from "react";
import { showMessage } from "react-native-flash-message";

import AuthModel from "../../models/auth.ts";
import Auth from "../../interfaces/auth.ts";
import AuthFields from "./AuthFields.tsx";

export default function Login({ navigation, setIsLoggedIn }) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doLogin() {
        if (auth.email && auth.password) {
            const result = await AuthModel.login(auth.email, auth.password);
            if (result.title === "success") {
                setIsLoggedIn(true);
            }
            showMessage(result);
        } else {
            showMessage({
                message: "Felaktig information",
                description: "E-post eller lösenord saknas eller är fel",
                type: "warning"
            });
        }
    }

    return (
      <AuthFields
          auth={auth}
          setAuth={setAuth}
          submit={doLogin}
          title="Logga in"
          navigation={navigation}
      />
    );
};
