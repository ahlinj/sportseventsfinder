import React from "react";
import axios from "axios";
import { ABOUT, ADDEVENT ,EVENTS, HOME, LOGIN, ORGLOGIN, ORGSIGNUP, ORGS, SIGNUP, PRIZES, PROFILE, ORGPROFILE, TOKENS, ADDPRIZE } from "./Utils/Constants.js"
import HomeView from "./CustomComponents/HomeView";
import AboutView from "./CustomComponents/AboutView";
import LoginView from "./CustomComponents/LoginView";
import SignupView from "./CustomComponents/SignupView";
import EventsView from "./CustomComponents/EventsView";
import PrizesView from "./CustomComponents/PrizesView";
import OrganizationsView from "./CustomComponents/OrganizationsView";
import OrganizationSignUpView from "./CustomComponents/OrganizationSignUpView";
import OrganizationLoginView from "./CustomComponents/OrganizationLoginView";
import AddEventView from "./CustomComponents/AddEventView.js";
import NotLoggedInView from "./CustomComponents/NotLoggedInView.js";
import ProfileView from "./CustomComponents/ProfileView.js"
import ProfileViewOrg from "./CustomComponents/ProfileViewOrg.js";
import TokensView from "./CustomComponents/TokensView.js";
import AddPrizeView from "./CustomComponents/AddPrizeView.js";



class App extends React.Component
    {

      constructor(props)
      {
        super(props);
        this.state={
          currentPage: HOME,
          userStatus:{logged:false, user:null},
          organizationStatus:{logged:false,organization:null}
        }
      } 

      QSetView=(obj)=>{
        this.setState({
          currentPage: obj.page
        })
      }

      QGetView=(state)=>
        {
          let page = state.currentPage
       
           switch(page)
           {  
             case HOME:
               return <HomeView/>
             case ABOUT:
               return <AboutView/>
             case SIGNUP:
               return <SignupView/>
             case LOGIN:
               return <LoginView QUserFromChild={this.QSetUser}/>
             case EVENTS:
               return (state.userStatus.logged) ? <EventsView username={this.state.userStatus.user}/> : <NotLoggedInView setView={this.QSetView}/>
             case PRIZES:
               return (state.organizationStatus.logged || state.userStatus.logged) ? <PrizesView/> : <NotLoggedInView setView={this.QSetView}/>
             case ORGS:
               return (state.organizationStatus.logged || state.userStatus.logged) ? <OrganizationsView/> : <NotLoggedInView setView={this.QSetView}/>
             case ORGSIGNUP:
               return <OrganizationSignUpView/>
             case ORGLOGIN:
               return <OrganizationLoginView QUserFromChild={this.QSetOrganization}/>
             case ADDEVENT:
               return <AddEventView organization={this.state.organizationStatus.organization}/>
             case PROFILE:
               return <ProfileView user={this.state.userStatus.user}/>
             case ORGPROFILE:
               return <ProfileViewOrg organization={this.state.organizationStatus.organization}/>
             case TOKENS:
               return <TokensView user={this.state.userStatus.user}/>
             case ADDPRIZE:
               return <AddPrizeView organization={this.state.organizationStatus.organization}/>
           }
        }
       

        QSetUser = (obj) => {
          this.setState({
            userStatus: {logged:true,user:obj}
          })
        }

        QSetOrganization = (obj) => {
          this.setState({
            organizationStatus:{logged:true,organization:obj}
          })
        }

        render()
        {
            return(

              <div id="APP" className="container">
             
                     <div id="menu" className="row">
                       <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                           <div className="container-fluid">
                             <a onClick={()=>this.QSetView({page:HOME})} className="navbar-brand" href="#">Home</a>
                             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                               <span className="navbar-toggler-icon"></span>
                             </button>
             
                             <div className="collapse navbar-collapse" id="navbarSupportedContent">
                               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                 <li className="nav-item">
                                   <a onClick={()=>this.QSetView({page:ABOUT})} className="nav-link " href="#">About</a>
                                 </li>

                                 <li className="nav-item" >
                                   <a onClick={()=>this.QSetView({page:PRIZES})} className="nav-link "  href="#">Prizes</a>
                                 </li>

                                 <li className="nav-item" >
                                   <a onClick={()=>this.QSetView({page:ORGS})} className="nav-link "  href="#">Organizations</a>
                                 </li>

                                 {this.state.organizationStatus.logged && (
                                  <>
                                  <li className="nav-item" >
                                   <a onClick={()=>this.QSetView({page:ADDEVENT})} className="nav-link "  href="#">Add event</a>
                                  </li>
                                  <li className="nav-item" >
                                  <a onClick={()=>this.QSetView({page:ADDPRIZE})} className="nav-link "  href="#">Add Prize</a>
                                  </li>
                                  <li className="nav-item" >
                                  <a onClick={()=>this.QSetView({page:ORGPROFILE})} className="nav-link "  href="#">Profile</a>
                                  </li>
                                  </>
                                  )}

                                 {this.state.userStatus.logged && (
                                  <>
                                  <li className="nav-item" >
                                    <a onClick={()=>this.QSetView({page:EVENTS})} className="nav-link "  href="#">Events</a>
                                  </li>
                                  <li className="nav-item" >
                                   <a onClick={()=>this.QSetView({page:PROFILE})} className="nav-link "  href="#">Profile</a>
                                  </li>
                                  <li className="nav-item" >
                                   <a onClick={()=>this.QSetView({page:TOKENS})} className="nav-link "  href="#">Tokens</a>
                                  </li>
                                  </>
                                  )}

                                 {!this.state.organizationStatus.logged && !this.state.userStatus.logged && (
                                    <>
                                  <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                      User
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="userDropdown">
                                      <li>
                                        <a onClick={() => this.QSetView({ page: SIGNUP })} className="dropdown-item" href="#">User Signup</a>
                                      </li>
                                      <li>
                                        <a onClick={() => this.QSetView({ page: LOGIN })} className="dropdown-item" href="#">User Login</a>
                                      </li>
                                    </ul>
                                  </li>
                                  <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="organizationDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                      Organization
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="organizationDropdown">
                                      <li>
                                        <a onClick={() => this.QSetView({ page: ORGSIGNUP })} className="dropdown-item" href="#">Organization Signup</a>
                                      </li>
                                      <li>
                                        <a onClick={() => this.QSetView({ page: ORGLOGIN })} className="dropdown-item" href="#">Organization Login</a>
                                      </li>
                                    </ul>
                                  </li>
                                </>
                              )}               
                               </ul>
                             </div>
                           </div>
                         </nav>
                     </div>
             
                     <div id="viewer" className="row container">
                      {this.QGetView(this.state)}
                        

                     </div>
             
                 </div>
             
             )
             
        }
    }

    export default App