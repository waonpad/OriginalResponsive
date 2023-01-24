import React from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { createRoot } from "react-dom/client";
import View from './components/View';
import Header from './components/Header';
import Example from "./components/Example";

const Root = () => {
    return (
        <View>
            <BrowserRouter>
                <Header>
                    <Routes>
                        <Route path='/' exact element={<Example />} />
                    </Routes>
                </Header>
            </BrowserRouter>
        </View>
    );
};

export default Root;

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Root />);