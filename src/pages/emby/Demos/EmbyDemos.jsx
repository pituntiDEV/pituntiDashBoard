import React, { useContext } from 'react'
import "./EmbyDemos.scss";
import { NewDemo } from './components/NewDemo/NewDemo';
import { DemosList } from './components/DemosList/DemosList';
import { useGetEmbyDemos } from '../../../hook/emby/useGetEmbyDemos';
import { Context, DemosContext } from './DemosContext';
export const EmbyDemos = () => {
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
