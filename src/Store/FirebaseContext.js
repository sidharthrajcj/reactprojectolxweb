import { createContext, useState} from 'react';
import {app,auth,db,storage} from '../Firebase/config';

export const FirebaseContext = createContext(null);
export const AuthContext=createContext(null);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <FirebaseContext.Provider value={{app,auth,db,storage}}> 
    <AuthContext.Provider value={{user,setUser}}>
      {children}
    </AuthContext.Provider>
    </FirebaseContext.Provider>

  );
};

export default FirebaseContext;
