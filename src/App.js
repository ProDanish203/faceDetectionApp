import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { NewPost } from './Components/NewPost';

function App() {

  const [file, setfile] = useState();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState();
  const [submit, setSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(caption.length <= 0){
      alert("Add Caption Please")
    }
    else if(!file){
      alert("Add a picture please");
    }
    else{
      setSubmit(true);
    }

  }

  useEffect(() => {

    const getImage = () => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
  
        setImage({
          url: img.src,
          // width: img.width,
          // height: img.height,
          width: 450,
          height: 420,
        })
      }
    }

    if(file && submit) getImage();
  }, [file, submit])

  console.log(image);

  return (
    <>
    <Header/>
    <div className='p-3 mb-5 max-w-[1000px] mx-auto min-h-[80vh]'>
    {image ? <NewPost image={image} caption={caption}/>  
    : (

      <form onSubmit={handleSubmit} className=''>
        <div className='flex flex-wrap gap-2 min-w-[300px] items-center justify-center'>

        <img src="https://images.unsplash.com/photo-1640951613773-54706e06851d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5vbnltb3VzJTIwYXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="" 
        className='sm:w-[50px] sm:h-[50px] w-[30px] h-[30px] rounded-full'
        />

        <input 
        type="text"
        placeholder='Whats on your mind...'  
        className='border-black border-2 py-1.5 px-2 outline-none rounded-md max-w-[250px] '
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        />

        <label htmlFor="file">
            <i className='fas fa-image sm:text-4xl text-2xl cursor-pointer'></i>
          </label>
          <input 
          id="file" 
          type="file" 
          style={{display: "none"}}
          onChange={(e) => setfile(e.target.files[0])}
          />

        </div>

        <div className='flex items-center justify-center my-3'>
          <button className='cursor-pointer w-full max-w-[320px] bg-purple-500 rounded-md shadow-2xl px-4 py-2 text-white'
          type='submit'
          >Add Post</button>
        </div>
      </form>
    )}
    
    </div>

    <Footer/>
    </>
  );
}

export default App;
