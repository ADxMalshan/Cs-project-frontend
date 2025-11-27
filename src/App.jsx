import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPage from "./pages/adminPage";

import Testing from "./pages/testing";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/homePage";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
	return (
		<GoogleOAuthProvider clientId = "631792534424-sbpquhqen559e84esbqa4jq92ifd27q4.apps.googleusercontent.com">
			<BrowserRouter>
			<Toaster position="bottom-right" reverseOrder={false}/>
				<Routes path="/*">
					<Route path="/admin/*" element={<AdminPage/>}/>
					<Route path="/testing" element={<Testing/>}/>
					<Route path="/*" element={<HomePage/>}/>
				</Routes>
			</BrowserRouter>
		</GoogleOAuthProvider>
	);
}

export default App;
