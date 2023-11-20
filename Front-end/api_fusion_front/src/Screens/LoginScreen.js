import React from 'react'
import "./loginscreenstyles.css"




function LoginScreen() {


    return (
        <div className='loginbg'>

            <div className='leftside'>

                <div className='header'>
                    <img className='logo' src="https://altcoinsbox.com/wp-content/uploads/2022/10/ethereum-logo-.webp" alt="logo" />
                    <h1>API_Fusion</h1>
                </div>

                <div className='main_hero'>

                </div>


            </div>


            <div className='rightside'>
                <h1>Get Started </h1>
                <div className='login_buttons'>
                    <button className='login_btn'>Login with Google <img className='google_icon' src='https://img.icons8.com/ios-filled/50/FFFFFF/google-logo.png'
                        alt='google_icon' /></button>
                    <button className='login_btn'>Sign Up</button>
                    <img className='next_img' src='https://img.icons8.com/ios/50/FFFFFF/circled-chevron-right--v1.png' alt='next_img' />
                </div>
            </div>


        </div>
    )
}

export default LoginScreen