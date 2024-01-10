import { motion } from "framer-motion";

function ChatTextAnimation({chatResponse}) {

  const text = chatResponse.split(" ");

  return (
    <p> ChatBot: 
      {text.map((el, i) => (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.25,
            delay: i / 10
          }}
          key={i}
        >
          {el}{" "}
        </motion.span>
      ))}
    </p>
  );
}

export default ChatTextAnimation;
