
// import { createContext, useContext, useState, useEffect } from "react";
// import { authService } from "../jsx-services/api";

// const AuthContext = createContext(null);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // ✅ Check & Subscribe to Auth State
//   useEffect(() => {
//     checkUser();

//     const { data: authListener } = authService.onAuthStateChange(async (event, session) => {
//       if (session?.user) {
//         setUser(session.user);
//       } else {
//         setUser(null);
//       }
//       setLoading(false);
//     });

//     return () => {
//       authListener?.subscription?.unsubscribe();
//     };
//   }, []);

//   // ✅ Fetch Current User
//   const checkUser = async () => {
//     try {
//       const currentUser = await authService.getCurrentUser();
//       setUser(currentUser);
//     } catch (err) {
//       console.error("Error checking user:", err);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Sign In
//   const signIn = async (email, password) => {
//     try {
//       setError(null);
//       const { user } = await authService.signIn(email, password);
//       setUser(user);
//       return user;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     }
//   };

//   // ✅ Sign Up
//   const signUp = async (email, password, userData) => {
//     try {
//       setError(null);
//       const { user } = await authService.signUp(email, password, userData);
//       setUser(user);
//       return user;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     }
//   };

//   // ✅ Sign Out
//   const signOut = async () => {
//     try {
//       setError(null);
//       await authService.signOut();
//       setUser(null);
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     }
//   };

//   const value = {
//     user,
//     loading,
//     error,
//     signIn,
//     signUp,
//     signOut,
//   };

//   // ✅ Responsive-safe wrapper added
//   return (
//     <AuthContext.Provider value={value}>
//       <div className="min-h-screen w-full overflow-x-hidden bg-transparent">
//         {children}
//       </div>
//     </AuthContext.Provider>
//   );
// };


import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../jsx-services/api";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Initial User Check & Auth Subscription
  useEffect(() => {
    checkUser();

    const { data: authListener } = authService.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe?.();
    };
  }, []);

  // 🔹 Fetch Current User (if exists)
  const checkUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      console.error("Auth check failed:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Sign In
  const signIn = async (email, password) => {
    try {
      setError(null);
      const { user } = await authService.signIn(email, password);
      setUser(user);
      return user;
    } catch (err) {
      setError(err.message || "Failed to sign in");
      throw err;
    }
  };

  // 🔹 Sign Up
  const signUp = async (email, password, userData = {}) => {
    try {
      setError(null);
      const { user } = await authService.signUp(email, password, userData);
      setUser(user);
      return user;
    } catch (err) {
      setError(err.message || "Failed to sign up");
      throw err;
    }
  };

  // 🔹 Sign Out
  const signOut = async () => {
    try {
      setError(null);
      await authService.signOut();
      setUser(null);
    } catch (err) {
      setError(err.message || "Failed to sign out");
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
  };

  // 🔹 Safe wrapper for layout stability
  return (
    <AuthContext.Provider value={value}>
      <div className="min-vh-100 w-100 overflow-x-hidden bg-transparent">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : (
          children
        )}
      </div>
    </AuthContext.Provider>
  );
};
