import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Container,
  Grid,
  Card,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useScrollTrigger,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Favorite,
  LocalHospital,
  FitnessCenter,
  Schedule,
  ArrowForward,
  PlayArrow,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: { main: "#2E7D32" },
    secondary: { main: "#A8E6CF" },
    background: { default: "#F5F5F5", paper: "#FFFFFF" },
    text: { primary: "#333333", secondary: "#2E7D32" },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h2: { fontWeight: 700, fontSize: "clamp(1.8rem, 5vw, 3rem)" },
    h3: { fontWeight: 600, fontSize: "clamp(1.4rem, 4vw, 2.25rem)" },
    h5: { fontWeight: 600 },
    body2: { fontSize: "clamp(0.85rem, 2vw, 1rem)" },
  },
});

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 50 });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sx: {
      backgroundColor: trigger ? "#ffffff" : "transparent",
      color: trigger ? "primary.main" : "#2E7D32",
      transition: "all 0.3s ease",
    },
  });
}

const LandingPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const navigate = useNavigate()
  const drawer = (
    <Box sx={{ width: { xs: "100%", sm: 280 }, p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, color: "primary.main" }}>
        Health Mate
      </Typography>
      <List>
        {["Features", "Plans", "Testimonials", "Contact"].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <Button
       onClick={()=> navigate("/login")}
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "primary.main",
            "&:hover": { backgroundColor: "#1B5E20" },
          }}
        >
          LOGIN
        </Button>
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      {/* ✅ Header */}
      <ElevationScroll>
        <AppBar position="fixed" color="transparent">
          <Toolbar
            sx={{
              justifyContent: "space-between",
              px: { xs: 2, sm: 3, md: 8 },
            }}
          >
             {/* <img
      src="https://static.vecteezy.com/system/resources/previews/013/310/985/non_2x/the-green-health-icon-with-a-gear-wheel-in-the-middle-has-a-plus-sign-as-a-symbol-of-health-editable-health-symbols-free-vector.jpg"
      alt="HEALTHMATE logo"
      style={{
        height: 50,
      }}
    /> */}
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              FINANCE APP
            </Typography>

            {/* Desktop Nav */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
              {["Features", "Plans", "Testimonials", "Contact"].map((item) => (
                <Button key={item} color="inherit" sx={{ fontWeight: 600 }}>
                  {item}
                </Button>
              ))}
              <Button
              onClick={()=> navigate("/login")}
                variant="contained"
                sx={{
                  backgroundColor: "primary.main",
                  "&:hover": { backgroundColor: "#1B5E20" },
                }}
              >
                LOGIN
              </Button>
            </Box>

            {/* Mobile Menu */}
            <IconButton
              color="inherit"
              edge="end"
              sx={{ display: { md: "none" } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </ElevationScroll>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>

      {/* ✅ Hero Section */}
      <Box
        sx={{
          pt: { xs: 10, sm: 12, md: 16 },
          pb: { xs: 6, md: 10 },
          textAlign: "center",
          bgcolor: "background.default",
          px: { xs: 2, md: 0 },
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ color: "primary.main", mb: 2 }}>
            Your Personal Finance Tracker
          </Typography>
          <Typography
            variant="h6"
            color="text.primary"
            sx={{
              mb: 4,
              fontSize: { xs: "1rem", md: "1.25rem" },
              px: { xs: 1, sm: 4 },
            }}
          >
            Track, manage, and improve your health with AI-powered insights and
            personalized plans.
          </Typography>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button
            onClick={()=> navigate("/login")}
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                backgroundColor: "primary.main",
                "&:hover": { backgroundColor: "#1B5E20" },
                width: { xs: "90%", sm: "auto" },
              }}
            >
              Sign In To Start
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<PlayArrow />}
              sx={{
                borderColor: "primary.main",
                color: "primary.main",
                "&:hover": { backgroundColor: "#E8F5E9" },
                width: { xs: "90%", sm: "auto" },
              }}
            >
              Watch Demo
            </Button>
          </Box>

       <Box
  sx={{
    mt: 6,
    height: { xs: 220, sm: 280, md: 400 },
    borderRadius: 4,
    bgcolor: "secondary.main",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "primary.main",
    mx: "auto",
    width: { xs: "90%", md: "80%" },
    overflow: "hidden", // ✅ ensures rounded corners apply to the image
  }}
>
  <Box
    component="img"
    src="https://img.freepik.com/free-vector/finance-financial-performance-concept-illustration_53876-40450.jpg" // 🖼️ your image path
    alt="Health Tracking Dashboard Preview"
    sx={{
      width: "100%",
      height: "100%",
      objectFit: "cover", // or "contain" if you don’t want cropping
    }}
  />
</Box>

        </Container>
      </Box>

      {/* ✅ Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
  <Typography
    variant="h3"
    textAlign="center"
    sx={{
      color: "primary.main",
      mb: { xs: 4, md: 8 },
      fontWeight: 700,
    }}
  >
    Why Choose Health Mate?
  </Typography>

  <Grid
    container
    spacing={{ xs: 3, sm: 4, md: 5 }}
    justifyContent="center"
    alignItems="stretch"
  >
    {[
      { 
        icon: Favorite, 
        title: "Health Tracking", 
        text: "Monitor your vital signs, symptoms, and health metrics in one place.",
        gradient: "linear-gradient(135deg, #A8E6CF 0%, #88D4AB 100%)"
      },
      { 
        icon: LocalHospital, 
        title: "AI Insights", 
        text: "Get personalized health recommendations powered by artificial intelligence.",
        gradient: "linear-gradient(135deg, #A8E6CF 0%, #77C9D4 100%)"
      },
      { 
        icon: FitnessCenter, 
        title: "Fitness Plans", 
        text: "Custom workout routines and exercise plans tailored to your goals.",
        gradient: "linear-gradient(135deg, #A8E6CF 0%, #98D4A9 100%)"
      },
      { 
        icon: Schedule, 
        title: "Progress Tracking", 
        text: "Visualize your health journey with detailed progress reports and analytics.",
        gradient: "linear-gradient(135deg, #A8E6CF 0%, #88C9D4 100%)"
      },
      { 
        icon: ArrowForward, 
        title: "Goal Setting", 
        text: "Set and track realistic health and fitness goals to stay motivated.",
        gradient: "linear-gradient(135deg, #A8E6CF 0%, #A8D4CF 100%)"
      },
      { 
        icon: PlayArrow, 
        title: "Guided Workouts", 
        text: "Follow expert-designed, interactive workouts directly in the app.",
        gradient: "linear-gradient(135deg, #A8E6CF 0%, #B8E6CF 100%)"
      },
    ].map((feature, index) => {
      const Icon = feature.icon;
      return (
        <Grid item xs={12} sm={6} md={4} key={index} display="flex" justifyContent="center">
          <Card
            sx={{
              width: "100%",
              maxWidth: 340,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              p: { xs: 3, md: 4 },
              borderRadius: 4,
              border: "1px solid rgba(46, 125, 50, 0.1)",
              background: "linear-gradient(135deg, #FFFFFF 0%, #F8FDFA 100%)",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: "translateY(0)",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: feature.gradient,
                transform: "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              },
              "&:hover": {
                transform: "translateY(-12px)",
                boxShadow: `
                  0 20px 40px rgba(46, 125, 50, 0.15),
                  0 8px 25px rgba(0, 0, 0, 0.1)
                `,
                borderColor: "primary.main",
                "&::before": {
                  transform: "scaleX(1)",
                },
                "& .feature-icon": {
                  transform: "scale(1.1) translateY(-4px)",
                  background: feature.gradient,
                },
                "& .feature-title": {
                  color: "#1B5E20",
                  transform: "translateY(-2px)",
                },
                "& .feature-text": {
                  transform: "translateY(-2px)",
                },
              },
              "&:active": {
                transform: "translateY(-8px)",
              },
            }}
          >
            <Box
              className="feature-icon"
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                mb: 2,
                background: "linear-gradient(135deg, #A8E6CF 0%, #C8F7DC 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.2)",
                  transform: "scale(0)",
                  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                },
                "&:hover::after": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <Icon 
                sx={{ 
                  fontSize: 40, 
                  color: "#2E7D32",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                }} 
              />
            </Box>
            <Typography 
              className="feature-title"
              variant="h6" 
              sx={{ 
                mb: 1, 
                fontWeight: 700, 
                color: "primary.main",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -4,
                  left: "50%",
                  width: 0,
                  height: "2px",
                  background: feature.gradient,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: "translateX(-50%)",
                },
              }}
            >
              {feature.title}
            </Typography>
            <Typography 
              className="feature-text"
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                lineHeight: 1.6, 
                maxWidth: 260,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {feature.text}
            </Typography>
            
            {/* Animated hover indicator */}
            <Box
              sx={{
                position: "absolute",
                bottom: 16,
                width: 30,
                height: 4,
                background: feature.gradient,
                borderRadius: 2,
                opacity: 0,
                transform: "scaleX(0.5)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              className="hover-indicator"
            />
          </Card>
        </Grid>
      );
    })}
  </Grid>
</Container>

      {/* ✅ CTA Section */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          px: { xs: 2, md: 6 },
          textAlign: "center",
          backgroundColor: "#D0F0C0",
          borderRadius: 4,
          mx: { xs: 2, md: 8 },
          mb: 6,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: "primary.main", fontSize: { xs: "1.5rem", md: "2rem" } }}>
          Ready to Transform Your Health?
        </Typography>
        <Typography variant="h6" color="text.primary" paragraph sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}>
          Join thousands of users improving their wellness with Health Mate.
        </Typography>
        <Button
        onClick={()=> navigate("/login")}
          variant="contained"
          size="large"
          sx={{
            mt: 2,
            backgroundColor: "primary.main",
            "&:hover": { backgroundColor: "#1B5E20" },
          }}
        >
          Get Started Today
        </Button>
      </Box>

      {/* ✅ Footer */}
      <Box sx={{ py: 4, backgroundColor: "primary.main", color: "white", textAlign: "center" }}>
        <Container maxWidth="lg">
          <Typography variant="h6" fontSize={{ xs: "1rem", sm: "1.25rem" }}>
            Health Mate
          </Typography>
          <Typography variant="body2" fontSize={{ xs: "0.8rem", sm: "0.9rem" }}>
            Your trusted companion for a healthier life.
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }} fontSize={{ xs: "0.75rem", sm: "0.85rem" }}>
            © 2025 Health Mate. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LandingPage;
