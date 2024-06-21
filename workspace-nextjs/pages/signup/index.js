import React, { useState } from 'react';
import { registerUser } from '../hooks/auth'

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    const result = await registerUser(email, password, 'customer');

    setLoading(false);

    if (result.success) {
      console.log(result)
      setSuccessMessage(result.message);
      alert('sucessfully')
    } else {
      // Registration failed: Show error message
      setError(result.message);
    }
  };


  return (
    // <div className="container">
    //   <div className="row">
    //     {/* Register Form */}
    //     <div className="col-lg-6">
    //       <div className="lezada-form login-form--register">
    //         <form onSubmit={handleSubmit}>
    //           <div className="row">
    //             <div className="col-lg-12">
    //               <div className="section-title--login text-center space-mb--50">
    //                 <h2 className="space-mb--20">Register</h2>
    //                 <p>If you don’t have an account, register now!</p>
    //               </div>
    //             </div>
    //             <div className="space-mb--30 col-lg-12">
    //               <label htmlFor="regEmail">
    //                 Email Address <span className="required">*</span>
    //               </label>
    //               <input
    //                 type="email"
    //                 id="regEmail"
    //                 placeholder="Email Address"
    //                 required
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //               />
    //             </div>
    //             <div className="space-mb--50 col-lg-12">
    //               <label htmlFor="regPassword">
    //                 Password <span className="required">*</span>
    //               </label>
    //               <input
    //                 type="password"
    //                 id="regPassword"
    //                 placeholder="Password"
    //                 required
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //               />
    //             </div>
    //             <div className="text-center col-lg-12">
    //               <button
    //                 type="submit"
    //                 className="lezada-button lezada-button--medium"
    //                 disabled={loading}
    //               >
    //                 {loading ? 'Registering...' : 'Register'}
    //               </button>
    //             </div>
    //             {error && <p className="text-danger">{error}</p>}
    //             {successMessage && <p className="text-success">{successMessage}</p>}
    //             <a href="/signin" className="reset-pass-link">
    //               If you have alreadt register! Login
    //             </a>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="bg-white w-screen font-sans text-gray-900">
      <div className="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
        <div className="mx-2 py-12 text-center md:mx-auto md:w-2/3 md:py-20">
          <h1 className="mb-4 text-3xl font-black leading-4 sm:text-5xl xl:text-6xl">Sign up</h1>
          <div className="text-lg sm:text-xl">
            <div>
              <p className="mb-4">Let's do this! Start your free trial by filling in our simple form below. You will be hearing from us soon!</p>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-2/3 mx-auto w-full pb-16 sm:max-w-screen-sm md:max-w-screen-md lg:w-1/3 lg:max-w-screen-lg xl:max-w-screen-xl">
        <form className="shadow-lg mb-4 rounded-lg border border-gray-100 py-10 px-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold" htmlFor="email">E-mail</label>
            <input
              className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
              id="email"
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold" htmlFor="password">Password</label>
            <input
              className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
              id="password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <div className="flex-1"></div>
            <button
              className="cursor-pointer rounded bg-blue-600 py-2 px-8 text-center text-lg font-bold text-white"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
          {error && <p className="text-danger mt-2">{error}</p>}
          {successMessage && <p className="text-success mt-2">{successMessage}</p>}
        </form>
        <a href="/signin" className="reset-pass-link block text-center mt-4 text-blue-500 underline">
          If you have already registered! Login
        </a>
      </div>
    </div>

  )
}
