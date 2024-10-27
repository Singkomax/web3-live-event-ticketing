import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useAuth0 } from '@auth0/auth0-react'
import { useGetUserProfile } from './queries/auth0'
import { useOnLogin } from './queries/quicknode/functions'
import { useGetKvSet } from './queries/quicknode'
import { valueKvSetSelector } from './queries/quicknode/kv/selectors'

function App() {
  const [count, setCount] = useState(0)
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user } = useAuth0();

  const userProfile = useGetUserProfile(user?.sub ?? '', {
    enabled: !!user?.sub
  })
  const seedPhrase = useGetKvSet(userProfile.data?.user_metadata?.address ?? '', {
    select: valueKvSetSelector,
    enabled: !!userProfile.data?.user_metadata?.address
  })
  const onLoginMutation = useOnLogin()


  // this can be improved
  useEffect(() => {
    if (userProfile.data?.user_id && !userProfile.data?.user_metadata?.address) {
      onLoginMutation.mutate(userProfile.data.user_id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile.data?.user_id])
  

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {isAuthenticated && userProfile.data ? (
        <div>
          {/* <img src={user.picture} alt={user.name} /> */}
          <h2>{userProfile.data.name}</h2>
          <p>{userProfile.data.email}</p>
          <p>{userProfile.data.user_id}</p>
          <p>{JSON.stringify(userProfile.data.user_metadata)}</p>
          <p>{seedPhrase.data}</p>

          {/* <button onClick={onLoginClick}>
            Trigger QuickNode
          </button> */}

          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out
          </button>
        </div>
      ) :  (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
    </>
  )
}

export default App
