import React, {  useContext} from 'react';
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';
import {  useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';


const Login = () => {
     

    // const [invalid, setInvalid] = useState(false)

    // // если пользователь авторизован, ему здесь делать нечего
    // if (auth) {
    //     return <Navigate to="/posts" replace={true} />
    // }

   
    // // let fromPage = location.state?.from?.pathname || '/';
    // let fromPage = "/posts" ;

    // const handleSubmit = (event) => {
    //     event.preventDefault()
    //     const form = event.target
    //     const password = form.password.value
    //     // функции, которые будут выполнены в случае правильного
    //     // и неправильного ввода пароля для авторизации
    //     const success = () => navigate(fromPage, {replace: true})
    //     const failure = () => setInvalid(true)
    //     login(password, success, failure)
    // }

    // return (
    //     <div>
    //         <h1>Войдите в аккаунт</h1>
    //         <form onSubmit={handleSubmit}>
    //             <label>
    //                 Password: <input name="password" />
    //             </label>
    //             <MyButton type="submit">Login</MyButton>
    //         </form>
    //         {invalid && <p style={{color:'red'}}>Неверный пароль</p>}
    //     </div>
    // )
    const {setIsAuth} = useContext(AuthContext);
    const navigate = useNavigate()

    const login = (event) =>{
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth','true')
        const success = () => navigate('/posts', {replace: true})
        success();
    }

    return (
        <div>
            <h1>Страница для логина</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder='Введите логин' />
                <MyInput type="password" placeholder='Введите пароль'/>
                <MyButton>Войти</MyButton>
            </form>
        </div>
    );
};

export default Login;