import React from "react";

const COLORS = {
  primaryMint: "#A8E6CF",   // Buttons, highlights, icons
  forestGreen: "#2E7D32",   // Headers, call-to-action text
  lightGreen: "#D0F0C0",    // Card/background accents
  offWhite: "#F5F5F5",      // Page background
  darkGray: "#333333",      // Body text
};

function Login() {
  return (
    <div
      style={{
        background: "#FFFFFF",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, Roboto, Arial, sans-serif",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#FFFFFF",
          borderRadius: "18px",
          padding: "48px 48px",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
          border: `1px solid ${COLORS.lightGreen}`,
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <h1
          style={{
            color: COLORS.forestGreen,
            fontSize: "28px",
            textAlign: "center",
            marginBottom: "12px",
            fontWeight: "700",
          }}
        >
          Welcome Back
        </h1>

        <p
          style={{
            color: COLORS.darkGray,
            textAlign: "center",
            marginBottom: "28px",
            fontSize: "15px",
          }}
        >
          Sign in to continue to your account
        </p>

        {/* Email Input */}
        <div style={{ marginBottom: "16px", textAlign: "left" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              color: COLORS.darkGray,
              fontSize: "14px",
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
              padding: "14px 18px",
              borderRadius: "10px",
              border: `1px solid ${COLORS.lightGreen}`,
              fontSize: "15px",
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
              fontSize: "14px",
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
              padding: "14px 18px",
              borderRadius: "10px",
              border: `1px solid ${COLORS.lightGreen}`,
              fontSize: "15px",
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
            padding: "14px 16px",
            borderRadius: "10px",
            border: "none",
            background: COLORS.primaryMint,
            color: COLORS.darkGray,
            fontWeight: "700",
            fontSize: "16px",
            cursor: "pointer",
            marginBottom: "16px",
            transition: "background 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.background = "#97E0C3")}
          onMouseOut={(e) => (e.target.style.background = COLORS.primaryMint)}
        >
          Sign In
        </button>

        {/* Google Sign In */}
        <button
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: "10px",
            border: `2px solid ${COLORS.primaryMint}`,
            background: "#FFFFFF",
            color: COLORS.forestGreen,
            fontWeight: "700",
            fontSize: "15px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            transition: "background 0.3s ease",
          }}
          onMouseOver={(e) =>
            (e.target.style.background = `${COLORS.primaryMint}20`)
          }
          onMouseOut={(e) => (e.target.style.background = "#FFFFFF")}
        >
          <span
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: COLORS.primaryMint,
              display: "inline-block",
            }}
          />
          Sign in with Google
        </button>

        {/* Footer */}
        <div
          style={{
            marginTop: "24px",
            textAlign: "center",
            color: COLORS.darkGray,
            fontSize: "15px",
          }}
        >
          Don’t have an account?{" "}
          <span
            style={{
              color: COLORS.forestGreen,
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
