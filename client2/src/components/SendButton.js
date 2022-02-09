import { Component } from "react";

class SendButton extends Component {
    render() {
        let {handleSendMessage}=this.props;
        return (
            <button type="button"  onClick={handleSendMessage} className="btn btn-success">Send</button>
        )
    }
}


export default SendButton;