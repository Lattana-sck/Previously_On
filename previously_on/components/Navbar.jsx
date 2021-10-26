import React from 'react';
import Link from 'next/link';
import { NavMenuStyle } from '../assets/NavMenuStyle';
import { LiStyle } from '../assets/NavMenuStyle';

export default function NavMenu() {

  return (
    <NavMenuStyle>
      <nav className="stroke">
        <div>
          <ul className="navbar-nav ml-auto">
            <LiStyle>
              <li className="nav-item active">
                <Link href="/">Log</Link></li>
              <li className="nav-item active">
                <Link href="/serielist">Les séries à découvrir</Link></li>
              <li className="nav-item active">
                <Link href="/mesSeries">Mes séries</Link></li>
              <li className="nav-item active">
                <Link href="/ListFriends">Mes amis</Link></li>
              <li className="nav-item active">
                <Link href="/SearchMembers">Rechercher un ami</Link></li>
            </LiStyle>
          </ul>
        </div>
      </nav>
    </NavMenuStyle>

  )

}
