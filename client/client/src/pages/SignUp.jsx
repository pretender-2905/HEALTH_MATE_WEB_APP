import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Box } from "@mui/material";
const COLORS = {
  primaryMint: "#A8E6CF",
  forestGreen: "#2E7D32",
  lightGreen: "#D0F0C0",
  offWhite: "#F5F5F5",
  darkGray: "#333333",
};

function SignUp() {
    const navigate = useNavigate()
  return (
    <div
      style={{
        background: "#FFFFFF",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, Roboto, Arial, sans-serif",
        padding: "clamp(20px, 5vw, 40px) clamp(10px, 4vw, 20px)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          minWidth: "280px",
          background: "#FFFFFF",
          borderRadius: "18px",
          padding: "clamp(30px, 8vw, 48px) clamp(24px, 6vw, 48px)",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
          border: `1px solid ${COLORS.lightGreen}`,
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <h1
          style={{
            color: COLORS.forestGreen,
            fontSize: "clamp(24px, 6vw, 28px)",
            textAlign: "center",
            marginBottom: "12px",
            fontWeight: "700",
          }}
        >
          SIGN UP
        </h1>

        <p
          style={{
            color: COLORS.darkGray,
            textAlign: "center",
            marginBottom: "clamp(20px, 6vw, 28px)",
            fontSize: "clamp(14px, 4vw, 15px)",
          }}
        >
          Sign Up to continue to your account
        </p>

        {/* Email Input */}
        <div style={{ marginBottom: "16px", textAlign: "left" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              color: COLORS.darkGray,
              fontSize: "clamp(13px, 4vw, 14px)",
              fontWeight: "500",
            }}
          >
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            style={{
              width: "100%",
              padding: "clamp(12px, 4vw, 14px) clamp(14px, 4vw, 18px)",
              borderRadius: "10px",
              border: `1px solid ${COLORS.lightGreen}`,
              fontSize: "clamp(14px, 4vw, 15px)",
              outline: "none",
              transition: "border 0.3s ease",
              boxSizing: "border-box",
            }}
            onFocus={(e) =>
              (e.target.style.border = `1px solid ${COLORS.primaryMint}`)
            }
            onBlur={(e) =>
              (e.target.style.border = `1px solid ${COLORS.lightGreen}`)
            }
          />
        </div>

        {/* Password Input */}
        <div style={{ marginBottom: "24px", textAlign: "left" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              color: COLORS.darkGray,
              fontSize: "clamp(13px, 4vw, 14px)",
              fontWeight: "500",
            }}
          >
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            style={{
              width: "100%",
              padding: "clamp(12px, 4vw, 14px) clamp(14px, 4vw, 18px)",
              borderRadius: "10px",
              border: `1px solid ${COLORS.lightGreen}`,
              fontSize: "clamp(14px, 4vw, 15px)",
              outline: "none",
              transition: "border 0.3s ease",
              boxSizing: "border-box",
            }}
            onFocus={(e) =>
              (e.target.style.border = `1px solid ${COLORS.primaryMint}`)
            }
            onBlur={(e) =>
              (e.target.style.border = `1px solid ${COLORS.lightGreen}`)
            }
          />
        </div>

        {/* Sign In Button */}
        <button
          style={{
            width: "100%",
            padding: "clamp(12px, 4vw, 14px) 16px",
            borderRadius: "10px",
            border: "none",
            background: COLORS.primaryMint,
            color: COLORS.darkGray,
            fontWeight: "700",
            fontSize: "clamp(14px, 4vw, 16px)",
            cursor: "pointer",
            marginBottom: "16px",
            transition: "background 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.background = "#97E0C3")}
          onMouseOut={(e) => (e.target.style.background = COLORS.primaryMint)}
        >
          Sign up
        </button>

        {/* Google Sign In */}
        <button
          style={{
            width: "100%",
            padding: "clamp(10px, 4vw, 12px) 16px",
            borderRadius: "10px",
            border: `2px solid ${COLORS.primaryMint}`,
            background: "#FFFFFF",
            color: COLORS.forestGreen,
            fontWeight: "700",
            fontSize: "clamp(14px, 4vw, 15px)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(8px, 3vw, 10px)",
            transition: "background 0.3s ease",
          }}
          onMouseOver={(e) =>
            (e.target.style.background = `${COLORS.primaryMint}20`)
          }
          onMouseOut={(e) => (e.target.style.background = "#FFFFFF")}
        >
          <Avatar
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          sx={{width: 24, height: 24}}
          />

          
          
          Sign up with Google
        </button>

        {/* Footer */}
        <div
          style={{
            marginTop: "24px",
            textAlign: "center",
            color: COLORS.darkGray,
            fontSize: "clamp(14px, 4vw, 15px)",
          }}
        >
         Already Have An Account? {" "}
          <span
          onClick={()=> navigate("/login")}
            style={{
              color: COLORS.forestGreen,
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;