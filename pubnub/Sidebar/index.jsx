import React from "react"

//local file imports
import Sidebar from "./Sidebar"
import MainSection from "./MainSection"


export default class ChatRoom extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pubnub: undefined,
      messages: [],
      users: []
    };
  }
  componentWillMount(){

    //Get uuid from login page
    const uuid = this.props.uuid;

    // Initialize PubNub instance with personal UUID from login page
    const pubnub = PUBNUB({
      subscribe_key: 'sub-c-45d8e7b6-58fd-11e6-aba3-0619f8945a4f',
      publish_key: 'pub-c-bd25c8cd-3180-4937-b282-c2ef857bc538',
      uuid: uuid
    });

    //set pubnub state to be used throughout component
    this.setState({pubnub: pubnub});
  }
  componentDidMount(){
    const pubnub = this.state.pubnub;

    // subscribe to "suncoast-chat" channel
    pubnub.subscribe({
      channel: 'suncoast-chat',
      restore: true,
      connect: () => this.fetchOldMessages(),
      message: (m) => this.recieveNewMessages(m),
      presence: (u) => this.updatePresence(u)
    });
  }
  fetchOldMessages(){
    const pubnub = this.state.pubnub;
    let messages = this.state.messages;

    //fetch message history
    pubnub.history({
     channel: 'suncoast-chat',
     count: 25,
     callback: (m) => {
       let newMessages = messages.concat(m);
       this.setState({
         messages: newMessages
       });
     }
    })
    this.scrollToBottom()
  }
  recieveNewMessages(m){
    let messages = this.state.messages
    if(messages.length > 0){
      messages[0].push(m)
      this.setState({
        messages: messages
      })
      this.scrollToBottom()
    }
  }
  updatePresence(u){
    const users = this.state.users
    if (u.action == "join"){
      let newUsers = users.concat(u.uuid)
      this.setState({
        users: newUsers
      })
    }else{
      let newUsers = this.removeUser(users, u.uuid)
      this.setState({
        users: newUsers
      })
    }
  }
  removeUser(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1)
        }
    }
    return arr;
  }
  scrollToBottom(){
    const scrollSection = document.querySelector('.message-section')
    scrollSection.scrollTop = scrollSection.scrollHeight
  }
  render() {
    return (
      <div id='container'>
        <Sidebar
          users={this.state.users}
        />
        <MainSection
          messages={this.state.messages}
          pubnub={this.state.pubnub}
        />
      </div>
    )
  }
}

import React from "react";

export default class Sidebar extends React.Component {
  render() {
    //map through users to populate active user sidebar
    let users = this.props.users.map(function(user){
       return(
         <li key={user}>
           <img src='src/images/profile.jpg'/>
           <h3>{user}</h3>
         </li>
       )
    });
    return (
      <div className="side-bar">
        <div className="header">
          <h1>Suncoast Chat</h1>
          <h2>with <a href='https://www.pubnub.com/'>PubNub</a></h2>
        </div>
        <div className="active-users">
          <h2>Users</h2>
          <ul>
            {users}
          </ul>
        </div>
      </div>
    );
  }
}
