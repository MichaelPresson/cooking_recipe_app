import Login from '../components/Login'



export default function LoginPage({setLogged, setUser}) {
    return (
        <div>
            <Login setLogged={ setLogged } setUser={ setUser }/>
        </div>
    )
}

