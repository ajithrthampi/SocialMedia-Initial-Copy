import React, { useState, useEffect, useContext } from 'react'
import { AiOutlineComment, AiOutlineHeart } from 'react-icons/ai'
import { FiSettings } from 'react-icons/fi'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { friendEachPost, friendPostModal, openModalFollowers } from '../../redux/store/features/userSlice'
import Layout from '../layout/Layout'
import Navbar from '../navbar/Navbar'
import { useDispatch } from 'react-redux';
import axiosinstance from '../../axios/axiosinstance'
import EditUserModal from '../user-modal/EditUserModal'
import { UserContext } from '../../Pages/context/Context'
import OpenPostModal from '../user-modal/OpenPostModal'
import { useNavigate } from 'react-router-dom'
import FollowListModal from '../user-modal/FollowListModal'

const FriendProfile = () => {

  const [following, setfFollowing] = useState<any>()
  const [followers, setFollowers] = useState<any>()
  const [editModal, setEditModal] = useState(false)
  const { user } = useContext(UserContext)
  const [userId, setUserId] = useState()
  const [reduxState, setReduxState] = useState<any>()
  const [state, setState] = useState(false)
  const [profilePosts, setProfilePosts] = useState<any>([])
  const [openPostModal, setOpenPostModal] = useState<boolean>(false)
  const [eachPost, setEachPost] = useState([])
  const [userIdd, setUserIdd] = useState<any>()
  const navigate = useNavigate()
  // console.log("userr id In friend", user.id);


  useEffect(() => {
    if (user) {
      var userID = user.id
      setUserId(userID)
    }


  }, [following])

  const dispatch = useDispatch();

  const [followersLists, setFollowersLists] = useState<any>()
  const [followModal, setFollowModal] = useState<boolean>(false)
  const [stateFollowers, setStateFollowers] = useState<any>()
  const isprofileDetails = useSelector((state: any) => state.userDetails.value.friendDetails)
  // const isUpdateFollowCount = useSelector((state: any) => state.userDetails.value.updateFollowCount )

  // console.log("HisUpdateFollowCount.,.,.,.isUpdateFollowCount", isUpdateFollowCount);

  // useEffect(() => {
  //   setUserIdd(isprofileDetails._id)
  // },[isprofileDetails])

  // console.log("userIdd",userIdd);


  useEffect(() => {
    setReduxState(isprofileDetails)
  }, [editModal, userId])


  useEffect(() => {
    try {

      axiosinstance.get("/followingcount/" + reduxState?._id, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }).then((response) => {
        setfFollowing(response.data.count.following)
        setFollowers(response.data.count.followers)
      })
    } catch (err) {
      // navigate('error')
      console.log(err);
    }

  }, [editModal, reduxState])

  // console.log("User details in redixtoolkit", reduxState?.userId?._id);

  useEffect(() => {
    viewPost()

  }, [editModal, user, reduxState])


  const viewPost = () => {

    const userId = user?.id

    axiosinstance.get("/viewprofilepost/" + reduxState?._id, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {

      setState(response.data)
      setProfilePosts(response.data)
    }).catch((err) => {
      // navigate('/error')
    })
  }
  // console.log("Profile pistyyy..", profilePosts);


  // FRIEND USER DATA

  const viewImagePost = (postId: any) => {
    console.log("hiii");

    axiosinstance.get("/postdetails/" + postId, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      setOpenPostModal(true)
      setEachPost(response.data)
      console.log(response.data);


      // dispatch(friendEachPost(response.data))
      console.log("success");


    }).catch((err) => {
      // navigate('/error')
      console.log(err);

    })
  }

  //START CONVERSATION

  // const startConversation = () => {
  //   // console.log("Hello there",)
  //  try {
  //   axiosinstance.post("/conversation", + userIdd,{
  //     headers: {
  //       "x-access-token": localStorage.getItem("token"),
  //     },
  //   }).then((response) => {
  //     // setMessages([...messages, response.data])
  //     // setNewMessage('')
  //     console.log("chat,.. conversation", response);
  //     navigate("/message")
  //   })

  //  } catch (error) {
  //   console.log("eror",error);

  //  }

  // }

  const startConversation = () => {
    const userId = user?.id
    try {

      const friendId = isprofileDetails?._id
      const id = { userId, friendId }

      setTimeout(() => {

        axiosinstance.post("/conversation", id, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }).then((response) => {
          navigate('/message')
        }).catch((err) => {
          navigate('/error')
          console.log(err);

        })

      }, 1000)


    } catch (error) {
      console.log(error);

    }
  }

  //FOLLOW MODAL

  const followersModal = () => {
    try {
      const userId = isprofileDetails._id
      console.log("friend id", userId);
      axiosinstance.get("/followerslist/" + userId, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }).then((response) => {
        setFollowersLists(response.data)
        setFollowModal(true)
      })
    } catch (err) {
      console.log("Follower", err);
    }
  }

  //FOLLOWING MODAL

  const followingsModal = () => {
    try {
      const userId = isprofileDetails._id
        axiosinstance.get("/followinglist/" + userId, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        }).then((response) => {
            setFollowersLists(response.data)
            setFollowModal(true)
        })

    } catch (err) {
        // navigate('/error')
        console.log(err);
    }
}


  return (
    <>
      <Navbar />
      {/* MOBILE SCREEN */}

      <div className='md:hidden '>
        <div className='max-h-screen overflow-y-scroll scrollbar-none space-y-5 '>
          <div className='md:hidden sm:px-10  h-auto pt-6 space-y-6' >

            <>
              <div className=' box-content h-auto  bg-[2A2A2A] rounded-3xl px-4 py-3'>
                <div className=' grid grid-cols-3'>
                  <div>
                    {reduxState ? <img className="p-1 mx-auto object-cover w-28 justify-content-center h-28 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={`images/${reduxState?.Images}`} alt="Bordered " />
                      : <img className="p-1 mx-auto  w-28 justify-content-center h-28 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA0BrKaI0cwXl3-wpk6Fu2gMbrP1LKk6waAlhKhrTzTobcVlka34MsNf4Yp3k1tG4ufTY&usqp=CAU' alt="Bordered avatar" />}
                  </div>
                  <div className='pl-6 text-white  text-center'>
                    <div className='text-lg' onClick={followersModal}>
                      {followers}
                    </div>
                    <div className='text-xs text-[#737373] font'>Followers</div>
                  </div>

                  <div className='pl-6 text-white text-center'>
                    <div className='text-lg'  onClick={followingsModal}>

                      {following}

                    </div>
                    <div className='text-xs text-[#8b8282]'>Following</div>
                  </div>
                </div>

                {/* NAME */}
                <div className=''>
                  <div className='sm:px-10 px-'>
                    <div className='text-white pt-6'>
                      <h1>{reduxState?.name}</h1>
                      <h3 className='text-sm text-[#737373] pt-1 py-3 '>{reduxState?.date}</h3>
                    </div>

                    {/* BIO */}
                    <div className='text-white font-semibold'>{reduxState?.bio}</div>

                    {/* EDIT PROFILE */}
                  </div>

                  <div className="mt-3 text-xs border-b border-[#616161] py-4 text-[#747474]"></div>


                </div>
              </div>
            </>

          </div>

          {/* POST */}

          <div className='grid grid-cols-3 gap-0.5 px-1 p-4 pb-20'>
            {profilePosts?.map((item: any, index: number) => (
              <div key={index} className="overflow-hidden ">
                <div className='relative group cursor-pointer z-0 '>
                  <div className='relative '>
                    <div className='h-28 sm:h-40 overflow-hidden'>
                      <img className='object-cover h-28 sm:h-40 w-full' src={`/images/${item?.Images}`} alt="" />
                    </div>
                  </div>
                  <div className=' absolute top-0 opacity-0 group-hover:opacity-100 left-1/2
                                             -translate-x-1/2 w-full md:h-full h-full bg-black-rgba flex flex-row gap-5 text-white justify-center items-center'>
                    <div className='flex md:flex-row flex-col gap-2 '>
                      <AiOutlineHeart className='md:text-xl text-lg' />

                      <h1>{item.likes.length}</h1>
                    </div>
                    <div className='flex md:flex-row flex-col gap-2'>
                      <AiOutlineComment className='md:text-xl text-lg' />
                      <h1 className='hidden md:block'>234 comment</h1>
                      <h1>210</h1>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Large Profile */}
      <Layout>
        <div className='w-5/6  grow xl:-ml-2.5 '>
          <div className='shadow-md rounded-3xl mb-5 bg-[#2A2A2A] text-white overflow-hidden '>
            <div className='max-h-screen overflow-y-scroll scrollbar-none'>
              <div className='flex  lg:p-10 p-5 gap-12 lg:pl-40 pl-32'>

                <div className='  rounded-full  cursor-pointer'>
                  <img className='rounded-full w-36 h-36  object-cover overflow-hidden' src={`images/${reduxState?.Images}`} alt="" />
                </div>
                <div>
                  <>
                    <div className='xl:flex gap-12   xl:space-y-0 space-y-5 text-lg'>
                      <div>{reduxState?.username}</div>
                      <button className='text-black bg-[#ffffff] text-sm   font-semibold xl:px-7 px-5  py-2 rounded-xl' onClick={startConversation}>Message</button>

                    </div>
                    <div className='flex xl:gap-10 gap-4 mt-4 lg:text-md text-xs'>
                      <div>40 Post</div>
                      <div
                        // onClick={followersModal}
                        // onClick={() => dispatch(openModalFollowers(true))}
                        className='cursor-pointer text-base'> <span className='bg-[#1A1A1A] px-3 py-1 rounded-md text-base'  onClick={followersModal}>{followers}</span> followers</div>
                      <div className='cursor-pointer text-base'><span className='bg-[#1A1A1A] px-3 py-1 rounded-md text-base' onClick={followingsModal}>{following}</span> following</div>
                    </div>
                    <div className='xl:mt-5 mt-3    '>
                      <h1>{reduxState?.name}</h1>
                      <h4 className='text-[#c9c6c6b1]'>{reduxState?.bio}</h4>
                    </div>
                  </>
                </div>
              </div>
              <div className=' px-14 py-5 '>
                <div className="mt-3 text-xs border-b border-[#5b5858] py-1  text-[#002D74]"></div>
              </div>


              {/* Image Post */}

              <div className='grid grid-cols-3 gap-3 px-5 p-4'
              // onClick={() => setOpenPostModal(true)}
              >
                {profilePosts?.map((item: any, index: number) => (
                  <div key={index} className="overflow-hidden h-64"
                    onClick={() => viewImagePost(item._id)}
                  >
                    <div className='relative group cursor-pointer'>
                      <div className='relative h-64'>
                        <div className='h-64  overflow-hidden'>
                          {/* <img className='object-cover h-64 w-full' src="https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" /> */}

                          <img className='object-cover h-64 w-full' src={`/images/${item?.Images}`} alt="" />

                        </div>
                      </div>
                      <div className=' absolute top-0 opacity-0 group-hover:opacity-100 left-1/2
                                             -translate-x-1/2 w-full h-full bg-black-rgba flex flex-row gap-5 text-white justify-center items-center'>
                        <div className='flex flex-row gap-2'>
                          <AiOutlineHeart size={25} />
                          <h1>{item.likes.length} likes</h1>
                        </div>
                        <div className='flex flex-row gap-2'>
                          <AiOutlineComment size={25} />
                          <h1>
                            {/* {item.length} */}
                            {/* {item?.comment[0]?.comment?.length === 0 ? 'comments' : item?.comment[0]?.comment?.length} */}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>



      <EditUserModal onClose={() => setEditModal(false)} isVisible={editModal}>

      </EditUserModal>

      <OpenPostModal postPassDetails={eachPost} onClose={() => setOpenPostModal(false)} isVisible={openPostModal}>

      </OpenPostModal>

      <FollowListModal isVisible={followModal} onClose={() => setFollowModal(false)} followersLists={followersLists} stateFollowers={stateFollowers}>

      </FollowListModal>



    </>
  )
}

export default FriendProfile