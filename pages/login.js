import { Button, Card, Container, Row, Spacer, Text } from "@nextui-org/react";
import {useState, useContext, useEffect} from "react";
import { Input } from "@nextui-org/react";
import {FcGoogle} from "react-icons/fc";
import { useRouter } from "next/router";
import { LoginContext } from "../context/loginContext";
import { loginWithGoogle, signUser } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

const Login = () => {
    const router = useRouter();
    const { state, logUser } = useContext(LoginContext);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            logUser(user.uid);
            router.push("/");
        }
    }
    );

    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    })

    const [validateEmail, setValidateEmail] = useState("");
    const [validatePassword, setValidatePassword] = useState("");


    const handleChange = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = () => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginForm.email)) {
            if (loginForm.password.length >= 6) {
                setValidateEmail("");
                setValidatePassword("");
                signUser(loginForm.email, loginForm.password);
            }else {
                setValidatePassword("Password is not valid");
            }
        } else {
            setValidateEmail("Email is not valid");
        }
    }
    return (
        <Container
            css={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <Card
                css={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    margin: "10px",
                    padding: "10px",
                    height: "500px",
                    width: "600px",
                    }}
            >
                <Container
                    css={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Text
                        h1
                        css={{
                            alignItems: "center",
                            justifyContent: "center",
                            textGradient:
                                "45deg, $purple800 -10%, $pink600 100%",
                        }}
                    >
                        Login
                    </Text>
                </Container>
                <Input
                    label="Email"
                    placeholder="Some@email.com"
                    helperText={loginForm.email && validateEmail}
                    value={loginForm.email}
                    onChange={handleChange}
                    name="email"
                />
                <Spacer y={1.6} />
                <Input.Password
                    label="Password"
                    placeholder="Password"
                        helperText={loginForm.password && validatePassword}
                    value={loginForm.password}
                    onChange={handleChange}
                    name="password"
                />
                <Spacer y={2} />
                    <Button  color="gradient" auto
                        css={{
                        fontSize: "1.2rem",
                    }}

                    disabled={!loginForm.email || !loginForm.password}
                    onClick={handleClick}
                    >
                    Login
                </Button>
                <Spacer y={1} />
                    <Button  color="gradient" auto
                        css={{
                        fontSize: "1.2rem",
                    }}
                    onClick={() => loginWithGoogle()}
                    >
                    <FcGoogle /> <Spacer x={1.2}/> Login with Google
                </Button>
                <Spacer y={1} />
                    <Button  color="gradient" auto
                        css={{
                        fontSize: "1.2rem",
                    }}
                    onClick={() => router.push("/register")}
                    >
                   Register
                </Button>

            </Card>

            </Container>

    );
};

export default Login;
