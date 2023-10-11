import React, { useContext } from 'react'
import "./JellyfinDemos.scss";
import { NewDemo } from './components/NewDemo/NewDemo';
import { DemosList } from './components/DemosList/DemosList';
import { Context, DemosContext } from './DemosContext';
export const JellyfinDemos = () => {
    return (
        <DemosContext>
            <div className='emby__demos'>
                <div className='header'>
                    <Context.Consumer>
                        {
                            ({ demos }) => (
                                <div className="count">
                                    Total:{demos.length}
                                </div>
                            )
                        }
                    </Context.Consumer>
                    <div className="options">
                        <NewDemo />

                    </div>

                </div>
                <DemosList />
            </div>
        </DemosContext>
    )
}
