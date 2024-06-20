import Image from 'next/image'

export default function Signup() {
   

    return (
        <div className="container">
      <div className="row">
        {/* Register Form */}
        <div className="col-lg-6">
          <div className="lezada-form login-form--register">
            <form>
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title--login text-center space-mb--50">
                    <h2 className="space-mb--20">Register</h2>
                    <p>If you don’t have an account, register now!</p>
                  </div>
                </div>
                <div className="space-mb--30 col-lg-12">
                  <label htmlFor="regEmail">
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="regEmail"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="space-mb--50 col-lg-12">
                  <label htmlFor="regPassword">
                    Password <span className="required">*</span>
                  </label>
                  <input
                    type="password"
                    id="regPassword"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="text-center col-lg-12">
                  <button
                    type="submit"
                    className="lezada-button lezada-button--medium"
                  >
                    register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    )
}
