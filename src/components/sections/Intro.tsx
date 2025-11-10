import { useTyping } from "../../hooks/useTyping";
import type { IntroData } from "../../types";
import { motion } from "framer-motion";
import {
  buttonBounceVariants,
  containerVariants,
  itemVariants,
} from "../../animations/variants";

interface IntroProps {
  data: IntroData;
}

function Intro({ data }: IntroProps) {
  const { displayedText } = useTyping({
    text: data.title,
    speed: data.animation.typingSpeed,
    delay: data.animation.typingDelay,
  });

  const scrollToNext = () => {
    const targetSection = document.getElementById(data.moreButton.targetSection);
    targetSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="intro"
      className="relative w-full h-screen min-h-[600px] flex items-center justify-center bg-cover bg-center bg-fixed overflow-hidden"
      style={{
        backgroundImage: `${data.backgroundImage.gradient}, url("${data.backgroundImage.url}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center text-white z-10 px-4 lg:px-0"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-poppins font-black mb-4 md:mb-6 tracking-widest"
          >
            {data.name}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-2xl md:text-4xl font-poppins font-bold mb-6 md:mb-8 max-w-4xl mx-auto min-h-16 md:min-h-20 flex items-center justify-center"
          >
            <span className="inline-flex items-center">
              {displayedText}
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  times: [0, 0.49, 0.5, 1],
                }}
                className="inline-block ml-2 font-bold text-white"
              >
                |
              </motion.span>
            </span>
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="w-16 h-1 bg-primary rounded-full mx-auto mb-6 md:mb-8"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.8 }}
          />

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl font-light mb-8 md:mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            {data.greeting}
            <br />
            {data.message}
          </motion.p>
        </motion.div>

        <motion.button
          onClick={scrollToNext}
          variants={buttonBounceVariants}
          animate="animate"
          className="bg-primary-600 hover:bg-primary-700 text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-semibold text-sm md:text-base cursor-pointer"
        >
          {data.moreButton.text}
        </motion.button>
      </div>
    </section>
  );
}

export default Intro;
