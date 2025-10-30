// import React, { useState } from 'react'
// import axios from 'axios'
// import { AppRoutes } from '../constants/constant'
// import Cookies from 'js-cookie';
// import { useEffect } from 'react';
// import { SettingsEthernet } from '@mui/icons-material';

// const Income =  () => {
//         const [transaction, setTransaction] = useState([])
//         const [formData, setFormData] = useState({
//         type:'',
//         amount: 0,
//         reason: '',

//     })

//     const [loading, setLoading] = useState(false)

//     useEffect(()=>{
     
//        const fetchTransactions = async ()=>{
//         const token = Cookies.get("token")
//         if (!token) return;
//         try{

//         const res = await axios.get(AppRoutes.all, {
//           headers:{
//             Authorization: `Bearer ${token}`
//           }
//         })
//         const result = res.data.data;
//         if (Array.isArray(result)) {
//           setTransaction(result);
//         } else {
//           setTransaction([]);
//         }
//       }
//      catch(error){
//       console.log("error from frontend while ferching all transaction=> ", error.message)
//      }
//      }
//      fetchTransactions()
//     }, [])
    
//     const handleChange = (e)=>{
//         setFormData({...formData, [e.target.name]: e.target.value})
//     }

//     const handleSubmit = async (e)=>{
//        try{
//          e.preventDefault()
//          const token = Cookies.get("token")
//          if(!token){
//           console.log("token not found in cookies!")
//           return
//          }
      
//         setLoading(true)
//           const res = await axios.post(AppRoutes.add, 
//             formData,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`
//               },
//             }
//           );

//            await fetchTransactions();

//       const newTransaction = res.data.data;
//     setTransaction((prev) =>
//         Array.isArray(prev) ? [newTransaction, ...prev] : [newTransaction]
//       );


//         setFormData({ type: '', amount: '', reason: '' });



        
//     console.log("resopnse from axios from income page: ", res.data)
//        }catch(error){
//         console.log("error from income frontend", error.message)
//        }
//     }
//   return (
//     <div>
//         <div>Income</div>
//         <form action="" >
// <label htmlFor="">TYPE</label>
//     <input 
//     onChange={handleChange}
//     name='type'
//     value={formData.type}
//     placeholder='Enter a Type eg: income or expense'
//     required


//     type="text" />
//         <label htmlFor="">AMOUNT</label>
//     <input 
//     onChange={handleChange}
//     name='amount'
//     value={formData.amount}
//     placeholder='Enter Amount eg: 2000'
//     required
//     type="Number" />


//         <label htmlFor="">Source of income or expanditure</label>
//     <input 
//     onChange={handleChange}
//     name='reason'
//     value={formData.reason}
//     placeholder='Enter Source of income or expanditure'
//     required
//     type="text" />

//     <button  onClick={handleSubmit}>
//     ADD
//     </button>
//         </form>

//          <div>
//       <h2>Your Transactions</h2>
//       {Array.isArray(transaction) && transaction.length > 0 ? (
//           <ul>
//             {transaction.map((t) => (
//               <li key={t._id}>
//                 <strong>{t.type?.toUpperCase()}</strong>: {t.reason} — ${t.amount}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No transactions yet.</p>
//         )}

//     </div>
//     </div>
    
//   )
// }

// export default Income





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppRoutes } from '../constants/constant';  // Ensure this is correctly defined
import Cookies from 'js-cookie';

const Income = () => {
    const [transaction, setTransaction] = useState([]);
    const [formData, setFormData] = useState({
        type: '',
        amount: 0,
        reason: '',
    });
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [error, setError] = useState('');  // New: For displaying errors

    const fetchTransactions = async () => {
        setFetchLoading(true);
        setError('');  // Clear previous errors
        const token = Cookies.get("token");
        console.log("Token retrieved:", token);
        if (!token) {
            setError("No token found. Please log in.");
            setFetchLoading(false);
            return;
        }
        try {
            console.log("Fetching transactions from:", AppRoutes.all);
            const res = await axios.get(AppRoutes.all, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Full API response:", res);
            console.log("Response data:", res.data);
            const result = res.data.data;
            console.log("Extracted result:", result);
            if (Array.isArray(result)) {
                setTransaction(result);
                console.log("Transactions set in state:", result);
            } else {
                console.log("Result is not an array, setting empty array.");
                setTransaction([]);
                setError("Invalid data format from server.");
            }
        } catch (error) {
            console.log("Error from frontend while fetching all transactions:", error.message);
            console.log("Error details:", error);
            setTransaction([]);
            setError(`Failed to fetch transactions: ${error.message}`);
        } finally {
            setFetchLoading(false);
        }
    };

    useEffect(() => {
        console.log("useEffect triggered, calling fetchTransactions.");
        fetchTransactions();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const token = Cookies.get("token");
            if (!token) {
                setError("Token not found in cookies!");
                return;
            }

            setLoading(true);
            setError('');  // Clear errors
            console.log("Submitting new transaction:", formData);
            const res = await axios.post(AppRoutes.add, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log("Add transaction response:", res.data);

            // Refetch all transactions after adding
            await fetchTransactions();

            // Reset form
            setFormData({ type: '', amount: '', reason: '' });

        } catch (error) {
            console.log("Error from income frontend:", error.message);
            console.log("Error details:", error);
            setError(`Failed to add transaction: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div>Income</div>
            {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display errors */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="type">TYPE</label>
                <input
                    onChange={handleChange}
                    name='type'
                    value={formData.type}
                    placeholder='Enter a Type eg: income or expense'
                    required
                    type="text"
                />
                <label htmlFor="amount">AMOUNT</label>
                <input
                    onChange={handleChange}
                    name='amount'
                    value={formData.amount}
                    placeholder='Enter Amount eg: 2000'
                    required
                    type="number"
                />
                <label htmlFor="reason">Source of income or expenditure</label>
                <input
                    onChange={handleChange}
                    name='reason'
                    value={formData.reason}
                    placeholder='Enter Source of income or expenditure'
                    required
                    type="text"
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'ADD'}
                </button>
            </form>

            <div>
                <h2>Your Transactions</h2>
                {fetchLoading ? (
                    <p>Loading transactions...</p>
                ) : Array.isArray(transaction) && transaction.length > 0 ? (
                    <ul>
                        {transaction.map((t) => (
                            <li key={t._id}>
                                <strong>{t.type?.toUpperCase()}</strong>: {t.reason} — ${t.amount}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No transactions yet.</p>
                )}
            </div>
        </div>
    );
};

export default Income;


