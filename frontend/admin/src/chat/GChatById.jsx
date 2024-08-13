

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faFaceSmile, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';

import { useAppContext } from '../context/AppContext';
import data2 from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import {BsCheck2All} from "react-icons/bs"
import { BsCheck } from 'react-icons/bs';
import Chatbar from './Chatbar';


const GChatById = () => {
  const { socket , location } = useAppContext();
  const { id } = useParams();
  const [groupData, setGroupData] = useState([]);
  const [loggedUser, setLoggedUser] = useState([]);
  const [data, setData] = useState([]);
  const [isSearchData, setIsSearchData] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [display, setDisplay] = useState(false);
  const [display2, setDisplay2] = useState(false);
  const [recieveMessages, setRecieveMessages] = useState([]);
  const [recieveDbMessages, setRecieveDbMessages] = useState([]);
  const [text, setText] = useState('');
  const messageEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isSeen , setIsSeen] = useState(false);  
  console.log("isSeen" , isSeen);

  const scrollToBottom = () => {

   

    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleIconClick = () => {
    fileInputRef.current.click();
  };
  const activeId = localStorage.getItem("id");
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeId) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:5000/admin/adminInfo/`, {
          headers: { Authorization: `${activeId}` },
        })
        .then((res) => {
          setLoggedUser(res.data);
        })
        .catch((err) => {
          console.error(err);
          if (err.response && err.response.status === 404) {
            navigate("/login");
          }
        });
    }
  }, [activeId, navigate]);

  
  useEffect(() => {
    console.log("Client ID: ", id); // Check if the ID is valid
    axios.get(`http://localhost:5000/chat/getChatById/${id}`)
      .then((res) => {
        // if (
        //   res?.data && 
        //   res?.data?.groupUsers &&
        //   Array.isArray(res?.data?.groupUsers) && 
        //   (res?.data?.groupUsers?.some(user => user?.id === loggedUser?.id) || 
        //   res?.data?.creator?.id === loggedUser?.id)
        // ) {
          setGroupData(res.data);
        // } else {
        //   setGroupData([]);
        // //   navigate("/");
        // }
    
        
        
      })
      .catch((err) => {
        console.log("Error getting Groups//////:", err);
      });
  }, [id]);
  

  

useEffect(() => {
    axios.get(`http://localhost:5000/chat/getChattingById/${id}`)
    .then((res) => {
    //   setRecieveDbMessages(prevMessages => [...prevMessages, ...]);
    setRecieveDbMessages(prevMessages => [...prevMessages, ...res.data.data]);


      console.log("hellloworld:", res.data.data);
    })
    .catch((err) => {
      console.log("Error getting Groups:", err);
    });
},[id])


  

  // socket.on('recieveSeenMessage', (data ) => {
  //   console.log('Seen Messages:'  ,data );
  //   if(data && data.status === 1){
  //     setIsSeen(true)
  //   }else{
  //     setIsSeen(false)
  //   }
  // });

useEffect(() => {
    scrollToBottom();
} , [recieveDbMessages])
  const [isTyping , setIsTyping] = useState(false);
  useEffect(() => {
    // alert(id)
    // alert(isSeen)
    
    scrollToBottom();
    
  },[id])
  scrollToBottom();
  

  
  const handleSendText = (e) => {
    setText(e.target.value);
    
        if (e.target.value.length !== 0 || text.length !== 0) {
        scrollToBottom();
        const messageData = { fromId: activeId, toId: id, status: 1 };
        socket.emit('typing', messageData, (response) => {
        if (response && response.status === 'ok') {
        // console.log(response.msg);
        } else {
        console.error('Message delivery failed or no response from server');
        }
        });

        }else{
        const messageData = { fromId: activeId, toId: id, status: 0 };

        socket.emit('typing', messageData, (response) => {
        if (response && response.status === 'ok') {
        console.log(response.msg);
        } else {
        console.error('Message delivery failed or no response from server');
        }
        });
        }

        return () => {
        const messageData = { fromId: activeId, toId: id, status: 0 };

        socket.emit('typing', messageData, (response) => {
        if (response && response.status === 'ok') {
            console.log(response.msg);
        } else {
            console.error('Message delivery failed or no response from server');
        }
        });
        };
  };



  console.log("isTyping" , isTyping);
  
useEffect(()=>{
  socket.on('receiveTyping', (res) => {
    console.log('Typing Response:', res);
    if(res.status === 1 && res.fromId === id){
      setIsTyping(true)

    }
    if(res.status === 0 ){
      setIsTyping(false)
    }
    scrollToBottom();
  });
},[id])
  
  const [activeUsers, setActiveUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
// console.log("activeUsers: " , activeUsers);
//   socket.on('allusers', (res) => {
//     console.log('allusers:', res);
//     setActiveUsers(res.id);
//     const filter = res.filter((user) => Number(user.paramsId) === Number(id));
//     console.log('filter:', filter);
//     if (filter.length > 0) {
//       setActiveStatus(true);
//     } else {
//       setActiveStatus(false);
//     }
     
   
//     }
// );

socket.on('allusers', (res) => {
  // console.log('allusers:', res);

  // Ensure `res` is an array
  if (Array.isArray(res)) {
      // Extract and set active user IDs
      setActiveUsers(res);
      
      // Convert `id` to a number for comparison
      const numericId = Number(id);

      // Filter users based on the matching `paramsId`
      const filter = res.filter((user) => Number(user.id) === numericId);
      // console.log('filter:', filter);
      
      // Update active status based on filter results
      if (filter.length > 0) {
          setActiveStatus(true);
      } else {
          setActiveStatus(false);
      }
  } else {
      console.error('Expected an array but received:', res);
  }
});


 



  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchValue(searchTerm);
    if (searchTerm.length > 0) {
      setIsSearchData(true);
    } else {
      setData([]);
      setIsSearchData(false);
      return;
    }
    axios
      .get(`http://localhost:5000/admin/search/${searchTerm}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("Error searching providers:", err);
      });
  };

  const handleChatUser = (id) => {
    navigate(`/chat/${id}`);
    setData([]);
    setSearchValue("");
    setDisplay(false);
    setIsSearchData(false);
  };

 



  // file upload
  const [file, setFile] = useState(null);
 
    // const convertToBase64 = (e) => {
    //   let reader = new FileReader();
    //   reader.readAsDataURL(e.target.files[0]);

    //   reader.onload = () => {

    //     setFile(reader.result);
    //     console.log(reader.result);
    //   };

    //   reader.onerror = (error) => {
    //     console.log("Error: ", error);
    //   };
    // }
  const [fileVedio, setFileVedio] = useState(null);
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        setFile(reader.result);
        resolve(reader.result);
        setFileVedio(reader.result);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };


  const convertToBlob = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const blob = new Blob([reader.result], { type: file.type });
        resolve(blob);
      };
  
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };
  
  const [fileName , setFileName]  = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // console.log("File", file);
      // alert(file.name)
      setFileName(file.name);
      
  
      // Provide feedback based on file type and size
      if (file.size > 20 * 1024 * 1024) { // 25 MB size limit
        alert("File is too large. Please upload a smaller file.");
        return;
      }
      
      // Check file type and handle accordingly
      const fileType = file.type;
      if (fileType.startsWith('image/')) {
        try {
          const blob = await convertToBlob(file);
          await convertToBase64(blob);
          console.log("Image Blob:", blob);
        } catch (error) {
          console.error("Error converting image to Blob:", error);
        }
      } else if (fileType.startsWith('video/')) {
        // Handle video files
        console.log("Video file selected:", file);
        try {
          const blob = await convertToBlob(file);
          await convertToBase64(blob);
          console.log("Video Blob:", blob);
        } catch (error) {
          console.error("Error converting video to Blob:", error);
        }
      } else if (fileType.startsWith('application/')) {
        // Handle document files
        console.log("Document file selected:", file);
        try {
          const blob = await convertToBlob(file);
          await convertToBase64(blob);
          console.log("Document Blob:", blob);
        } catch (error) {
          console.error("Error converting document to Blob:", error);
        }
      } else {
        alert("Unsupported file type. Please upload an image, video, or document.");
        return
      }
    }
  };
  
  
  // const handleFileUpload = (event) => {
  //   if(event.target.files[0]){
  //     console.log("Files",event.target.files[0]);
      
  //   }
  //   return
  // };
  
  

  const [filepath , setFilePath] = useState([]);
  
  // const handleSendFile = async (e) => {
  //   e.preventDefault();
  //   if (file) {
  //     try {
  //       // Convert file to Blob
  //       // const blob = await convertToBlob(file);
  //       const fileData = {
  //         fromId: activeId,
  //         // ISO 8601 formatted timestamp
  //         toId: id,
  //         status: 0
  //       };
        
  
  //       // Check if socket is connected before sending
  //       if (socket.connected) {
  //         socket.emit('sendFile', fileData, (response) => {
  //           if (response.status === 'ok') {
  //             console.log('File sent successfully');
  //           } else {
  //             console.error('File delivery failed', response.error);
  //           }
  //         });
  //       } else {
  //         console.error('Socket is not connected');
  //       }
  
  //       setFile(null); // Reset file input after sending
  //     } catch (error) {
  //       console.error('Error converting file to Blob:', error);
  //     }
  //   } else {
  //     console.error('No file selected');
  //   }
  // };
  

  const handleSendMessage  = (e) => {
    e.preventDefault();
    
    if (text.trim() || file) {
      console.log("Last File:  ",file);
      const messageData = {
        fromId: activeId,
        pfpImage: loggedUser?.pfpImage,
        toId: id,
        text,
        file: file,
        fileName: fileName,
        usersIds: [
            ...(groupData?.groupUsers?.map(user => user.id) || []),
            Number(groupData?.creator?.id)
          ]
        ,          
        time: new Date().toISOString(),
        }
        
      setText('');
      setFile(null); 
      setShowEmogi(false);
      socket.emit('sendMessageToUsers', messageData, (response) => {
        if (response.status === 'ok') {
          // console.log(response.msg);
          const notification = {
            fromId: activeId,
            usersID: [...groupData?.groupUsers?.map(user => user.id) || [], Number(groupData?.creator?.id)],
            text:`${loggedUser?.name} sent a new text in group ${groupData?.group?.groupName} `,
            time: new Date().toLocaleString(),
            route: `/groupchat/${id}`,
          };
          socket.emit('newNotification', notification, (response) => {
            if (response && response.status === 'ok') {
              console.log(response.msg);
            } else {
              console.error('Message delivery failed or no response from server');
            }
          });
        } else {
          console.error('Message delivery failed');
        }
      });

   
    }
  };
  
useEffect(() => {
  scrollToBottom();
}, [])
  useEffect(() => {
    socket.on('userMessage', (data) => {
        console.log('userMessage:', data);
        if (data.toId === id) {
            setRecieveMessages(prevMessages => [...prevMessages, data]);
        }
    });

    // Cleanup the event listener to avoid duplicates
    return () => {
        socket.off('userMessage');
    };
}, [id]);




useEffect(() => {
    socket.on('fileSaved', (data) => {
      console.log('File saved at:', data);
      setFilePath(prevFiles => [...prevFiles, data]);
    });

    return () => {
      socket.off('fileSaved');
    };
  }, []);

  const getFileType = (file) => {
    // Extract the MIME type from the base64 string
    const mimeType = file.split(';')[0].split(':')[1];
    return mimeType;
  };


  const filteredFiles = filepath.filter(data => 
    (data.fromId === id && data.toId === activeId) || (data.fromId === activeId && data.toId === id && data.fromId !== data.toId)
  );

  const [showEmogi , setShowEmogi] = useState(false);
  
  const handleShowEmogi = () => {
    setShowEmogi(!showEmogi);
  }

  const handleEmojiSelect = (emoji) => {
    console.log(emoji.native);
    setText(text + emoji.native);


  };

  function formatTimeWithAMPM(time) {
    // Create a new Date object from the provided time
    const date = new Date(time);
  
    // Extract hours, minutes, and seconds
    let hours = date.getHours();
    const minutes = date.getMinutes();
    // const seconds = date.getSeconds();
  
    // Determine AM or PM suffix
    const ampm = hours >= 12 ? ' PM' : ' AM';
  
    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
  
    // Format minutes and seconds with leading zeros if needed
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    // const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
  
    // Construct the formatted time string
    const formattedTime = `${hours}:${formattedMinutes}${ampm}`;
  
    return formattedTime;
  }
  
  useEffect(() => {
    scrollToBottom();
  }, [recieveMessages]);



  return (
    <>
  
       <div className="container-fluid" style={{  overflow:'hidden'}}>
       <div className="card p-3" style={{height:'80vh'}}>
        <div className="messenger" style={{height:'100%'}}>
        <input type="hidden" id="chat_type" defaultValue="" />
        <input type="hidden" id="chat_type_id" defaultValue="" />
      <div  className='my-chatbar2'><Chatbar /></div>
    {groupData &&  groupData.length !== 0 && (
        <>
         <div className={display === true ? "  messenger-messagingView  dynamic-display"  : "messenger-messagingView"} >
    <div className="m-header m-header-messaging viewheaderBigscreen">
        <nav className="chatify-d-flex chatify-justify-content-between chatify-align-items-center">
          <div className="chatify-d-flex chatify-justify-content-between chatify-align-items-center">
            <a href="#" className="show-listView">
              <i className="fas fa-arrow-left" />
            </a>
              <button class="navbar-toggler" onClick={() => navigate('/chat')} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i class='bx bx-arrow-back'></i>
              </button>
              
              <div className="">
                   <div className="saved-messages avatar av-m">
                    <img src={groupData?.group?.groupImage} style={{objectFit:'cover'}} alt="" />
                  </div>

                </div>

            <a className="user-name text-capitalize" style={{marginLeft:'10px'}}>
            {groupData?.group?.groupName}
            {/* <p>s</p> */}
            </a>

          </div>
          <nav className="m-header-right">
            <a href="#" className="add-to-favorite">
              <i className="fas fa-star" />
            </a>
            <a >
              <i className="fas fa-home" />
            </a>
            <a onClick={() => setDisplay2(!display2)} className="show-infoSide cursor-pointer">
            <i class='bx bxs-info-circle' style={{color:'#2180f3' , fontSize:'24px'}}></i>
            </a>
          </nav>
        </nav>
        <div className="internet-connection">
          <span className="ic-connected">Connected</span>
          <span className="ic-connecting">Connecting...</span>
          <span className="ic-noInternet">No Internet Access</span>
        </div>
      </div> 


      
      <div className="m-body messages-container app-scroll" style={{ height: "81vh", overflow: 'scroll', padding: '0px 30px' }}>
      <div className='mt-5' style={{ marginBottom: '300px' }}>
        <div className='d-flex justify-content-center'>
          <img src={groupData?.group?.groupImage} alt="" style={{ width: '140px', height: '140px', borderRadius: '50%', objectFit: 'cover' }} />
        </div>
        <h5 className='text-center text-capitalize mt-2'>{groupData?.name}</h5>
        <p style={{ fontSize: '12px', marginBottom: '5px', color: "grey", textAlign: 'center' }}>You are now connected on GMG Messenger</p>
        <p style={{ fontSize: '12px', marginBottom: '5px', color: "grey", textAlign: 'center' , textTransform:'capitalize' }}>{groupData?.creator?.name} created this group chat.</p>
      </div>
            
   

                  <div className="messages" id="messages">
                {recieveDbMessages.map((msg, index) => (
                 
                  <div key={index} >
                        <p className={` ${Number(msg.fromId) === Number(activeId) ? 'time-socket-end' : 'time-socket-start'}`} style={{fontSize:'10px' , color:'#6d6d6d' , marginBottom:'-110px'}}>{formatTimeWithAMPM(msg.time)} </p>
                        <span className={` ${Number(msg.fromId) === Number(activeId) ? 'float-end left-image' : 'float-start right-image'}`}><img src={msg?.user?.pfpImage} style={{ position:'absolute',width: '25px', height: '25px', borderRadius: '50%', objectFit: 'cover' , marginTop:'20px'}} alt="" /></span> 
                       
                        <p className={` ${Number(msg.fromId) === Number(activeId) ? 'left' : 'right'}`}>{msg.text} 
                        {/* <p style={{position:'absolute' , marginTop:'-15px' , marginLeft:'50px'}} className={` ${Number(msg.fromId) === Number(activeId) ? 'd-block' : 'd-none'}`} >   <BsCheck2All style={msg.seen == 1 ? {color:'rgb(63, 122, 249)'} : {color:'white'}} /></p> */}
                        </p>
                       
                        {/* <p  className={` ${Number(msg.fromId) === Number(activeId) ? 'd-block' : 'd-none'}`} > {msg.seen == 1 && "Message SEen"}</p> */}
                          
            
                  

                  {/* <span className="message-time">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span> */}
                </div>
                ))}
            

                    {recieveMessages?.map((msg, index) => (
                      <div key={index} >
                        {msg.text && !msg.file ? (
                           <div>
                                

                            <p className={` ${Number(msg.fromId) === Number(activeId) ? 'time-socket-end' : 'time-socket-start'}`} style={{fontSize:'10px' ,color:'#6d6d6d' , marginBottom:'-110px'}}>{formatTimeWithAMPM(msg.time)} </p>
                            <span className={` ${Number(msg.fromId) === Number(activeId) ? 'float-end left-image' : 'float-start right-image'}`}><img src={msg?.pfpImage} style={{ position:'absolute',width: '25px', height: '25px', borderRadius: '50%', objectFit: 'cover' , marginTop:'20px'}} alt="" /></span> 
                           <p className={` ${Number(msg.fromId) === Number(activeId) ? 'left' : 'right'}`}> {msg.text}<span >
                           {/* <span >   <BsCheck2All size={18} style={{marginTop:'12px' , marginLeft:'-6px' , position:"absolute" }} className={isSeen === true ? 'seen' : ''} />    </span> */}
                           </span>
                           </p>
                         </div>
                          ) : (
                          msg.file && (
                            <div  className={`${
                              msg.fromId === activeId ? 'chat-image-view-left' : 'chat-image-view-right'
                            }`}>
                              {msg.file.startsWith('data:image/') && (
                                <>
                                 <span className={` ${Number(msg.fromId) === Number(activeId) ? 'left-time' : 'right-time'}`} style={{fontSize:'10px' , marginBottom:'100px',color:'#6d6d6d', position:'absolute' }}>{formatTimeWithAMPM(msg.time)} </span>
                                  <img src={msg.file} alt={msg.fileName} className="message-image mt-3" /> 
                          
                           </>
                              )}
                              {msg.file.startsWith('data:video/') && (
                                <video controls className="message-video">
                                  <source src={msg.file} type={msg.file.split(';')[0].split(':')[1]} />
                                  Your browser does not support the video tag.
                                </video>
                              )}
                              {msg.file.startsWith('data:application/') && (
                                // <a href={msg.file} download={msg.fileName} className="message-document">
                                <div className='doc-bg'> 
                                <p className='text-center'>File : {msg.fileName}</p>
                                <img src="/assets/images/document.jpg" alt="" />
                                <p className='text-center'>Document</p>
                                </div>
                                // </a>
                              )}
                            </div>
                          )
                        )}

                          
                         

                            {/* <span className="message-time">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span> */}
                      </div>
                    ))}
                    
                    {/* <br /><br /><br /> */}
                          {activeStatus === true && (
      <div style={{ float: 'right' }}>
        <img
          src={groupData?.pfpImage}
          style={{ width: '15px', height: '15px', borderRadius: '50%', objectFit: 'cover' , float:'right' }}
          alt=""
        />
      </div>
    )}
            
                
                <div style={{marginLeft:'-10px'}} className={isTyping === true ? 'd-block ' : 'd-none'}>
        <div className="message-card typing">
          <div className="message">
            <span className="typing-dots">
              <span className="dot dot-1 " />
              <span className="dot dot-2 " />
              <span className="dot dot-3 " />
            </span>
          </div>
        </div>
               </div>
               <div ref={messageEndRef} />
            

              </div>



      

    </div>





    {showEmogi === true &&
              <div className='emogi-picker'>
<Picker data={data2} onEmojiSelect={handleEmojiSelect} style={{width:'100%' , height:'50vh'}} />


                </div>
            }
    <div className="messenger-sendCard" >
  <form
    id="message-form"
    method="POST"
    onSubmit={ handleSendMessage}
    // onSubmit={handleSendFile}
    // action="https://taskify.taskhub.company/chat/sendMessage"
    encType="multipart/form-data"
  >
     <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="d-none"
      />
      <FontAwesomeIcon icon={faCirclePlus} onClick={handleIconClick} />
    </div>
   <button className="emoji-button m-0 p-0" >
  
    <span className="fas fa-smile" />
    </button>
    <button className="emoji-button m-0 p-0" type='button' onClick={handleShowEmogi}>
    <FontAwesomeIcon icon={faFaceSmile} />
    <span className="fas fa-smile" />
    </button>
   {file === null && 
    <textarea
    name="message"
    className="m-send app-scroll"
    value={text}
    onChange={handleSendText}
    placeholder="Type a Message.."
    style={{ overflow: "hidden", overflowWrap: "break-word", height: 44 }}
    // defaultValue={""}
  />}

  {file !== null  && (
    <div className="attachment-preview" style={{width:'100%'}}>
      <p>{file.name}</p>
      </div>
  )}
    <button className="send-button">
    <FontAwesomeIcon icon={faPaperPlane} style={{color:'#2180f3'}} />
      <span className="fas fa-paper-plane" />{" "}
    </button>
  </form>
</div>      
     </div>


    
    <div className={display2 === false ? "d-none" : "messenger-infoView app-scroll"}>
      <nav>
        <p>Group Details</p>
        <a onClick={() => setDisplay2(false)}>
        <i class='bx bx-x' style={{fontSize:'25px' , cursor:'pointer' , marginTop:'-20px'}}></i>
        </a>
      </nav>
      <div className="avatar av-l chatify-d-flex">
      <img src={groupData?.group?.groupImage} style={{objectFit:'cover'}} alt="" />
      </div>
     
      <p className="info-name text-capitalize">{groupData?.group?.groupName}</p>
      {/* <p className="info-name text-danger " style={{fontSize:'12px' , }}>Delete Conversation</p> */}
      <p className="messenger-title">
            <span className="text-capitalize text-muted" style={{ fontSize: "12px" ,fontWeight:'500' }}>users</span>
        </p>

     {groupData?.groupUsers?.map((item , index)=>(
          <>
           <table className="messenger-list-item mt-3" data-contact={7}>
                 <tbody>
        
                   <tr  data-action={0} onClick={()=>handleChatUser(item.id)} style={{cursor:'pointer'}}>
                     <td >
                       <div className="saved-messages avatar av-m">
                         {/* <img src={item.pfpImage} style={{objectFit:'cover'}} alt="" /> */}
                       
                         <div className="">
                         <div className="saved-messages avatar av-m">
                          <img src={item.pfpImage} style={{objectFit:'cover'}} alt="" />
                        </div>
        
                      </div>
        
                       </div>
                     </td>
                     <td className='text-capitalize '>
                       <p data-id={7} data-type="user">
                         {/* <span>You</span> */}
                       </p>
                       {item.name}
                       <span className='d-block m-0 p-0'>click to chat</span>
                       {/* <p>{activeUsers.filter(data => Number(data.id) === Number(item.id) ? 'id' : 'not')}</p> */}
                     
        
                        {/* <p>{ activeUsers.map(e => \e.id == item.id) ? 'online': 'ofline'}</p> */}
                     </td>
                   </tr>
                 </tbody>
           
            </table>

            
           </>

     ))}


      
    
    </div>
        </>
    )}




    {groupData && groupData.length === 0 && 
        <div className="messenger-messagingView1">
    <div className="d-flex justify-content-center align-items-center mt-5">
        <img src="../assets/images/gmg.png" className="img-fluid" alt="Gmg Solutions Logo" />
    </div>
    <h5 className="text-center mt-n4 ml-1">Gmg Solutions Messaging System!</h5>
    </div>
    }
  


  </div>
  <div id="imageModalBox" className="imageModal">
    <span className="imageModal-close">×</span>
    <img className="imageModal-content" id="imageModalBoxSrc" />
  </div>
  <div className="app-modal" data-name="delete">
    <div className="app-modal-container">
      <div className="app-modal-card" data-name="delete" data-modal={0}>
        <div className="app-modal-header">
          Are You Sure You Want to Delete This?
        </div>
        <div className="app-modal-body">You Cannot Undo This Action</div>
        <div className="app-modal-footer">
          <a href="javascript:void(0)" className="app-btn cancel">
            Cancel
          </a>
          <a href="javascript:void(0)" className="app-btn a-btn-danger delete">
            Yes
          </a>
        </div>
      </div>
    </div>
  </div>
  <div className="app-modal" data-name="alert">
    <div className="app-modal-container">
      <div className="app-modal-card" data-name="alert" data-modal={0}>
        <div className="app-modal-header" />
        <div className="app-modal-body" />
        <div className="app-modal-footer">
          <a href="javascript:void(0)" className="app-btn cancel">
            Cancel
          </a>
        </div>
      </div>
    </div>
  </div>
  <div className="app-modal" data-name="settings">
    <div className="app-modal-container">
      <div className="app-modal-card" data-name="settings" data-modal={0}>
        <form
          id="update-settings"
          action="https://taskify.taskhub.company/public/chat/updateSettings"
          encType="multipart/form-data"
          method="POST"
        >
          <input
            type="hidden"
            name="_token"
            defaultValue="bVvD0JC0kYMhCa3a8W5sqsCyxOBrkLW5QaqRaFI3"
            autoComplete="off"
          />
          <div className="app-modal-body">
            <div
              className="avatar av-l upload-avatar-preview chatify-d-flex"
              style={{
                backgroundImage:
                  'url("/storage/users-avatar/f724c64a-28c7-402a-8c4b-89efff99cdac.jpg")'
              }}
            />
            <p className="upload-avatar-details" />
            <label
              className="app-btn a-btn-primary update"
              style={{ backgroundColor: "#2180f3" }}
            >
              Upload New{" "}
              <input
                className="upload-avatar chatify-d-none"
                accept="image/*"
                name="avatar"
                type="file"
              />
            </label>
            <p className="divider" />
            <p className="app-modal-header">
              Dark Mode{" "}
              <span
                className="
                  far fa-moon dark-mode-switch"
                data-mode={0}
              />
            </p>
            <p className="divider" />
            <div className="update-messengerColor">
              <span
                style={{ backgroundColor: "#2180f3" }}
                data-color="#2180f3"
                className="color-btn"
              />
              <span
                style={{ backgroundColor: "#2196F3" }}
                data-color="#2196F3"
                className="color-btn"
              />
              <span
                style={{ backgroundColor: "#00BCD4" }}
                data-color="#00BCD4"
                className="color-btn"
              />
              <span
                style={{ backgroundColor: "#3F51B5" }}
                data-color="#3F51B5"
                className="color-btn"
              />
              <span
                style={{ backgroundColor: "#673AB7" }}
                data-color="#673AB7"
                className="color-btn"
              />
              <br />
              <span
                style={{ backgroundColor: "#4CAF50" }}
                data-color="#4CAF50"
                className="color-btn"
              />
              <span
                style={{ backgroundColor: "#FFC107" }}
                data-color="#FFC107"
                className="color-btn"
              />
              <span
                style={{ backgroundColor: "#FF9800" }}
                data-color="#FF9800"
                className="color-btn"
              />
              <span
                style={{ backgroundColor: "#ff2522" }}
                data-color="#ff2522"
                className="color-btn"
              />
              <span
                style={{ backgroundColor: "#9C27B0" }}
                data-color="#9C27B0"
                className="color-btn"
              />
              <br />
            </div>
          </div>
          <div className="app-modal-footer">
            <a href="javascript:void(0)" className="app-btn cancel">
              Cancel
            </a>
            <input
              type="submit"
              className="app-btn a-btn-success update"
              defaultValue="Save Changes"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
        </div>
        
       </div>

</>

  )
}

export default GChatById

