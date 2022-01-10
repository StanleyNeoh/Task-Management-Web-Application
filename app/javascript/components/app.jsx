import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navigation from "./partials/navigation"
import { DoesNotExist } from './partials/misc'

import Home from "./home/home"
import Login from "./session/login"

import Tasks from "./tasks/tasks"
import CreateTask from './tasks/createTask'
import ShowTask from './tasks/showTask'
import EditTask from './tasks/editTask'

import Tags from "./tags/tags"
import CreateTag from './tags/createTag'
import ShowTag from './tags/showTag'
import EditTag from './tags/editTag'
import AddTasksToTags from './tags/addTasksToTags'

import CreateUser from './user/createUser'
import ShowUser from './user/showUser'
import ChangeUsername from './user/editUser/changeUsername'
import ChangePassword from './user/editUser/changePassword'





const App = ()=>{
    return (
        <BrowserRouter>
            <Navigation/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="sessions" element={<Login/>}/>
                <Route path="tasks"> 
                    <Route path="" element={<Tasks/>}/>
                    <Route path="create" element={<CreateTask/>}/>
                    <Route path=":id">
                        <Route path="" element={<ShowTask/>}/>
                        <Route path="edit" element={<EditTask/>}/>
                    </Route>
                </Route>

                <Route path="tags" >
                    <Route path="" element={<Tags/>}/>
                    <Route path="create" element={<CreateTag/>}/>
                    <Route path=":id">
                        <Route path="" element={<ShowTag/>}/>
                        <Route path="edit" element={<EditTag/>}/>
                        <Route path="add" element={<AddTasksToTags/>}/>
                    </Route>
                </Route>
                
                <Route path="users" >
                    <Route path="" element={<CreateUser/>}/>
                    <Route path=":id">
                        <Route path="" element={<ShowUser/>}/>
                        <Route path="username" element={<ChangeUsername/>}/>
                        <Route path="password" element={<ChangePassword/>}/>
                    </Route>
                </Route>
                <Route path="*" element={<DoesNotExist item="page"/>} />
            </Routes>
        </BrowserRouter>   
    )
}

export default App