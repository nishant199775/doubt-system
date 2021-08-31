import Axios from 'axios';
import React,{ useState, useContext} from 'react';
import {Redirect, useHistory,Link} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  Badge,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';
import { RoleContext } from '../App';




const Navbar1= (props) => {
  const history=useHistory();
  const {state,dispatch}=useContext(RoleContext);
  const [isOpen, setIsOpen] = useState(false);
 
  const toggle = () => setIsOpen(!isOpen);
  const [isLoggedIn,setLogin]=useState(false);

  const token=localStorage.getItem('token');
 
  
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
                  <Badge color="light" pill>STUDENT</Badge>
                </NavItem>
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
                <Badge color="info" pill>TA</Badge>
              </NavItem>

              <NavItem>
                <NavLink href="/ta/report">Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/student/createDoubt">Raise Doubt</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/doubtPage">Solve Doubt</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/ta/unresolved">Unresolved Doubts</NavLink>
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
  

    

  const handleLogout=()=>{

    localStorage.removeItem('token');
    localStorage.removeItem('role');
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