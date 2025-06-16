import { useFormik } from "formik"
import { loginSchema } from "@/schema/login"
import { signIn, getSession, useSession } from "next-auth/react"
import Input from "@/components/form/Input"
import Title from "@/components/ui/Title"
import Link from "next/link"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import axios from "axios"
import { useEffect, useState } from "react"

const Login = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    const getUser = async () => {
      try {
        if (!session) return
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
        setCurrentUser(res.data?.find((user) => user.email === session?.user?.email))

        session && router.push("/profile/" + currentUser?._id)
      } catch (err) {
        console.log(err)
      }
    }
    getUser()
  }, [session, router, currentUser])

  const onSubmit = async (values, actions) => {
    const { email, password } = values;
    let options = { redirect: false, email, password };

    try {
      const res = await signIn("credentials", options);
      if(res.error) return toast.error(res.error)
      toast.success("Login Successfull")
      actions.resetForm();
      // router.push("/profile/" + currentUser?._id)
    } catch (err) {
      console.log(res.error);
    }
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema: loginSchema
  })

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Your Email",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password
    },
  ]

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center my-20 mx-auto md:w-1/2 w-full">
        <Title className="text-[40px] mb-6">Login</Title>
        <form className="flex flex-col gap-y-2 w-full" onSubmit={handleSubmit}>
          {
            inputs.map((input) => (
              <Input
                key={input.id}
                {...input}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            ))
          }
          <div className="flex flex-col w-full gap-y-3 mt-3">
            <button type="submit" className="btn-primary">LOGIN</button>
            <button type="button" onClick={() => signIn("github")} className="btn-primary !bg-secondary">
              <i className="fab fa-github mr-2"></i>
              GITHUB
            </button>
            <Link href="/auth/register">
              <span className="text-sm underline cursor-pointer text-secondary hover:text-primary transition-all">Do you no have a account?</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
  const user = res.data?.find((user) => user.email === session?.user?.email)
  console.log(user)
  if (session && user) {
    return {
      redirect: {
        destination: "/profile/" + user._id,
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default Login