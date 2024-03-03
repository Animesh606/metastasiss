"use client"
import React, { Fragment, useEffect, useState ,useRef} from "react";
import "./loginuser.css";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { IconLookup, IconName, IconPrefix, faUser } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { faDashboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface User {
    // Define the properties of the user object
    email: string;
    name: string;
    role: string;
  
  }
  interface LoggedinUserProps {
    user: User;
  }
export const LoggedinUser=({user}:LoggedinUserProps)=>{
    const router = useRouter()
 
    const [open, setOpen] = useState(false);
    // const dispatch=useDispatch();
    let menuRef = useRef<HTMLDivElement>(null); 
    useEffect(() => {
      let handler = (e: { target: any; })=>{
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setOpen(false);
          }    
      };
  
      document.addEventListener("mousedown", handler);
  
      return() =>{
        document.removeEventListener("mousedown", handler);
      }
  
    });

    const option =[
      {icons:<FontAwesomeIcon icon={faUser} className="icons"/>,name:"My profile",func:account},
      {icons:<FontAwesomeIcon icon={faSignOut} className="icons"/>,name:"Log out",func:logout}
    ]
    if(user.role==="admin")
    {
      option.unshift({icons:<FontAwesomeIcon icon={faDashboard} className="icons"/>,name:"Dashboard",func:dashboard})
    }
    function account(){
        router.push("/account")
    }
    function logout(){
    //   dispatch(logout());
      console.log("loggedinuser")
    //   alert.success("Logged out successfully")
    router.push("/");
    } 
    function dashboard(){
        router.push("/dashboard"); 
    }
return( <Fragment>
     <div className="App">
      <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
        <Image className="Image" src="/snacks.png" alt={""} width={150} height={150}></Image>
        </div>

        <div data-aos="zoom-in" className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
          <h3>Akash Mondal<br/><span></span></h3>
          <ul onClick={()=>{setOpen(!open)}}>
            {option.map((item)=>(<DropdownItem img={item.icons} text={item.name} fun={item.func}/>))}
          </ul>
        </div>
      </div>
    </div>
</Fragment>)
}
function DropdownItem(props: { fun: React.MouseEventHandler<HTMLLIElement> | undefined; img: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }){
    return(
      <li className = 'dropdownItem' onClick={props.fun} >
        <span>{props.img}</span> 
        <a> {props.text} </a>
      </li>
    );
  }
   