
import "./ResellersJellyfin.scss";
import { Header } from './components/Header/Header';
import { ResellersList } from './components/ResellersList/ResellersList';
import { ResellersContext } from "./ResellersContext";
export const ResellersJellyfin = () => {

    return (
        <ResellersContext>
            <div className='reselelrs__jellyfin'>
                <div className="emby_resellers__header">
                    <Header />
                </div>
                <div className="resellers__list">
                    <ResellersList />
                </div>
            </div>

        </ResellersContext>
    )
}
