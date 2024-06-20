import Image from 'next/image'

export default function Signin() {
   

    return (
        <div className="container">
      <div className="row">
        {/* Login Form */}
        <div className="space-mb-mobile-only--50 col-lg-6">
          <div className="lezada-form login-form">
            <form>
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title--login text-center space-mb--50">
                    <h2 className="space-mb--20">Login</h2>
                    <p>Great to have you back!</p>
                  </div>
                </div>
                <div className="space-mb--60 col-lg-12">
                  <input
                    type="text"
                    placeholder="Username or email address"
                    required
                  />
                </div>
                <div className="space-mb--60 col-lg-12">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="space-mb--30 col-lg-12">
                  <button
                    type="submit"
                    className="lezada-button lezada-button--medium"
                  >
                    login
                  </button>
                </div>
                
                <a href="/signup" className="reset-pass-link">
                    Create your account
                  </a>
              </div>
            </form>
          </div>
        </div>

       
      </div>
    </div>
    )
}
