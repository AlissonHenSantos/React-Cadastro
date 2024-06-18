import './Nav.css'
import React from 'react'
import Navitem from '../itens/Navitem'

export default props => 
    <aside className='menu-area'>
        <nav className="menu">
            <Navitem icon="home" link="/" caminho="Home"></Navitem>
            <Navitem icon="users" link="/users" caminho="Users"></Navitem>
            
        </nav>
    </aside>