import React, { useEffect, useState } from 'react'
import { NewDemoBar } from '../../components/Demos/NewDemoBar/NewDemoBar'
import useFetchApi from '../../hook/useFetchApi'
import { DemosList } from '../../components/Demos/DemosList/DemosList';
import { ToolsTips } from '../../components/ToolsTips/ToolsTips';

export const Demos
  = () => {

    //State
    const [demos, setDemos] = useState([]);
    const [demosState, setDemoState] = useState(false);
    const [getDemos, loading] = useFetchApi({
      url: "/api/demos",
      method: "GET",
    })

    //Effects
    useEffect(() => {
      getDemos().then(({ data }) => {
        setDemos(data)
      })
    }, [demosState])
    return (
      <div>
        <ToolsTips />
        <NewDemoBar demos={demos} setDemoState={setDemoState} />
        <DemosList setDemoState={setDemoState} demos={demos} />
      </div>
    )
  }
