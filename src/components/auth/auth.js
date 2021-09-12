import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import Show from './role';
function Auth(props) {
    const context = useContext(AuthContext)
    return (
        <Show condition={props.cond && context.loggedIn}>
            {props.children}
        </Show>
    )
}




export default Auth;