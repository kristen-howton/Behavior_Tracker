import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { UserProfileContext } from "./providers/UserProfileProvider";
import { ActivityContext } from './providers/ActivityProvider';
import { LearnerContext } from './providers/LearnerProvider';
import { BehaviorContext } from './providers/BehaviorProvider';

export default function Header() {

    const { isLoggedIn, logout } = useContext(UserProfileContext);
    const { setActivities } = useContext(ActivityContext);
    const { setLearners } = useContext(LearnerContext);
    const { setBehaviors } = useContext(BehaviorContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const internal_logout = () => {
        logout()
        setActivities([]);
        setLearners([]);
        setBehaviors([]);
    }

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand tag={RRNavLink} to="/">Behavior Tracker</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/">Activities</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/add">Add Activity</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/learner">Learners</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/behavior">Behavior</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/report">Report</NavLink>
                                </NavItem>


                            </>
                        }
                        {!isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                                </NavItem>
                            </>
                        }
                    </Nav>

                    <NavItem>
                        <a aria-current="page" className="nav-link"
                            style={{ cursor: "pointer" }} onClick={internal_logout}>Logout</a>
                    </NavItem>

                </Collapse>
            </Navbar>
        </div>
    );
}