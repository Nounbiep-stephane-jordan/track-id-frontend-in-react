import Webcam from "react-webcam";
import { useCallback, useRef,useState } from "react"; 
import axios from "axios"
const CustomWebcam = () => {
     const webcamRef = useRef(null);
     const [imgData, setImgData] = useState(null); 

     const capture = useCallback(() => {
          const imageSrc = webcamRef.current.getScreenshot();
          setImgData(imageSrc);
          console.log(imageSrc,"kkkkkk")
          sendImageForProcessing(imageSrc)
        }, [webcamRef]);

        const retake = () => {
          setImgData(null);
        };

    const sendImageForProcessing = (img) => {
      let url = `http://localhost:4000/process_image`
      let data = {data:img}
      axios.post(url,data)
      .then((result) => {console.log(result,"result in sen img")})
      .catch((err) => console.log(err,"err in send img"))
    }


 
 

  return (
     <div className="">
     {imgData ? (
       <img src={imgData} alt="webcam"  width={500} height={200} />
     ) : (
       <Webcam height={500} width={500} ref={webcamRef} screenshotFormat={"image/png"} screenshotQuality={1}/>
     )}
     <div className="mt">
       {imgData ? (
         <button onClick={retake} className="green-btn">Retake photo</button>
       ) : (
         <button onClick={capture} className="green-btn">Capture photo</button>
       )}
     </div>
   </div>
  );
};

export default CustomWebcam;






















 

 