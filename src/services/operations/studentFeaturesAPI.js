import toast from "react-hot-toast";
import apiconnector from "../apiconnector";
import { studentEndpoints } from "../apis";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const { COURSE_PAYMENT_API, SEND_PAYMENT_SUCCESS_EMAIL_API, COURSE_VERIFY_API } = studentEndpoints


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
            if (orderResponse?.status === 201) {
                toast.error(orderResponse.data.message)
                toast.dismiss(toastId)
                return
            }
            throw new Error(orderResponse.data.message);
        }



        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amount: `${orderResponse.data.message.amount}`,
            order_id: orderResponse.data.message.id,
            name: "StudyNotion",
            description: "Thank You for Purchasing the Course",

            prefill: {
                name: `${useDetails.firstName}`,
                email: useDetails.email,
                phone: "7791869672"

            },
            handler: function (response) {

                //send successful wala mail
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token);
                // verifyPayment
                verifyPayment({ ...response, courses }, token, navigate, dispatch);
            }
        }

        //miss hogya tha 
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong,Please try again...")
    }
    toast.dismiss(toastId)
}

async function sendPaymentSuccessEmail(response, amount, token) {

    try {
        await apiconnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        }, {
            Authorization: `Bearer ${token}`
        })
    }
    catch (error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

//verifyPayment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try {
        const response = await apiconnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`,
        })

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, ypou are addded to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch (error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false));
}

