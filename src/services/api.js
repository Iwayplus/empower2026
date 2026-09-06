import axios from 'axios'
import { cryptoEncryptForWebOTP } from './utils'
import axiosInstance from './axiosInstance'

export const baseUrl = process.env.NODE_ENV === "development" ? (process.env.REACT_APP_LOCAL_URL || "http://localhost:8000") : (process.env.REACT_APP_REMOTE_URL || "https://maps.iwayplus.in");

export const projectId = process.env.NODE_ENV === "development"
  ? process.env.REACT_APP_TEST_PROJECT_ID
  : process.env.REACT_APP_PROD_PROJECT_ID;



export const sendOtp = async (post, setSending) => {
    try {
        let token = await cryptoEncryptForWebOTP()
        
        return await axios.post(`${baseUrl}/auth/web-otp-send`, post, { headers: { 'x-access-token': token } })
    } catch(error) {
        console.log("Error while sending the otp ", error)
        setSending(false)
        alert(error?.response?.data?.message)
    }
}

export const verifyOtp = async (post) => {
    try {
        let response = await axios.post(`${baseUrl}/api/empower/verify-otp`,post, { withCredentials: true })
        if(response.status === 200) {
            localStorage.setItem("accessToken", response.data.accessToken)
            return response
        }
    }catch(error) {
        console.log("Error while verifying the OTP ", error)
    }
}

export const saveUserDetails = async (post, setShowInputError) => {
    try {
        return await axiosInstance.patch(`${baseUrl}/api/empower/save-user-data`, post, { withCredentials: true })
    }catch(error) {
        console.log("Error while saving the user details ", error)
        setShowInputError(true)
        alert(error?.response?.data?.message)
        return error
    }
}

export const getProfile = async (navigate) => {
    try {
        return await axiosInstance.get(`${baseUrl}/api/empower/profile`, { withCredentials: true })
    }catch(error){
        console.log("Error while getting the profile ", error)
    }
}

export const uploadFile = async (formData) => {
    try {
        return await axiosInstance.post(`${baseUrl}/secured/upload`, formData, { withCredentials: true })
    } catch(error) {
        console.log("Error while uploading the file ", error)
        return error
    }
}

export const fetchCoupon = async (code) => {
    try {
        return await axiosInstance.get(`${baseUrl}/api/empower/check-coupon/${code}`, { withCredentials: true })
    }catch(error) {
        console.log("Error while fetcing the coupon ", error)
        return error
    }
}

export const createOrder = async (post) => {
    try {
        return await axiosInstance.post(`${baseUrl}/api/empower/payment/create-order`, post, { withCredentials: true })
    }catch(error) {
        console.log("Error while creating an order ", error)
        alert(error.response.data.message)
        return error
    }
}

export const verifySignature = async (post) => {
    try {
        return await axiosInstance.post(`${baseUrl}/api/empower/payment/verify`, post, { withCredentials: true })
    }catch(error) {
        console.log("Error while verifying the signature ",error)
        return error
    }
}

export const getPaymentDetails = async (setFormState, setSearchParams) => {
    try {
        return await axiosInstance.get(`${baseUrl}/api/empower/payment/payment-details`, { withCredentials: true })
    }catch(error) {
        console.log("Error while getting the payment details ",error)
        setFormState(2)
        setSearchParams(params => {
            params.set("formState", 2)

            return params
        })
        return error
    }
}

export const handleZeroPayment = async (post) => {
    try {
        return await axiosInstance.post(`${baseUrl}/api/empower/zero-payment`, post, { withCredentials: true })
    }catch(error) {
        console.log("Error while handling the zero payment ", error)
    }
}

export const handleSendInvoiceThroughMail = async (formData) => {
    try {
        return await axiosInstance.post(`${baseUrl}/api/empower/payment/send-receipt`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        })
    } catch (err) {
        console.error('Failed to upload PDF:', err)
    }
}

export const logout = async (type) => {
    try {
        await axiosInstance.post(`${baseUrl}/api/empower/logout`,{}, {
            withCredentials: true
        })
        localStorage.clear()
        if(type==="user") window.location.href="/auth/signin"
        else window.location.href="/auth/exhibitor/signin"
    }catch(error) {
        console.log("Error while logging out ", error)
    }
}

/////exhibitor login APIs

export const verifyOtpSaveExhibitor = async (post) => {
    try {
        let response = await axiosInstance.post(`${baseUrl}/api/empower/verify-otp-exhibitor`, post)
        if(response.status === 200) {
            localStorage.setItem("accessToken", response.data.accessToken)
            return response
        }
    }catch(error) {
        console.log("Error while verifying the otp and save exhibitor ", error)
    }
}

export const getExhibitorProfile = async (navigate) => {
    try {
        return await axiosInstance.get(`${baseUrl}/api/empower/exhibitor-profile`)
    }catch(error) {
        if(!localStorage.getItem("accessToken") && typeof navigate === "function") navigate("/auth/exhibitor/signin")
        console.log("Error while getting the exhibitor details ", error)
    }
}

export const saveExhibitorData = async (post) => {
    try {
        return await axiosInstance.patch(`${baseUrl}/api/empower/save-exhibitor-data`, post)
    }catch(error) {
        alert(error?.response?.data?.message)
        console.log("Error while saving the exhibitor data ", error)
    }
}

export const createOrderExhibitor = async (post) => {
    try {
        console.log(post)
        return await axiosInstance.post(`${baseUrl}/api/empower/payment/create-order-exhibitor`, post, { withCredentials: true })
    }catch(error) {
        console.log("Error while creating an order ", error)
        alert(error?.response?.data?.message)
        return error
    }
}

export const verifySignatureExhibitor = async (post) => {
    try {
        return await axiosInstance.post(`${baseUrl}/api/empower/payment/verify-exhibitor-payment`, post, { withCredentials: true })
    }catch(error) {
        console.log("Error while verifying the signature ",error)
        return error
    }
}

export const getPaymentDetailsExhibitor = async (setFormState, setSearchParams) => {
    try {
        return await axiosInstance.get(`${baseUrl}/api/empower/payment/exhibitor-payment-details`, { withCredentials: true })
    }catch(error) {
        console.log("Error while getting the payment details ",error)
        setFormState(2)
        setSearchParams(params => {
            params.set("formState", 2)

            return params
        })
        return error
    }
}

export const handleSendExhibitorReceipt = async (formData) => {
    try {
        return await axiosInstance.post(`${baseUrl}/api/empower/payment/send-receipt-exhibitor`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        })
    }catch(error) {
        console.error('Failed to upload PDF:', error)
    }
}


export const getAttend = async (websiteId) => {
  const path = websiteId ? `/secured/attend/${websiteId}` : `/secured/attend`;
  const response = await axiosInstance.get(path);
  return response.data.data;
};


export const fetchCouponExhibitor = async (couponCode) => {
    try {
        return await axiosInstance.get(`/api/empower/check-coupon-exhibitor/${couponCode}`)
    }catch(error) {
        console.log("Error while getting the exhibitor coupon detail ", error)
        alert(error?.response?.data?.message)
    }
}


export const verifyOtpSaveOrganization = async (post) => {
    try {
        let response = await axiosInstance.post('/api/empower/verify-otp-organization', post)
        if(response?.status === 200) {
            localStorage.setItem("accessToken",  response.data.accessToken)
            return response
        }
    }catch(error) {
        console.log("Error while verifying the otp ", error)
        alert(error?.response?.data?.message)
    }
}

export const fetchOrganization = async () => {
    try {
        return await axiosInstance.get('/api/empower/organization-profile')
    }catch(error) {
        console.log("Error hile fetching the organization ", error)
    }
}

export const createOrderOrganization = async (post) => {
    try {
        return await axiosInstance.post('/api/empower/payment/create-order-organization', post)
    }catch(error) {
        console.log("Errror while creating the order ", error)
        alert(error?.response?.data?.message)
    }
}

export const verifyOrganizationPayment = async (post) => {
    try {
        return await axiosInstance.post('/api/empower/payment/verify-organization-payment', post)
    }catch(error) {
        console.log("Error while verifying the organization payment ", error)
    }
}

export const bookWorkshop = async (post) => {
    try {
        return await axiosInstance.post(`${baseUrl}/secured/cms/event/book`, post, {
            withCredentials: true
        })
    }catch(error) {
        console.log("Error while Booking the Workshop ", error)
    }
}

export const handleZeroPaymentExhibitor = async (post) => {
    try {
        return await axiosInstance.post(`${baseUrl}/api/empower/zero-payment-exhibitor`, post, {
            withCredentials: true
        })
    }catch(error) {
        console.log("error while handling the exhibitor", error)
        alert(error?.response?.data?.message)
    }
}

export const getUserTickets = async (userId, token) => {
  try {
    const response = await axiosInstance.post(
      `${baseUrl}/secured/cms/event/tickets`,
      { id: userId }, // body
      {
        headers: {
          "x-access-token": token, // use the token from profile
        },
        withCredentials: true,
      }
    );

    return response.data.data; // tickets array
  } catch (error) {
    console.error("Error while fetching tickets", error);
    throw error;
  }
};

const normalizeDynamicSections = (payload, status) => {
  const source = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.sections)
      ? payload.sections
      : Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload?.data?.sections)
          ? payload.data.sections
          : [];

  return source
    .filter((section) => !status || section?.status === status)
    .sort((a, b) => Number(a?.order || 0) - Number(b?.order || 0));
};

const dynamicSectionsInFlight = new Map();

export const fetchPublicDynamicSections = async (eventId = projectId, status = 'Published') => {
  const requestKey = `${eventId}:${status || ''}`;
  const inFlightRequest = dynamicSectionsInFlight.get(requestKey);
  if (inFlightRequest) return inFlightRequest;

  const apiKey = process.env.REACT_APP_IWAY_API_KEY;
  const candidates = [
    `${baseUrl}/api/public/events/${eventId}/dynamic-sections?api_key=${apiKey}`,
    `${baseUrl}/api/dynamic-sections/${eventId}/sections?api_key=${apiKey}`,
  ];

  const request = (async () => {
    for (const url of candidates) {
      try {
        const response = await axios.get(url);
        const normalized = normalizeDynamicSections(response?.data || response, status);

        if (normalized.length > 0) {
          return normalized;
        }
      } catch (error) {
        console.warn(`Dynamic sections fetch failed for ${url}`, error?.response?.data || error.message);
      }
    }

    return [];
  })();

  dynamicSectionsInFlight.set(requestKey, request);

  try {
    return await request;
  } finally {
    if (dynamicSectionsInFlight.get(requestKey) === request) {
      dynamicSectionsInFlight.delete(requestKey);
    }
  }
};

export const getDynamicSections = async (eventId = projectId, status = 'Published') => {
  const sections = await fetchPublicDynamicSections(eventId, status);
  return { status: true, data: sections };
};

export const getNearbyServices = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/secured/event/all-nearbyservices/${projectId}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while fetching nearby services", error);
    return { status: false, data: [] };
  }
};

export const getVenueServices = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/secured/event/all-services/${projectId}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while fetching venue services", error);
    return { status: false, data: [] };
  }
};

let footerCache = null;
let footerPromise = null;

export const getFooterData = async () => {
  if (footerCache) return footerCache;
  if (footerPromise) return footerPromise;

  footerPromise = (async () => {
    try {
      const res = await fetch(
        `${baseUrl}/secured/cms/footer/all/${projectId}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`
      );
      if (res.ok) {
        const data = await res.json();
        if (data.status && Array.isArray(data.data) && data.data.length > 0) {
          const published = data.data.find((sec) => sec.status === "Published") || data.data[0];
          footerCache = published;
          return published;
        }
      }
    } catch (error) {
      console.error("Error fetching dynamic footer:", error);
    } finally {
      footerPromise = null;
    }
    return null;
  })();

  return footerPromise;
};
