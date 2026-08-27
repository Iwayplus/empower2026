import { useEffect, useState } from "react";

import { typeOfRegistrations, registrationCategories, daysAvailable } from "../utils/utils";
import { registrationCharges } from "../../attend/data";
import { fetchOrganization, sendOtp, verifyOtpSaveOrganization } from "../../../services/api";
import { Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import PaymentLoading from "../../../razorpay/PaymentLoading";
import { handlePaymetOrganization } from "../../../razorpay/razorpay";
import { useNavigate } from "react-router-dom";

const OrganizationRegistration = () => {

    const [open, setOpen] = useState(false)
    const [otp, setOtp] = useState("")
    const [sending, setSending] = useState(false)
    const [verifying, setVerifying] = useState(false)
    const [user, setUser] = useState()
    const [paymentLoader, setPaymentLoader] = useState(false)


    const [orgDetails, setOrgDetails] = useState({
        organizationName: "",
        email: "",
        mobile: ""
    });

    const fetchUser = async () => {
        let response = await fetchOrganization()
        setUser(response?.data?.data)
    }

    useEffect(() => {
        fetchUser()
    }, [])


    const navigate = useNavigate()
    const [members, setMembers] = useState([
        { registrationType: "", registrationCategory: "", numberOfPeople: 0, daySelects: [], amount: 0 },
    ]);

    const handleOrgChange = (field, value) => {
        setOrgDetails({ ...orgDetails, [field]: value });
    };

    const getPrice = (member) => {
        let category = member.registrationCategory === "Full Conference" ? "earlyBird" : "earlyOneDay";

        let registrationFee = registrationCharges?.filter(elm =>
            elm?.registrationTypes?.includes(member?.registrationType)
        )[0]?.[category];

        if (category === "earlyOneDay") {
            registrationFee = registrationFee * member.daySelects.length;
        }

        return (registrationFee * parseInt(member?.numberOfPeople)) || 0;
    };

    const handleChange = (index, field, value) => {
        if(field === "numberOfPeople" && parseInt(value)<0) {
            alert("Number of people cannot be less than zero")
            return
        }
        const updated = [...members];
        updated[index][field] = value;
        updated[index]["amount"] = getPrice(updated[index]);
        setMembers(updated);
    };

    const addMember = () => {
        setMembers([...members, { registrationType: "", registrationCategory: "", daySelects: [], numberOfPeople: 0, amount: 0 }]);
    };

    const removeMember = (index) => {
        const updated = members.filter((_, i) => i !== index);
        setMembers(updated);
    };

    const totalAmount = members.reduce((sum, member) => sum + member.amount, 0);

    const handlePay = async () => {
        setPaymentLoader(true)
        await handlePaymetOrganization({
            amount: totalAmount,
            email: orgDetails?.email,
            phone: orgDetails?.mobile,
            organizationName: orgDetails?.organizationName,
            members
        }, fetchUser, navigate, setMembers)
        setPaymentLoader(false)
    };

    const handleVerify = async () => {
        if(!orgDetails.email || !orgDetails.organizationName) {
            alert("Email and Organization name are mandatory")
            return
        }
        setSending(true)
        let response = await sendOtp({
            username: orgDetails.email,
            digits: 4,
            appName: process.env.REACT_APP_APP_NAME
        }, setSending)
        setSending(false)
        if (response.status === 200) {
            setOpen(true)
        }

    }

    const handleClose = () => {
        setOpen(false)
    }

    const verifyOtp = async () => {
        setVerifying(true)
        let res = await verifyOtpSaveOrganization({
            email: orgDetails?.email,
            otp,
            phone: orgDetails?.mobile,
            organizationName: orgDetails?.organizationName
        })
        setVerifying(false)
        setOpen(false)
        setUser(res?.data?.data)
        setOtp("")

    }



    return (
        <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ marginBottom: "1rem", color: "#333" }}>🏢 Organization Registration</h2>
            <Backdrop open={paymentLoader}>
                <PaymentLoading />
            </Backdrop>

            {/* Org Details Section */}
            {!user?<div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "1rem",
                marginBottom: "2rem"
            }}>
                <input
                    type="text"
                    placeholder="Organization Name"
                    value={orgDetails.organizationName}
                    onChange={(e) => handleOrgChange("organizationName", e.target.value)}
                    style={inputStyle}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={orgDetails.email}
                    onChange={(e) => handleOrgChange("email", e.target.value)}
                    style={inputStyle}
                />
                <input
                    type="tel"
                    placeholder="Contact No"
                    value={orgDetails.mobile}
                    onChange={(e) => handleOrgChange("mobile", e.target.value)}
                    style={inputStyle}
                />
                {sending ? <CircularProgress /> : <button onClick={() => handleVerify()}>verify</button>}
                <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                    <DialogTitle sx={{ textAlign: "center", fontWeight: 600 }}>
                        OTP Verification
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant="body2" sx={{ textAlign: "center", mb: 2 }}>
                            Please enter the 4-digit OTP sent to your registered Email
                        </Typography>
                        <Box display="flex" justifyContent="center" gap={1}>
                            <TextField
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                fullWidth
                                inputProps={{
                                    maxLength: 6,
                                    style: { textAlign: "center", letterSpacing: "8px", fontSize: "20px" },
                                }}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
                        <Button onClick={handleClose} variant="outlined" color="error">
                            Cancel
                        </Button>
                        {verifying ? <CircularProgress /> : <Button
                            onClick={() => verifyOtp()}
                            variant="contained"
                            color="primary"
                            disabled={otp.length !== 4}
                        >
                            Verify
                        </Button>}
                    </DialogActions>
                    <Box textAlign="center" pb={2}>
                        {sending ? <CircularProgress /> : <Button size="small" onClick={() => handleVerify()} sx={{ textTransform: "none" }}>
                            Resend OTP
                        </Button>}
                    </Box>
                </Dialog>
            </div> : <p>{user?.organizationName}, {user?.email}, {user?.phone}</p>}

            {/* Members Table */}
            {user ? <>
                <table style={tableStyle}>
                    <thead>
                        <tr style={headerRowStyle}>
                            <th>SI No.</th>
                            <th>Registration Type</th>
                            <th>Registration Category</th>
                            <th>Select Days</th>
                            <th>Number of People</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member, index) => (
                            <tr key={index} style={{ textAlign: "center" }}>
                                <td>{index + 1}</td>
                                <td>
                                    <select
                                        value={member.registrationType}
                                        onChange={(e) => handleChange(index, "registrationType", e.target.value)}
                                        style={selectStyle}
                                    >
                                        <option value="">Select type</option>
                                        {typeOfRegistrations?.map(elm => (
                                            <option key={elm} value={elm}>{elm}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <select
                                        value={member.registrationCategory}
                                        onChange={(e) => handleChange(index, "registrationCategory", e.target.value)}
                                        style={selectStyle}
                                    >
                                        <option value="">Select category</option>
                                        {registrationCategories?.map(elm => (
                                            <option key={elm} value={elm}>{elm}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    {member?.registrationCategory === "One day Conference" ? (
                                        <>
                                            <p style={{ fontSize: "0.75rem", color: "#666", margin: "0" }}>CTRL/SHIFT for multiple</p>
                                            <select
                                                multiple
                                                value={member.daySelects || []}
                                                onChange={(e) => {
                                                    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
                                                    if (selected.length > 2) handleChange(index, "registrationCategory", "Full Conference");
                                                    else handleChange(index, "daySelects", selected);
                                                }}
                                                style={selectStyle}
                                            >
                                                {daysAvailable?.map((elm) => (
                                                    <option key={elm} value={elm}>{elm}</option>
                                                ))}
                                            </select>
                                        </>
                                    ) : (
                                        <span>All</span>
                                    )}
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={member.numberOfPeople}
                                        onChange={(e) => handleChange(index, "numberOfPeople", e.target.value)}
                                        placeholder="0"
                                        min={0}
                                        style={{ ...inputStyle, width: "80px", textAlign: "center" }}
                                    />
                                </td>
                                <td style={{ fontWeight: "bold" }}>₹{member?.amount}</td>
                                <td>
                                    <button
                                        onClick={() => removeMember(index)}
                                        style={removeBtnStyle}
                                    >
                                        ❌ Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button style={addBtnStyle} onClick={addMember}>
                    ➕ Add
                </button>
            </> : <div>Please Verify you email first</div>}

            {/* Pay Section */}
            <div style={{ marginTop: "2rem", textAlign: "right" }}>
                <h3 style={{ marginBottom: "1rem" }}>Total Amount: <span style={{ color: "#e91e63" }}>₹{totalAmount}</span></h3>
                <button onClick={handlePay} style={payBtnStyle}>
                    💳 Pay ₹{totalAmount}
                </button>
            </div>
            <Typography>All Coupons</Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Payment ID</TableCell>
                            <TableCell>Registration Type</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>People</TableCell>
                            <TableCell>Days</TableCell>
                            <TableCell>Member Amount</TableCell>
                            <TableCell>Coupons</TableCell>
                            <TableCell>Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user?.paymentDetails?.flatMap((payment) =>
                            payment.members.map((member, idx) => (
                                <TableRow key={`${payment._id}-${idx}`}>
                                    <TableCell>{payment.razorpay_payment_id}</TableCell>
                                    <TableCell>{member.registrationType}</TableCell>
                                    <TableCell>{member.registrationCategory}</TableCell>
                                    <TableCell>{member.numberOfPeople}</TableCell>
                                    <TableCell>{member.daySelects.join(", ") || "-"}</TableCell>
                                    <TableCell>₹{member.amount}</TableCell>
                                    <TableCell>
                                        {member.coupons.map((c) => (
                                            <div key={c._id}>
                                                {c.code} (₹{c.price})
                                            </div>
                                        ))}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(payment.createdAt).toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default OrganizationRegistration;

// ------------------ STYLES ------------------
const inputStyle = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    width: "100%",
    boxSizing: "border-box"
};

const selectStyle = {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    width: "100%"
};

const tableStyle = {
    borderCollapse: "collapse",
    width: "100%",
    backgroundColor: "#fafafa",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

const headerRowStyle = {
    backgroundColor: "#1976d2",
    color: "white",
    textAlign: "center"
};

const addBtnStyle = {
    marginTop: "1rem",
    padding: "10px 16px",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
};

const removeBtnStyle = {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px"
};

const payBtnStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "12px 24px",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s"
};
