import { styled } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { agendaData } from "./assets/data"
import { agendaTypography } from "./assets/typography"

const Component = styled("section")(({ theme }) => ({
    marginTop: 120,
    padding: '40px 70px',
    background: '#000',
    display: 'flex',
    gap: 110,
    justifyContent: 'center',
    [theme.breakpoints.down("md")]: {
        padding: '32px 16px',
        flexDirection: 'column',
        gap: 32
    }
}))
const LeftCont = styled('div')(({ theme }) => ({
    color: '#fff',
    width: 556,
    [theme.breakpoints.down("md")]: {
        width: '100%'
    },
    '&>h2': {
        color: '#FFF',
        fontFamily: 'Poppins',
        fontSize: 48,
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: '120%', /* 57.6px */
        margin: "0 0 16px 0",
        [theme.breakpoints.down("md")]: {
            fontSize: 28
        }
    },
    '&>p': {
        color: 'var(--Color-Neutral-400, #E6E6E6)',
        /* Body/M */
        fontFamily: 'Poppins',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: '150%',
        margin: "0 0 8px 0"
    }
}))
const RightCont = styled('div')(({ theme }) => ({
    maxWidth: 633,
    [theme.breakpoints.down("md")]: {
        width: '100%'
    },
    '&>h5': {
        color: '#FFF',
        fontFamily: 'Poppins',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: '120%',
        textAlign: 'left',
        margin: '0px 0px 16px 0'
    }
}))

const SliderMenu = styled('div')(({ theme }) => ({
    borderRadius: 16,
    border: '1px solid var(--Color-Neutral-500, #D9D9D9)',
    background: '#353535',
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.down("md")]: {
        padding: '12px 20px',
    },
    boxSizing: 'border-box',
    '&>button': {
        color: '#D9D9D9',
        background: 'none',
        border: 'none',
        padding: 0,
        '&:hover': {
            color: '#4996E9'
        },
        display: 'flex',
        flexDirection : 'column',
        cursor: 'pointer',
        gap: 16,
        [theme.breakpoints.down("md")]: {
            gap: 8
        },
        '&>h3': {
            fontSize: 20,
            fontWeight: '600',
            lineHeight: '120%',
            margin: 0,
            fontFamily: 'Poppins'
        },
        '&>p': {
            fontSize: 18,
            fontWeight: '400',
            lineHeight: '150%',
            margin: 0,
            fontFamily: 'Poppins'
        }
    }
}))
const Content = styled('div')(({ theme })=> ({
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginTop: 32,
    outline: 'none',
}))

const ContentBx = styled('div')(({ theme })=> ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: 60,
    [theme.breakpoints.down('md')]: {
        gap: 10
    },
    '&>p': {
        fontFamily: 'Poppins',
        margin: 0
    },
    '&>p:nth-of-type(1)': {
        color: '#DFDFDF',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '150%',
        minWidth: 200,
        textAlign: 'right'
    },
    '&>p:nth-of-type(2)': {
        fontSize: 20,
        fontWeight: 600,
        lineHeight: '120%',
        color: '#fff',
        [theme.breakpoints.down("md")]: {
            fontSize: 16
        }
    },
    

}))

const NextBtn = styled('button')({
    display: 'flex',
    width: 221,
    padding: "10px 16px",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    border: "1px solid var(--Color-Neutral-500, #D9D9D9)",
    background: "#FFF",
    color: 'var(--Color-Primary-500, #2180E4)',
    fontFamily: 'Poppins',
    fontSize: 18,
    fontStyle: 'normal',
    cursor: 'pointer',
    fontWeight: 400,
    lineHeight: '150%' /* 27px */
})

const Agenda = () => {

    const [selected, setSelected] = useState(1)
    const [large, setLarge] = useState(true)

    const contentRef = useRef()


    const handleSelectDay = (day) => {
        setSelected(day);
        setTimeout(() => {
            contentRef.current?.focus();
        }, 100); // slight delay ensures it's in the DOM
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 600px)");
    
        const handleMediaChange = (e) => {
            setLarge(e.matches ? false : true);
        };
    
        mediaQuery.addEventListener("change", handleMediaChange);
        handleMediaChange(mediaQuery); // Set initial state
    
        return () => mediaQuery.removeEventListener("change", handleMediaChange);
    }, []);

    const handleNextDay = () => {
        const next = selected === 3 ? 1 : selected + 1;
        setSelected(next);
        setTimeout(() => {
            contentRef.current?.focus();
        }, 100);
    };

    return (
        <Component id="agenda">
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            >
            <LeftCont>
                <h2>{agendaTypography.title["en-us"]}</h2>
                <p>{agendaTypography.para1["en-us"]}</p>
                <p>​{agendaTypography.para2["en-us"]}</p>
            </LeftCont>
            </motion.div>

            <motion.div
                 initial={{ opacity: 0, x: 30 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.5 }}
            >
                <RightCont>
                    <h5>{agendaTypography.title["en-us"]}</h5>
                    <SliderMenu>
                        <button style={{
                            borderBottom: selected === 1 ? '4px solid #fff' : 'none'
                        }} onClick={() => handleSelectDay(1)} >
                            <h3>Day 01</h3>
                            <p>{ large ? "Friday, Oct 3" : "Oct 3"}</p>
                        </button>
                        <button style={{
                            borderBottom: selected === 2 ? '4px solid #fff' : 'none'
                        }} onClick={() => handleSelectDay(2)}>
                            <h3>Day 02</h3>
                            <p>{ large ? "Saturday, Oct 4" : "Oct 4"}</p>
                        </button>
                        <button style={{
                            borderBottom: selected === 3 ? '4px solid #fff' : 'none'
                        }} onClick={() => handleSelectDay(3)}>
                            <h3>Day 03</h3>
                            <p>{ large ? "Sunday, Oct 5" : "Oct 5"}</p>
                        </button>
                    </SliderMenu>
                    <AnimatePresence mode="wait">
                    <motion.div
                        key={selected}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                    <Content ref={contentRef} tabIndex={-1} aria-live="polite" >
                    {
                        agendaData[selected-1].schedule.map((item, index) => (
                            <ContentBx key={index}>
                                <p>{item.startTime} - {item.endTime}</p>
                                <p>{item.event}</p>
                            </ContentBx>
                        ))
                    }
                    {selected!==3 && <NextBtn onClick={() => handleNextDay()}>Next Day</NextBtn>}
                             
                    </Content>
                    </motion.div>
                    </AnimatePresence>     
                </RightCont>
            </motion.div>

        </Component>
    )
}

export default Agenda