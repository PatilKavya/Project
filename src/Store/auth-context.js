import React,{ useEffect,useState} from 'react'

const AuthContext=React.createContext({
    isLoggedIn:false,
    onLogin:(email,paasword)=>{},
    onLogout:()=>{}
})

export const AuthContextProvider = (props) => {

    //const cxt=useContext(AuthContext);

    const [isLoggedIn, setIsLoggedIn] = useState(false);



useEffect(()=>{
  if(localStorage.getItem('isLoggedIn')==='1'){
    setIsLoggedIn(true);
  }
},[]);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
   localStorage.setItem('isLoggedIn','1')
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
    value={{
        isLoggedIn:isLoggedIn,
        onLogout:logoutHandler,
        onLogin:loginHandler,
    }}
    >
        {props.children}

    </AuthContext.Provider>
  )
}
export default AuthContext;