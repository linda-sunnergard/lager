import { render, fireEvent } from '@testing-library/react-native';
import DeliveriesList from '../components/DeliveriesList';

const deliveries = [
    { id: "1", product_name: "Tomat", amount: 3, delivery_date: "2022-05-01", comment: "Ny leverans" },
    { id: "2", product_name: "Kronärtskocka", amount: 5, delivery_date: "2022-05-02", comment: "Ännu en leverans" },
];

const setDeliveries = () => false;
const navigation = {
    navigate: jest.fn(),
};

test('List should have deliveries', async () => {
    const { getByText, getAllByText, getByTestId } = render(<DeliveriesList
        navigation={navigation} 
        deliveries = {deliveries}
        setDeliveries={setDeliveries} />);

    const tomato = await getByText('Tomat', { exact: false });
    const kronärtskocka = await getByText('Kronärtskocka', {exact: false});

    expect(tomato).toBeDefined();
    expect(kronärtskocka).toBeDefined();

    const buttonId = "Create Delivery Button";
    const deliveryButton = await getByTestId(buttonId)
    expect(deliveryButton).toBeDefined();
    fireEvent.press(deliveryButton);
    expect(navigation.navigate).toHaveBeenCalled();
});
