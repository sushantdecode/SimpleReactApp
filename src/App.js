import logo from './logo.svg';
import react, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {


  const [imageUrl, setImageUrl] = useState("");
  const [response, setResponse] = useState("");


  const formData = new FormData();

  const handleChange = (event) => {
    console.log(event.target.files[0]);
    formData.append('file',event.target.files[0]);
  }


  const handleSubmit = (event) => {
    axios.post(`https://v2.convertapi.com/upload`, formData).then(res => {
      console.log(res.data);
      setResponse(res.data.FileId);
    }).catch(err => {console.log(err)});
    console.log("Posted Successfully");
  }

  const handleFetch = async () => {
      axios.get(`https://v2.convertapi.com/d/${response}`, {responseType : 'blob'}).then( function (res) {
          console.log(res);
          const imageBlob = res.data;
          const imageUrl = URL.createObjectURL(imageBlob);
          setImageUrl(imageUrl);
        }).catch(error => {console.log(error)});
  }

  return (
    <>
    <input onChange={handleChange} type = 'file' />
    <button onClick={handleSubmit}>Submit</button>
    <button onClick={handleFetch}>Fetch</button>
    <div style={{borderTop: '20px solid',borderBottom: '20px solid',borderRight: '50px solid',borderLeft: '50px solid', borderColor: 'blue' , width: '400px', overflow: 'hidden'}}><img src={imageUrl} alt="icon"  /></div>
    
    </>
  );
}

export default App;
