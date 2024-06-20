import login from '../../assets/login.jpg'
import LoginForm from "./_component/LoginForm"

const Login = () => {
  return (
    <div className='h-screen'>
        <div className="relative max-w-[1880px] max-h-[900px] h-full mx-auto flex">
            <div className="md:hidden absolute w-full top-8 z-10">
                <h1 className="oswald text-5xl text-center text-white">Auto Shop</h1>
            </div>
            <div className='absolute sm:px-8 flex flex-col justify-center md:relative rounded-t-3xl md:rounded-t-none px-4 pb-4 pt-4 z-50 w-full md:w-[50%] md:h-full md:px-16 bg-white bottom-0 right-0 left-0'>
                <h1 className="hidden absolute top-8 oswald text-5xl md:block mt-8">Auto Shop</h1>
                <div className="flex flex-col gap-4 md:mt-16">
                    <h2 className="text-3xl font-bold">Login</h2>
                    <LoginForm />
                </div>
            </div>
            <div className={`bg-cover bg-center w-full hero md:w-[50%] h-full`} style={{backgroundImage:`url(${login})`}}>
                <div className="overlay w-full h-full bg-black opacity-50 md:hidden"></div>
            </div>
        </div>
    </div>
  )
}

export default Login
