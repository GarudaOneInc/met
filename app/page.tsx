"use client"
import { useState } from 'react'
import Image from 'next/image';

export default function Home() {
  const [product_name, set_product_name] = useState('');
  const [price, set_price] = useState('');
  const [product_category, set_product_category] = useState('');
  const [payment_method,set_payment_method] = useState('');
  const [transaction_status,set_transaction_status] = useState('Save your transactions');

 // if (transaction_status === '') {
  //  set_transaction_status('Save your transactions ');
 // }

  const inputWidth = transaction_status.length ? `${transaction_status.length + 1}ch` : '1ch'; 
  
  const handle_submit = () => {
    const time_at_transaction = new Date();
    console.log(product_name,price, product_category,payment_method,time_at_transaction)
    const transaction_message = 'Your transaction is saved';
    set_transaction_status(transaction_message); 
  };

  const handle_input_change = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === "product_category") {
      set_product_category(value);
    } else if (name === "product_name") {
      set_product_name(value);
    } else if (name === "price") {
      set_price(value);
    } else if (name ==="payment_method") {
      set_payment_method(value);
    }
  };

  return (
    
    <main className="flex flex-col items-center px-24 pt-24">

      <div className="w-mix-screen bg-white p-5 rounded-lg shadow-lg mb-4">
        <div className="status-section flex flex-row">
          <Image className='bg-black p-2 mr-2' width={50} height={45} src="./vercel.svg" alt="" />
          <input className="text-lg font-bold text-purple-400 p-2"
          style={{ width: inputWidth }}
          value={transaction_status}
          readOnly/>
        </div>
      </div>

      <div className="w-max bg-white p-6 rounded-lg shadow-lg">
        <div className="form-section">
          
          <div>
            <h1 className="text-4xl font-bold mb-2 text-purple-600">METrack app</h1>
            <h2 className="text-xl font-bold mb-10 text-purple-400">Your Monthly Expense Tracker</h2>
          </div>
        
          <form action={handle_submit} className='flex flex-col'>
            
              <input type='text' placeholder='e.g., Chips, Tea, Petrol'
              className='flex-auto w-full mb-4 bg-stone-200 text-violet-600 font-bold px-2 py-4 ps-4 pe-4 rounded-xl' 
              name='product_name'
              required
              onChange={handle_input_change} 
              value={product_name}/>

              <input type='number' placeholder='e.g., 50, 25, 506' pattern='[0-9]*' 
              className='flex-auto w-full mb-4 bg-stone-200 text-violet-600 font-bold px-2 py-4 ps-4 rounded-xl' 
              name='price'
              required
              onChange={handle_input_change} 
              value={price}/>

              <select
                name="product_category"
                className="flex-auto w-full mb-4 bg-stone-200 text-violet-600 font-bold px-2 py-4 ps-3 pe-3 rounded-xl"
                onChange={handle_input_change}
                value={product_category}
              >
                <option value="" disabled>Type</option>
                <option value="f&b">F&B</option>
                <option value="essentials">Essentials</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="miscellaneous">Miscellaneous</option>
              </select>

              <div className="payment-options flex-auto w-full mb-4 text-violet-600 font-bold grid gap-2 grid-cols-3">
                <label className='border-2 border-stone-200 rounded-xl p-3'>
                  <input
                    className='mr-2 accent-violet-600'
                    type="radio"
                    name="payment_method"
                    value="cash"
                    onChange={handle_input_change}
                    checked={payment_method === "cash"}
                  />
                  Cash
                </label>
                <label className='border-2 border-stone-200 rounded-xl p-3'>
                  <input
                    className='mr-2 accent-violet-600'
                    type="radio"
                    name="payment_method"
                    value="upi"
                    onChange={handle_input_change}
                    checked={payment_method === "upi"}
                  />
                  UPI
                </label>

                <label className='border-2 border-stone-200 rounded-xl p-3'>
                  <input
                    className='mr-2 accent-violet-600'
                    type="radio"
                    name="payment_method"
                    value="cc"
                    onChange={handle_input_change}
                    checked={payment_method === "cc"}
                  />
                  CC
                </label>
              </div>


              <button type="submit" className='bg-violet-600 px-6 py-4 rounded-xl font-bold'>Save</button>
          </form>
        </div>
      </div>
    </main>
  )
}