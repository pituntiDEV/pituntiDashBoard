import React, { useContext } from 'react'
import "./EmbyDemos.scss";
import { NewDemo } from './components/NewDemo/NewDemo';
import { DemosList } from './components/DemosList/DemosList';
import { useGetEmbyDemos } from '../../../hook/emby/useGetEmbyDemos';
import { Context, DemosContext } from './DemosContext';
import { CreateDemo } from './components/CreateDemo/CreateDemo';
export const EmbyDemos = () => {
    return (
        <DemosContext>
            <div className='emby__demos2'>
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
                    <div className="options d-flex gap-3">
                        <NewDemo />
                        <CreateDemo />

                    </div>

                </div>
                <DemosList />
            </div>
        </DemosContext>
    )
}
