import { useState, useEffect } from 'react';

interface UseTypingProps {
  text: string;
  speed?: number;
  delay?: number;
}

export const useTyping = ({ 
  text, 
  speed = 100, 
  delay = 0,
}: UseTypingProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;
    let charIndex = 0;
    let isDeleting = false;

    const startAnimation = () => {
      intervalId = setInterval(() => {
        // 타이핑 단계
        if (!isDeleting) {
          if (charIndex < text.length) {
            setDisplayedText(text.substring(0, charIndex + 1));
            charIndex++;
            setIsTyping(true);
          } else {
            // 타이핑 완료, 1초 후 삭제 시작
            clearInterval(intervalId);
            timeoutId = setTimeout(() => {
              isDeleting = true;
              charIndex = text.length;
              startDeletion();
            }, 2000);
          }
        }
      }, speed);
    };

    const startDeletion = () => {
      intervalId = setInterval(() => {
        if (isDeleting) {
          if (charIndex > 0) {
            charIndex--;
            setDisplayedText(text.substring(0, charIndex));
            setIsTyping(false);
          } else {
            // 삭제 완료, 다시 타이핑 시작
            clearInterval(intervalId);
            isDeleting = false;
            charIndex = 0;
            timeoutId = setTimeout(() => {
              startAnimation();
            }, 500);
          }
        }
      }, speed);
    };

    // 초기 딜레이 후 시작
    const startDelay = setTimeout(() => {
      startAnimation();
    }, delay);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, delay]);

  return { displayedText, isTyping };
};
