import { useDropzone } from "react-dropzone";
import {useMemo, useState, useEffect, useContext} from "react"
import { Button, Card, Container, Input, Spacer } from "@nextui-org/react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config";
import { data } from "../firebase";
import { LoginContext } from "../../context/loginContext";
import { GifContextMine } from "../../context/GifContext";
import { toast } from "react-toastify";

export const Upload = ({onUpload}) => {
  const { state } = useContext(LoginContext)
  const {addUser} = useContext(GifContextMine)
  const [gifImage, setgifImage] = useState("")
  const [url, setUrl] = useState("")
  const [files, setFiles] = useState([]);
  const [categorySelected, setcategorySelected] = useState("")
  const [title, setTitle] = useState("")
  const [buttonUploaded, setbuttonUploaded] = useState("Upload GIF")
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: { 'image/gif': [] },
    maxFiles: 1,
    maxSize: 26214400,
    onDropAccepted: (acceptedFiles) => {
    
      setgifImage(acceptedFiles[0])
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    }
  });
  const handleChangeUrl = (event) => {
    setUrl(event.target.value)
  }

  const HandleClickButton = async () => {
    if (gifImage) {
      if (gifImage.name) {
        setbuttonUploaded("Uploading...")
        const fetchedgif = await uploadGif(gifImage.name, gifImage)
        await data(title, categorySelected, state.user, fetchedgif)
        const infoUser = {
          author: state.user,
          image: fetchedgif,
          select: categorySelected,
          title: title
        }
        addUser(infoUser)
        // empty all
        setgifImage("")
        setUrl("")
        setTitle("")
        setcategorySelected("")
        setFiles([])
        onUpload()
        setbuttonUploaded("Upload GIF")
        toast.success("Gif uploaded successfully")
      } else {
        await data(title, categorySelected, state.user, gifImage)
        const infoUser = {
          author: state.user,
          image: gifImage,
          select: categorySelected,
          title: title
        }
        addUser(infoUser)
        // empty all
        setgifImage("")
        setUrl("")
        setTitle("")
        setcategorySelected("")
        setFiles([])
        onUpload()
        toast.success("Gif uploaded successfully")
      }
    }

  }

  const uploadGif = async (name, file) => {
    const storageRef = ref(storage, name);
    await uploadBytes(storageRef, file);
    var url = await getDownloadURL(storageRef);
    return url;
   }
  useEffect(() => {
    if (url) {
      if(url.includes("giphy.com/media")){
        setgifImage(url)
      }
    }
  }, [url])
  
  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  return (
    <>
      {!files || !gifImage ? (
        <div>
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
              <p>Drag and Drop Gif Here</p>
      </div>
        </div>
        <Spacer 
        y={2}
        />
      <Input
        label="Put the Url of the Gif"
        placeholder="Url"
        onChange={handleChangeUrl}
        value={url}
        />
        </div>
      ) :(
          <div className="container">
            <Container>
              <Card>
                
        <Card.Image
          src={files[0] ? files[0].preview : gifImage}
          width="100%"
                  height={140}
            />
                <Input
                  label="Title of the gif"
                  placeholder="Title"
                  onChange={(event) => setTitle(event.target.value)}
                  value={title}
                />
                <Spacer
                  y={1}
                />
                <select style={{
                  color: "white",
                  backgroundColor: "transparent",
                  borderRadius: "5px",
                  border: "none",
                }}
                  onChange={(e) => {
                    setcategorySelected(e.target.value)
                  }}
                >
                  <option value="" style={{
                 color: "white",
                      backgroundColor: "black",
                  }}>Select a category</option>
                  {tagsGifs.map((tag, index) => (
                    <option key={index} value={tag} style={{
                      color: "white",
                      backgroundColor: "black",
                    }}>
                      {tag}
                    </option>
                  ))}
                </select>
                <Spacer
                  y={2}
                />
                <Button
                  disabled={!title || !categorySelected || buttonUploaded === "Uploading..."}
                  onClick={HandleClickButton}
                >
              {buttonUploaded}
                </Button>
              
        </Card>
            </Container>
        </div>
      )
      }
    </>
  )
}



const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};


const tagsGifs = [
  "game",
  "manga",
  "anime",
  "cartoon",
  "real",
  "movie",
  "tv",
  "comic",

]