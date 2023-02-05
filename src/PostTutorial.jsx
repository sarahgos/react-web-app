import Button from "./ButtonSquare";
import { auth, addTutorialDoc } from './utils/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import InputField from './InputField';
import './PostArticle.css';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "./utils/firebase";
import { v4 } from "uuid";
import './PostTutorial.css';

function PostTutorial() {

    const [post, setPost] = useState({
        title:'',
        description:'',
        tags:'',
    })

    const {title, description, tags} = post;
    const [user] = useAuthState(auth);
    const [errorMsg, setErrorMsg] = useState(0);
    const navigate = useNavigate();
    const [videoUpload, setVideoUpload] = useState(null);
    const [videoUrls, setVideoUrls] = useState([]);
    const [videoId, setVideoId] = useState('');
    const [videoUploaded, setVideoUploaded] = useState();
    const [pleaseWait, setPleaseWait] = useState();
    const videosListRef = ref(storage);

    // Upload video file to storage.
    const uploadFile = () => {
      
      if (videoUpload === null) return;

      setPleaseWait(true);

      var id = videoUpload.name + v4();
      setVideoId(id);

      const videoRef = ref(storage, id);
      uploadBytes(videoRef, videoUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setVideoUrls((prev) => [...prev, url])
          setPleaseWait(false);
          setVideoUploaded(true);
        });
      });
    };
  
    useEffect(() => {
      listAll(videosListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setVideoUrls((prev) => [...prev, url]);
          });
        });
      });
    }, []);

    // Set input values.
    const handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name

        setPost ((prevalue) => {
        if (name === 'title')
            return {
                title: value,
                description: prevalue.description,
                tags: prevalue.tags
            }
        else if (name === 'description')
            return {
                title: prevalue.title,
                description: value,
                tags: prevalue.tags
            }
        else if (name === 'tags')
            return {
                title: prevalue.title,
                description: prevalue.description,
                tags: value
            }
        })
    }

    // Post question to db.
    const postArticle = async() => {

        const result = await addTutorialDoc(user, title, description, tags, videoId);

        if (result === undefined)
        {
            setErrorMsg(true);
        }
        else {
            navigate('/');   
        }
    }

    const pullVideoId = (value) => {
       setPost ((prevalue) => {
        return {
            title: prevalue.title,
            description: prevalue.description,
            tags: prevalue.tags,
            videoId: value
        }
       })
    }

    return (
        <div className="article-outer-div">
            <h1>Post a Tutorial</h1>
            <div className="article-div">

                <label className="article-label" htmlFor='title'>Title*</label>
                <InputField 
                    name='title'
                    type='text'
                    placeholder='Enter a descriptive title...'
                    onChange={handleChange}
                ></InputField>

                <br></br>

                <div>
                    <label className="article-label" htmlFor='description'>Description*</label>
                    <InputField 
                        name='description'
                        placeholder='Enter a description of your tutorial...'
                        style={{height:"100px", width:"600px"}}
                        onChange={handleChange}
                    ></InputField>
                </div>

                <br></br>
                
                <label className="article-label" htmlFor='tags'>Tags*</label>
                <InputField 
                    name='tags'
                    placeholder='Please add up to 3 tags to describe what your tutorial is about eg., Java...'
                    onChange={handleChange}
                ></InputField>

                
                <br></br>
                <br></br>

                <div className="add-video">
                    <p className="article-label">Add your tutorial video*</p>
                    <div >
                    <input
                        className='post-tut-button'
                        type="file"
                        onChange={(event) => {
                        setVideoUpload(event.target.files[0]);
                        }}
                    />
                    <br></br>
                    <button className='post-tut-button' onClick={() => { pullVideoId(); uploadFile();  }}> Upload Video</button>

                    </div>
                </div>

                <br></br>
                <div>
                    {errorMsg? <h4 className='error-msg'>Please enter all fields</h4>: <h4></h4>}
                    {pleaseWait? <h4 className='error-msg'>Uploading image, please wait...</h4>: <h4></h4>}
                    {videoUploaded? <h4 className='error-msg'>Image successfully uploaded!</h4>: <h4></h4>}
                </div>
                 <br></br>
                
                <Button type='submit' color='teal' size='large' text='Post' event={postArticle}></Button>
                </div>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
        </div>
    )
}

export default PostTutorial;