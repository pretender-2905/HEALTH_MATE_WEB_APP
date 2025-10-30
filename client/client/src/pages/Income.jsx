import React, { useState } from 'react'
import axios from 'axios'
import { AppRoutes } from '../constants/constant'
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { SettingsEthernet } from '@mui/icons-material';

const Income =  () => {
        const [transaction, setTransaction] = useState([])
        const [formData, setFormData] = useState({
        type:'',
        amount: 0,
        reason: '',

    })

    const [loading, setLoading] = useState(false)

    useEffect(()=>{
     
       const fetchTransactions = async ()=>{
        const token = Cookies.get("token")
        if (!token) return;
        try{

        const res = await axios.get(AppRoutes.all, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        const result = res.data.data;
        if (Array.isArray(result)) {
          setTransaction(result);
        } else {
          setTransaction([]);
        }
      }
     catch(error){
      console.log("error from frontend while ferching all transaction=> ", error.message)
     }
     }
     fetchTransactions()
    }, [])
    
    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e)=>{
       try{
         e.preventDefault()
         const token = Cookies.get("token")
         if(!token){
          console.log("token not found in cookies!")
          return
         }
      
        setLoading(true)
          const res = await axios.post(AppRoutes.add, 
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`
              },
            }
          );

           await fetchTransactions();

      const newTransaction = res.data.data;
    setTransaction((prev) =>
        Array.isArray(prev) ? [newTransaction, ...prev] : [newTransaction]
      );


        setFormData({ type: '', amount: '', reason: '' });



        
    console.log("resopnse from axios from income page: ", res.data)
       }catch(error){
        console.log("error from income frontend", error.message)
       }
    }
  return (
    <div>
        <div>Income</div>
        <form action="" >
<label htmlFor="">TYPE</label>
    <input 
    onChange={handleChange}
    name='type'
    value={formData.type}
    placeholder='Enter a Type eg: income or expense'
    required


    type="text" />
        <label htmlFor="">AMOUNT</label>
    <input 
    onChange={handleChange}
    name='amount'
    value={formData.amount}
    placeholder='Enter Amount eg: 2000'
    required
    type="Number" />


        <label htmlFor="">Source of income or expanditure</label>
    <input 
    onChange={handleChange}
    name='reason'
    value={formData.reason}
    placeholder='Enter Source of income or expanditure'
    required
    type="text" />

    <button  onClick={handleSubmit}>
    ADD
    </button>
        </form>

         <div>
      <h2>Your Transactions</h2>
      {Array.isArray(transaction) && transaction.length > 0 ? (
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
    
  )
}

export default Income




