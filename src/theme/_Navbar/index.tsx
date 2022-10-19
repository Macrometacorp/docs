import React from 'react';
import NavbarLayout from '@theme-original/Navbar/Layout';
import NavbarContent from '@theme-original/Navbar/Content';
import SubNavbar from '../../components/SubNavbar';

export default function Navbar(): JSX.Element {
  return (
    <div className="navbar--fixed-top">
      <NavbarLayout>
        <NavbarContent />
      </NavbarLayout>
      <SubNavbar />
    </div>
  );
}
