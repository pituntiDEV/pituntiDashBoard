import React from 'react'
import useFetchApi from '../../../../hook/useFetchApi'
import { useEffect } from 'react'
import { useState } from 'react'
import "./TrendingTrailers.scss"
export const TrendingTrailers = () => {
    const [trendingTrailers, setTrendingTrailers] = useState([])
    const [getTrendingTrailers, loading] = useFetchApi({
        url: `/api/plex/trending_trailers`,
        method: "GET"
    })

    useEffect(() => {
        getTrendingTrailers()
            .then(data => setTrendingTrailers(data))
    }, [])
    return (
        <div className='TrendingTrailers'>
            <h3>Tendencias</h3>
            <div className="trending_trailers_container">
                {
                    trendingTrailers.map(tt => {
                        return (
                            <div className='card_container' key={tt.ratingKey}>
                                <img src={tt.thumb} alt="" />
                                <div className="footer">
                                    {tt.parentTitle ? tt.parentTitle : ""}{tt.title}
                                    <p>{tt.year}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
