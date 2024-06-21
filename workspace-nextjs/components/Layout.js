
import React from 'react'
import Footer from "../components/Footer/footer"
import Header from "../components/Header/header";


export default function Layout(props) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  )
}
