import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { RiMenu5Fill } from 'react-icons/ri';
import { RiCloseFill } from 'react-icons/ri';

import './navbar.css'

export const Navbar = () => {
    const [open, setOpen] = useState(false);

    const hamburgerIcon = (
        <RiMenu5Fill
            size="25px"
            className="text-white cursor-pointer"
            onClick={() => {
                setOpen(!open);
            }}
        />
    );
    const closeIcon = (
        <RiCloseFill
            size="25px"
            className="text-white cursor-pointer"
            onClick={() => {
                setOpen(!open);
            }}
        />
    );
    return (
        <>
            <header className="bg-slate-900">

                <nav className="shadow-md flex-1 md:flex justify-between items-center h-24">
                    <div className="flex h-24 justify-between items-center">
                        <h1 className="title text-4xl text-white ml-4 font-title">Movies App</h1>

                        <div className="md:hidden p-3 order-1">
                            {open ? closeIcon : hamburgerIcon}
                        </div>
                    </div>

                    <ul
                        className={`text-white flex justify-center sm:flex-col md:flex-row items-center z-[-1] md:z-auto md:static absolute w-full left-0 md:w-auto md:py-0 md:opacity-100 transition-all ease-in duration-500 md:transition-none  md:mr-5 md:bg-transparent bg-white/20 ${open ? 'top-24 opacity-100 z-40' : '-top-24 opacity-0'
                            }`}>
                        <li className="p-3 text-center">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? ' text-customteal font-bold text-lg'
                                        : 'text-base'
                                }
                                to="/">
                                Home
                            </NavLink>
                        </li>
                        <li className="p-3 text-center">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? ' text-customteal font-bold text-lg'
                                        : 'text-base'
                                }
                                to="upload-file">
                                Subir Archivo
                            </NavLink>
                        </li>
                    </ul>
                </nav>

            </header>
            <div className="bg-stone-100">
                <Outlet />
            </div>
        </>
    );
};
