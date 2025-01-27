import React, { useState, useRef } from "react";
import QRCode from "qrcode";

// CRC16-CCITT (XMODEM) Calculation
const calculateCRC = (data) => {
  let crc = 0xffff; // Initial value
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8; // XOR byte into the top of the 16-bit CRC
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021; // Polynomial
      } else {
        crc <<= 1;
      }
      crc &= 0xffff; // Trim to 16 bits
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
};

// Generate PromptPay Payload
const generatePromptPayPayload = (mobile, amount) => {
  const formattedMobile = `0066${mobile.slice(1)}`; // Convert to country code format
  const merchantInfo = [
    "00",
    "16",
    "A000000677010111", // AID
    "01",
    `13${formattedMobile}`, // Mobile number
  ].join("");

  const payload = [
    "00",
    "02",
    "01", // Version
    "01",
    "02",
    "11", // QR Type: Static
    "29",
    merchantInfo.length.toString().padStart(2, "0"),
    merchantInfo, // Merchant Info
    "53",
    "03",
    "764", // Currency: THB
    amount
      ? ["54", amount.length.toString().padStart(2, "0"), amount].join("")
      : "", // Amount (optional)
    "58",
    "02",
    "TH", // Country
  ].join("");

  // Add CRC placeholder and calculate CRC
  const crc = calculateCRC(payload + "6304");
  return `${payload}6304${crc}`;
};

const PromptPayQR = ({
  amountPay,
  mobile = "0839996367",
  openDia,
  openDialog,
}) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  // const dialogRef = useRef(null);
  // const [closeDia, setCloseDia] = useState(true);

  const generateQR = async () => {
    setMobileNumber(mobile);
    setAmount(amountPay);
    if (
      !mobileNumber ||
      mobileNumber.length !== 10 ||
      !mobileNumber.startsWith("0")
    ) {
      alert("Please enter a valid 10-digit mobile number starting with 0.");
      return;
    }

    // Validate and format the amount, reduce by 0.01
    let formattedAmount = "";
    if (amount) {
      // Subtract 0.01 from the entered amount and format it to two decimal places
      const reducedAmount = parseFloat(amount).toFixed(0);
      formattedAmount = reducedAmount.replace(".", ""); // Remove the decimal point for payload
    }

    // Generate Payload
    const payload = generatePromptPayPayload(mobileNumber, formattedAmount);
    console.log("Generated Payload:", payload); // Log for debugging

    // Generate QR Code
    try {
      const qrUrl = await QRCode.toDataURL(payload, { width: 500 });
      setQrCodeUrl(qrUrl);
    } catch (err) {
      console.error("Failed to generate QR code:", err);
      alert("Error generating QR code. Please try again.");
    }
  };

  const closeDialog = () => {
    // Close the dialog when the button is clicked
    setCloseDia(false);
    setOpenDia(false);

    // if (dialogRef.current) {
    //   dialogRef.current.close();
    // }
  };

  return (
    <div>
      {openDia && (
        <dialog
          // ref={dialogRef}
          open
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "10px",
            width: "100%",
            maxWidth: "500px",
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
            padding: "20px",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1>PromptPay QR Code Generator</h1>

            {/* Mobile Number Input */}
            <input
              type="text"
              placeholder="Enter mobile number (e.g., 0812345678)"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              style={{ marginBottom: "10px", padding: "10px", width: "300px" }}
            />
            <br />

            {/* Amount Input */}
            <input
              type="number"
              placeholder="Enter amount (optional)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ marginBottom: "10px", padding: "10px", width: "300px" }}
            />
            <br />

            {/* Generate QR Code Button */}
            <button
              onClick={generateQR}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Generate QR Code
            </button>

            {/* Display QR Code */}
            <div style={{ marginTop: "20px" }}>
              {qrCodeUrl && <img src={qrCodeUrl} alt="PromptPay QR Code" />}
            </div>
            <button
              style={{ marginTop: "10px" }}
              className="submit-button"
              onClick={() => openDialog()}
              type="submit"
            >
              Close
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PromptPayQR;
