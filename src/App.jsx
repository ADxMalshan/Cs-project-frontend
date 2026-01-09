import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPage from "./pages/adminPage";

import Testing from "./pages/testing";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/homePage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AppointmentPage from "./pages/client/appoinmentPage";
import LoginModal from "./pages/loginModel";

function App() {
	return (
		<GoogleOAuthProvider clientId = "631792534424-sbpquhqen559e84esbqa4jq92ifd27q4.apps.googleusercontent.com">
			<BrowserRouter>
			<Toaster position="bottom-right" reverseOrder={false}/>
				<Routes path="/*">
					<Route path="/admin/*" element={<AdminPage/>}/>
					<Route path="/login" element={<LoginModal/>}/>
					<Route path="/testing" element={<Testing/>}/>
					<Route path="/appointment" element={<AppointmentPage/>}/>
					<Route path="/*" element={<HomePage/>}/>
				</Routes>
			</BrowserRouter>
		</GoogleOAuthProvider>
	);
}

export default App;
