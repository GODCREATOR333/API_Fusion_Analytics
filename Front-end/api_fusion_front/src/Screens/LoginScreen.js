import React from 'react'
import "./loginscreenstyles.css"
import { useTypewriter } from 'react-simple-typewriter';


function LoginScreen() {

    const [text] = useTypewriter({
        words: [' call public Apis', ' compare data betweeb apis', ' get insights', ' or just have fun'],
        loop: {},
    });


    return (
        <div className='loginbg'>

            <div className='leftside'>


                <div className='header'>
                    <img width="64" height="64" src="" alt="logo" />
                    <h1>API_Fusion</h1>
                </div>

                <div className='hero_content' >
                    <h2 className='h2'> What can you <span className='h2_child'> Do ? </span></h2>
                    <h4>well, you can
                        <span style={{ fontWeight: '400' }}>
                            {text}
                        </span>
                    </h4>
                </div>
            </div>


            <div className='rightside'>
                <h1>Get Started </h1>
                <div className='login_buttons'>
                    <button className='login_btn'>Login with Google <img className='google_icon' src='https://img.icons8.com/ios-filled/50/FFFFFF/google-logo.png'
                        alt='google_icon' /></button>
                    <button className='login_btn'>Sign Up</button>
                </div>
            </div>


        </div>
    )
}

export default LoginScreen