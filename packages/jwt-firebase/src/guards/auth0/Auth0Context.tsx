import { createContext, useEffect, useReducer } from 'react';
import { Auth0Client } from '@auth0/auth0-spa-js';

const auth0Config = {
  client_id: 'M3M4RZPdblzFf0cEXcLwWYHiHwasgG5H',
  domain: 'qprnlxvbaqmxo171.us.auth0.com',
};

// ----------------------------------------------------------------------

let auth0Client: Auth0Client;

interface InitialStateType {
  isAuthenticated: boolean;
  isInitialized?: boolean;
  user?: any | null | undefined;
}

interface ActionType {
  type: string;
  payload?: InitialStateType | any;
}

const initialState: InitialStateType = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers: any = {
  INITIALIZE: (state: InitialStateType, action: ActionType) => {
    const { isAuthenticated, user } = action.payload;

    return { ...state, isAuthenticated, isInitialized: true, user };
  },
  LOGIN: (state: InitialStateType, action: ActionType) => {
    const { user } = action.payload;

    return { ...state, isAuthenticated: true, user };
  },
  LOGOUT: (state: InitialStateType) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state: InitialStateType, action: ActionType) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

type Auth0ContextType = {
  method: 'auth0';
  isAuthenticated?: boolean;
  isInitialized?: boolean;
  signin: () => Promise<void>;
  logout: VoidFunction;
};

const AuthContext = createContext<Auth0ContextType>({
  ...initialState,
  method: 'auth0',
  signin: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

function AuthProvider({ children }: { children: React.ReactElement }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        auth0Client = new Auth0Client({
          domain: auth0Config.domain,
          clientId: auth0Config.client_id,
          authorizationParams: { redirect_uri: window.location.origin },
        });

        await auth0Client.checkSession();

        const isAuthenticated = await auth0Client.isAuthenticated();

        if (isAuthenticated) {
          const user = await auth0Client.getUser();

          dispatch({
            type: 'INITIALIZE',
            payload: { isAuthenticated, user },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: { isAuthenticated, user: null },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: { isAuthenticated: false, user: null },
        });
      }
    };

    initialize();
  }, []);

  const signin = async () => {
    await auth0Client.loginWithPopup();
    const isAuthenticated = await auth0Client.isAuthenticated();

    if (isAuthenticated) {
      const user = await auth0Client.getUser();
      dispatch({ type: 'LOGIN', payload: { user } });
    }
  };

  const logout = () => {
    auth0Client.logout();
    dispatch({ type: 'LOGOUT' });
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const resetPassword = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'auth0',
        user: {
          id: state?.user?.sub,
          photoURL: state?.user?.picture,
          email: state?.user?.email,
          displayName: 'Jaydon Frankie',
          role: 'admin',
        },
        signin,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
