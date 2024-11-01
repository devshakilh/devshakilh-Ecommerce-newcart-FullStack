// // Payment.js
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import PriceSidebar from './PriceSidebar';
// import Stepper from './Stepper';
// import {
//     CardNumberElement,
//     CardCvcElement,
//     CardExpiryElement,
//     useStripe,
//     useElements,
//     Elements
// } from '@stripe/react-stripe-js';
// import { clearErrors } from '../../actions/orderAction';
// import { useSnackbar } from 'notistack';
// import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import MetaData from '../Layouts/MetaData';

// const Payment = () => {
//     const dispatch = useDispatch();
//     const { enqueueSnackbar } = useSnackbar();
//     const stripe = useStripe();
//     const elements = useElements();

//     const [payDisable, setPayDisable] = useState(false);
//     const [paymentMethod, setPaymentMethod] = useState('stripe');

//     const { shippingInfo, cartItems } = useSelector((state) => state.cart);
//     const { user } = useSelector((state) => state.user);
//     const { error } = useSelector((state) => state.newOrder);

//     const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

//     const paymentData = {
//         amount: Math.round(totalPrice * 100), // Stripe expects amount in cents
//         currency: 'usd',
//     };

//     const handlePaymentMethodChange = (event) => {
//         setPaymentMethod(event.target.value);
//     };

//     const submitHandler = async (e) => {
//         e.preventDefault();
//         setPayDisable(true);

//         if (paymentMethod === 'stripe') {
//             try {
//                 const config = {
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 };

//                 const { data } = await axios.post(
//                     '/api/v1/payment/process',
//                     paymentData,
//                     config,
//                 );

//                 const clientSecret = data.client_secret;

//                 if (!stripe || !elements) return;

//                 const result = await stripe.confirmCardPayment(clientSecret, {
//                     payment_method: {
//                         card: elements.getElement(CardNumberElement),
//                         billing_details: {
//                             name: user.name,
//                             email: user.email,
//                             address: {
//                                 line1: shippingInfo.address,
//                                 city: shippingInfo.city,
//                                 country: shippingInfo.country,
//                                 state: shippingInfo.state,
//                                 postal_code: shippingInfo.pincode,
//                             },
//                         },
//                     },
//                 });

//                 if (result.error) {
//                     setPayDisable(false);
//                     enqueueSnackbar(result.error.message, { variant: "error" });
//                 } else {
//                     if (result.paymentIntent.status === "succeeded") {
//                         // Handle successful payment here
//                         // Dispatch your order creation action, empty the cart, etc.
//                         enqueueSnackbar("Payment Successful!", { variant: "success" });
//                     } else {
//                         enqueueSnackbar("Processing Payment Failed!", { variant: "error" });
//                     }
//                 }
//             } catch (error) {
//                 setPayDisable(false);
//                 enqueueSnackbar(error.response.data.message, { variant: "error" });
//             }
//         } else if (paymentMethod === 'sslcommerz') {
//             try {
//                 const { data } = await axios.post(
//                     '/api/v1/payment/sslcommerz',
//                     paymentData,
//                 );

//                 if (data.GatewayPageURL) {
//                     window.location.href = data.GatewayPageURL;
//                 } else {
//                     setPayDisable(false);
//                     enqueueSnackbar("SSLCommerz Payment Initialization Failed", { variant: "error" });
//                 }
//             } catch (error) {
//                 setPayDisable(false);
//                 enqueueSnackbar(error.response.data.message, { variant: "error" });
//             }
//         }
//     };

//     useEffect(() => {
//         if (error) {
//             dispatch(clearErrors());
//             enqueueSnackbar(error, { variant: "error" });
//         }
//     }, [dispatch, error, enqueueSnackbar]);

//     return (
//         <>
//             <MetaData title="Secure Payment | Stripe & SSLCommerz" />
//             <main className="w-full mt-20">
//                 <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
//                     <div className="flex-1">
//                         <Stepper activeStep={3}>
//                             <div className="w-full bg-white">
//                                 <form onSubmit={submitHandler} autoComplete="off" className="flex flex-col justify-start gap-3 w-full sm:w-3/4 mx-8 my-4">
//                                     <FormControl component="fieldset">
//                                         <RadioGroup
//                                             aria-label="payment method"
//                                             name="paymentMethod"
//                                             value={paymentMethod}
//                                             onChange={handlePaymentMethodChange}
//                                         >
//                                             <FormControlLabel value="stripe" control={<Radio />} label="Pay with Stripe" />
//                                             <FormControlLabel value="sslcommerz" control={<Radio />} label="Pay with SSLCommerz" />
//                                         </RadioGroup>
//                                     </FormControl>

//                                     {paymentMethod === 'stripe' && (
//                                         <>
//                                             <div>
//                                                 <CardNumberElement className="w-full p-2 border rounded" />
//                                             </div>
//                                             <div>
//                                                 <CardExpiryElement className="w-full p-2 border rounded" />
//                                             </div>
//                                             <div>
//                                                 <CardCvcElement className="w-full p-2 border rounded" />
//                                             </div>
//                                         </>
//                                     )}

//                                     <input type="submit" value={`Pay $${totalPrice.toLocaleString()}`} disabled={payDisable} className={`${payDisable ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 cursor-pointer"} w-1/2 sm:w-1/4 my-2 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none`} />
//                                 </form>
//                             </div>
//                         </Stepper>
//                     </div>
//                     <PriceSidebar cartItems={cartItems} />
//                 </div>
//             </main>
//         </>
//     );
// };

// export default Payment;


import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { clearErrors } from '../../actions/orderAction';
import { useSnackbar } from 'notistack';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import MetaData from '../Layouts/MetaData';

const Payment = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const stripe = useStripe();
    const elements = useElements();

    const [payDisable, setPayDisable] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('stripe');

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const paymentData = {
        amount: Math.round(totalPrice * 100), // Stripe expects amount in cents
        currency: 'usd',
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setPayDisable(true);

        if (paymentMethod === 'stripe') {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                const { data } = await axios.post(
                    '/api/v1/payment/process',
                    paymentData,
                    config,
                );

                const clientSecret = data.client_secret;

                if (!stripe || !elements) return;

                const result = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardNumberElement),
                        billing_details: {
                            name: user.name,
                            email: user.email,
                            address: {
                                line1: shippingInfo.address,
                                city: shippingInfo.city,
                                country: shippingInfo.country,
                                state: shippingInfo.state,
                                postal_code: shippingInfo.pincode,
                            },
                        },
                    },
                });

                if (result.error) {
                    setPayDisable(false);
                    enqueueSnackbar(result.error.message, { variant: "error" });
                } else {
                    if (result.paymentIntent.status === "succeeded") {
                        // Handle successful payment here
                        // Dispatch your order creation action, empty the cart, etc.
                        enqueueSnackbar("Payment Successful!", { variant: "success" });
                    } else {
                        enqueueSnackbar("Processing Payment Failed!", { variant: "error" });
                    }
                }
            } catch (error) {
                setPayDisable(false);
                enqueueSnackbar(error.response.data.message, { variant: "error" });
            }
        } else if (paymentMethod === 'sslcommerz') {
            try {
                const { data } = await axios.post(
                    '/api/v1/payment/sslcommerz',
                    paymentData,
                );

                if (data.GatewayPageURL) {
                    window.location.href = data.GatewayPageURL;
                } else {
                    setPayDisable(false);
                    enqueueSnackbar("SSLCommerz Payment Initialization Failed", { variant: "error" });
                }
            } catch (error) {
                setPayDisable(false);
                enqueueSnackbar(error.response.data.message, { variant: "error" });
            }
        }
    };

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
            enqueueSnackbar(error, { variant: "error" });
        }
    }, [dispatch, error, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Secure Payment | Stripe & SSLCommerz" />
            <main className="w-full mt-20">
                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
                    <div className="flex-1">
                        <Stepper activeStep={3}>
                            <div className="w-full bg-white">
                                <form onSubmit={submitHandler} autoComplete="off" className="flex flex-col justify-start gap-3 w-full sm:w-3/4 mx-8 my-4">
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            aria-label="payment method"
                                            name="paymentMethod"
                                            value={paymentMethod}
                                            onChange={handlePaymentMethodChange}
                                        >
                                            <FormControlLabel value="stripe" control={<Radio />} label="Pay with Stripe" />
                                            {/* <FormControlLabel value="sslcommerz" control={<Radio />} label="Pay with SSLCommerz" /> */}
                                        </RadioGroup>
                                    </FormControl>

                                    {paymentMethod === 'stripe' && (
                                        <>
                                            <div>
                                                <CardNumberElement className="w-full p-2 border rounded" />
                                            </div>
                                            <div>
                                                <CardExpiryElement className="w-full p-2 border rounded" />
                                            </div>
                                            <div>
                                                <CardCvcElement className="w-full p-2 border rounded" />
                                            </div>
                                        </>
                                    )}

                                    <input type="submit" value={`Pay $${totalPrice.toLocaleString()}`} disabled={payDisable} className={`${payDisable ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 cursor-pointer"} w-1/2 sm:w-1/4 my-2 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none`} />
                                </form>
                            </div>
                        </Stepper>
                    </div>
                    <PriceSidebar cartItems={cartItems} />
                </div>
            </main>
        </>
    );
};

export default Payment;
