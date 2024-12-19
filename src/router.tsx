import { BrowserRouter, Routes, Route } from "react-router-dom";
import Laout from "./layouts/Layout";
import { Suspense } from "react";
import IndexPage from "./pages/IndexPage";
import HistoryPredictions from "./pages/HistoryPredictions";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Laout />}>
                    <Route path="/" element={
                        <Suspense fallback="cargando...">
                            <IndexPage />
                        </Suspense>
                    } index />

                    <Route path="/predictions" element={
                        <Suspense fallback="cargando...">
                            <HistoryPredictions />
                        </Suspense>
                    }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}