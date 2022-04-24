import { useState } from "react";

import AuthModel from "../../models/auth.ts";
import Auth from "../../interfaces/auth.ts";
import AuthFields from "./AuthFields.tsx";

export default function Login({ navigation, setIsLoggedIn }) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doLogin() {
      if (auth.email && auth.password) {
        const result = await AuthModel.login(auth.email, auth.password);
        setIsLoggedIn(true);
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
