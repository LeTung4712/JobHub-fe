import React from "react";
import { Alert } from "@mui/material";

const AlertMessages = ({
  submitSuccess,
  submitError,
  successMessage,
  errorMessage,
}) => {
  return (
    <>
      {/* Thông báo thành công */}
      {submitSuccess && (
        <Alert
          severity="success"
          sx={{
            mt: 3,
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          {successMessage}
        </Alert>
      )}

      {/* Thông báo lỗi */}
      {submitError && (
        <Alert
          severity="error"
          sx={{
            mt: 3,
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          {errorMessage}
        </Alert>
      )}
    </>
  );
};

export default AlertMessages;
