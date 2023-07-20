import { useContext } from "react";
import { appContext } from "../../context/AppContext";

export const useTakeOffPlexCredits = () => {
    const { plex } = useContext(appContext)
    return [(totalToDiscount) => {
        const plexUpdatedCredits = [...plex.plexCredits];
        for (let i = 0; i < totalToDiscount; i++) {
            plexUpdatedCredits.pop();
        }

        plex.setPlexCredits(plexUpdatedCredits)
    }]
}
