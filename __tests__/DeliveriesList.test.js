import { render } from '@testing-library/react-native';
import DeliveriesList from '../components/DeliveriesList';

const deliveries = [
    { product_name: "Tomat", amount: 3, delivery_date: "2022-05-01", comment: "Tomatkommentar" },
    { product_name: "Kronärtskocka", amount: 5, delivery_date: "2022-05-02", comment: "Kronärtskockakommentar" },
    { product_name: "Chili", amount: 9, delivery_date: "2022-05-03", comment: "Chilikommentar" },
];

const setDeliveries = () => false;
const navigation = () => false;

test('List should contain three items', async () => {
    const { getByText } = render(<DeliveriesList navigation={navigation} deliveries = {deliveries} setDeliveries={setDeliveries} />);

    const tomat = await getByText('Tomat', { exact: false });
    const tomatAmount = await getByText(3, { exact: false });
    const tomatDeliveryDate = await getByText("2022-05-01", { exact: false });
    const tomatComment = await getByText("Tomatkommentar", { exact: false });

    expect(tomat).toBeDefined();
    expect(tomatAmount).toBeDefined();
    expect(tomatDeliveryDate).toBeDefined();
    expect(tomatComment).toBeDefined();

    const buttonId = "Create Delivery Button";
    const deliveryButton = await getByTestId(buttonId)
    expect(deliveryButton).toBeDefined();
});
