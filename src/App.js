import React, { useState, useEffect } from 'react';
import './App.css';
import Post from "./Post";
import { db, auth } from "./firebase"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [posts, setPosts] = useState([
    // {
    //   username: "HJ",
    //   caption: "Hey whats upp",
    //   imageURL: "https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    // },
    // {
    //   username: "KJ jsssj",
    //   caption: "Hey there",
    //   imageURL: "https://i.pinimg.com/originals/ca/76/0b/ca760b70976b52578da88e06973af542.jpg"
    // },
    // {
    //   username: "moms",
    //   caption: "I am watching",
    //   imageURL: "https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?ixlib=rb-1.2.1&w=1000&q=80",
    // },
    // {
    //   username: "Yo Bro",
    //   caption: "Hey thwere i am yo bro",
    //   imageURL: "https://imgd.aeplcdn.com/476x268/bw/models/royal-enfield-classic-350-single-channel-abs--bs-vi20200303121804.jpg?q=80",
    // }
  ]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser)
        setUser(authUser)

      } else {
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }
  }, [user, username])

  useEffect(() => {
    // this is where code runs
    db.collection("posts").onSnapshot(snapshot => {
      // Every time new code is added in the db then this code is fired 
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);


  const signUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message))
  }

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))

    setOpenSignIn(false)
  }

  return (
    <div className="App">

      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <div style={modalStyle} className={classes.paper}>

          <img
            alt="not defined"
            className="app_header_image"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"></img>

          <h2 id="simple-modal-title">Sign up</h2>
          <form className="app__signup">
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}></Input>

            <Input
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}></Input>

            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}></Input>


            <Button type="submit" onClick={signUp}>Sign Up</Button>


          </form>
        </div>
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)} aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <div style={modalStyle} className={classes.paper}>

          <img
            alt="not defined"
            className="app_header_image"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"></img>

          <h2 id="simple-modal-title">Sign In</h2>
          <form className="app__signup">
            <Input
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}></Input>

            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}></Input>

            <Button type="submit" onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>

      {/* Header */}
      <div className="app_header">
        <img className="app_headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"></img>
      </div>

      {/* Posts */}
      {/* Posts */}


      {user ? (
        <Button type="submit" onClick={() => {
          auth.signOut()
        }}>Logout</Button>
      ) : (
        <div className="app__loginContainer">
          <Button type="submit" onClick={() => {
            setOpenSignIn(true)
          }}>Sign In</Button>
          <Button type="submit" onClick={() => setOpen(true)}>Sign Up</Button>
        </div>

      )}

      {
        posts.map(({ id, post }) => (
          <Post key={id} username={post.username} caption={post.caption} imageURL={post.imageURL}></Post>
        ))
      }

    </div>
  );
}

export default App;
