import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Principal from './Principal/Principal'
import Postes from './Poste/Postes'
import Loginn from './Login2/Loginn'
import Register from './Register/Register'
import EditProfile from './EditProfile/EditProfile'
import Securite from './Securite/Securite'
import SettingsC from './SettingsC/SettingsC'
import Search from './Search/Search'
import AddPost from './AddPost/AddPost'
import Notifications from './Notifications/Notifications'
import Followers from './Followers/Followers'
import Followings from './Followings/Followings'
import Accueill from './Accueill/Accueill'
import Profile from './Profile/Profile'
import AddProfil from './EditProfile/AddProfil'
import ProfilFriend from './Search/ProfilFriend'
import ResetPassword from './Login2/ResetPassword'
import EditPassword from './Login2/EditPassword'
import Commentaires from './Poste/Commentaires'
import UpdatePost from './AddPost/UpdatePost'
import ProtectedRoute from './Authentification/ProtectedRoute'


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/Accueil' element={<Accueill />}></Route>
      <Route path='/Login' element={<Loginn />}></Route>
      <Route path='/EditPassword' element={<EditPassword />}></Route>
      <Route path='/ResetPassword' element={<ResetPassword />}></Route>
      <Route path='/Register' element={<Register />}></Route>
      <Route path='/Search' element={<ProtectedRoute><Search /></ProtectedRoute>} />
        <Route path='/' element={<Principal />}>
          <Route index element={<ProtectedRoute><Postes /></ProtectedRoute>} />
          <Route path="Commentaires/:postId" element={<ProtectedRoute><Commentaires /></ProtectedRoute>} />
          <Route path='Profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="ProfilFriend/:profilId" element={<ProtectedRoute><ProfilFriend /></ProtectedRoute>} />
          <Route path='AddProfil' element={<ProtectedRoute><AddProfil /></ProtectedRoute>} />
          <Route path='EditProfile' element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path='Securite' element={<ProtectedRoute><Securite /></ProtectedRoute>} />
          <Route path='Settings' element={<ProtectedRoute><SettingsC /></ProtectedRoute>} />
          <Route path='AddPost' element={<ProtectedRoute><AddPost /></ProtectedRoute>} />
          <Route path='UpdatePost/:postId' element={<ProtectedRoute><UpdatePost /></ProtectedRoute>} />
          <Route path='Notifications' element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path='Followers' element={<ProtectedRoute><Followers /></ProtectedRoute>} />
          <Route path='Followings' element={<ProtectedRoute><Followings /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
