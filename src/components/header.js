import { Link } from 'gatsby';
import React, { useEffect } from 'react';


//add styled components
import { HeaderNav, Logo, Menu } from '../styles/headerStyles';
import { Container, Flex } from '../styles/globalStyles';

//get context
import { useGlobalStateContext, useGlobalDispatchContext } from '../context/globalContext';

const Header = ({ onCursor }) => {

    const { currentTheme } = useGlobalStateContext();
    const dispatch = useGlobalDispatchContext();

    const toggleTheme = () => {

        if (currentTheme === 'dark') {
            dispatch({
                type: "TOGGLE_THEME",
                theme: "light"
            })
        }
        else {
            dispatch({
                type: "TOGGLE_THEME",
                theme: "dark"
            })
        }

    }

    //use local storage, basically a react hook that will run only when 'current theme' is changed
    useEffect(() => {
        window.localStorage.setItem("theme", currentTheme)
    }, [currentTheme])

    return (
        <HeaderNav
            animate={{
                y: 0,
                opacity: 1
            }}
            initial={{
                y: -72,
                opacity: 0
            }}
            transition={{
                duration: 1,
                ease: [0.6, 0.05, -0.01, 0.9]
            }}
        >
            <Container>
                <Flex spaceBetween noHeight>
                    <Logo
                        onMouseEnter={() => onCursor("hovered")}
                        onMouseLeave={onCursor}
                    >
                        <Link to="/">FURR</Link>
                        <span
                            onClick={toggleTheme}
                            onMouseEnter={() => onCursor("pointer")}
                            onMouseLeave={onCursor}
                        ></span>
                        <Link to="/">W</Link>
                    </Logo>
                    <Menu>
                        <button>
                            <span></span>
                            <span></span>
                        </button>
                    </Menu>
                </Flex>
            </Container>
        </HeaderNav>
    )
}

export default Header
