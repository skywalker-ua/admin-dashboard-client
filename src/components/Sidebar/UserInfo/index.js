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

const UserInfo = () => {
    return(
        <div className="user-profile-sidebar">
            <UserImage >N</UserImage>
            <div className="user-profile__username">User Name</div>
            <div className="user-profile__email">test@test.com</div>
        </div>
    );  
};

export default UserInfo;