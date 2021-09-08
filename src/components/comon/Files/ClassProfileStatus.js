import s from './ProfileInfo.module.css';
import React from "react";

class ClassProfileStatus extends React.PureComponent {
state = {
    editMode: false,
    status:this.props.status
}


     activateEditMode() {
        this.setState({
            editMode: true})
    }
    deActivateEditMode() {
        this.setState({
            editMode: false})
        this.props.StatusUpdate(this.state.status);
    }
    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value})
    }
    render() {
        return (
            <div className={s.information}>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || '-------'}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deActivateEditMode}
                           value={this.state.status}/>
                </div>
                }
            </div>
        )
}
}
export default  ClassProfileStatus;