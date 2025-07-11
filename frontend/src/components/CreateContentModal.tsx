import { useRef, useState } from "react";
import { Button } from "./Buttons";
import { CrossIcon } from "./CrossIcon";
import { Input } from "./Input";
import axios from "axios";
import BACKEND_URL from "../config";


enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter"
}
export const CreateContentModal = ({open, onClose} : any) => {
  // @ts-ignore
  const titleRef = useRef<HTMLInputElement>()
  // @ts-ignore
  const linkRef = useRef<HTMLInputElement>()
  const [type,setType] = useState(ContentType.Youtube)
 

  async function addContent(){
    const title = titleRef.current?.value
    const link = linkRef.current?.value

    await axios.post(`${BACKEND_URL}/api/v1/brain/content` , {
      link,
      title,
      type
    } ,{
      headers:{
        "Authorization":localStorage.getItem("token")
      }
    })

    onClose()
  }
  return (
    <div>
    {open &&  <div>
    <div className="w-screen h-screen bg-black opacity-60 fixed top-0 left-0 flex justify-center"> </div>
    <div className="w-screen h-screen  fixed top-0 left-0 flex justify-center">
      <div className="flex flex-col justify-center ">
            <span className="bg-white opacity-100  rounded p-4">
                <div className="flex justify-end cursor-pointer">
                    <div onClick={onClose}>
                 <CrossIcon/>
                 </div>
                   </div>

                     <div>
                            <Input reference={titleRef} placeholder={"Title"}/>
                            <Input reference={linkRef} placeholder={"Link"}/>
                     </div>
                     <div>
                      <h1>Types</h1>
                      <div className="flex gap-2 p-4 justify-center pb-2">
                      <Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} 
                      onClick={() => setType(ContentType.Youtube)}></Button>
                      <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"}
                       onClick={() => setType(ContentType.Twitter)}></Button>
                       </div>
                     </div>
                  <div className="flex justify-center">  
                    <Button onClick={addContent} variant="primary" text="Submit"/>
                    </div> 
            </span>
        </div>
    </div>

    


  </div>   }
    </div>
  );
};
