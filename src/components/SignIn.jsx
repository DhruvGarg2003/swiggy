import { signInWithPopup, signInWithRedirect, signOut } from 'firebase/auth'
import React from 'react'
import { auth, provider } from '../config/firebaseAuth'
import { useDispatch, useSelector } from 'react-redux';
import { addUserData, removeUserData } from '../Utils/authSlice';
import { useNavigate } from 'react-router-dom';
import { toggleLogin } from '../Utils/ToggleSlice';

function SignIn() {

    const dispatch = useDispatch();   
    const navigate = useNavigate();
    const userData = useSelector((state)=>state.authSlice.userData);
    async function handleAuth(){
       let data = await signInWithPopup(auth,provider);
       const userData ={
        name : data.user.displayName,
        photo : data.user.photoURL
       }
       dispatch(addUserData(userData));
       navigate("/")
       dispatch(toggleLogin());
    }
    async function handleLogout(){
        await signOut(auth);
        dispatch(removeUserData());
        navigate("/")
        dispatch(toggleLogin());
     }
  return (
    <>
        { !userData && (
            <button onClick={handleAuth} className='w-full my-6 p-4 text-2xl bg-[#fc8019] text-white'>LogIn with Google</button>)
        }
        
        { userData && (<button onClick={handleLogout} className='w-full my-6 p-4 text-2xl bg-[#fc8019] text-white'>
            Logout
        </button>)
        }
    </>
  )
}

export default SignIn
