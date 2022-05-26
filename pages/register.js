import { Button, Card, Container, Row, Spacer, Text } from "@nextui-org/react";
import { useState, useContext, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { createUser } from "../firebase/firebase";
import { useRouter } from "next/router";
import { LoginContext } from "../context/loginContext";

const Register = () => {
    const { logUser } = useContext(LoginContext);
    const [registerPage, setregisterPage] = useState({
        email: "",
        password: "",
    });

    const router = useRouter();

    const [emailValidate, setEmailValidate] = useState("");
    const [passwordValidate, setPasswordValidate] = useState("");

    const handleChange = (e) => {
        setregisterPage({
            ...registerPage,
            [e.target.name]: e.target.value,
        });
    };

    const handleClick = async () => {
        if (
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                registerPage.email
            )
        ) {
            if (registerPage.password.length >= 6) {
                setEmailValidate("");
                setPasswordValidate("");
                try {
                    const data = await createUser(
                        registerPage.email,
                        registerPage.password
                    );
                    logUser(data.user.uid);
                    router.push("/");
                } catch (error) {
                    console.log(error);
                }
            } else {
                setPasswordValidate("Password is not valid");
            }
        } else {
            setEmailValidate("Email is not valid");
        }
    };
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
                        Register
                    </Text>
                </Container>
                <Input
                    label="Email"
                    placeholder="Some@email.com"
                    helperText={registerPage.email && emailValidate}
                    value={registerPage.email}
                    onChange={handleChange}
                    name="email"
                />
                <Spacer y={1.6} />
                <Input.Password
                    label="Password"
                    placeholder="Password"
                    helperText={registerPage.password && passwordValidate}
                    value={registerPage.password}
                    onChange={handleChange}
                    name="password"
                />
                <Spacer y={2} />
                <Button
                    color="gradient"
                    auto
                    css={{
                        fontSize: "1.2rem",
                    }}
                    disabled={!registerPage.email || !registerPage.password}
                    onClick={handleClick}
                >
                    Register
                </Button>
                <Spacer y={1} />
            </Card>
        </Container>
    );
};

export default Register;
