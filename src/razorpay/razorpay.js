import { createOrder, verifySignature, createOrderExhibitor, verifySignatureExhibitor, createOrderOrganization, verifyOrganizationPayment } from "../services/api"


const loadRazorpayScript = () =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });



export const handlePayment = async (payload, setPaymentLoader, setFormState, setSearchParams, navigate) => {
  try {
    const { amount, email, mobile, firstName, lastName, coupon } = payload
    const res = await loadRazorpayScript();
    if (!res) {
      console.log("Razorpay SDK failed to load.");
      return;
    }

    // Call backend to create order
    let orderData = await createOrder({
      amount,
      coupon
    })
    orderData = orderData.data

    const options = {
      key: process.env.NODE_ENV === "development" ? process.env.REACT_APP_RAZORPAY_KEY_ID_TEST : process.env.REACT_APP_RAZORPAY_KEY_ID_LIVE, // Razorpay key_id
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Empower 2026",
      description: "Empower 2026 Conference Registration",
      order_id: orderData.id,
      handler: async function (response) {
        // Optional: verify signature on backend
        const verifyRes = await verifySignature({
          ...response,
          receipt: orderData?.receipt,
          coupon
        });
        if (verifyRes.status === 200) {
          console.log("Payment Verified Successfully!")
          setFormState(3)
          setSearchParams(params => {
            params.set("formState", 3)

            return params
          })

        }
        else {
          navigate("/auth/payment-failed")
        }
      },
      prefill: {
        name: `${firstName} ${lastName}`,
        email: email,
        contact: mobile,
      },
      theme: {
        color: "#2180E4",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (error) {
    setPaymentLoader(false)
  }

};

export const handlePaymentExhibitor = async (payload, setPaymentLoader, setFormState, setSearchParams, navigate) => {
  try {
    const { amount, email, mobile, firstName, lastName, coupon } = payload
    const res = await loadRazorpayScript();
    if (!res) {
      console.log("Razorpay SDK failed to load.");
      return;
    }

    // Call backend to create order
    let orderData = await createOrderExhibitor({
      amount,
      coupon
    })
    orderData = orderData.data

    const options = {
      key: process.env.NODE_ENV === "development" ? process.env.REACT_APP_RAZORPAY_KEY_ID_TEST : process.env.REACT_APP_RAZORPAY_KEY_ID_LIVE, // Razorpay key_id
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Empower 2025",
      description: "Empower 2025 Exhibitor Registration",
      order_id: orderData.id,
      handler: async function (response) {
        // Optional: verify signature on backend
        const verifyRes = await verifySignatureExhibitor({
          ...response,
          receipt: orderData?.receipt,
          coupon
        });
        if (verifyRes.status === 200) {
          console.log("Payment Verified Successfully!")
          setFormState(4)
          setSearchParams(params => {
            params.set("formState", 4)

            return params
          })

        }
        else {
          navigate("/auth/payment-failed")
        }
      },
      prefill: {
        name: `${firstName} ${lastName}`,
        email: email,
        contact: mobile,
      },
      theme: {
        color: "#2180E4",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (error) {
    setPaymentLoader(false)
  }

};

export const handlePaymetOrganization = async (payload, fetchUser, navigate, setMembers) => {
  const { amount, email, phone, organizationName, members } = payload
  const res = await loadRazorpayScript();
  if (!res) {
    console.log("Razorpay SDK failed to load.");
    return;
  }

  // Call backend to create order
  let orderData = await createOrderOrganization({
    amount,
    members
  })
  orderData = orderData.data

  const options = {
    key: process.env.NODE_ENV === "development" ? process.env.REACT_APP_RAZORPAY_KEY_ID_TEST : process.env.REACT_APP_RAZORPAY_KEY_ID_LIVE, // Razorpay key_id
    amount: orderData.amount,
    currency: orderData.currency,
    name: "Empower 2025",
    description: "Empower 2025 Organization Registration",
    order_id: orderData.id,
    handler: async function (response) {
      // Optional: verify signature on backend
      const verifyRes = await verifyOrganizationPayment({
        ...response,
        receipt: orderData?.receipt,
        members,
        amount
      });
      if (verifyRes.status === 200) {
        console.log("Payment Verified Successfully!")
        setMembers([
          { registrationType: "", registrationCategory: "", numberOfPeople: 0, daySelects: [], amount: 0 },
        ])
        fetchUser()

      }
      else {
        navigate("/auth/payment-failed")
      }
    },
    prefill: {
      name: `${organizationName}`,
      email: email,
      contact: phone,
    },
    theme: {
      color: "#2180E4",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}