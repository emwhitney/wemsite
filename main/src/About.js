import React from 'react'
import Stack from '@mui/material/Stack';

function About() {
  return (
    <Stack spacing={3}>
      <h1>About me</h1>
      <div>
        Hi, I'm Em
      </div>
      <div>
        I make software and write. I currently work at Mailchimp as a software engineer. 
      </div>
  
      
      <h2>Contact</h2>
      <ul>
        <li>emilyiswhitney@gmail.com</li>
        <li>github.com/emwhitney</li>
        <li>instagram.com/wem_account</li>
      </ul>
    </Stack>
  )
}

export default About