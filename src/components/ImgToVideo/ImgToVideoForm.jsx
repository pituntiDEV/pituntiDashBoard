import React from 'react'
import "./ImgToVideoForm.scss";
import { useState } from 'react';
import { TrashIcon } from '../icons/TrashIcon';
import useFetchApi from '../../hook/useFetchApi';
import SWAlert from '../SwAlert/SWAlert';
export const ImgToVideoForm = () => {
    const [images, setImages] = useState([]);
    const [duration, setDuration] = useState(1);

    const [createVideo, loading] = useFetchApi({
        url: `/api/imgToVideo`
    })

    const deleteImg = (index) => {
        const imagesCopy = [...images]
        imagesCopy.splice(index, 1);
        setImages(imagesCopy)
    }

    const newImage = () => {
        if (images.length > 4) {
            return
        }

        setImages([...images, ""]);

    }

    const onChangeUrl = (e) => {
        const imagesCopy = [...images];

        imagesCopy[e.target.name] = e.target.value;
        setImages(imagesCopy)
    }
    const submit = (e) => {
        e.preventDefault();
        const formData = {
            images,
            duration
        }

        if (images.length < 1) {
            SWAlert.error({ title: "Mínimo una imagen" });

            return
        }

        createVideo({ body: JSON.stringify(formData) })
            .then(data => {
                SWAlert.alert({
                    title: "Video Generated"
                })
            })
            .catch(error => {
                SWAlert.error({
                    title: "ERROR"
                })
            })



    }
    return (
        <form onSubmit={submit} className='ImgToVideoForm'>
            <span>URL:</span>
            <h3>{process.env.REACT_APP_API_URL}/api/imgToVideo/video/{localStorage.getItem("_id")}</h3>
            <div className="form__group">
                <label htmlFor="duration">Duración de cada imagen</label>
                <input onChange={(e) => setDuration(e.target.value)} required min={1} value={duration} type="number" name="duration" id="" />
            </div>

            <button type='button' className='btn btn-success' onClick={newImage}>Nueva imagen</button>

            {
                images.map((img, index) => {
                    return (
                        <div className='form__group'>
                            <label htmlFor="">Link {index + 1}</label>
                            <div className="input">
                                <input pattern="https?://.+\.(jpg|jpeg|gif|png)" onChange={onChangeUrl} type="text" name={index} value={img} required minLength={20} />
                                <TrashIcon onClick={() => deleteImg(index)} />
                            </div>
                        </div>
                    )
                })
            }

            <div className="d-flex mt-3">
                <button className='btn btn-primary'>Crear</button>
            </div>
        </form>
    )
}
