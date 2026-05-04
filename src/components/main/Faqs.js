import { styled } from "@mui/material"
import downArrow from '../../assets/downArrow.svg'
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"


const Component = styled('section')(({ theme }) => ({
    margin: "129px 0 120px 0",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    [theme.breakpoints.down("md")]: {
        margin: "20px 16px",
    },
    '&>h2': {
        color: '#000',
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontSize: 48,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: '120%', /* 57.6px */
        margin: 0,
        [theme.breakpoints.down("md")]: {
            fontSize: 24
        }
    },
    '&>div': {
        marginTop: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        [theme.breakpoints.down("md")]: {
            marginTop: 40
        },
        '&>div': {
            width: 982,
            [theme.breakpoints.down("md")]: {
                width: '100%'
            },
            '&>button': {
                height: 88,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 8,
                border: '1px solid var(--Color-Style-Neutral-Neutral-700, #E0E0E0)',
                background: '#FFF',
                padding: 32,
                boxSizing: "border-box",
                cursor: "pointer",
                fontFamily: 'Poppins',
                textAlign: 'left',
                [theme.breakpoints.down("md")]: {
                    padding: 16,
                },
                '&>p': {
                    color: 'var(--Color-Style-Neutral-Neutral-400, rgba(0, 0, 0, 0.96))',
                    /* Title/L */
                    fontFamily: 'Poppins',
                    fontSize: 24,
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: '120%',
                    [theme.breakpoints.down("md")]: {
                        fontSize: 16,
                        fontFamily: 'regular',
                        fontWeight: 500,
                    }
                }
            },
            '&>p': {
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 30,
                margin: 0,
                fontFamily: 'Poppins',
                borderRadius: 8,
                border: '1px solid var(--Color-Style-Neutral-Neutral-700, #E0E0E0)',
                background: '#FFF'
            }
        },
       
        
    }
}))

const Faqs = () => {
    const [select, setSelect] = useState(0)

    const handleQuestion = (elm) => {
        if(select === elm) setSelect(0)
        else setSelect(elm)
    }
    return (
        <Component id="faqs">
  <h2>Frequently Asked Questions (FAQ's)</h2>
  <div>
    {[1, 2, 3].map((item) => (
      <div key={item}>
        <button onClick={() => handleQuestion(item)}>
          <p>
            {item === 1 && "How can I reach the conference venue?"}
            {item === 2 && "Will the conference provide accommodation options?"}
            {item === 3 && "What is the refund policy if I am unable to attend?"}
          </p>
          <img alt="" width={24} src={downArrow} />
        </button>
        <AnimatePresence initial={false}>
          {select === item && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              {item === 1 &&
                "You can reach the conference venue by public transportation, taxi, or personal vehicle. We recommend using Google Maps or the event’s official app for navigation. Shuttle services may also be available from select locations. Please check the travel & logistics section on our website for detailed directions and parking information."}
              {item === 2 &&
                "The conference does include accommodation. We have partnered with nearby hotels to offer discounted rates for attendees. You can find a list of recommended hotels and booking details on our Accommodation & Travel page. We advise booking early to secure the best rates."}
              {item === 3 &&
                "Right now we don't have a refund policy but you can ask your query​ to info@empowerconference.in"}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    ))}
  </div>
</Component>

    )
}

export default Faqs