import React from "react"

//local file imports
import Sidebar from "./Sidebar"
import MainSection from "./MainSection"


export default class ChatRoom extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pubnub: undefined
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
  render() {
    return (
      <div id='container'>
        <Sidebar />
        <MainSection />
      </div>
    )
  }
}
