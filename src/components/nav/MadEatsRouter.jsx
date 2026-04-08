import { HashRouter, Route, Routes } from "react-router";

import MadEats from "../MadEats";
import DiscoverPage from "./pages/DiscoverPage"
import SavePage from "./pages/SavePage";
import ReviewPage from "./pages/ReviewsPage";
import PageNotFound from "./pages/PageNotFound";

export default function MadEatsRouter() {
    return <HashRouter>
        <Routes>
            <Route path="/" element={<MadEats />}>
                <Route index element={<DiscoverPage />} />
                <Route path="save-for-later" element={<SavePage />} />
                <Route path="review" element={<ReviewPage />} />
                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    </HashRouter>
}