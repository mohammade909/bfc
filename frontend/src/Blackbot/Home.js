import React from 'react'
import { Header } from './Header'
import HeroSection from './HeroSection'
import { AboutSection } from './AboutSection'
import Trading from './Trading'
import Footer from './Footer'
import { Pricing } from './Pricing'
import {Members} from './Members'
import TrustedBroker from './TrustedBroker'
import ForexRobotCard from './Experience'


export const Home = () => {
  return (
    <>
    <Header/>
    <HeroSection/>
    <ForexRobotCard/>
    <Trading/>
    <TrustedBroker />
    <AboutSection/> 
    <Members/>
    <Pricing/>
    <Footer/>
    </>
  )
}
