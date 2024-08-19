

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
import { format, isToday, isYesterday, parseISO } from 'date-fns';

import Chatbar from './Chatbar';
import Swal from 'sweetalert2';


const Chat = () => {
  const { socket , location } = useAppContext();
  const { id } = useParams();
  const [userDataById, setUserDataById] = useState([]);
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
    // fileInputRef.current.click();
    Swal.fire({
      title: 'This feature will be available soon!',
      icon: 'info',
      text: 'Regards Gmg Solutions',
      showCancelButton: false,
      showConfirmButton:false,
      timer: 2000
    })
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
    if (!id) {
      navigate("/");
    } else {
      axios
        .get(`http://localhost:5000/admin/team/${id}`)
        .then((res) => {
          setUserDataById(res.data);
        })
        .catch((err) => {
          console.error(err);
          if (err.response && err.response.status === 404) {
            navigate("/");
          }
        });
    }
  }, [id, navigate]);

  const fetchChats = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/chat/getChat`, {
        params: {
          fromId: activeId,
          toId: id
        }
      });
      setRecieveDbMessages(res.data);

    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  useEffect(() => {
    if (socket) {
      // socket.connect();

      socket.emit('receiveActiveId', activeId);
      socket.emit('paramsId', id);

      socket.on('receiveMsg', (msg ,messageId) => {
        console.log('Message received:', msg);
        setRecieveMessages(prevMessages => [...prevMessages, msg ,messageId]);
        setIsTyping(false);
        // setIsSeen(false);
        
        setTimeout(() => {
          // fetchChats();
        }, 1000);
        
      });


      fetchChats();

      return () => {
        socket.off('receiveMsg');
        setRecieveMessages([]);
      };
    }
  }, [activeId, id, socket]);
  // console.log("Checking: ",recieveMessages);
  useEffect(() => {
    
    
    scrollToBottom();
  }, [recieveMessages ]);
  const [status, setStatus] = useState(1);

// Handle scrollToBottom effect

const dataSend = { fromId: id, toId: activeId, status: 1 };
socket.emit('seenMessages', dataSend);


// Handle scrollToBottom effect on receiveDbMessages change
useEffect(() => {
  scrollToBottom();
}, [recieveDbMessages]);



  // useEffect(() => {
  //   const data = { fromId: id, toId: activeId, status: 0 };
  //   socket.emit('seenMessages', data);
  // }, [id ,activeId]);

  // useEffect(() => {
  //   socket.on('recieveSeenMessage', (data) => {
  //     console.log('Seen Messages:', data);
  //     if(data && Number(data?.fromId) == Number(activeId) && Number(data?.toId) == Number(id) && data && data.status == 1){
  //       setIsSeen(true);
  //     }else{
  //       // alert("Leaving chat")
  //       const dataSend2 = { fromId: id, toId: activeId, status: 0 };
  //       socket.emit('sendLeaveChat', dataSend2);
  //       setIsSeen(false);
  //     }
  //   });

  // }, [id]);

  

  const [hasSeen, setHasSeen] = useState(false);
  const previousIdRef = useRef(id);
  
  const previousRouteRef = useRef(location.pathname); // Initialize with the current route

  useEffect(() => {
    // Function to handle 'receiveSeenMessage' event
    const handleReceiveSeenMessage = (data) => {
      if (data && Number(data.fromId) === Number(activeId) && Number(data.toId) === Number(id)) {
        setIsSeen(true);
      }
    };
    setIsSeen(false);
    // Set up socket event listener
    socket.on('receiveSeenMessage', handleReceiveSeenMessage);
  
    // Cleanup function to remove the event listener
    return () => {
      socket.off('receiveSeenMessage', handleReceiveSeenMessage);
    };
  }, [id, activeId, socket]); // Removed location.pathname as it's not used in the effect
  

  useEffect(() => {
    // Emit 'sendLeaveChat' if route changes
    const prevRoute = previousRouteRef.current;
    const currentRoute = location.pathname;

    if (prevRoute !== currentRoute) {
      const dataSend2 = { fromId: activeId, toId: previousIdRef.current, status: 0 };
      if (socket && socket.connected) {
        socket.emit('sendLeaveChat', dataSend2);
        console.log("Emitting sendLeaveChat with previous ID:", previousIdRef.current);
      } else {
        console.log("Socket not connected");
      }
      previousRouteRef.current = currentRoute; // Update the previous route ref
    }

  }, [location.pathname, socket, activeId]);

  

  useEffect(() => {
    // Emit 'sendLeaveChat' using the previous id value before it changes
    const prevId = previousIdRef.current;
    console.log("????????????????????????????????????????????????????????????????????????????????????Previous ID:", prevId , "id:", id);
    

    if (prevId !== id || id == null || id) {
      const dataSend2 = { fromId: activeId, toId: prevId, status: 0 };
      if (socket.connected) {
        socket.emit('sendLeaveChat', dataSend2);
        console.log("Emitting sendLeaveChat with previous ID:", prevId);
      } else {
        console.log("Socket not connected");
      }
    }

    // Update the ref to the current id after handling the sendLeaveChat
    previousIdRef.current = id;
  }, [activeId, id, socket ]);

  // useEffect(() => {
  //   const prevId = previousIdRef.current;
  //   const prevRoute = previousRouteRef.current;
  //   const currentRoute = location.pathname;

  //   if( prevId !== id || prevRoute !== currentRoute) {
  //     const dataSend2 = { fromId: activeId, toId: prevId, status: 0 };
  //     if (socket.connected) {
  //       socket.emit('sendLeaveChat', dataSend2);
  //       console.log("Emitting sendLeaveChat with previous ID:", prevId);
  //     } else {
  //       console.log("Socket not connected");
  //     }
  //     previousRouteRef.current = currentRoute; // Update the previous route ref
  //   }

  //   // previousIdRef.current = id; // Update the previous ID ref
  // }, [socket,activeId, id, location.pathname]);

  useEffect(() => {
    // Listen for the 'receiveLeaveChat' event
    const handleReceiveLeaveChat = (data) => {
      console.log('receiveLeaveChat:', data);
      if (data && Number(data?.fromId) === Number(id) && Number(data?.toId) === Number(activeId)) {
        setTimeout(() => {
          setIsSeen(false);
        }, 1000);
        // setRecieveMessages([]); // Clear previous messages
        // fetchChats();

      }
    };

    socket.on('receiveLeaveChat', handleReceiveLeaveChat);

    return () => {
      // Clean up the listener when the component unmounts or id/activeId/socket changes
      socket.off('receiveLeaveChat', handleReceiveLeaveChat);
    };
  }, [activeId, id, socket]);

  useEffect(()=>{
    setIsSeen(false);
  },[id])
  useEffect(() => {
    if (isSeen) {
      setHasSeen(true);
    } else {
      setHasSeen(false);
    }
  }, [isSeen]);

  // useEffect(() => {
  //   // const data = ;
  //     console.log("useEffect running")
  // }, [id]);

  // useEffect(() => {
  //   const data = { fromId: id,toId: activeId, status: 1 };
  //   socket.emit('seenMessages', data);
  //   scrollToBottom();
  // }, [recieveMessages, recieveDbMessages]);

  // useEffect(() => {
  //   const data = { fromId: id,toId: activeId, status: 0 };
  //   socket.emit('seenMessages', data);


  // }, [id]);





const filteredMessages = recieveMessages.filter(msg => 
  (msg.fromId === id && msg.toId === activeId) || (msg.fromId === activeId && msg.toId === id && msg.fromId !== msg.toId)
);



  

  // socket.on('recieveSeenMessage', (data ) => {
  //   console.log('Seen Messages:'  ,data );
  //   if(data && data.status === 1){
  //     setIsSeen(true)
  //   }else{
  //     setIsSeen(false)
  //   }
  // });


  const [isTyping , setIsTyping] = useState(false);
  useEffect(() => {
    // alert(id)
    // alert(isSeen)
    
    setIsTyping(false);
    
  },[id])
  

  
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

    }

   
  };
  console.log("isTyping" , isTyping);
  
useEffect(()=>{
  socket.on('receiveTyping', (res) => {
    console.log('Typing Response:', res);
    if( Number(res.fromId) === Number(id)){
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
      } , 7000)

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

 

const [chatBarUsers , setChatBarUsers] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:5000/chat/getChatbarUser/${loggedUser.id}`)
    .then((res) => {
      setChatBarUsers(res.data);
      // console.log("Users:", res.data);
    })
    .catch((err) => {
      console.log("Error getting users:", err);
    });
  }, [loggedUser]);



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
        toId: id,
        text,
        userDetail:loggedUser,
        toUserDetail: [activeId  , userDataById ,text],
        file: file,
        fileName: fileName,
        time: new Date().toISOString(),
      }

      
      const notification = {
        fromId: activeId,
        usersID: [Number(id)],
        text:`${loggedUser?.name} has sent you a message.`,
        
        time: new Date().toLocaleString(),
        route: '/chat',
      };
      socket.emit('newNotification', notification, (response) => {
        if (response && response.status === 'ok') {
          console.log(response.msg);
        } else {
          console.error('Message delivery failed or no response from server');
        }
      });
     
      setText('');
      setFile(null); 
      setShowEmogi(false);
      socket.emit('sendMsg', messageData, (response) => {
        if (response.status === 'ok') {
          // console.log(response.msg);
        } else {
          console.error('Message delivery failed');
        }
      });

      // const typingData = { fromId: activeId, toId: id, status: 0 };

      // socket.emit('typing', typingData, (response) => {
      //   if (response && response.status === 'ok') {
      //     // console.log(response.msg);
      //   } else {
      //     console.error('Message delivery failed or no response from server');
      //   }
      // });
    }
  };
  


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
  

  const getLastSeenMessageIndex = (messages) => {
    const seenMessages = messages.filter(msg => msg.seen === 1);
    return seenMessages.length > 0 ? messages.indexOf(seenMessages[seenMessages.length - 1]) : -1;
  };

  const lastSeenMessageIndex = getLastSeenMessageIndex(recieveDbMessages);



  const formatDate = (date) => {
    const parsedDate = parseISO(date); // Assuming date is an ISO string
    if (isToday(parsedDate)) {
      return 'Today';
    }
    if (isYesterday(parsedDate)) {
      return 'Yesterday';
    }
    return format(parsedDate, 'MMM d, yyyy'); // e.g., Aug 15, 2024
  };
  
  let lastMessageDate = null;
  
  return (
    <>
  
       <div className="container-fluid" style={{  overflow:'hidden'}}>
       <div className="card p-3" style={{height:'80vh'}}>
        <div className="messenger" style={{height:'100%'}}>
        <input type="hidden" id="chat_type" defaultValue="" />
        <input type="hidden" id="chat_type_id" defaultValue="" />
      <div className='my-chatbar2'><Chatbar /></div>
    
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
                    <img src={userDataById.pfpImage} style={{objectFit:'cover'}} alt="" />
                  <div className={activeStatus === true ? 'avatar-online-status' : 'avatar-offline-status'}></div>
                  </div>

                </div>

            <a className="user-name text-capitalize" style={{marginTop:'-10px'}}>
  {userDataById?.name}
  {/* <p>s</p> */}
</a>
 <br />
  <p  className={isTyping ? 'd-block text-primary typing-text' : 'd-none text-primary'} style={{ fontSize: '12px' }}>
    Typing...
  </p>
  <p className={isTyping ? ' d-none' : 'd-block typing-text'}>{activeStatus === true ? <span className='text-success'>Online</span> : <span className='text-secondary'>Offline</span>}</p>

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
          <img src={userDataById?.pfpImage} alt="" style={{ width: '140px', height: '140px', borderRadius: '50%', objectFit: 'cover' }} />
        </div>
        <h5 className='text-center text-capitalize mt-2'>{userDataById?.name}</h5>
        <p style={{ fontSize: '12px', marginBottom: '5px', color: "grey", textAlign: 'center' }}>You are now connected on GMG Messenger</p>
        <p style={{ fontSize: '12px', marginBottom: '5px', color: "grey", textAlign: 'center' }}>You're friends on Gmg Solutions chatting Hub.</p>
      </div>
            
   
      {/* {recieveDbMessages && recieveDbMessages.map((msg, index) => (
                 
                 <div key={index} >
                 {msg.text && !msg.file ? (
                     <div>
                       <p className={` ${Number(msg.fromId) === Number(activeId) ? 'time-socket-end' : 'time-socket-start'}`} style={{fontSize:'10px' , color:'#6d6d6d' , marginBottom:'-110px'}}>{formatTimeWithAMPM(msg.time)} </p>
                       <p className={` ${Number(msg.fromId) === Number(activeId) ? 'left' : 'right'}`}>{msg.text} 
                       </p>
                      
                         
                     </div>
                 ) : (
                   msg.file && (
                     <div  className={`${
                       Number(msg.fromId) === Number(activeId) ? 'chat-image-view-left' : 'chat-image-view-right'
                     }`}>
                       {msg.file.startsWith('data:image/') && (
                         <>
                         
                         <span className={` ${Number(msg.fromId) === Number(activeId) ? 'left-time' : 'right-time'}`} style={{fontSize:'10px' , marginBottom:'100px',color:'#6d6d6d', position:'absolute' }}>{formatTimeWithAMPM(msg.time)} </span>
                         <img src={msg.file} alt={msg.fileName} className="message-image mt-3" /> 
                         
                         </>
                       )}
                       {msg.file.startsWith('data:video/') && (
                         <>
                         <span className={` ${Number(msg.fromId) === Number(activeId) ? 'left-time' : 'right-time'}`} style={{fontSize:'10px' , marginBottom:'100px',color:'#6d6d6d', position:'absolute' }}>{formatTimeWithAMPM(msg.time)} </span>

                         <video controls className="message-video">
                           <source src={msg.file} type={msg.file.split(';')[0].split(':')[1]} />
                           Your browser does not support the video tag.
                         </video>
                         </>
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
                 <br /><br /><br />
                 {!hasSeen && index === lastSeenMessageIndex && (
           <div style={{float:'right'}}>
             <img src={userDataById?.pfpImage} style={{ width: '15px', height: '15px', borderRadius: '50%', objectFit: 'cover' }} alt="" />
           </div>
         )}

               
               </div>
               ))} */}

                  <div className="messages" id="messages">
                  {recieveDbMessages.map((msg, index) => {
        const messageDate = new Date(msg.time);
        const showDate = lastMessageDate === null || (messageDate - lastMessageDate) > 2 * 24 * 60 * 60 * 1000;
        lastMessageDate = messageDate;

        return (
          <div key={index}>
            {showDate && (
                  <p className="messenger-title3">
                  <span>{formatDate(msg.time)}</span>
                </p>
            )}
            {msg.text && !msg.file ? (
              <div>
                <p className={`${Number(msg.fromId) === Number(activeId) ? 'time-socket-end' : 'time-socket-start'}`} style={{ fontSize: '10px', color: '#6d6d6d', marginBottom: '-110px' }}>{formatTimeWithAMPM(msg.time)}</p>
                <p className={`${Number(msg.fromId) === Number(activeId) ? 'left' : 'right'}`}>{msg.text}
                  {/* <p style={{ position: 'absolute', marginTop: '-15px', marginLeft: '50px' }} className={`${Number(msg.fromId) === Number(activeId) ? 'd-block' : 'd-none'}`}> <BsCheck2All style={msg.seen == 1 ? { color: 'rgb(63, 122, 249)' } : { color: 'white' }} /></p> */}
                </p>
                {/* <p className={`${Number(msg.fromId) === Number(activeId) ? 'd-block' : 'd-none'}`}>{msg.seen == 1 && "Message SEen"}</p> */}
              </div>
            ) : (
              msg.file && (
                <div className={`${Number(msg.fromId) === Number(activeId) ? 'chat-image-view-left' : 'chat-image-view-right'}`}>
                  {msg.file.startsWith('data:image/') && (
                    <>
                      <span className={`${Number(msg.fromId) === Number(activeId) ? 'left-time' : 'right-time'}`} style={{ fontSize: '10px', marginBottom: '100px', color: '#6d6d6d', position: 'absolute' }}>{formatTimeWithAMPM(msg.time)}</span>
                      <img src={msg.file} alt={msg.fileName} className="message-image mt-3" />
                    </>
                  )}
                  {msg.file.startsWith('data:video/') && (
                    <>
                      <span className={`${Number(msg.fromId) === Number(activeId) ? 'left-time' : 'right-time'}`} style={{ fontSize: '10px', marginBottom: '100px', color: '#6d6d6d', position: 'absolute' }}>{formatTimeWithAMPM(msg.time)}</span>
                      <video controls className="message-video">
                        <source src={msg.file} type={msg.file.split(';')[0].split(':')[1]} />
                        Your browser does not support the video tag.
                      </video>
                    </>
                  )}
                  {msg.file.startsWith('data:application/') && (
                    <div className='doc-bg'>
                      <p className='text-center'>File : {msg.fileName}</p>
                      <img src="/assets/images/document.jpg" alt="" />
                      <p className='text-center'>Document</p>
                    </div>
                  )}
                </div>
              )
            )}
            <br /><br /><br />
            
            {!hasSeen && index === lastSeenMessageIndex && (
              <div style={{ float: 'right' }}>
                <img src={userDataById?.pfpImage} style={{ width: '15px', height: '15px', borderRadius: '50%', objectFit: 'cover' }} alt="" />
              </div>
            )}
            {/* <span className="message-time">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span> */}
          </div>
        );
      })}
                    {filteredMessages.map((msg, index) => (
                      <div key={index} >
                        {msg.text && !msg.file ? (
                           <div>
                                

                             <p className={` ${Number(msg.fromId) === Number(activeId) ? 'time-socket-end' : 'time-socket-start'}`} style={{fontSize:'10px' ,color:'#6d6d6d' , marginBottom:'-110px'}}>{formatTimeWithAMPM(msg.time)} </p>
                           <p className={` ${Number(msg.fromId) === Number(activeId) ? 'left' : 'right'}`}>{msg.text}<span >
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
                                {isTyping === true && 
                
                <div style={{marginLeft:'-10px'}} >
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
                }
                    
                    {/* <br /><br /><br /> */}
                          {hasSeen && activeStatus === true && (
      <div style={{ float: 'right' }}>
        <img
          src={userDataById?.pfpImage}
          style={{ width: '15px', height: '15px', borderRadius: '50%', objectFit: 'cover' , float:'right' }}
          alt=""
        />
      </div>
    )}
             {/* {filteredFiles.map((item, index) => {
        const fileType = getFileType(item.file);

        return (
          <div
            key={index}
            className={`${
              item.fromId === activeId ? 'chat-image-view-left' : 'chat-image-view-right'
            }`}
          >
            {fileType.startsWith('image/') && (
              <img src={item.file} alt="content" />
            )}
            {fileType.startsWith('video/') && (
                <video controls >
                <source src={item.file} type={fileType} />
                Your browser does not support the video tag.
              </video>
            )}
            {fileType.startsWith('application/') && (
              <div className='doc-bg'> 
              <p className='text-center'>File : {item.fileName}</p>
              <img src="/assets/images/document.jpg" alt="" />
              <p className='text-center'>Document</p>
              </div>
            )}
            
          </div>
        );
            })} */}


{/* {filteredMessages.map((msg, index) => (
                  <div key={index} >
                      <p className={` ${msg.fromId === activeId ? 'left' : 'right'}`}>{msg.text}</p>
            
                      <span className="message-time">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                  </div>
                ))} */}


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
    <input
    type='text'
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
        <p>User Details</p>
        <a onClick={() => setDisplay2(false)}>
        <i class='bx bx-x' style={{fontSize:'25px' , cursor:'pointer' , marginTop:'-20px'}}></i>
        </a>
      </nav>
      <div className="avatar av-l chatify-d-flex">
      <img src={userDataById?.pfpImage} style={{objectFit:'cover'}} alt="" />
      </div>
     
      <p className="info-name text-capitalize">{userDataById?.name}</p>
      {/* <p className="info-name text-danger " style={{fontSize:'12px' , }}>Delete Conversation</p> */}
      <p className="messenger-title">
            <span className="text-capitalize text-muted" style={{ fontSize: "12px" ,fontWeight:'500' }}>Shared Photos</span>
          </p>
      
    
    </div>
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

export default Chat


// import axios from 'axios';
// import React, { useEffect, useRef, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPaperPlane, faFaceSmile, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

// import io from 'socket.io-client';
// const Socket = io('http://localhost:5000');



// const Chat = () => {
//   const { id } = useParams();
//   const [userDataById, setUserDataById] = useState([]);
//   const [loggedUser, setLoggedUser] = useState([]);
//   const [data, setData] = useState([]);
//   const [isSearchData, setIsSearchData] = useState(false);
//   const [searchValue, setSearchValue] = useState("");
//   const [display, setDisplay] = useState(false);
//   const [display2, setDisplay2] = useState(false);
//   const [recieveMessages, setRecieveMessages] = useState([]);
//   const [recieveDbMessages, setRecieveDbMessages] = useState([]);
//   const [text, setText] = useState('');
//   const messageEndRef = useRef(null);

  
//   const activeId = localStorage.getItem("id");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!activeId) {
//       navigate("/login"); // Redirect to login
//     } else {
//       axios
//         .get(`http://localhost:5000/admin/adminInfo/`, {
//           headers: { Authorization: `${activeId}` },
//         })
//         .then((res) => {
//           setLoggedUser(res.data);
//         })
//         .catch((err) => {
//           console.error(err);
//           if (err.response && err.response.status === 404) {
//             navigate("/login"); // Redirect to login on 404
//           }
//         });
//     }
//   }, [activeId, navigate]);

//   useEffect(() => {
//     if (!id) {
//       navigate("/"); // Redirect to home
//     } else {
//       axios
//         .get(`http://localhost:5000/admin/team/${id}`)
//         .then((res) => {
//           setUserDataById(res.data);
//         })
//         .catch((err) => {
//           console.error(err);
//           if (err.response && err.response.status === 404) {
//             navigate("/"); // Redirect to home on 404
//           }
//         });
//     }
//   }, [id, navigate]);

//   useEffect(() => {
//     // Initialize socket connection and listeners
//     Socket.connect();
//     Socket.emit('receiveActiveId', activeId);
//     Socket.emit('paramsId', id);

//     Socket.on('receiveMsg', (msg) => {
//       console.log('Message received:', msg);
//       setRecieveMessages(prevMessages => [...prevMessages, msg]);
//     });

//     // Fetch existing chat messages from the database
//     axios.get(`http://localhost:5000/chat/getChat`, {
//       params: {
//         fromId: activeId,
//         toId: id
//       }
//     })
//     .then((res) => {
//       console.log(res.data);
//       setRecieveDbMessages(res.data);
//     })
//     .catch((err) => {
//       console.error(err);
//     });

//     // Cleanup on component unmount or route change
//     return () => {
//       Socket.off('receiveMsg');
//       Socket.disconnect();
//       setRecieveMessages([]);
//     };
//   }, [activeId, id]);

//   const handleSearchChange = (e) => {
//     const searchTerm = e.target.value;
//     setSearchValue(searchTerm);
//     if (searchTerm.length > 0) {
//       setIsSearchData(true);
//     } else {
//       setData([]);
//       setIsSearchData(false);
//       return;
//     }
//     axios
//       .get(`http://localhost:5000/admin/search/${searchTerm}`)
//       .then((res) => {
//         setData(res.data);
//       })
//       .catch((err) => {
//         console.log("Error searching providers:", err);
//       });
//   };

//   const handleChatUser = (id) => {
//     navigate(`/chat/${id}`);
//     setData([]);
//     setSearchValue("");
//     setIsSearchData(false);
//   };

//   const scrollToBottom = () => {
//     messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (text.trim()) {
//       const messageData = { fromId: activeId, toId: id, text, timestamp: new Date() };
//       setText('');
//       Socket.emit('sendMsg', messageData, (response) => {
//         if (response.status === 'ok') {
//           console.log(response.msg);
//           scrollToBottom();

//         } else {
//           console.error('Message delivery failed');
//         }
//       });
//     }
//   };

//   const filteredMessages = recieveMessages.filter(msg => 
//     (msg.fromId === id && msg.toId === activeId) || (msg.fromId === activeId && msg.toId === id)
//   );

//   return (
//     <>
  
//        <div className="container-fluid">
//        <div className="card p-3" style={{height:'80vh'}}>
//         <div className="messenger" style={{height:'100%'}}>
//     <input type="hidden" id="chat_type" defaultValue="" />
//     <input type="hidden" id="chat_type_id" defaultValue="" />
//     <div className={display === true ? " d-none" : "messenger-listView"}>

//     <div className="m-header" >
//         <nav style={{background:'#f7f7f7'}} className='mb-2'>
//           <div className="row">
//             <div className="col">
//               <img src={loggedUser.pfpImage} style={{objectFit:'cover' , width:'35px'  , height:'35px' , borderRadius:'50%'}} alt="" />
//             </div>
//             <div className="col text-end cursor-pointer">
              
//             <i class='bx bx-dots-vertical' ></i>
//             </div>
//           </div>
//         </nav>
//         <input type="text" className="messenger-search" value={searchValue}  onChange={handleSearchChange} placeholder="Search" />
        
//       </div>
//       <div className="m-body contacts-container">
//       <div className="row mx-2" style={{background:'#f7f7f7' }}>
//           <div className="col-12">
          
//              <table className="messenger-list-item " data-contact={7}>
//             <tbody>
//             {data.map((item, index) => (
//           <tr key={index} onClick={()=>handleChatUser(item.id)} style={{cursor:'pointer'}}>
           
//             <td>
              
//                 <div className="saved-messages avatar av-m">
//                   <img src={item.pfpImage} style={{ objectFit: 'cover' }} alt="" />
//                 </div>
              
//             </td>
//             <td className="text-capitalize">
//               {item.name}
//               <span className="d-block m-0 p-0">Click to chat.</span>
//             </td>
//           </tr>
//         ))}
//             </tbody>
//                  </table>
                
//           </div>
//         </div>
//         <div
//           className="show messenger-tab users-tab app-scroll"
//           data-view="users"
//         >
        
//           {data.length === 0 && isSearchData === false && (
//             <>
//             <table className="messenger-list-item mt-3" data-contact={7}>
//             <tbody>

//               <tr  data-action={0} onClick={()=>navigate(`/chat/${loggedUser.id}`)} style={{cursor:'pointer'}}>
//                 <td >
//                   <div className="saved-messages avatar av-m">
//                     <img src={loggedUser.pfpImage} style={{objectFit:'cover'}} alt="" />
//                   </div>
//                 </td>
//                 <td className='text-capitalize '>
//                   <p data-id={7} data-type="user">
//                     <span>You</span>
//                   </p>
//                   {loggedUser.name}
//                   <span className='d-block m-0 p-0'>Save Messages Secretly</span>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//           <p className="messenger-title">
//             <span>All Messages</span>
//           </p>

//           <div
//             className="listOfContacts"
//             style={{
//               width: "100%",
//               height: "calc(100% - 272px)",
//               position: "relative"
//             }}
//           />





//           </>
//           )}
//           {data.length === 0 && isSearchData === true && (
//             <>
//             <p>No user found</p>
//             </>
//           )}


//         </div>
//         <div className="messenger-tab search-tab app-scroll" data-view="search">
//           <p className="messenger-title">
//             <span>Search</span>
//           </p>
//           <div className="search-records">
//             <p className="message-hint center-el">
//               <span>Type to Search..</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="messenger-messagingView">
//       <div className="m-header m-header-messaging">
//         <nav className="chatify-d-flex chatify-justify-content-between chatify-align-items-center">
//           <div className="chatify-d-flex chatify-justify-content-between chatify-align-items-center">
//             <a href="#" className="show-listView">
//               <i className="fas fa-arrow-left" />
//             </a>
//               <button class="navbar-toggler" onClick={() => setDisplay(!display)} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                         <i class='bx bx-arrow-back'></i>
//               </button>
//             <div
//               className="avatar av-s header-avatar"
//               style={{
//                 margin: "0px 10px",
//                 marginTop: "-5px",
//                 marginBottom: "-5px"
//               }}
//             >
//               <img src={userDataById?.pfpImage} style={{objectFit:'cover'}} alt="" />
//             </div>
//             <a className="user-name text-capitalize">
//               {userDataById?.name}
//             </a>
//           </div>
//           <nav className="m-header-right">
//             <a href="#" className="add-to-favorite">
//               <i className="fas fa-star" />
//             </a>
//             <a href="https://taskify.taskhub.company/public/home">
//               <i className="fas fa-home" />
//             </a>
//             <a onClick={() => setDisplay2(!display2)} className="show-infoSide cursor-pointer">
//             <i class='bx bxs-info-circle' style={{color:'#2180f3' , fontSize:'24px'}}></i>
//             </a>
//           </nav>
//         </nav>
//         <div className="internet-connection">
//           <span className="ic-connected">Connected</span>
//           <span className="ic-connecting">Connecting...</span>
//           <span className="ic-noInternet">No Internet Access</span>
//         </div>
//       </div> 
//       <div className="m-body messages-container app-scroll" style={{maxHeight:"81vh" , overflow:'scroll' , padding:'0px 30px'}}>
      
//      <div className='mt-5' style={{marginBottom:'300px'}}>
//      <div className='d-flex justify-content-center'>
//         <img src={userDataById?.pfpImage} alt="" style={{width:'140px' , height:'140px' , borderRadius:'50%' , objectFit:'cover'}}/>
//       </div>
//       <h5 className='text-center text-capitalize mt-2'>{userDataById?.name}</h5>
//       <p style={{ fontSize: '12px', marginBottom: '5px', color: "grey" , textAlign:'center'}}>You are now connected on GMG Messenger</p>
//       <p style={{ fontSize: '12px', marginBottom: '5px', color: "grey" , textAlign:'center'}}>You're friends on Gmg Solutions chatting Hub.</p>
//      </div>

 
//      {recieveDbMessages.map((msg) => (
//   <p key={msg.id} className={Number(msg.fromId) === Number(activeId) ? 'left' : 'right'}>
//     {msg.text}
//   </p>
// ))}
//     {filteredMessages.map((msg, index) => (
//   <li key={index} className={msg.fromId === activeId ? 'left' : 'right'}>
//     {msg.text}
//   </li>
// ))}

   
   
   
//       {/* {recieveMessages.map((msg, index) => (
//           <div key={index}>
//             <div style={{background:'red'}}>
//             <strong>{msg.fromId}</strong>: {msg.text}
//             </div>
//           </div>
//         ))} */}
//  {/* {recieveMessages?.map((message, index) => (
//   <div key={index} className="col message-container">
//     {message.fromId === id && message.toId === activeId && (
//       <p className={message.fromId === id && message.toId === activeId ? 'right' : null}>{message.text}</p>
      
//     )}

   
//   </div>
// ))} */}

//         <div className="typing-indicator">
      
//           <div className="message-card typing">
      
//             <div className="message">
//               <span className="typing-dots">
//                 <span className="dot dot-1" />
//                 <span className="dot dot-2" />
//                 <span className="dot dot-3" />
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>






//       <div className="messenger-sendCard" style={{ display: "block" }}>
//   <form
//     id="message-form"
//     method="POST"
//     onSubmit={handleSendMessage}
//     // action="https://taskify.taskhub.company/chat/sendMessage"
//     encType="multipart/form-data"
//   >
//     <input
//       type="hidden"
//       name="_token"
     
//       defaultValue="bVvD0JC0kYMhCa3a8W5sqsCyxOBrkLW5QaqRaFI3"
//       autoComplete="off"
//     />
//    <button className="emoji-button m-0 p-0">
//     <FontAwesomeIcon icon={faCirclePlus} />
//     <span className="fas fa-smile" />
//     </button>
//     <button className="emoji-button m-0 p-0">
//     <FontAwesomeIcon icon={faFaceSmile} />
//     <span className="fas fa-smile" />
//     </button>
//     <textarea
//       name="message"
//       className="m-send app-scroll"
//       value={text}
//       onChange={(e)=>setText(e.target.value)}
//       placeholder="Type a Message.."
//       style={{ overflow: "hidden", overflowWrap: "break-word", height: 44 }}
//       defaultValue={""}
//     />
//     <button className="send-button">
//     <FontAwesomeIcon icon={faPaperPlane} style={{color:'#2180f3'}} />
//       <span className="fas fa-paper-plane" />{" "}
//     </button>
//   </form>
//       </div>
//     </div>
//     <div className={display2 === false ? "d-none" : "messenger-infoView app-scroll"}>
//       <nav>
//         <p>User Details</p>
//         <a onClick={() => setDisplay2(false)}>
//         <i class='bx bx-x' style={{fontSize:'25px' , cursor:'pointer' , marginTop:'-20px'}}></i>
//         </a>
//       </nav>
//       <div className="avatar av-l chatify-d-flex">
//       <img src={userDataById?.pfpImage} style={{objectFit:'cover'}} alt="" />
//       </div>
     
//       <p className="info-name text-capitalize">{userDataById?.name}</p>
//       {/* <p className="info-name text-danger " style={{fontSize:'12px' , }}>Delete Conversation</p> */}
//       <p className="messenger-title">
//             <span className="text-capitalize text-muted" style={{ fontSize: "12px" ,fontWeight:'500' }}>Shared Photos</span>
//           </p>
      
    
//     </div>
//   </div>
//   <div id="imageModalBox" className="imageModal">
//     <span className="imageModal-close">×</span>
//     <img className="imageModal-content" id="imageModalBoxSrc" />
//   </div>
//   <div className="app-modal" data-name="delete">
//     <div className="app-modal-container">
//       <div className="app-modal-card" data-name="delete" data-modal={0}>
//         <div className="app-modal-header">
//           Are You Sure You Want to Delete This?
//         </div>
//         <div className="app-modal-body">You Cannot Undo This Action</div>
//         <div className="app-modal-footer">
//           <a href="javascript:void(0)" className="app-btn cancel">
//             Cancel
//           </a>
//           <a href="javascript:void(0)" className="app-btn a-btn-danger delete">
//             Yes
//           </a>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div className="app-modal" data-name="alert">
//     <div className="app-modal-container">
//       <div className="app-modal-card" data-name="alert" data-modal={0}>
//         <div className="app-modal-header" />
//         <div className="app-modal-body" />
//         <div className="app-modal-footer">
//           <a href="javascript:void(0)" className="app-btn cancel">
//             Cancel
//           </a>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div className="app-modal" data-name="settings">
//     <div className="app-modal-container">
//       <div className="app-modal-card" data-name="settings" data-modal={0}>
//         <form
//           id="update-settings"
//           action="https://taskify.taskhub.company/public/chat/updateSettings"
//           encType="multipart/form-data"
//           method="POST"
//         >
//           <input
//             type="hidden"
//             name="_token"
//             defaultValue="bVvD0JC0kYMhCa3a8W5sqsCyxOBrkLW5QaqRaFI3"
//             autoComplete="off"
//           />
//           <div className="app-modal-body">
//             <div
//               className="avatar av-l upload-avatar-preview chatify-d-flex"
//               style={{
//                 backgroundImage:
//                   'url("/storage/users-avatar/f724c64a-28c7-402a-8c4b-89efff99cdac.jpg")'
//               }}
//             />
//             <p className="upload-avatar-details" />
//             <label
//               className="app-btn a-btn-primary update"
//               style={{ backgroundColor: "#2180f3" }}
//             >
//               Upload New{" "}
//               <input
//                 className="upload-avatar chatify-d-none"
//                 accept="image/*"
//                 name="avatar"
//                 type="file"
//               />
//             </label>
//             <p className="divider" />
//             <p className="app-modal-header">
//               Dark Mode{" "}
//               <span
//                 className="
//                   far fa-moon dark-mode-switch"
//                 data-mode={0}
//               />
//             </p>
//             <p className="divider" />
//             <div className="update-messengerColor">
//               <span
//                 style={{ backgroundColor: "#2180f3" }}
//                 data-color="#2180f3"
//                 className="color-btn"
//               />
//               <span
//                 style={{ backgroundColor: "#2196F3" }}
//                 data-color="#2196F3"
//                 className="color-btn"
//               />
//               <span
//                 style={{ backgroundColor: "#00BCD4" }}
//                 data-color="#00BCD4"
//                 className="color-btn"
//               />
//               <span
//                 style={{ backgroundColor: "#3F51B5" }}
//                 data-color="#3F51B5"
//                 className="color-btn"
//               />
//               <span
//                 style={{ backgroundColor: "#673AB7" }}
//                 data-color="#673AB7"
//                 className="color-btn"
//               />
//               <br />
//               <span
//                 style={{ backgroundColor: "#4CAF50" }}
//                 data-color="#4CAF50"
//                 className="color-btn"
//               />
//               <span
//                 style={{ backgroundColor: "#FFC107" }}
//                 data-color="#FFC107"
//                 className="color-btn"
//               />
//               <span
//                 style={{ backgroundColor: "#FF9800" }}
//                 data-color="#FF9800"
//                 className="color-btn"
//               />
//               <span
//                 style={{ backgroundColor: "#ff2522" }}
//                 data-color="#ff2522"
//                 className="color-btn"
//               />
//               <span
//                 style={{ backgroundColor: "#9C27B0" }}
//                 data-color="#9C27B0"
//                 className="color-btn"
//               />
//               <br />
//             </div>
//           </div>
//           <div className="app-modal-footer">
//             <a href="javascript:void(0)" className="app-btn cancel">
//               Cancel
//             </a>
//             <input
//               type="submit"
//               className="app-btn a-btn-success update"
//               defaultValue="Save Changes"
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   </div>
//         </div>
//        </div>
// </>

//   )
// }

// export default Chat


// import axios from 'axios';
// import React, { useEffect, useRef, useState } from 'react'
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPaperPlane, faFaceSmile, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
// import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';

// import { useAppContext } from '../context/AppContext';
// import data2 from '@emoji-mart/data';
// import Picker from '@emoji-mart/react';
// import {BsCheck2All} from "react-icons/bs"
// import { BsCheck } from 'react-icons/bs';


// const Chat = () => {
//   const { socket , location } = useAppContext();
//   const { id } = useParams();
//   const [userDataById, setUserDataById] = useState([]);
//   const [loggedUser, setLoggedUser] = useState([]);
//   const [data, setData] = useState([]);
//   const [isSearchData, setIsSearchData] = useState(false);
//   const [searchValue, setSearchValue] = useState("");
//   const [display, setDisplay] = useState(false);
//   const [display2, setDisplay2] = useState(false);
//   const [recieveMessages, setRecieveMessages] = useState([]);
//   const [recieveDbMessages, setRecieveDbMessages] = useState([]);
//   const [text, setText] = useState('');
//   const messageEndRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const [isSeen , setIsSeen] = useState(false);  
//   console.log("isSeen" , isSeen);

//   const scrollToBottom = () => {

   

//     if (messageEndRef.current) {
//       messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   };
//   const handleIconClick = () => {
//     fileInputRef.current.click();
//   };
//   const activeId = localStorage.getItem("id");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!activeId) {
//       navigate("/login");
//     } else {
//       axios
//         .get(`http://localhost:5000/admin/adminInfo/`, {
//           headers: { Authorization: `${activeId}` },
//         })
//         .then((res) => {
//           setLoggedUser(res.data);
//         })
//         .catch((err) => {
//           console.error(err);
//           if (err.response && err.response.status === 404) {
//             navigate("/login");
//           }
//         });
//     }
//   }, [activeId, navigate]);

//   useEffect(() => {
//     if (!id) {
//       navigate("/");
//     } else {
//       axios
//         .get(`http://localhost:5000/admin/team/${id}`)
//         .then((res) => {
//           setUserDataById(res.data);
//         })
//         .catch((err) => {
//           console.error(err);
//           if (err.response && err.response.status === 404) {
//             navigate("/");
//           }
//         });
//     }
//   }, [id, navigate]);

//   const fetchChats = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/chat/getChat`, {
//         params: {
//           fromId: activeId,
//           toId: id
//         }
//       });
//       setRecieveDbMessages(res.data);

//     } catch (error) {
//       console.error("Error fetching chats:", error);
//     }
//   };

//   useEffect(() => {
//     if (socket) {
//       // socket.connect();

//       socket.emit('receiveActiveId', activeId);
//       socket.emit('paramsId', id);

//       socket.on('receiveMsg', (msg ,messageId) => {
//         console.log('Message received:', msg);
//         setRecieveMessages(prevMessages => [...prevMessages, msg ,messageId]);
        
//       });


//       fetchChats();

//       return () => {
//         socket.off('receiveMsg');
//         setRecieveMessages([]);
//       };
//     }
//   }, [activeId, id, socket]);
//   // console.log("Checking: ",recieveMessages);
//   useEffect(() => {
    
    
//     scrollToBottom();
//   }, [recieveMessages ]);
//   const [status, setStatus] = useState(1);

// // Handle scrollToBottom effect

// const dataSend = { fromId: id, toId: activeId, status: 1 };
// socket.emit('seenMessages', dataSend);


// // Handle scrollToBottom effect on receiveDbMessages change
// useEffect(() => {
//   scrollToBottom();
// }, [recieveDbMessages]);



//   // useEffect(() => {
//   //   const data = { fromId: id, toId: activeId, status: 0 };
//   //   socket.emit('seenMessages', data);
//   // }, [id ,activeId]);

//   // useEffect(() => {
//   //   socket.on('recieveSeenMessage', (data) => {
//   //     console.log('Seen Messages:', data);
//   //     if(data && Number(data?.fromId) == Number(activeId) && Number(data?.toId) == Number(id) && data && data.status == 1){
//   //       setIsSeen(true);
//   //     }else{
//   //       // alert("Leaving chat")
//   //       const dataSend2 = { fromId: id, toId: activeId, status: 0 };
//   //       socket.emit('sendLeaveChat', dataSend2);
//   //       setIsSeen(false);
//   //     }
//   //   });

//   // }, [id]);

  

//   const [hasSeen, setHasSeen] = useState(false);
//   const previousIdRef = useRef(id);
  
//   const previousRouteRef = useRef(location.pathname); // Initialize with the current route


//   useEffect(() => {
//     // Listen for the 'receiveSeenMessage' event
//     const handleReceiveSeenMessage = (data) => {
//       console.log('Seen Messages:', data);
//       if (data && Number(data?.fromId) === Number(activeId) && Number(data?.toId) === Number(id) && data.status === 1) {
//         setIsSeen(true);
//       }

      
//     };

//     socket.on('receiveSeenMessage', handleReceiveSeenMessage);

//     return () => {
//       // Clean up the listener when the component unmounts or id/activeId/socket changes
//       socket.off('receiveSeenMessage', handleReceiveSeenMessage);
//     };
//   }, [id, activeId, socket , location.pathname]);


//   useEffect(() => {
//     // Emit 'sendLeaveChat' if route changes
//     const prevRoute = previousRouteRef.current;
//     const currentRoute = location.pathname;

//     if (prevRoute !== currentRoute) {
//       const dataSend2 = { fromId: activeId, toId: previousIdRef.current, status: 0 };
//       if (socket && socket.connected) {
//         socket.emit('sendLeaveChat', dataSend2);
//         console.log("Emitting sendLeaveChat with previous ID:", previousIdRef.current);
//       } else {
//         console.log("Socket not connected");
//       }
//       previousRouteRef.current = currentRoute; // Update the previous route ref
//     }

//   }, [location.pathname, socket, activeId]);

  

//   useEffect(() => {
//     // Emit 'sendLeaveChat' using the previous id value before it changes
//     const prevId = previousIdRef.current;
//     console.log("????????????????????????????????????????????????????????????????????????????????????Previous ID:", prevId , "id:", id);
    

//     if (prevId !== id || id == null || id) {
//       const dataSend2 = { fromId: activeId, toId: prevId, status: 0 };
//       if (socket.connected) {
//         socket.emit('sendLeaveChat', dataSend2);
//         console.log("Emitting sendLeaveChat with previous ID:", prevId);
//       } else {
//         console.log("Socket not connected");
//       }
//     }

//     // Update the ref to the current id after handling the sendLeaveChat
//     previousIdRef.current = id;
//   }, [activeId, id, socket ]);

//   // useEffect(() => {
//   //   const prevId = previousIdRef.current;
//   //   const prevRoute = previousRouteRef.current;
//   //   const currentRoute = location.pathname;

//   //   if( prevId !== id || prevRoute !== currentRoute) {
//   //     const dataSend2 = { fromId: activeId, toId: prevId, status: 0 };
//   //     if (socket.connected) {
//   //       socket.emit('sendLeaveChat', dataSend2);
//   //       console.log("Emitting sendLeaveChat with previous ID:", prevId);
//   //     } else {
//   //       console.log("Socket not connected");
//   //     }
//   //     previousRouteRef.current = currentRoute; // Update the previous route ref
//   //   }

//   //   // previousIdRef.current = id; // Update the previous ID ref
//   // }, [socket,activeId, id, location.pathname]);

//   useEffect(() => {
//     // Listen for the 'receiveLeaveChat' event
//     const handleReceiveLeaveChat = (data) => {
//       console.log('receiveLeaveChat:', data);
//       if (data && Number(data?.fromId) === Number(id) && Number(data?.toId) === Number(activeId)) {
//         setIsSeen(false);
//         setRecieveMessages([]); // Clear previous messages
//         fetchChats();

//       }
//     };

//     socket.on('receiveLeaveChat', handleReceiveLeaveChat);

//     return () => {
//       // Clean up the listener when the component unmounts or id/activeId/socket changes
//       socket.off('receiveLeaveChat', handleReceiveLeaveChat);
//     };
//   }, [activeId, id, socket]);

//   useEffect(()=>{
//     setIsSeen(false);
//   },[id])
//   useEffect(() => {
//     if (isSeen) {
//       setHasSeen(true);
//     } else {
//       setHasSeen(false);
//     }
//   }, [isSeen]);

//   // useEffect(() => {
//   //   // const data = ;
//   //     console.log("useEffect running")
//   // }, [id]);

//   // useEffect(() => {
//   //   const data = { fromId: id,toId: activeId, status: 1 };
//   //   socket.emit('seenMessages', data);
//   //   scrollToBottom();
//   // }, [recieveMessages, recieveDbMessages]);

//   // useEffect(() => {
//   //   const data = { fromId: id,toId: activeId, status: 0 };
//   //   socket.emit('seenMessages', data);


//   // }, [id]);





// const filteredMessages = recieveMessages.filter(msg => 
//   (msg.fromId === id && msg.toId === activeId) || (msg.fromId === activeId && msg.toId === id && msg.fromId !== msg.toId)
// );



  

//   // socket.on('recieveSeenMessage', (data ) => {
//   //   console.log('Seen Messages:'  ,data );
//   //   if(data && data.status === 1){
//   //     setIsSeen(true)
//   //   }else{
//   //     setIsSeen(false)
//   //   }
//   // });


//   const [isTyping , setIsTyping] = useState(false);
//   useEffect(() => {
//     // alert(id)
//     // alert(isSeen)
    
//     setIsTyping(false);
    
//   },[id])
  

  
//   const handleSendText = (e) => {
//     setText(e.target.value);
    
//     if (e.target.value.length !== 0 || text.length !== 0) {
//       scrollToBottom();
//       const messageData = { fromId: activeId, toId: id, status: 1 };
//       socket.emit('typing', messageData, (response) => {
//         if (response && response.status === 'ok') {
//           // console.log(response.msg);
//         } else {
//           console.error('Message delivery failed or no response from server');
//         }
//       });

//     }else{
//       const messageData = { fromId: activeId, toId: id, status: 0 };

//       socket.emit('typing', messageData, (response) => {
//         if (response && response.status === 'ok') {
//           console.log(response.msg);
//         } else {
//           console.error('Message delivery failed or no response from server');
//         }
//       });
//     }

//     return () => {
//       const messageData = { fromId: activeId, toId: id, status: 0 };

//       socket.emit('typing', messageData, (response) => {
//         if (response && response.status === 'ok') {
//           console.log(response.msg);
//         } else {
//           console.error('Message delivery failed or no response from server');
//         }
//       });
//   };
//   };
//   console.log("isTyping" , isTyping);
  
// useEffect(()=>{
//   socket.on('receiveTyping', (res) => {
//     console.log('Typing Response:', res);
//     if(res.status === 1 && res.fromId === id){
//       setIsTyping(true)

//     }
//     if(res.status === 0 ){
//       setIsTyping(false)
//     }
//     scrollToBottom();
//   });
// },[id])
  
//   const [activeUsers, setActiveUsers] = useState([]);
//   const [activeStatus, setActiveStatus] = useState(false);
// // console.log("activeUsers: " , activeUsers);
// //   socket.on('allusers', (res) => {
// //     console.log('allusers:', res);
// //     setActiveUsers(res.id);
// //     const filter = res.filter((user) => Number(user.paramsId) === Number(id));
// //     console.log('filter:', filter);
// //     if (filter.length > 0) {
// //       setActiveStatus(true);
// //     } else {
// //       setActiveStatus(false);
// //     }
     
   
// //     }
// // );

// socket.on('allusers', (res) => {
//   // console.log('allusers:', res);

//   // Ensure `res` is an array
//   if (Array.isArray(res)) {
//       // Extract and set active user IDs
//       setActiveUsers(res);
      
//       // Convert `id` to a number for comparison
//       const numericId = Number(id);

//       // Filter users based on the matching `paramsId`
//       const filter = res.filter((user) => Number(user.id) === numericId);
//       // console.log('filter:', filter);
      
//       // Update active status based on filter results
//       if (filter.length > 0) {
//           setActiveStatus(true);
//       } else {
//           setActiveStatus(false);
//       }
//   } else {
//       console.error('Expected an array but received:', res);
//   }
// });


 



//   const handleSearchChange = (e) => {
//     const searchTerm = e.target.value;
//     setSearchValue(searchTerm);
//     if (searchTerm.length > 0) {
//       setIsSearchData(true);
//     } else {
//       setData([]);
//       setIsSearchData(false);
//       return;
//     }
//     axios
//       .get(`http://localhost:5000/admin/search/${searchTerm}`)
//       .then((res) => {
//         setData(res.data);
//       })
//       .catch((err) => {
//         console.log("Error searching providers:", err);
//       });
//   };

//   const handleChatUser = (id) => {
//     navigate(`/chat/${id}`);
//     setData([]);
//     setSearchValue("");
//     setDisplay(false);
//     setIsSearchData(false);
//   };

 

// const [chatBarUsers , setChatBarUsers] = useState([])

//   useEffect(() => {
//     axios.get(`http://localhost:5000/chat/getChatbarUser/${loggedUser.id}`)
//     .then((res) => {
//       setChatBarUsers(res.data);
//       // console.log("Users:", res.data);
//     })
//     .catch((err) => {
//       console.log("Error getting users:", err);
//     });
//   }, [loggedUser]);



//   // file upload
//   const [file, setFile] = useState(null);
 
//     // const convertToBase64 = (e) => {
//     //   let reader = new FileReader();
//     //   reader.readAsDataURL(e.target.files[0]);

//     //   reader.onload = () => {

//     //     setFile(reader.result);
//     //     console.log(reader.result);
//     //   };

//     //   reader.onerror = (error) => {
//     //     console.log("Error: ", error);
//     //   };
//     // }
//   const [fileVedio, setFileVedio] = useState(null);
//   const convertToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
  
//       reader.onload = () => {
//         setFile(reader.result);
//         resolve(reader.result);
//         setFileVedio(reader.result);
//       };
  
//       reader.onerror = (error) => {
//         reject(error);
//       };
//     });
//   };


//   const convertToBlob = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
      
//       reader.onloadend = () => {
//         const blob = new Blob([reader.result], { type: file.type });
//         resolve(blob);
//       };
  
//       reader.onerror = reject;
//       reader.readAsArrayBuffer(file);
//     });
//   };
  
//   const [fileName , setFileName]  = useState('');

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       // console.log("File", file);
//       // alert(file.name)
//       setFileName(file.name);
      
  
//       // Provide feedback based on file type and size
//       if (file.size > 20 * 1024 * 1024) { // 25 MB size limit
//         alert("File is too large. Please upload a smaller file.");
//         return;
//       }
      
//       // Check file type and handle accordingly
//       const fileType = file.type;
//       if (fileType.startsWith('image/')) {
//         try {
//           const blob = await convertToBlob(file);
//           await convertToBase64(blob);
//           console.log("Image Blob:", blob);
//         } catch (error) {
//           console.error("Error converting image to Blob:", error);
//         }
//       } else if (fileType.startsWith('video/')) {
//         // Handle video files
//         console.log("Video file selected:", file);
//         try {
//           const blob = await convertToBlob(file);
//           await convertToBase64(blob);
//           console.log("Video Blob:", blob);
//         } catch (error) {
//           console.error("Error converting video to Blob:", error);
//         }
//       } else if (fileType.startsWith('application/')) {
//         // Handle document files
//         console.log("Document file selected:", file);
//         try {
//           const blob = await convertToBlob(file);
//           await convertToBase64(blob);
//           console.log("Document Blob:", blob);
//         } catch (error) {
//           console.error("Error converting document to Blob:", error);
//         }
//       } else {
//         alert("Unsupported file type. Please upload an image, video, or document.");
//         return
//       }
//     }
//   };
  
  
//   // const handleFileUpload = (event) => {
//   //   if(event.target.files[0]){
//   //     console.log("Files",event.target.files[0]);
      
//   //   }
//   //   return
//   // };
  
  

//   const [filepath , setFilePath] = useState([]);
  
//   // const handleSendFile = async (e) => {
//   //   e.preventDefault();
//   //   if (file) {
//   //     try {
//   //       // Convert file to Blob
//   //       // const blob = await convertToBlob(file);
//   //       const fileData = {
//   //         fromId: activeId,
//   //         // ISO 8601 formatted timestamp
//   //         toId: id,
//   //         status: 0
//   //       };
        
  
//   //       // Check if socket is connected before sending
//   //       if (socket.connected) {
//   //         socket.emit('sendFile', fileData, (response) => {
//   //           if (response.status === 'ok') {
//   //             console.log('File sent successfully');
//   //           } else {
//   //             console.error('File delivery failed', response.error);
//   //           }
//   //         });
//   //       } else {
//   //         console.error('Socket is not connected');
//   //       }
  
//   //       setFile(null); // Reset file input after sending
//   //     } catch (error) {
//   //       console.error('Error converting file to Blob:', error);
//   //     }
//   //   } else {
//   //     console.error('No file selected');
//   //   }
//   // };
  

//   const handleSendMessage  = (e) => {
//     e.preventDefault();
    
//     if (text.trim() || file) {
//       console.log("Last File:  ",file);
//       const messageData = {
//         fromId: activeId,
//         toId: id,
//         text,
//         file: file,
//         fileName: fileName,
//         time: new Date().toISOString(),
//         }
//       setText('');
//       setFile(null); 
//       setShowEmogi(false);
//       socket.emit('sendMsg', messageData, (response) => {
//         if (response.status === 'ok') {
//           // console.log(response.msg);
//         } else {
//           console.error('Message delivery failed');
//         }
//       });

//       const typingData = { fromId: activeId, toId: id, status: 0 };

//       socket.emit('typing', typingData, (response) => {
//         if (response && response.status === 'ok') {
//           // console.log(response.msg);
//         } else {
//           console.error('Message delivery failed or no response from server');
//         }
//       });
//     }
//   };
  


// useEffect(() => {
//     socket.on('fileSaved', (data) => {
//       console.log('File saved at:', data);
//       setFilePath(prevFiles => [...prevFiles, data]);
//     });

//     return () => {
//       socket.off('fileSaved');
//     };
//   }, []);

//   const getFileType = (file) => {
//     // Extract the MIME type from the base64 string
//     const mimeType = file.split(';')[0].split(':')[1];
//     return mimeType;
//   };


//   const filteredFiles = filepath.filter(data => 
//     (data.fromId === id && data.toId === activeId) || (data.fromId === activeId && data.toId === id && data.fromId !== data.toId)
//   );

//   const [showEmogi , setShowEmogi] = useState(false);
  
//   const handleShowEmogi = () => {
//     setShowEmogi(!showEmogi);
//   }

//   const handleEmojiSelect = (emoji) => {
//     console.log(emoji.native);
//     setText(text + emoji.native);


//   };

//   function formatTimeWithAMPM(time) {
//     // Create a new Date object from the provided time
//     const date = new Date(time);
  
//     // Extract hours, minutes, and seconds
//     let hours = date.getHours();
//     const minutes = date.getMinutes();
//     // const seconds = date.getSeconds();
  
//     // Determine AM or PM suffix
//     const ampm = hours >= 12 ? ' PM' : ' AM';
  
//     // Convert hours from 24-hour to 12-hour format
//     hours = hours % 12;
//     hours = hours ? hours : 12; // The hour '0' should be '12'
  
//     // Format minutes and seconds with leading zeros if needed
//     const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
//     // const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
  
//     // Construct the formatted time string
//     const formattedTime = `${hours}:${formattedMinutes}${ampm}`;
  
//     return formattedTime;
//   }
  

//   const getLastSeenMessageIndex = (messages) => {
//     const seenMessages = messages.filter(msg => msg.seen === 1);
//     return seenMessages.length > 0 ? messages.indexOf(seenMessages[seenMessages.length - 1]) : -1;
//   };

//   const lastSeenMessageIndex = getLastSeenMessageIndex(recieveDbMessages);




//   return (
//     <>
  
//        <div className="container-fluid" style={{  overflow:'hidden'}}>
//        <div className="card p-3" style={{height:'80vh'}}>
//         <div className="messenger" style={{height:'100%'}}>
//         <input type="hidden" id="chat_type" defaultValue="" />
//         <input type="hidden" id="chat_type_id" defaultValue="" />
//         <div className={display === true ? " d-block chatbar  " : "messenger-listView"} >
      
//         <div className="m-header" >
//             <nav  className='mb-2'>
//               <div className="row">
//                 <div className="col">
//                   <img src={loggedUser.pfpImage} style={{objectFit:'cover' , width:'35px'  , height:'35px' , borderRadius:'50%'}} alt="" />
//                 </div>
//             <div className="col text-end cursor-pointer">
              
//             <i class='bx bx-dots-vertical' ></i>
//             </div>
//           </div>
//         </nav>
//         <input type="text" className="messenger-search" value={searchValue}  onChange={handleSearchChange} placeholder="Search" />
        
//       </div>
//       <div className="m-body contacts-container">
//       <div className="row mx-2" style={{background:'#f7f7f7' }}>
//           <div className="col-12">
          
//              <table className="messenger-list-item " data-contact={7}>
//             <tbody>
//             {data.map((item, index) => (
//           <tr key={index} onClick={()=>handleChatUser(item.id)} style={{cursor:'pointer'}}>
           
//             <td>
              
//                 <div className="saved-messages avatar av-m">
//                   <img src={item.pfpImage} style={{ objectFit: 'cover' }} alt="" />
//                 </div>
              
//             </td>
//             <td className="text-capitalize">
//               {item.name}
//               <span className="d-block m-0 p-0">Click to chat.</span>
//             </td>
//           </tr>
//         ))}
//             </tbody>
//                  </table>
                
//           </div>
//         </div>
//         <div
//           className="show messenger-tab users-tab app-scroll"
//           data-view="users"
//         >
        
//           {data.length === 0 && isSearchData === false && (
//             <>
//             <table className="messenger-list-item mt-3" data-contact={7}>
//             <tbody>

//               <tr  data-action={0} onClick={()=>handleChatUser(loggedUser.id)} style={{cursor:'pointer'}}>
//                 <td >
//                   <div className="saved-messages avatar av-m">
//                     <img src={loggedUser.pfpImage} style={{objectFit:'cover'}} alt="" />
//                   </div>
//                 </td>
//                 <td className='text-capitalize '>
//                   <p data-id={7} data-type="user">
//                     <span>You</span>
//                   </p>
//                   {loggedUser.name}
//                   <span className='d-block m-0 p-0'>Save Messages Secretly</span>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//           <p className="messenger-title">
//             <span>All Messages</span>
//           </p>

//         {chatBarUsers?.map((item, index) => (
//            <table className="messenger-list-item mt-3" data-contact={7}>
//            <tbody>

//              <tr  data-action={0} onClick={()=>handleChatUser(item.id)} style={{cursor:'pointer'}}>
//                <td >
//                  <div className="saved-messages avatar av-m">
//                    {/* <img src={item.pfpImage} style={{objectFit:'cover'}} alt="" /> */}
                 
//                    <div className="">
//                    <div className="saved-messages avatar av-m">
//                     <img src={item.pfpImage} style={{objectFit:'cover'}} alt="" />
//                   </div>
//                   <div className={activeUsers.find(data => Number(data.id) === Number(item.id)) ? 'avatar-online-status' : 'avatar-offline-status'}></div>

//                 </div>

//                  </div>
//                </td>
//                <td className='text-capitalize '>
//                  <p data-id={7} data-type="user">
//                    {/* <span>You</span> */}
//                  </p>
//                  {item.name}
//                  <span className='d-block m-0 p-0'>click to chat</span>
//                  {/* <p>{activeUsers.filter(data => Number(data.id) === Number(item.id) ? 'id' : 'not')}</p> */}
               

//                   {/* <p>{ activeUsers.map(e => \e.id == item.id) ? 'online': 'ofline'}</p> */}
//                </td>
//              </tr>
//            </tbody>
//          </table>
//         ))}
//           <div
//             className="listOfContacts"
//             style={{
//               width: "100%",
//               height: "calc(100% - 272px)",
//               position: "relative"
//             }}
//           />





//           </>
//           )}
//           {data.length === 0 && isSearchData === true && (
//             <>
//             <p>No user found</p>
//             </>
//           )}


//         </div>
//         <div className="messenger-tab search-tab app-scroll" data-view="search">
//           <p className="messenger-title">
//             <span>Search</span>
//           </p>
//           <div className="search-records">
//             <p className="message-hint center-el">
//               <span>Type to Search..</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>

    
//     <div className={display === true ? "  messenger-messagingView  dynamic-display"  : "messenger-messagingView"} >
//     <div className="m-header m-header-messaging viewheaderBigscreen">
//         <nav className="chatify-d-flex chatify-justify-content-between chatify-align-items-center">
//           <div className="chatify-d-flex chatify-justify-content-between chatify-align-items-center">
//             <a href="#" className="show-listView">
//               <i className="fas fa-arrow-left" />
//             </a>
//               <button class="navbar-toggler" onClick={() => navigate('/chat')} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                         <i class='bx bx-arrow-back'></i>
//               </button>
              
//               <div className="">
//                    <div className="saved-messages avatar av-m">
//                     <img src={userDataById.pfpImage} style={{objectFit:'cover'}} alt="" />
//                   <div className={activeStatus === true ? 'avatar-online-status' : 'avatar-offline-status'}></div>
//                   </div>

//                 </div>

//             <a className="user-name text-capitalize" style={{marginTop:'-10px'}}>
//   {userDataById?.name}
//   {/* <p>s</p> */}
// </a>
//  <br />
//   <p  className={isTyping ? 'd-block text-primary typing-text' : 'd-none text-primary'} style={{ fontSize: '12px' }}>
//     Typing...
//   </p>
//   <p className={isTyping ? ' d-none' : 'd-block typing-text'}>{activeStatus === true ? <span className='text-success'>Online</span> : <span className='text-secondary'>Offline</span>}</p>

//           </div>
//           <nav className="m-header-right">
//             <a href="#" className="add-to-favorite">
//               <i className="fas fa-star" />
//             </a>
//             <a >
//               <i className="fas fa-home" />
//             </a>
//             <a onClick={() => setDisplay2(!display2)} className="show-infoSide cursor-pointer">
//             <i class='bx bxs-info-circle' style={{color:'#2180f3' , fontSize:'24px'}}></i>
//             </a>
//           </nav>
//         </nav>
//         <div className="internet-connection">
//           <span className="ic-connected">Connected</span>
//           <span className="ic-connecting">Connecting...</span>
//           <span className="ic-noInternet">No Internet Access</span>
//         </div>
//       </div> 


      
//       <div className="m-body messages-container app-scroll" style={{ height: "81vh", overflow: 'scroll', padding: '0px 30px' }}>
//       <div className='mt-5' style={{ marginBottom: '300px' }}>
//         <div className='d-flex justify-content-center'>
//           <img src={userDataById?.pfpImage} alt="" style={{ width: '140px', height: '140px', borderRadius: '50%', objectFit: 'cover' }} />
//         </div>
//         <h5 className='text-center text-capitalize mt-2'>{userDataById?.name}</h5>
//         <p style={{ fontSize: '12px', marginBottom: '5px', color: "grey", textAlign: 'center' }}>You are now connected on GMG Messenger</p>
//         <p style={{ fontSize: '12px', marginBottom: '5px', color: "grey", textAlign: 'center' }}>You're friends on Gmg Solutions chatting Hub.</p>
//       </div>
            
   

//                   <div className="messages" id="messages">
//                 {recieveDbMessages.map((msg, index) => (
                 
//                   <div key={index} >
//                   {msg.text && !msg.file ? (
//                       <div>
//                         <p className={` ${Number(msg.fromId) === Number(activeId) ? 'time-socket-end' : 'time-socket-start'}`} style={{fontSize:'10px' , color:'#6d6d6d' , marginBottom:'-110px'}}>{formatTimeWithAMPM(msg.time)} </p>
//                         <p className={` ${Number(msg.fromId) === Number(activeId) ? 'left' : 'right'}`}>{msg.text} 
//                         {/* <p style={{position:'absolute' , marginTop:'-15px' , marginLeft:'50px'}} className={` ${Number(msg.fromId) === Number(activeId) ? 'd-block' : 'd-none'}`} >   <BsCheck2All style={msg.seen == 1 ? {color:'rgb(63, 122, 249)'} : {color:'white'}} /></p> */}
//                         </p>
                       
//                         {/* <p  className={` ${Number(msg.fromId) === Number(activeId) ? 'd-block' : 'd-none'}`} > {msg.seen == 1 && "Message SEen"}</p> */}
                          
//                       </div>
//                   ) : (
//                     msg.file && (
//                       <div  className={`${
//                         Number(msg.fromId) === Number(activeId) ? 'chat-image-view-left' : 'chat-image-view-right'
//                       }`}>
//                         {msg.file.startsWith('data:image/') && (
//                           <>
                          
//                           <span className={` ${Number(msg.fromId) === Number(activeId) ? 'left-time' : 'right-time'}`} style={{fontSize:'10px' , marginBottom:'100px',color:'#6d6d6d', position:'absolute' }}>{formatTimeWithAMPM(msg.time)} </span>
//                           <img src={msg.file} alt={msg.fileName} className="message-image mt-3" /> 
                          
//                           </>
//                         )}
//                         {msg.file.startsWith('data:video/') && (
//                           <>
//                           <span className={` ${Number(msg.fromId) === Number(activeId) ? 'left-time' : 'right-time'}`} style={{fontSize:'10px' , marginBottom:'100px',color:'#6d6d6d', position:'absolute' }}>{formatTimeWithAMPM(msg.time)} </span>

//                           <video controls className="message-video">
//                             <source src={msg.file} type={msg.file.split(';')[0].split(':')[1]} />
//                             Your browser does not support the video tag.
//                           </video>
//                           </>
//                         )}
//                         {msg.file.startsWith('data:application/') && (
//                           // <a href={msg.file} download={msg.fileName} className="message-document">
//                           <div className='doc-bg'> 
//                           <p className='text-center'>File : {msg.fileName}</p>
//                           <img src="/assets/images/document.jpg" alt="" />
//                           <p className='text-center'>Document</p>
//                           </div>
//                           // </a>
//                         )}
//                       </div>
//                     )
//                   )}
//                   <br /><br /><br />
//                   {!hasSeen && index === lastSeenMessageIndex && (
//             <div style={{float:'right'}}>
//               <img src={userDataById?.pfpImage} style={{ width: '15px', height: '15px', borderRadius: '50%', objectFit: 'cover' }} alt="" />
//             </div>
//           )}

//                   {/* <span className="message-time">
//                     {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                   </span> */}
//                 </div>
//                 ))}
            

//                     {filteredMessages.map((msg, index) => (
//                       <div key={index} >
//                         {msg.text && !msg.file ? (
//                            <div>
                                

//                              <p className={` ${Number(msg.fromId) === Number(activeId) ? 'time-socket-end' : 'time-socket-start'}`} style={{fontSize:'10px' ,color:'#6d6d6d' , marginBottom:'-110px'}}>{formatTimeWithAMPM(msg.time)} </p>
//                            <p className={` ${Number(msg.fromId) === Number(activeId) ? 'left' : 'right'}`}>{msg.text}<span >
//                            {/* <span >   <BsCheck2All size={18} style={{marginTop:'12px' , marginLeft:'-6px' , position:"absolute" }} className={isSeen === true ? 'seen' : ''} />    </span> */}
//                            </span>
//                            </p>
//                          </div>
//                           ) : (
//                           msg.file && (
//                             <div  className={`${
//                               msg.fromId === activeId ? 'chat-image-view-left' : 'chat-image-view-right'
//                             }`}>
//                               {msg.file.startsWith('data:image/') && (
//                                 <>
//                                  <span className={` ${Number(msg.fromId) === Number(activeId) ? 'left-time' : 'right-time'}`} style={{fontSize:'10px' , marginBottom:'100px',color:'#6d6d6d', position:'absolute' }}>{formatTimeWithAMPM(msg.time)} </span>
//                                   <img src={msg.file} alt={msg.fileName} className="message-image mt-3" /> 
                          
//                            </>
//                               )}
//                               {msg.file.startsWith('data:video/') && (
//                                 <video controls className="message-video">
//                                   <source src={msg.file} type={msg.file.split(';')[0].split(':')[1]} />
//                                   Your browser does not support the video tag.
//                                 </video>
//                               )}
//                               {msg.file.startsWith('data:application/') && (
//                                 // <a href={msg.file} download={msg.fileName} className="message-document">
//                                 <div className='doc-bg'> 
//                                 <p className='text-center'>File : {msg.fileName}</p>
//                                 <img src="/assets/images/document.jpg" alt="" />
//                                 <p className='text-center'>Document</p>
//                                 </div>
//                                 // </a>
//                               )}
//                             </div>
//                           )
//                         )}

                          
                         

//                             {/* <span className="message-time">
//                           {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                         </span> */}
//                       </div>
//                     ))}
                    
//                     {/* <br /><br /><br /> */}
//                           {hasSeen && activeStatus === true && (
//       <div style={{ float: 'right' }}>
//         <img
//           src={userDataById?.pfpImage}
//           style={{ width: '15px', height: '15px', borderRadius: '50%', objectFit: 'cover' , float:'right' }}
//           alt=""
//         />
//       </div>
//     )}
//              {/* {filteredFiles.map((item, index) => {
//         const fileType = getFileType(item.file);

//         return (
//           <div
//             key={index}
//             className={`${
//               item.fromId === activeId ? 'chat-image-view-left' : 'chat-image-view-right'
//             }`}
//           >
//             {fileType.startsWith('image/') && (
//               <img src={item.file} alt="content" />
//             )}
//             {fileType.startsWith('video/') && (
//                 <video controls >
//                 <source src={item.file} type={fileType} />
//                 Your browser does not support the video tag.
//               </video>
//             )}
//             {fileType.startsWith('application/') && (
//               <div className='doc-bg'> 
//               <p className='text-center'>File : {item.fileName}</p>
//               <img src="/assets/images/document.jpg" alt="" />
//               <p className='text-center'>Document</p>
//               </div>
//             )}
            
//           </div>
//         );
//             })} */}


// {/* {filteredMessages.map((msg, index) => (
//                   <div key={index} >
//                       <p className={` ${msg.fromId === activeId ? 'left' : 'right'}`}>{msg.text}</p>
            
//                       <span className="message-time">
//                         {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                       </span>
//                   </div>
//                 ))} */}
            

                
//                 <div style={{marginLeft:'-10px'}} className={isTyping === true ? 'd-block ' : 'd-none'}>
//         <div className="message-card typing">
//           <div className="message">
//             <span className="typing-dots">
//               <span className="dot dot-1 " />
//               <span className="dot dot-2 " />
//               <span className="dot dot-3 " />
//             </span>
//           </div>
//         </div>
//                </div>
//                <div ref={messageEndRef} />
            

//               </div>



      

//     </div>





//     {showEmogi === true &&
//               <div className='emogi-picker'>
// <Picker data={data2} onEmojiSelect={handleEmojiSelect} style={{width:'100%' , height:'50vh'}} />


//                 </div>
//             }
//     <div className="messenger-sendCard" >
//   <form
//     id="message-form"
//     method="POST"
//     onSubmit={ handleSendMessage}
//     // onSubmit={handleSendFile}
//     // action="https://taskify.taskhub.company/chat/sendMessage"
//     encType="multipart/form-data"
//   >
//      <div>
//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileUpload}
//         className="d-none"
//       />
//       <FontAwesomeIcon icon={faCirclePlus} onClick={handleIconClick} />
//     </div>
//    <button className="emoji-button m-0 p-0" >
  
//     <span className="fas fa-smile" />
//     </button>
//     <button className="emoji-button m-0 p-0" type='button' onClick={handleShowEmogi}>
//     <FontAwesomeIcon icon={faFaceSmile} />
//     <span className="fas fa-smile" />
//     </button>
//    {file === null && 
//     <textarea
//     name="message"
//     className="m-send app-scroll"
//     value={text}
//     onChange={handleSendText}
//     placeholder="Type a Message.."
//     style={{ overflow: "hidden", overflowWrap: "break-word", height: 44 }}
//     // defaultValue={""}
//   />}

//   {file !== null  && (
//     <div className="attachment-preview" style={{width:'100%'}}>
//       <p>{file.name}</p>
//       </div>
//   )}
//     <button className="send-button">
//     <FontAwesomeIcon icon={faPaperPlane} style={{color:'#2180f3'}} />
//       <span className="fas fa-paper-plane" />{" "}
//     </button>
//   </form>
// </div>      
//     </div>


    
//     <div className={display2 === false ? "d-none" : "messenger-infoView app-scroll"}>
//       <nav>
//         <p>User Details</p>
//         <a onClick={() => setDisplay2(false)}>
//         <i class='bx bx-x' style={{fontSize:'25px' , cursor:'pointer' , marginTop:'-20px'}}></i>
//         </a>
//       </nav>
//       <div className="avatar av-l chatify-d-flex">
//       <img src={userDataById?.pfpImage} style={{objectFit:'cover'}} alt="" />
//       </div>
     
//       <p className="info-name text-capitalize">{userDataById?.name}</p>
//       {/* <p className="info-name text-danger " style={{fontSize:'12px' , }}>Delete Conversation</p> */}
//       <p className="messenger-title">
//             <span className="text-capitalize text-muted" style={{ fontSize: "12px" ,fontWeight:'500' }}>Shared Photos</span>
//           </p>
      
    
//     </div>
//   </div>
//   <div id="imageModalBox" className="imageModal">
//     <span className="imageModal-close">×</span>
//     <img className="imageModal-content" id="imageModalBoxSrc" />
//   </div>
//   <div className="app-modal" data-name="delete">
//     <div className="app-modal-container">
//       <div className="app-modal-card" data-name="delete" data-modal={0}>
//         <div className="app-modal-header">
//           Are You Sure You Want to Delete This?
//         </div>
//         <div className="app-modal-body">You Cannot Undo This Action</div>
//         <div className="app-modal-footer">
//           <a href="javascript:void(0)" className="app-btn cancel">
//             Cancel
//           </a>
//           <a href="javascript:void(0)" className="app-btn a-btn-danger delete">
//             Yes
//           </a>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div className="app-modal" data-name="alert">
//     <div className="app-modal-container">
//       <div className="app-modal-card" data-name="alert" data-modal={0}>
//         <div className="app-modal-header" />
//         <div className="app-modal-body" />
//         <div className="app-modal-footer">
//           <a href="javascript:void(0)" className="app-btn cancel">
//             Cancel
//           </a>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div className="app-modal" data-name="settings">
//     <div className="app-modal-container">
//       <div className="app-modal-card" data-name="settings" data-modal={0}>
//         <form
//           id="update-settings"
//           action="https://taskify.taskhub.company/public/chat/updateSettings"
//           encType="multipart/form-data"
//           method="POST"
//         >
//           <input
//             type="hidden"
//             name="_token"
//             defaultValue="bVvD0JC0kYMhCa3a8W5sqsCyxOBrkLW5QaqRaFI3"
//             autoComplete="off"
//           />
//           <div className="app-modal-body">
//             <div
//               className="avatar av-l upload-avatar-preview chatify-d-flex"
//               style={{
//                 backgroundImage:
//                   'url("/storage/users-avatar/f724c64a-28c7-402a-8c4b-89efff99cdac.jpg")'
//               }}
//             />
//             <p className="upload-avatar-details" />
//             <label
//               className="app-btn a-btn-primary update"
//               style={{ backgroundColor: "#2180f3" }}
//             >
//               Upload New{" "}
//               <input
//                 className="upload-avatar chatify-d-none"
//                 accept="image/*"
//                 name="avatar"
//                 type="file"
//               />
//             </label>
//             <p className="divider" />
//             <p className="app-modal-header">
//               Dark Mode{" "}
//               <span
//                 className="
//                   far fa-moon dark-mode-switch"
//                 data-mode={0}
//               />
//             </p>
//             <p className="divider" />
//             <div className="update-messengerColor">
//               <span
//                 style={{ backgroundColor: "#2180f3" }}
//                 data-color="#2180f3"
//                 className="color-btn"
//               />
//               <span
//                 style={{ backgroundColor: "#2196F3" }}
//                 data-color="#2196F3"
//                 className="color-btn"
//               />
//               <span
//                 style={{ backgroundColor: "#00BCD4" }}
//                 data-color="#00BCD4"
//                 className="color-btn"
//               />
//               <span
//                 style={{ backgroundColor: "#3F51B5" }}
//                 data-color="#3F51B5"
//                 className="color-btn"
//               />
//               <span
//                 style={{ backgroundColor: "#673AB7" }}
//                 data-color="#673AB7"
//                 className="color-btn"
//               />
//               <br />
//               <span
//                 style={{ backgroundColor: "#4CAF50" }}
//                 data-color="#4CAF50"
//                 className="color-btn"
//               />
//               <span
//                 style={{ backgroundColor: "#FFC107" }}
//                 data-color="#FFC107"
//                 className="color-btn"
//               />
//               <span
//                 style={{ backgroundColor: "#FF9800" }}
//                 data-color="#FF9800"
//                 className="color-btn"
//               />
//               <span
//                 style={{ backgroundColor: "#ff2522" }}
//                 data-color="#ff2522"
//                 className="color-btn"
//               />
//               <span
//                 style={{ backgroundColor: "#9C27B0" }}
//                 data-color="#9C27B0"
//                 className="color-btn"
//               />
//               <br />
//             </div>
//           </div>
//           <div className="app-modal-footer">
//             <a href="javascript:void(0)" className="app-btn cancel">
//               Cancel
//             </a>
//             <input
//               type="submit"
//               className="app-btn a-btn-success update"
//               defaultValue="Save Changes"
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   </div>
//         </div>
        
//        </div>

// </>

//   )
// }

// export default Chat


// // import axios from 'axios';
// // import React, { useEffect, useRef, useState } from 'react'
// // import { useNavigate, useParams } from 'react-router-dom';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faPaperPlane, faFaceSmile, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

// // import io from 'socket.io-client';
// // const Socket = io('http://localhost:5000');



// // const Chat = () => {
// //   const { id } = useParams();
// //   const [userDataById, setUserDataById] = useState([]);
// //   const [loggedUser, setLoggedUser] = useState([]);
// //   const [data, setData] = useState([]);
// //   const [isSearchData, setIsSearchData] = useState(false);
// //   const [searchValue, setSearchValue] = useState("");
// //   const [display, setDisplay] = useState(false);
// //   const [display2, setDisplay2] = useState(false);
// //   const [recieveMessages, setRecieveMessages] = useState([]);
// //   const [recieveDbMessages, setRecieveDbMessages] = useState([]);
// //   const [text, setText] = useState('');
// //   const messageEndRef = useRef(null);

  
// //   const activeId = localStorage.getItem("id");
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (!activeId) {
// //       navigate("/login"); // Redirect to login
// //     } else {
// //       axios
// //         .get(`http://localhost:5000/admin/adminInfo/`, {
// //           headers: { Authorization: `${activeId}` },
// //         })
// //         .then((res) => {
// //           setLoggedUser(res.data);
// //         })
// //         .catch((err) => {
// //           console.error(err);
// //           if (err.response && err.response.status === 404) {
// //             navigate("/login"); // Redirect to login on 404
// //           }
// //         });
// //     }
// //   }, [activeId, navigate]);

// //   useEffect(() => {
// //     if (!id) {
// //       navigate("/"); // Redirect to home
// //     } else {
// //       axios
// //         .get(`http://localhost:5000/admin/team/${id}`)
// //         .then((res) => {
// //           setUserDataById(res.data);
// //         })
// //         .catch((err) => {
// //           console.error(err);
// //           if (err.response && err.response.status === 404) {
// //             navigate("/"); // Redirect to home on 404
// //           }
// //         });
// //     }
// //   }, [id, navigate]);

// //   useEffect(() => {
// //     // Initialize socket connection and listeners
// //     Socket.connect();
// //     Socket.emit('receiveActiveId', activeId);
// //     Socket.emit('paramsId', id);

// //     Socket.on('receiveMsg', (msg) => {
// //       console.log('Message received:', msg);
// //       setRecieveMessages(prevMessages => [...prevMessages, msg]);
// //     });

// //     // Fetch existing chat messages from the database
// //     axios.get(`http://localhost:5000/chat/getChat`, {
// //       params: {
// //         fromId: activeId,
// //         toId: id
// //       }
// //     })
// //     .then((res) => {
// //       console.log(res.data);
// //       setRecieveDbMessages(res.data);
// //     })
// //     .catch((err) => {
// //       console.error(err);
// //     });

// //     // Cleanup on component unmount or route change
// //     return () => {
// //       Socket.off('receiveMsg');
// //       Socket.disconnect();
// //       setRecieveMessages([]);
// //     };
// //   }, [activeId, id]);

// //   const handleSearchChange = (e) => {
// //     const searchTerm = e.target.value;
// //     setSearchValue(searchTerm);
// //     if (searchTerm.length > 0) {
// //       setIsSearchData(true);
// //     } else {
// //       setData([]);
// //       setIsSearchData(false);
// //       return;
// //     }
// //     axios
// //       .get(`http://localhost:5000/admin/search/${searchTerm}`)
// //       .then((res) => {
// //         setData(res.data);
// //       })
// //       .catch((err) => {
// //         console.log("Error searching providers:", err);
// //       });
// //   };

// //   const handleChatUser = (id) => {
// //     navigate(`/chat/${id}`);
// //     setData([]);
// //     setSearchValue("");
// //     setIsSearchData(false);
// //   };

// //   const scrollToBottom = () => {
// //     messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //   };

// //   const handleSendMessage = (e) => {
// //     e.preventDefault();
// //     if (text.trim()) {
// //       const messageData = { fromId: activeId, toId: id, text, timestamp: new Date() };
// //       setText('');
// //       Socket.emit('sendMsg', messageData, (response) => {
// //         if (response.status === 'ok') {
// //           console.log(response.msg);
// //           scrollToBottom();

// //         } else {
// //           console.error('Message delivery failed');
// //         }
// //       });
// //     }
// //   };

// //   const filteredMessages = recieveMessages.filter(msg => 
// //     (msg.fromId === id && msg.toId === activeId) || (msg.fromId === activeId && msg.toId === id)
// //   );

// //   return (
// //     <>
  
// //        <div className="container-fluid">
// //        <div className="card p-3" style={{height:'80vh'}}>
// //         <div className="messenger" style={{height:'100%'}}>
// //     <input type="hidden" id="chat_type" defaultValue="" />
// //     <input type="hidden" id="chat_type_id" defaultValue="" />
// //     <div className={display === true ? " d-none" : "messenger-listView"}>

// //     <div className="m-header" >
// //         <nav style={{background:'#f7f7f7'}} className='mb-2'>
// //           <div className="row">
// //             <div className="col">
// //               <img src={loggedUser.pfpImage} style={{objectFit:'cover' , width:'35px'  , height:'35px' , borderRadius:'50%'}} alt="" />
// //             </div>
// //             <div className="col text-end cursor-pointer">
              
// //             <i class='bx bx-dots-vertical' ></i>
// //             </div>
// //           </div>
// //         </nav>
// //         <input type="text" className="messenger-search" value={searchValue}  onChange={handleSearchChange} placeholder="Search" />
        
// //       </div>
// //       <div className="m-body contacts-container">
// //       <div className="row mx-2" style={{background:'#f7f7f7' }}>
// //           <div className="col-12">
          
// //              <table className="messenger-list-item " data-contact={7}>
// //             <tbody>
// //             {data.map((item, index) => (
// //           <tr key={index} onClick={()=>handleChatUser(item.id)} style={{cursor:'pointer'}}>
           
// //             <td>
              
// //                 <div className="saved-messages avatar av-m">
// //                   <img src={item.pfpImage} style={{ objectFit: 'cover' }} alt="" />
// //                 </div>
              
// //             </td>
// //             <td className="text-capitalize">
// //               {item.name}
// //               <span className="d-block m-0 p-0">Click to chat.</span>
// //             </td>
// //           </tr>
// //         ))}
// //             </tbody>
// //                  </table>
                
// //           </div>
// //         </div>
// //         <div
// //           className="show messenger-tab users-tab app-scroll"
// //           data-view="users"
// //         >
        
// //           {data.length === 0 && isSearchData === false && (
// //             <>
// //             <table className="messenger-list-item mt-3" data-contact={7}>
// //             <tbody>

// //               <tr  data-action={0} onClick={()=>navigate(`/chat/${loggedUser.id}`)} style={{cursor:'pointer'}}>
// //                 <td >
// //                   <div className="saved-messages avatar av-m">
// //                     <img src={loggedUser.pfpImage} style={{objectFit:'cover'}} alt="" />
// //                   </div>
// //                 </td>
// //                 <td className='text-capitalize '>
// //                   <p data-id={7} data-type="user">
// //                     <span>You</span>
// //                   </p>
// //                   {loggedUser.name}
// //                   <span className='d-block m-0 p-0'>Save Messages Secretly</span>
// //                 </td>
// //               </tr>
// //             </tbody>
// //           </table>
// //           <p className="messenger-title">
// //             <span>All Messages</span>
// //           </p>

// //           <div
// //             className="listOfContacts"
// //             style={{
// //               width: "100%",
// //               height: "calc(100% - 272px)",
// //               position: "relative"
// //             }}
// //           />





// //           </>
// //           )}
// //           {data.length === 0 && isSearchData === true && (
// //             <>
// //             <p>No user found</p>
// //             </>
// //           )}


// //         </div>
// //         <div className="messenger-tab search-tab app-scroll" data-view="search">
// //           <p className="messenger-title">
// //             <span>Search</span>
// //           </p>
// //           <div className="search-records">
// //             <p className="message-hint center-el">
// //               <span>Type to Search..</span>
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //     <div className="messenger-messagingView">
// //       <div className="m-header m-header-messaging">
// //         <nav className="chatify-d-flex chatify-justify-content-between chatify-align-items-center">
// //           <div className="chatify-d-flex chatify-justify-content-between chatify-align-items-center">
// //             <a href="#" className="show-listView">
// //               <i className="fas fa-arrow-left" />
// //             </a>
// //               <button class="navbar-toggler" onClick={() => setDisplay(!display)} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
// //                         <i class='bx bx-arrow-back'></i>
// //               </button>
// //             <div
// //               className="avatar av-s header-avatar"
// //               style={{
// //                 margin: "0px 10px",
// //                 marginTop: "-5px",
// //                 marginBottom: "-5px"
// //               }}
// //             >
// //               <img src={userDataById?.pfpImage} style={{objectFit:'cover'}} alt="" />
// //             </div>
// //             <a className="user-name text-capitalize">
// //               {userDataById?.name}
// //             </a>
// //           </div>
// //           <nav className="m-header-right">
// //             <a href="#" className="add-to-favorite">
// //               <i className="fas fa-star" />
// //             </a>
// //             <a href="https://taskify.taskhub.company/public/home">
// //               <i className="fas fa-home" />
// //             </a>
// //             <a onClick={() => setDisplay2(!display2)} className="show-infoSide cursor-pointer">
// //             <i class='bx bxs-info-circle' style={{color:'#2180f3' , fontSize:'24px'}}></i>
// //             </a>
// //           </nav>
// //         </nav>
// //         <div className="internet-connection">
// //           <span className="ic-connected">Connected</span>
// //           <span className="ic-connecting">Connecting...</span>
// //           <span className="ic-noInternet">No Internet Access</span>
// //         </div>
// //       </div> 
// //       <div className="m-body messages-container app-scroll" style={{maxHeight:"81vh" , overflow:'scroll' , padding:'0px 30px'}}>
      
// //      <div className='mt-5' style={{marginBottom:'300px'}}>
// //      <div className='d-flex justify-content-center'>
// //         <img src={userDataById?.pfpImage} alt="" style={{width:'140px' , height:'140px' , borderRadius:'50%' , objectFit:'cover'}}/>
// //       </div>
// //       <h5 className='text-center text-capitalize mt-2'>{userDataById?.name}</h5>
// //       <p style={{ fontSize: '12px', marginBottom: '5px', color: "grey" , textAlign:'center'}}>You are now connected on GMG Messenger</p>
// //       <p style={{ fontSize: '12px', marginBottom: '5px', color: "grey" , textAlign:'center'}}>You're friends on Gmg Solutions chatting Hub.</p>
// //      </div>

 
// //      {recieveDbMessages.map((msg) => (
// //   <p key={msg.id} className={Number(msg.fromId) === Number(activeId) ? 'left' : 'right'}>
// //     {msg.text}
// //   </p>
// // ))}
// //     {filteredMessages.map((msg, index) => (
// //   <li key={index} className={msg.fromId === activeId ? 'left' : 'right'}>
// //     {msg.text}
// //   </li>
// // ))}

   
   
   
// //       {/* {recieveMessages.map((msg, index) => (
// //           <div key={index}>
// //             <div style={{background:'red'}}>
// //             <strong>{msg.fromId}</strong>: {msg.text}
// //             </div>
// //           </div>
// //         ))} */}
// //  {/* {recieveMessages?.map((message, index) => (
// //   <div key={index} className="col message-container">
// //     {message.fromId === id && message.toId === activeId && (
// //       <p className={message.fromId === id && message.toId === activeId ? 'right' : null}>{message.text}</p>
      
// //     )}

   
// //   </div>
// // ))} */}

// //         <div className="typing-indicator">
      
// //           <div className="message-card typing">
      
// //             <div className="message">
// //               <span className="typing-dots">
// //                 <span className="dot dot-1" />
// //                 <span className="dot dot-2" />
// //                 <span className="dot dot-3" />
// //               </span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>






// //       <div className="messenger-sendCard" style={{ display: "block" }}>
// //   <form
// //     id="message-form"
// //     method="POST"
// //     onSubmit={handleSendMessage}
// //     // action="https://taskify.taskhub.company/chat/sendMessage"
// //     encType="multipart/form-data"
// //   >
// //     <input
// //       type="hidden"
// //       name="_token"
     
// //       defaultValue="bVvD0JC0kYMhCa3a8W5sqsCyxOBrkLW5QaqRaFI3"
// //       autoComplete="off"
// //     />
// //    <button className="emoji-button m-0 p-0">
// //     <FontAwesomeIcon icon={faCirclePlus} />
// //     <span className="fas fa-smile" />
// //     </button>
// //     <button className="emoji-button m-0 p-0">
// //     <FontAwesomeIcon icon={faFaceSmile} />
// //     <span className="fas fa-smile" />
// //     </button>
// //     <textarea
// //       name="message"
// //       className="m-send app-scroll"
// //       value={text}
// //       onChange={(e)=>setText(e.target.value)}
// //       placeholder="Type a Message.."
// //       style={{ overflow: "hidden", overflowWrap: "break-word", height: 44 }}
// //       defaultValue={""}
// //     />
// //     <button className="send-button">
// //     <FontAwesomeIcon icon={faPaperPlane} style={{color:'#2180f3'}} />
// //       <span className="fas fa-paper-plane" />{" "}
// //     </button>
// //   </form>
// //       </div>
// //     </div>
// //     <div className={display2 === false ? "d-none" : "messenger-infoView app-scroll"}>
// //       <nav>
// //         <p>User Details</p>
// //         <a onClick={() => setDisplay2(false)}>
// //         <i class='bx bx-x' style={{fontSize:'25px' , cursor:'pointer' , marginTop:'-20px'}}></i>
// //         </a>
// //       </nav>
// //       <div className="avatar av-l chatify-d-flex">
// //       <img src={userDataById?.pfpImage} style={{objectFit:'cover'}} alt="" />
// //       </div>
     
// //       <p className="info-name text-capitalize">{userDataById?.name}</p>
// //       {/* <p className="info-name text-danger " style={{fontSize:'12px' , }}>Delete Conversation</p> */}
// //       <p className="messenger-title">
// //             <span className="text-capitalize text-muted" style={{ fontSize: "12px" ,fontWeight:'500' }}>Shared Photos</span>
// //           </p>
      
    
// //     </div>
// //   </div>
// //   <div id="imageModalBox" className="imageModal">
// //     <span className="imageModal-close">×</span>
// //     <img className="imageModal-content" id="imageModalBoxSrc" />
// //   </div>
// //   <div className="app-modal" data-name="delete">
// //     <div className="app-modal-container">
// //       <div className="app-modal-card" data-name="delete" data-modal={0}>
// //         <div className="app-modal-header">
// //           Are You Sure You Want to Delete This?
// //         </div>
// //         <div className="app-modal-body">You Cannot Undo This Action</div>
// //         <div className="app-modal-footer">
// //           <a href="javascript:void(0)" className="app-btn cancel">
// //             Cancel
// //           </a>
// //           <a href="javascript:void(0)" className="app-btn a-btn-danger delete">
// //             Yes
// //           </a>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// //   <div className="app-modal" data-name="alert">
// //     <div className="app-modal-container">
// //       <div className="app-modal-card" data-name="alert" data-modal={0}>
// //         <div className="app-modal-header" />
// //         <div className="app-modal-body" />
// //         <div className="app-modal-footer">
// //           <a href="javascript:void(0)" className="app-btn cancel">
// //             Cancel
// //           </a>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// //   <div className="app-modal" data-name="settings">
// //     <div className="app-modal-container">
// //       <div className="app-modal-card" data-name="settings" data-modal={0}>
// //         <form
// //           id="update-settings"
// //           action="https://taskify.taskhub.company/public/chat/updateSettings"
// //           encType="multipart/form-data"
// //           method="POST"
// //         >
// //           <input
// //             type="hidden"
// //             name="_token"
// //             defaultValue="bVvD0JC0kYMhCa3a8W5sqsCyxOBrkLW5QaqRaFI3"
// //             autoComplete="off"
// //           />
// //           <div className="app-modal-body">
// //             <div
// //               className="avatar av-l upload-avatar-preview chatify-d-flex"
// //               style={{
// //                 backgroundImage:
// //                   'url("/storage/users-avatar/f724c64a-28c7-402a-8c4b-89efff99cdac.jpg")'
// //               }}
// //             />
// //             <p className="upload-avatar-details" />
// //             <label
// //               className="app-btn a-btn-primary update"
// //               style={{ backgroundColor: "#2180f3" }}
// //             >
// //               Upload New{" "}
// //               <input
// //                 className="upload-avatar chatify-d-none"
// //                 accept="image/*"
// //                 name="avatar"
// //                 type="file"
// //               />
// //             </label>
// //             <p className="divider" />
// //             <p className="app-modal-header">
// //               Dark Mode{" "}
// //               <span
// //                 className="
// //                   far fa-moon dark-mode-switch"
// //                 data-mode={0}
// //               />
// //             </p>
// //             <p className="divider" />
// //             <div className="update-messengerColor">
// //               <span
// //                 style={{ backgroundColor: "#2180f3" }}
// //                 data-color="#2180f3"
// //                 className="color-btn"
// //               />
// //               <span
// //                 style={{ backgroundColor: "#2196F3" }}
// //                 data-color="#2196F3"
// //                 className="color-btn"
// //               />
// //               <span
// //                 style={{ backgroundColor: "#00BCD4" }}
// //                 data-color="#00BCD4"
// //                 className="color-btn"
// //               />
// //               <span
// //                 style={{ backgroundColor: "#3F51B5" }}
// //                 data-color="#3F51B5"
// //                 className="color-btn"
// //               />
// //               <span
// //                 style={{ backgroundColor: "#673AB7" }}
// //                 data-color="#673AB7"
// //                 className="color-btn"
// //               />
// //               <br />
// //               <span
// //                 style={{ backgroundColor: "#4CAF50" }}
// //                 data-color="#4CAF50"
// //                 className="color-btn"
// //               />
// //               <span
// //                 style={{ backgroundColor: "#FFC107" }}
// //                 data-color="#FFC107"
// //                 className="color-btn"
// //               />
// //               <span
// //                 style={{ backgroundColor: "#FF9800" }}
// //                 data-color="#FF9800"
// //                 className="color-btn"
// //               />
// //               <span
// //                 style={{ backgroundColor: "#ff2522" }}
// //                 data-color="#ff2522"
// //                 className="color-btn"
// //               />
// //               <span
// //                 style={{ backgroundColor: "#9C27B0" }}
// //                 data-color="#9C27B0"
// //                 className="color-btn"
// //               />
// //               <br />
// //             </div>
// //           </div>
// //           <div className="app-modal-footer">
// //             <a href="javascript:void(0)" className="app-btn cancel">
// //               Cancel
// //             </a>
// //             <input
// //               type="submit"
// //               className="app-btn a-btn-success update"
// //               defaultValue="Save Changes"
// //             />
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   </div>
// //         </div>
// //        </div>
// // </>

// //   )
// // }

// // export default Chat



















































