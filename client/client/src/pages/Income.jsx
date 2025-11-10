
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppRoutes } from '../constants/constant';
import Cookies from 'js-cookie';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  Divider,
  Chip,
  CircularProgress,
  MenuItem,
  Card,
  CardContent,
  Grid,
  Stack,
  IconButton,
  Container,
  AppBar,
  Toolbar,
  useMediaQuery,
  Drawer,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  Add, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Brightness4, 
  Brightness7, 
  Logout,
  Menu,
  AccountBalanceWallet 
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';

const Income = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:768px)');
  const [transaction, setTransaction] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    amount: '',
    reason: '',
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#2E7D32',
      },
      secondary: {
        main: '#ff6f00',
      },
      background: {
        default: darkMode ? '#0a0a0a' : '#f8f9fa',
        paper: darkMode ? '#1a1a1a' : '#ffffff',
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      setFetchLoading(true);
      const token = Cookies.get('token');
      if (!token) {
        setFetchLoading(false);
        navigate("/");
        return;
      }
      try {
        const res = await axios.get(AppRoutes.all, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = res.data.data;
        if (Array.isArray(result)) {
          setTransaction(result);
        } else {
          setTransaction([]);
        }
      } catch (error) {
        console.log('Error fetching transactions:', error.message);
        setTransaction([]);
      } finally {
        setFetchLoading(false);
      }
    };
    fetchTransactions();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    if (!token) {
      console.log('Token not found!');
      navigate("/");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(AppRoutes.add, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newTransaction = res.data.data;
      setTransaction((prev) =>
        Array.isArray(prev) ? [newTransaction, ...prev] : [newTransaction]
      );
      setFormData({ type: '', amount: '', reason: '' });
    } catch (error) {
      console.log('Error adding transaction:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transaction.filter((t) => {
    if (filter === 'all') return true;
    return t.type === filter;
  });

  const totalIncome = transaction
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transaction
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpense;

  const handleDownload = () => {
    const dataToExport = filteredTransactions.map((t) => ({
      Type: t.type.toUpperCase(),
      Reason: t.reason,
      Amount: t.amount,
      Date: t.createdAt ? new Date(t.createdAt).toLocaleDateString() : 'N/A'
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');

    const fileName = `${filter}_Transactions.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const mobileMenu = (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
      sx={{
        '& .MuiDrawer-paper': {
          bgcolor: 'background.paper',
          width: 250,
          p: 2,
        },
      }}
    >
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <AccountBalanceWallet sx={{ fontSize: 40, color: '#2E7D32', mb: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          Transaction Manager
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <List>
        <ListItem 
          button 
          onClick={() => setDarkMode(!darkMode)}
          sx={{ borderRadius: 2, mb: 1 }}
        >
          <ListItemIcon>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </ListItemIcon>
          <ListItemText primary={darkMode ? "Light Mode" : "Dark Mode"} />
        </ListItem>
        
        <ListItem 
          button 
          onClick={handleLogout}
          sx={{ borderRadius: 2, mb: 1 }}
        >
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{ 
          minHeight: '100vh', 
          bgcolor: 'background.default',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <AppBar 
          position="static" 
          elevation={1}
          sx={{ 
            bgcolor: 'background.paper',
            color: 'text.primary',
            borderBottom: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AccountBalanceWallet sx={{ 
                  fontSize: { xs: 28, sm: 32 }, 
                  color: '#2E7D32',
                  display: { xs: 'none', sm: 'block' }
                }} />
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700,
                    fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
                    background: darkMode 
                      ? 'linear-gradient(90deg, #90caf9, #64b5f6)'
                      : 'linear-gradient(90deg, #2E7D32, #4caf50)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Transaction Manager
                </Typography>
              </Box>

              <Box sx={{ 
                display: { xs: 'none', md: 'flex' }, 
                alignItems: 'center', 
                gap: 1 
              }}>
                <IconButton 
                  onClick={() => setDarkMode(!darkMode)}
                  sx={{ 
                    color: 'text.primary',
                    '&:hover': { 
                      bgcolor: 'action.hover',
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.3s',
                  }}
                >
                  {darkMode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
                
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  startIcon={<Logout />}
                  sx={{ 
                    bgcolor: '#d32f2f',
                    '&:hover': {
                      bgcolor: '#b71c1c',
                    },
                    px: 3,
                  }}
                >
                  Logout
                </Button>
              </Box>

              <IconButton
                sx={{ 
                  display: { xs: 'flex', md: 'none' },
                  color: 'text.primary'
                }}
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>

        {mobileMenu}

        <Container 
          maxWidth="xl" 
          sx={{ 
            py: { xs: 3, sm: 4 },
            px: { xs: 2, sm: 3, md: 4 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}
        >
          {/* Stats Cards - Centered on all screens */}
          <Box sx={{ 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'center',
            mb: { xs: 3, md: 4 }
          }}>
            <Grid 
              container 
              spacing={{ xs: 2, md: 3 }} 
              sx={{ 
                maxWidth: 1200,
                justifyContent: 'center'
              }}
            >
              <Grid item xs={12} sm={10} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card sx={{ 
                  width: '100%',
                  maxWidth: 400,
                  bgcolor: 'background.paper',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': { 
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  },
                  border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
                  position: 'relative',
                  overflow: 'visible',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #4caf50, #81c784)',
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }
                }}>
                  <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ 
                        p: 1, 
                        bgcolor: 'rgba(76, 175, 80, 0.1)', 
                        borderRadius: 2,
                        mr: 2
                      }}>
                        <TrendingUp sx={{ fontSize: 28, color: '#4caf50' }} />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.95rem' }}>
                        Total Income
                      </Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#4caf50', fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
                      ${totalIncome.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={10} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card sx={{ 
                  width: '100%',
                  maxWidth: 400,
                  bgcolor: 'background.paper',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': { 
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  },
                  border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
                  position: 'relative',
                  overflow: 'visible',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #f44336, #e57373)',
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }
                }}>
                  <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ 
                        p: 1, 
                        bgcolor: 'rgba(244, 67, 54, 0.1)', 
                        borderRadius: 2,
                        mr: 2
                      }}>
                        <TrendingDown sx={{ fontSize: 28, color: '#f44336' }} />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.95rem' }}>
                        Total Expense
                      </Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#f44336', fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
                      ${totalExpense.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={10} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card sx={{ 
                  width: '100%',
                  maxWidth: 400,
                  bgcolor: 'background.paper',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': { 
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  },
                  border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
                  position: 'relative',
                  overflow: 'visible',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: balance >= 0 
                      ? 'linear-gradient(90deg, #9c27b0, #ba68c8)' 
                      : 'linear-gradient(90deg, #f44336, #ef5350)',
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }
                }}>
                  <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ 
                        p: 1, 
                        bgcolor: balance >= 0 ? 'rgba(156, 39, 176, 0.1)' : 'rgba(244, 67, 54, 0.1)', 
                        borderRadius: 2,
                        mr: 2
                      }}>
                        <AccountBalanceWallet sx={{ 
                          fontSize: 28, 
                          color: balance >= 0 ? '#9c27b0' : '#f44336' 
                        }} />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.95rem' }}>
                        Current Balance
                      </Typography>
                    </Box>
                    <Typography variant="h4" sx={{ 
                      fontWeight: 700, 
                      color: balance >= 0 ? '#9c27b0' : '#f44336', 
                      fontSize: { xs: '1.75rem', md: '2.25rem' } 
                    }}>
                      ${balance.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Main Content Grid */}
          <Box sx={{ 
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ maxWidth: 1200, width: '100%' }}>
              <Grid item xs={12} lg={4}>
                <Paper sx={{ 
                  p: { xs: 2.5, md: 3 }, 
                  bgcolor: 'background.paper',
                  border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
                  height: 'fit-content'
                }}>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, fontSize: '1.25rem' }}>
                    Add New Transaction
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                      <TextField
                        select
                        fullWidth
                        label="Transaction Type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        size="medium"
                      >
                        <MenuItem value="income">💰 Income</MenuItem>
                        <MenuItem value="expense">💸 Expense</MenuItem>
                      </TextField>

                      <TextField
                        fullWidth
                        label="Amount"
                        name="amount"
                        type="number"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="0.00"
                        required
                        size="medium"
                        InputProps={{
                          startAdornment: <Typography sx={{ mr: 1, color: 'text.secondary' }}>$</Typography>,
                        }}
                      />

                      <TextField
                        fullWidth
                        label="Description"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        placeholder="What's this for?"
                        required
                        size="medium"
                        multiline
                        rows={2}
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Add />}
                        sx={{ 
                          py: 1.5,
                          fontSize: '1rem',
                          fontWeight: 600,
                          bgcolor: '#2E7D32',
                          '&:hover': {
                            bgcolor: '#1b5e20',
                            transform: 'translateY(-2px)',
                          },
                          transition: 'all 0.3s',
                        }}
                      >
                        {loading ? 'Saving...' : 'Add Transaction'}
                      </Button>
                    </Stack>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} lg={8}>
                <Paper sx={{ 
                  p: { xs: 2.5, md: 3 }, 
                  bgcolor: 'background.paper',
                  border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
                  minHeight: 500
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                    mb: 3
                  }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '1.25rem' }}>
                      Recent Transactions
                    </Typography>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      gap: 1,
                      flexWrap: 'wrap',
                      width: { xs: '100%', sm: 'auto' }
                    }}>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {['all', 'income', 'expense'].map((filterType) => (
                          <Chip
                            key={filterType}
                            label={filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                            onClick={() => setFilter(filterType)}
                            variant={filter === filterType ? "filled" : "outlined"}
                            color={filter === filterType ? "primary" : "default"}
                            sx={{ 
                              fontWeight: 600,
                              ...(filter === filterType && {
                                bgcolor: '#2E7D32',
                                color: 'white'
                              })
                            }}
                          />
                        ))}
                      </Box>

                      {filteredTransactions.length > 0 && (
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<Download />}
                          onClick={handleDownload}
                          sx={{ 
                            borderColor: '#2E7D32',
                            color: '#2E7D32',
                            '&:hover': {
                              bgcolor: '#2E7D32',
                              color: 'white',
                              borderColor: '#2E7D32'
                            }
                          }}
                        >
                          Export
                        </Button>
                      )}
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 3 }} />

                  {fetchLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
                      <CircularProgress sx={{ color: '#2E7D32' }} size={40} />
                    </Box>
                  ) : filteredTransactions.length > 0 ? (
                    <List sx={{ p: 0 }}>
                      {filteredTransactions.map((t, idx) => (
                        <Box key={t._id}>
                          <ListItem
                            sx={{
                              px: { xs: 1, sm: 2 },
                              py: 2.5,
                              '&:hover': { 
                                bgcolor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                                transform: 'translateX(4px)',
                              },
                              transition: 'all 0.2s',
                              borderRadius: 2,
                              mb: 1
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                                <Box sx={{ 
                                  p: 1.5, 
                                  bgcolor: t.type === 'income' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)', 
                                  borderRadius: 2,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  {t.type === 'income' ? (
                                    <TrendingUp sx={{ color: '#4caf50', fontSize: 24 }} />
                                  ) : (
                                    <TrendingDown sx={{ color: '#f44336', fontSize: 24 }} />
                                  )}
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '1rem', mb: 0.5 }}>
                                    {t.reason}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {t.createdAt ? new Date(t.createdAt).toLocaleDateString() : 'N/A'}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box sx={{ textAlign: 'right' }}>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    fontWeight: 700,
                                    color: t.type === 'income' ? '#4caf50' : '#f44336',
                                    fontSize: '1.25rem'
                                  }}
                                >
                                  {t.type === 'income' ? '+' : '-'}${t.amount}
                                </Typography>
                                <Chip
                                  label={t.type}
                                  size="small"
                                  sx={{
                                    bgcolor: t.type === 'income' ? '#e8f5e9' : '#ffebee',
                                    color: t.type === 'income' ? '#2e7d32' : '#c62828',
                                    textTransform: 'capitalize',
                                    height: 20,
                                    fontSize: '0.65rem',
                                    fontWeight: 700,
                                    mt: 0.5
                                  }}
                                />
                              </Box>
                            </Box>
                          </ListItem>
                          {idx < filteredTransactions.length - 1 && <Divider />}
                        </Box>
                      ))}
                    </List>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                      <AccountBalanceWallet sx={{ fontSize: 64, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
                      <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                        No transactions found
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {filter === 'all' ? 'Start by adding your first transaction!' : `No ${filter} transactions to display`}
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Income;