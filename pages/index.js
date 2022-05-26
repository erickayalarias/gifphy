import styles from "../styles/Home.module.css";
import {
    Button,
    Card,
    Grid,
    Input,
    Modal,
    Spacer,
    Text,
} from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LoginContext } from "../context/loginContext";

import { getDatabase, signOutuser } from "../firebase/firebase";
import { CardGif } from "../firebase/components/CardGif";
import { Upload } from "../firebase/components/Upload";
import { GifContextMine } from "../context/GifContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { ToastContainer } from "react-toastify";

export default function Home() {
    const [searchBar, setsearchBar] = useState("");
    const router = useRouter();
    const { state } = useContext(LoginContext);
    const [userLogged, setuserLogged] = useState(false);
    const { gifData } = useContext(GifContextMine);
    const [visible, setVisible] = useState(false);
    const [loggedorNot, setloggedorNot] = useState("Login");
    const [gifdataState, setgifdataState] = useState(gifData.gif);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setuserLogged(true);
                setloggedorNot("Logout");
            } else {
                setuserLogged(false);
                setloggedorNot("Login");
            }
        });
    }, []);
    useEffect(() => {
        if (gifData) {
            setgifdataState(gifData.gif);
        }
    }, [gifData]);

    const logOut = () => {
        if (userLogged) {
            signOutuser();
        } else {
            router.push("/login");
        }
    };
    const handleSearchBar = (e) => {
        setsearchBar(e.target.value);
        if (e.target.value === "") {
            setgifdataState(gifData.gif);
        }
        if (e.target.value !== "" ) {
            console.log(gifData.gif)
            const newGifData = gifData.gif.filter((gif) => {
                return gif.title.toLowerCase().includes(e.target.value.toLowerCase());
            });
            if (newGifData.length > 0) {
                setgifdataState(newGifData);
            }
            const newGifData2 = gifData.gif.filter((gif) => {
                return gif.select.toLowerCase().includes(e.target.value.toLowerCase());
            });
            if (newGifData2.length > 0) {
                setgifdataState(newGifData2);
            }
        }
    };

    return (
        <>
    
            <div className={styles.container}>
                <navbar
                    style={{
                        padding: "10px",
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Button
                        onClick={() => setVisible(true)}
                        disabled={!userLogged}
                    >
                        Upload
                    </Button>
                    <Text>
                        {state.isLoggedIn ? `Welcome ${state.email}` : "Login"}
                    </Text>
                    <Spacer y={1} />
                    <Input
                        type="text"
                        placeholder="Search"
                        value={searchBar}
                        onChange={handleSearchBar}
                    />
                    <Button onClick={logOut}>{loggedorNot}</Button>
                </navbar>
                <Modal open={visible} onClose={() => setVisible(false)}>
                    <Modal.Header>
                        <Text size={18}>
                            Upload your
                            <Text b size={18} css={{ marginLeft: "10px" }}>
                                GIF
                            </Text>
                        </Text>
                    </Modal.Header>
                    <Modal.Body>
                        <Upload onUpload={() => setVisible(false)} />
                    </Modal.Body>
                </Modal>
                <Grid.Container gap={2} justify="flex-start">
                    {gifData &&
                        gifdataState.map((gif) => {
                            return (
                                <CardGif
                                    key={gif.id || gif.title}
                                    author={gif.author}
                                    image={gif.image}
                                    select={gif.select}
                                    title={gif.title}
                                />
                            );
                        })}
                </Grid.Container>
            </div>
        </>
    );
}
