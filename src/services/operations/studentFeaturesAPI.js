import toast from "react-hot-toast";
import apiconnector from "../apiconnector";
import { studentEndpoints } from "../apis";

const { COURSE_PAYMENT_API ,SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}
export async function buyCourse(token, courses, useDetails, navigate, dispatch) {
    const toastId = toast.loading("loading...")
    console.log(courses);
    try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        const orderResponse = await apiconnector("POST", COURSE_PAYMENT_API, { courses }, {
            Authorization: `Bearer ${token}`,
        })
        if (!orderResponse?.data.success) {
            throw new Error(orderResponse.data.message);
        }

        console.log(orderResponse);

        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.currency,
            amount: `${orderResponse.data.amount}`,
            order_id: orderResponse.data.orderId,
            name: "StudyNotion",
            description: "Thank You for Purchasing the Course",

            prefill: {
                name: `${useDetails.firstName}`,
                email: useDetails.email,
                phone: "7791869672"

            },
            handler: function (response) {
                console.log(response);
                //send successful wala mail
                sendPaymentSuccessEmail(response, orderResponse.data.amount, token);
                // verifyPayment
                verifyPayment({ ...response, courses }, token, navigate, dispatch);
            }
        }
        console.log(options);
        //miss hogya tha 
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })
    } catch (error) {
        console.log(error);
    }
    toast.dismiss(toastId)
}

async function sendPaymentSuccessEmail(response, amount, token) {
    console.log(`inside payment send method     `);
    try{
        await apiconnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
    }
    catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

//verifyPayment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    try {

    } catch (error) {

    }
}