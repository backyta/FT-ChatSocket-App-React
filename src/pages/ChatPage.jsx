/* eslint-disable no-constant-condition */

import { useContext } from 'react';
import { ChatSelect } from '../components/ChatSelect';
import { InboxPeople } from '../components/InboxPeople';
import { Messages } from '../components/Messages';
import '../css/chat.css';
import { ChatContext } from '../context/chat/ChatContext';

export const ChatPage = () => {

  const { chatState } = useContext( ChatContext );

  return (
    <>
      <div className="messaging">
        <div className="inbox_msg">

          <InboxPeople />

          {
            ( chatState.chatActivo ) // si el uid existe del chat con el que quiero hablar al hacer click
            ? <Messages />
            : <ChatSelect />
          }

        </div>
      </div>
    </>
  )
}
