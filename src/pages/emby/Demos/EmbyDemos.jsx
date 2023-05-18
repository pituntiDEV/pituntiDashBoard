import React from 'react'
import "./EmbyDemos.scss";
import { NewDemo } from './components/NewDemo/NewDemo';
import { DemosList } from './components/DemosList/DemosList';
import { useGetEmbyDemos } from '../../../hook/emby/useGetEmbyDemos';
export const EmbyDemos = () => {
    const [demos, setDemos, loading] = useGetEmbyDemos();
    const props = {
        demos,
        setDemos
    }

    return (
        <div className='emby__demos'>
            <div className='header'>
                <div className="count">
                    Total:{demos.length}
                </div>
                <div className="options">
                    <NewDemo {...props} />

                </div>

            </div>
            <DemosList  {...props} />
        </div>
    )
}
