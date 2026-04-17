import React,{useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

function UploadAssignment(){

const {courseId} = useParams();
const [file,setFile] = useState(null);

const student = JSON.parse(localStorage.getItem("user"));

const upload = async ()=>{

const formData = new FormData();
formData.append("file",file);
formData.append("studentId",student._id);
formData.append("courseId",courseId);

await axios.post("http://localhost:5000/api/submissions/upload",formData);

alert("Uploaded ✅");
};

return(
<div style={{padding:"20px"}}>

<h2>📤 Upload Assignment</h2>

<input type="file" onChange={e=>setFile(e.target.files[0])}/>

<button onClick={upload}>Upload</button>

</div>
);
}

export default UploadAssignment;