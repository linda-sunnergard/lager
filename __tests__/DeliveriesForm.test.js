import { render, fireEvent } from '@testing-library/react-native';

import DeliveriesForm from '../components/DeliveriesForm';

let delivery = {}
const setDelivery  = (newDelivery) => {
    delivery = newDelivery
};

test('testing DeliveriesForm for deliveries', async () => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
        OS: 'android',
        select: () => null
    }));
    const pageTitle = "Ny inleverans"

    const { getByText, getByTestId } = render(<DeliveriesForm
        delivery={delivery}
        setDelivery={setDelivery}
    />);

    const extractedTitle = getByText(pageTitle)
    expect(extractedTitle).toBeDefined()

    const buttonId = "dateButton"
    const dateButton = await getByTestId(buttonId)
    expect(dateButton).toBeDefined();

    const amountField = await getByTestId("delivery-amount");
    expect(amountField).toBeDefined();
    const fakeAmount = 1
    fireEvent.changeText(amountField, fakeAmount);
    expect(delivery?.amount).toEqual(fakeAmount);

    const commentField = await getByTestId("comment-field");
    expect(commentField).toBeDefined();
    const fakeComment = "Test"
    fireEvent.changeText(commentField, fakeComment);
    expect(delivery?.comment).toEqual(fakeComment);

    const deliveryButton = await getByTestId("create delivery button")
    expect(deliveryButton).toBeDefined();

});
