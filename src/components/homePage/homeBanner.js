import React, { useEffect, useRef } from 'react'
import { render } from 'react-dom';

import { Banner, Video, Canvas, BannerTitle, Headline } from '../../styles/homeStyles'

//get context
import { useGlobalStateContext } from '../../context/globalContext'

//get custom hook
import useWindowSize from '../../hooks/useWindowSize'

const HomeBanner = ({ onCursor }) => {

    let canvas = useRef(null);
    const size = useWindowSize();
    const { currentTheme } = useGlobalStateContext()

    useEffect(() => {
        let renderingElement = canvas.current;
        let drawingElement = renderingElement.cloneNode();

        let drawingCtx = drawingElement.getContext('2d');
        let renderingCtx = renderingElement.getContext('2d');

        let lastX;
        let lastY;

        let moving = false;

        renderingCtx.globalCompositeOperation = 'source-over';
        renderingCtx.fillStyle = currentTheme === 'dark' ? '#000000' : '#ffffff';
        renderingCtx.fillRect(0, 0, size.width, size.height);

        renderingElement.addEventListener('mouseover', e => {
            moving = true;

            lastX = e.pageX - renderingElement.offsetLeft;
            lastY = e.pageY - renderingElement.offsetTop;

        });

        renderingElement.addEventListener('mouseup', e => {
            moving = false;

            lastX = e.pageX - renderingElement.offsetLeft;
            lastY = e.pageY - renderingElement.offsetTop;

        });

        renderingElement.addEventListener('mousemove', e => {

            //apply eraser effect
            if (moving) {
                drawingCtx.globalCompositeOperation = 'source-over';
                renderingCtx.globalCompositeOperation = 'destination-out';

                let currentX = e.pageX - renderingElement.offsetLeft;
                let currentY = e.pageY - renderingElement.offsetTop;

                drawingCtx.lineJoin = 'round';
                drawingCtx.moveTo(lastX, lastY);
                drawingCtx.lineTo(currentX, currentY);
                drawingCtx.closePath();
                drawingCtx.lineWidth = 120;
                drawingCtx.stroke();

                lastX = currentX;
                lastY = currentY;

                //apply in effect 'eraser' on render
                renderingCtx.drawImage(drawingElement, 0, 0);
            }

        });



    }, [currentTheme])

    //define animation for framer motion
    const parent = {
        INITIAL: { y: 800 },
        animate: {
            y: 0,
            transition: {
                staggerChildren: .2
            }
        }
    }

    const child = {
        INITIAL: { y: 800 },
        animate: {
            y: 0,
            transition: {
                duration: 1,
                ease: [0.6, 0.5, -0.01, 0.9]
            }
        }
    }

    return (
        <Banner>
            <Video>
                <video
                    height='100%'
                    width='100%'
                    loop
                    autoPlay
                    muted
                    src={require('../../assets/video/video.mp4')}
                >

                </video>
            </Video>
            <Canvas
                height={size.height}
                width={size.width}
                ref={canvas}
                onMouseEnter={() => onCursor("hovered")}
                onMouseLeave={onCursor}
            >

            </Canvas>
            {<BannerTitle variants={parent} initial="initial" animate="animate">
                <Headline variants={child}>DIG</Headline>
                <Headline variants={child}>Deep</Headline>
            </BannerTitle>}
        </Banner>
    )
}

export default HomeBanner
