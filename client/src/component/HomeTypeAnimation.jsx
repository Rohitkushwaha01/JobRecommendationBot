import { TypeAnimation } from 'react-type-animation';

export default function HomeTypeAnimation() {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Grab Your Job Opportunities😁',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'with the DynamicBot.....🤖',
        1000,
        'Stay updated with the recent job openings👨‍💻',
        1000,
        'Prepare with us...😎',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{display: 'inline-block' }}
      repeat={Infinity}
    />
  )
}
