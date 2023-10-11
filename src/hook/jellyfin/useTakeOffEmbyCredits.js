import { useContext } from "react"
import { appContext } from "../../context/AppContext"

export const useTakeOffEmbyCredits = () => {
    const { emby } = useContext(appContext)
    const TakeOff = ({ credits, connections, admin }) => {
        let deleted = 0;
        const embyCredits = emby.embyCredits.filter(c => c.admin == admin);
        for (let i = 0; i < embyCredits.length; i++) {
            if (deleted > credits) return;
            if (embyCredits[i].connections == connections) {
                embyCredits.splice(i, 1);
                deleted++;
            }

        }
        emby.setEmbyCredits(embyCredits)
    }

    return [TakeOff]
}
