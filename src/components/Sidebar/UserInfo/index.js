import React from 'react';
import {
    Avatar
} from '@material-ui/core';
import './UserInfo.css';
import { styled } from '@material-ui/core/styles';

const UserImage = styled(Avatar)({
    width: '60px',
    height: '60px',
    marginBottom: '15px',
    backgroundColor: '#8c9eff'
})

const UserInfo = (props) => {
    return(
        <div className="user-profile-sidebar">
            <UserImage >{props.user.name.charAt(0)}</UserImage>
            <div className="user-profile__username">{props.user.name} {props.user.surname}</div>
            <div className="user-profile__email">{props.user.email}</div>
        </div>
    );  
};

export default UserInfo;