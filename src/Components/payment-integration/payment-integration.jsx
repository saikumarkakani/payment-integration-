

import React, { useEffect, useState } from 'react';
import '../payment-integration/payment-integration.css';

export function Payment() {
    const [amount, setAmount] = useState('');

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://checkout.razorpay.com/v1/checkout.js`;
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }

    }, []);

    const handlePayment = async () => {
        const options = {
            key: 'rzp_test_gsYVx8C2fWX3nL', // Replace with your Razorpay key
            amount: amount * 100, // Amount in paisa
            currency: "INR",
            name: "Infysky",
            description: "Test Transaction",
            image: '', // Use the imported logo
            handler: function (response) {
                alert(`Payment successful: ${response.razorpay_payment_id}`);
                // Handle post-payment logic here
            },
            prefill: {
                name: "Your Name",
                email: "youremail@example.com",
                contact: "9999999999"
            },
            notes: {
                address: "Your Company Address"
            },
            theme: {
                color: "#3399cc"
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className='payment-body'>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className='pay-box'>
                    <div className='pay-text'>
                        Enter Amount
                        <hr className="blue-line"></hr>
                    </div>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        className='pay-input'
                    />
                    <br />
                    <button onClick={handlePayment} className='pay-btn'>Pay Now</button>
                </div>
            </form>
        </div>
    );
}
