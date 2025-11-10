export interface IntroData {
  name: string;
  title: string;
  greeting: string;
  message: string;
  moreButton: {
    text: string;
    targetSection: string;
  };
  backgroundImage: {
    url: string;
    gradient: string;
  };
  animation: {
    typingSpeed: number;
    typingDelay: number;
  };
}