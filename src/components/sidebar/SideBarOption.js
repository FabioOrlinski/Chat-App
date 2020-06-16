import React from 'react'

const SideBarOption = ({ active, lastMessage, name, onClick }) => {
    return (
        <div 
            className={`user ${active ? 'active':''}`}
            onClick={onClick}
            >
            <div className="user-photo">{name[0].toUpperCase()}</div>
            <div className="user-info">
                <div className="name">{name}</div>
                <div className="last-message">{lastMessage}</div>
            </div>
            
        </div>
    );
};

export default SideBarOption;
        
