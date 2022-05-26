import { getDatabase } from "../firebase/firebase";
import { gifReducer } from "./gifReducer";
import { createContext, useReducer, useEffect } from "react";
import { GifContextMine } from "./GifContext";
import axios from "axios";
const initialState = {
    gif:[]
}

export const GifProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gifReducer, initialState);

    const fetchAllGif = async () => {
        const gif = await getDatabase();
        const datos = [];
        gif.forEach((doc) => {
            const data = { ...doc.data(), ...{ id: doc.id } };
            datos.push(data);
        });
        const data = await axios.get("https://api.giphy.com/v1/gifs/search?api_key=GLym9agNBp8lNCQWODUF6gIUWUDJHLmk&q=happy&limit=5&offset=0&rating=g&lang=en");
        console.log(data.data.data)
        const apiData = []
        data.data.data.forEach((gif) => {
            apiData.push({
                title: gif.title,
                image: gif.images.downsized_large.url,
                select: "Giphy",
            });
        }
        );
        apiData.push(...datos);
        dispatch({
            type: "All_GIF",
            gif: apiData
        });
    }

    const addUser = (gifData) => {
        dispatch({
            type: "ADD_GIF",
            gif: gifData
        });
    }
    
    useEffect(() => {
        fetchAllGif();
    }, [])


    return (
        <GifContextMine.Provider value={{
            gifData: state,
            addUser: addUser
        }}
        >
        {children}
            </GifContextMine.Provider>
    );
    
    }