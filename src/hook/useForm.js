import { useState } from "react"

export const useForm = (initialData) => {
    const [data, setData] = useState(initialData);
    const onChange = (e) => {
        setData({...data,[e.target.id]:e.target.value});
    }

    return [data,onChange]
}
