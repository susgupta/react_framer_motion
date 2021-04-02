import styled from 'styled-components'
import { motion } from 'framer-motion'

//Banner
export const Banner = styled.div`
    background: ${props => props.theme.background};
    height: 100vh;
    width: 100%;
    position: relative;
    margin-bottom: 296px;
`

//Video 
export const Video = styled.div`
    height: 100%;
    width: 100%;
    video{
        object-fit: cover;
    }
`

//Canvas 
export const Canvas = styled.canvas`
    position: absolute;
    top: 0;
    left: 0;
    display: block;
`

//BannerTitle 
export const BannerTitle = styled(motion.h1)`
    position: absolute;
    bottom: -120px;
    left: --18px;
    color: ${props => props.theme.text};
    pointer-events: none;
`

//Headline 
export const Headline = styled(motion.span)`
    display: block;
    font-size: 23rem;
    font-weight: 900;
    line-height: 0.76;
`