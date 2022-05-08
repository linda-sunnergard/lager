//Tester från övningar och föreläsning

import { render, fireEvent } from '@testing-library/react-native';
import AuthFields from '../components/auth/AuthFields';

let auth = {};
const setAuth  = (newAuth) => {
    auth = newAuth
};
const mockSubmit = jest.fn();
const navigation = () => false;

test('testing AuthFields for login', async () => {
    const title = "Logga in";

    const { getAllByText, getByTestId, getByA11yLabel } = render(<AuthFields
         auth={auth}
         setAuth={setAuth}
         submit={mockSubmit}
         title={title}
         navigation={navigation}
     />);

    const titleElements = await getAllByText(title);
    expect(titleElements.length).toBe(2);

    const emailField = await getByTestId("email-field");
    const passwordField = await getByTestId("password-field");
    expect(emailField).toBeDefined();
    expect(passwordField).toBeDefined();

    const a11yLabel = `${title} genom att trycka`;
    const submitButton = getByA11yLabel(a11yLabel)
    expect(submitButton).toBeDefined();
    fireEvent.press(submitButton);
    expect(mockSubmit).toHaveBeenCalled();

    const fakeEmail = "abc@def.gh"
    fireEvent.changeText(emailField, fakeEmail);
    expect(auth?.email).toEqual(fakeEmail);

    const fakepassword = "Test1!"
    fireEvent.changeText(passwordField, fakepassword);
    expect(auth?.password).toEqual(fakepassword);

});
