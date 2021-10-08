import {Redirect} from "react-router-dom";
import React, {ComponentType, FC} from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/ReduxStore";

export const withAuthRedirect  = (Component: ComponentType ) => {
    const RedirectComponent: FC<{isAuth: boolean}> = (props) => {
            if (!props.isAuth) return <Redirect to='/login'/>
            return < Component/>
    }
    return connect(mapStateToProps,{})(RedirectComponent)
}
let mapStateToProps = (state: AppStateType) => ({isAuth: state.Auth.isAuth})