import Axios from 'axios';
import React,{ useState,Badge, useContext} from 'react';
import {Redirect, useHistory,Link} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';
import { RoleContext } from '../App';
import jwt from 'jsonwebtoken';



const Navbar1= (props) => {
  const history=useHistory();
  const {state,dispatch}=useContext(RoleContext);
  const [isOpen, setIsOpen] = useState(false);
 
  const toggle = () => setIsOpen(!isOpen);
  const [isLoggedIn,setLogin]=useState(false);
  // const [role,setRole]=useState(3);
  const token=localStorage.getItem('token');
  // useEffect(()=>{
  //   jwt.verify(token,'event',(err,decode)=>{
  //     if(localStorage.getItem('gender'))
  //     setGender(decode.gender)
  //   })
  // },[])
  
  const RenderMenu=()=>{
    // student nav
    if(state===0)
    {
      return(
        <div>
        <Navbar color="dark" dark expand="md" style={{padding:"1rem"}}>
          <NavbarBrand href="/student/home">Doubt Manager</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/student/home">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/student/createDoubt">Raise Doubt</NavLink>
              </NavItem>
              
              
            </Nav>
            {/* <Badge color="rgba(153, 234, 77, 0.73)" style={{color:"rgba(153, 234, 77, 0.73)",border:"0.5px solid white",borderRadius:"12px"}}>Student</Badge> */}
            <NavLink><Button onClick={handleLogout}>Logout</Button></NavLink>
          </Collapse>
        </Navbar>
      </div>
      )
    }
    // ta navbar
    else if(state===1)
    {
      return(
        <div>
        <Navbar color="dark" dark expand="md" style={{padding:"1rem"}}>
          <NavbarBrand href="/ta/report">Doubt Manager</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/ta/report">Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/student/createDoubt">Raise Doubt</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/doubtPage">Solve Doubt</NavLink>
              </NavItem>
              
            </Nav>
            <NavLink><Button onClick={handleLogout}>Logout</Button></NavLink>
          </Collapse>
        </Navbar>
      </div>
      )
    }
    // guest navbar
    else {
      return(
        <div>
        <Navbar color="dark" dark expand="md" style={{padding:"1rem"}}>
          <NavbarBrand href="/">Doubt Manager</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {/* <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink href="/signin">Signin</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/signup">SignUp</NavLink>
              </NavItem>
              
            </Nav>
            
          </Collapse>
        </Navbar>
      </div>
      )
    }
  }
  // useEffect(() => {
  //   }, [isLoggedIn])
  //   useEffect(async ()=>{
  //       const token=localStorage.getItem('token');
  //       if(token)
  //       {
  //         const res=await Axios.get('/users',{
  //           headers:{
  //             "Authorization":`Bearer ${token}`
  //           }
  //         })
  //         console.log('in navbar role',res.data.role)
  //         setRole(res.data.role);
  //       }
  //       else{
  //         setRole(3);
  //       }
        
  //   },[])

    

  const handleLogout=()=>{

    localStorage.clear();
    dispatch({type:"USER",payload:3});
    setLogin(true)
  }
  

  return (
    <div >
      <RenderMenu/>
    </div>
  );
}

export default Navbar1;