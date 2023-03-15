import React from 'react'
import { EditSquareIcon } from '../../../../components/icons/EditSquareIcon';
import { TrashIcon } from '../../../../components/icons/TrashIcon';
import { DeleteBot } from '../DeleteBot/DeleteBot';
import { EditChatBot } from '../EditChatBot/EditChatBot';
import { SendMessagesTelegramBot } from '../SendMessagesTelegramBot/SendMessagesTelegramBot';
import "./ChatBotList.scss";
export const ChatBotList = ({bots,setBots}) => {
  return (
    <div className='ChatBotList container'>
        <div className="bots">
            {bots.map(bot=>{
                return (
                    <div className='bot' key={bot._id}>
                        <i className="fa-solid fa-robot"></i>
                        <span>{bot.name}</span>
                        <hr />
                        <div className="options">
                            
                            <div className="option">
                                <SendMessagesTelegramBot bot={bot}/>
                            </div>

                            <div className="option">
                                <EditChatBot bots={bots} setBots={setBots} bot={bot}/>
                            </div>

                            <div className="option">
                                <DeleteBot bots={bots} setBots={setBots} bot={bot}/>
                            </div>

                        </div>
                    </div>
                )
            })}
        </div>

    </div>
  )
}
