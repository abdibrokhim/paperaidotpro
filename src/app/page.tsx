'use client';

// src/app/pages.tsx
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react"
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

import { firebaseConfig } from './firebase.config';
import Notification from './utils/notify';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default function Home() {

  const slides = [
    {
      title: "Idle Mode",
      imageUrl: "/modes/clean_mode.png",
    },
    {
      title: "Private Mode",
      imageUrl: "/modes/private_mode.png",
    },
    {
      title: "Collaborative Mode",
      imageUrl: "/modes/collaborative_mode.png",
    },
    {
      title: "Add New Paper",
      imageUrl: "/modes/add_new_paper.png",
    },
    {
      title: "Leave Comments",
      imageUrl: "/modes/leave_comments.png",
    },
    {
      title: "... and Reply",
      imageUrl: "/modes/reply.png",
    },
    {
      title: "AI Voice Assistant",
      imageUrl: "/modes/ai_voice_assistant.png",
    },
    {
      title: "Citation Made Easy",
      imageUrl: "/modes/citation.png",
    },
  ];

  const shorts = [
    {
      title: "Choose Your Mode",
      text: "Pick a research vibe! Whether you're flying solo in Idle Mode or jamming in Collaborative Mode, we've got the groove for every mood.",
      reverse: true,
      videoUrl: "/shorts/modes.mp4",
      muted: true,
      controls: false,
      autoPlay: true,
    },
    {
      title: "Idle Deep Dive Mode",
      text: "Dive deep in Idle Mode — perfect for those zen moments when you want your thoughts uninterrupted and your focus unfazed.",
      reverse: false,
      videoUrl: "/shorts/idle.mp4",
      muted: true,
      controls: false,
      autoPlay: true,
    },
    {
      title: "Private Mode",
      text: "Keep your cool ideas under wraps in Private Mode until they're ready to shine. It's your private think tank!",
      reverse: true,
      videoUrl: "/shorts/private.mp4",
      muted: true,
      controls: false,
      autoPlay: true,
    },
    {
      title: "Collaborative Mode",
      text: "Better together! Sync up with peers, share sparks of genius, and co-create breakthroughs in real-time.",
      reverse: false,
      videoUrl: "/shorts/collab.mp4",
      muted: true,
      controls: false,
      autoPlay: true,
    },
    {
      title: "Interactive Annotations",
      text: "Highlight, scribble, and engage right on the text. It's like having a chat with the margins!",
      reverse: true,
      videoUrl: "/shorts/comment.mp4",
      muted: true,
      controls: false,
      autoPlay: true,
    },
    {
      title: "Dynamic Discussions",
      text: "Keep the convo going! Our threaded replies make sure no idea gets left behind.",
      reverse: false,
      videoUrl: "/shorts/reply.mp4",
      muted: true,
      controls: false,
      autoPlay: true,
    },
    {
      title: "Seamless Paper Integration",
      text: "Adding new research to your stash is a breeze. Drag, drop, and done!",
      reverse: true,
      videoUrl: "/shorts/url.mp4",
      muted: true,
      controls: false,
      autoPlay: true,
    },
    {
      title: "Advanced AI Voice Assistant",
      text: "Talk nerdy to me! Our AI Voice Assistant is here to chat up your research questions and fetch insights on command.",
      reverse: false,
      videoUrl: "/shorts/ai_voice_ass1.mp4",
      muted: false,
      controls: true,
      autoPlay: false,
    },
    {
      title: "Advanced AI Voice Assistant",
      text: "Talk nerdy to me! Our AI Voice Assistant is here to chat up your research questions and fetch insights on command.",
      reverse: true,
      videoUrl: "/shorts/ai_voice_ass2.mp4",
      muted: false,
      controls: true,
      autoPlay: false,
    },
    {
      title: "Effortless Citation Tool",
      text: "Cite it right, make it tight! Auto-magically generate citations that are spot-on and stress-free.",
      reverse: false,
      videoUrl: "/shorts/citation.mp4",
      muted: true,
      controls: false,
      autoPlay: true,
    },
  ];

  const testimonial = [
    {
      text: "Paper AI has truly transformed the way I approach research. It simplifies literature reviews and makes it easy to collaborate in real time with my team, which is a huge plus. The smart voice assistant is a game-changer, letting me access and organize insights without missing a beat. Plus, being open-source, it’s accessible and adaptable to anyone’s needs. Overall, it’s become an essential tool for streamlining my research process and maximizing productivity.",
      name: "Mohamed Uvaze Ahamed Ayoobkhan",
      occupation: "Assistant Professor",
    },
  ];

  const screenshots = [
    {
      title: "User Love",
      imageUrl: "/testimonials/user_love_1.png",
    },
    {
      title: "User Love",
      imageUrl: "/testimonials/user_love_2.png",
    },
    {
      title: "User Love",
      imageUrl: "/testimonials/user_love_3.png",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSlideScreenshot, setCurrentSlideScreenshot] = useState(0);
  const slideInterval = 2000; // 2 seconds
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'error' | 'success' | 'info' } | null>(null);  // notification message

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % slides.length);
    }, slideInterval);
    return () => clearInterval(interval);
  }, [currentSlide, slides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideScreenshot((currentSlideScreenshot + 1) % screenshots.length);
    }, slideInterval);
    return () => clearInterval(interval);
  }, [currentSlideScreenshot, screenshots.length]);

  function isValidEmail(email: string): boolean {
    if (!email) return false;

    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleGetUpdates = async () => {
    console.log('Handle Get Updates');
    if (!isValidEmail(email)) {
      console.log('Invalid email');
      setNotification({ message: 'Invalid email', type: 'error' });
      return;
    }

    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, 'subscribers'), {
        email,
        createdAt: Date.now(),
      });

      setEmail('');
      setNotification({ message: 'You have waitlisted!', type: 'success' });
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setLoading(false);
    }
  };

  const loader = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
    <circle cx={4} cy={12} r={3} fill="currentColor">
        <animate id="svgSpinners3DotsScale0" attributeName="r" begin="0;svgSpinners3DotsScale1.end-0.25s" dur="0.75s" values="3;.2;3" />
    </circle>
    <circle cx={12} cy={12} r={3} fill="currentColor">
        <animate attributeName="r" begin="svgSpinners3DotsScale0.end-0.6s" dur="0.75s" values="3;.2;3" />
    </circle>
    <circle cx={20} cy={12} r={3} fill="currentColor">
        <animate id="svgSpinners3DotsScale1" attributeName="r" begin="svgSpinners3DotsScale0.end-0.45s" dur="0.75s" values="3;.2;3" />
    </circle>
    </svg>
  );

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans bg-[#212121e6] text-white old-paper-bg">
      <Analytics />
      {notification && (
          <Notification
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification(null)}
          />
      )}
      {/* Logo */}
      <header className="row-start-1 w-full flex justify-between items-center">
        <div className="">
          <a className="flex justify-center items-center gap-2" href="https://www.paperai.pro/" rel="noopener noreferrer">
            <Image
              className="transform rotate-12 hover:rotate-180 transition-transform duration-500 ease-in-out"
              objectFit="contain"
              src="/vercel.svg"
              alt="PaperAI Logo"
              width={40}
              height={40}
              priority
              />
            <p className="text-2xl font-bold">PaperAI</p>
          </a>
        </div>
      </header>

      <main className="flex flex-col gap-16 row-start-2 items-center w-full">
        {/* Main Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 w-full">
          <div className="lg:w-1/2 w-full">
            <h1 className="text-4xl font-bold mb-4">
              PaperAI: The Open Source Collaborative AI Research Platform
            </h1>
            <p className="text-lg">
              Dive deep into the future of research with PaperAI. Our platform redefines collaborative exploration of academic papers. Join us in this revolution!
            </p>
          </div>
          <div className="lg:w-1/2 w-full">
            {/* Slider Component */}
            <div className="relative w-full h-96 overflow-hidden p-6 rounded-lg shadow-lg">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={slide.imageUrl}
                    alt={slide.title}
                    layout="fill"
                    objectFit="contain"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 w-full bg-[#2e2e2e] bg-opacity-100 p-4 text-center">
                    <h3 className="text-xl font-semibold">{slide.title}</h3>
                  </div> 
                </div>
              ))}
              {/* Navigation Dots */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-[#2e2e2e] bg-opacity-100 p-4 space-x-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-3 h-3 rounded-full ${
                      idx === currentSlide ? 'bg-white' : 'bg-[#ee5d19]'
                    }`}
                    onClick={() => setCurrentSlide(idx)}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Waitlist Section */}
        <div className="mt-8 flex gap-4 items-start sm:items-center flex-col sm:flex-row">
          <input
            disabled={loading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="rounded-md border border-solid border-[#ee5d19] dark:border-[#ee5d19] bg-transparent text-white h-10 sm:h-12 px-4 sm:px-5 text-sm sm:text-base w-80 sm:w-96 focus:outline-none focus:ring-2 focus:ring-[#ee5d19]"
          />
          <button
            disabled={loading}
            onClick={handleGetUpdates}
            className="font-black rounded-md border border-solid border-transparent bg-[#ff6600] text-white transition-colors flex items-center justify-center hover:bg-[#ee5d19] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-44"
          >
            {loading ? loader() : 'Join the Waitlist'}
          </button>
        </div>

        {/* Sections */}
        {shorts.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col mt-0 md:mt-16 ${
              section.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
            } items-center lg:items-start gap-8 my-0 md:my-8 w-full`}
          >
            <div className="lg:w-2/3">
              {/* Video Placeholder */}
              <div className="w-full h-full flex items-center justify-center rounded-md border-2 border-[#ee5d19] p-2">
                <video className="w-full h-full rounded-md" controls={section.controls} autoPlay={section.autoPlay} loop={true} muted={section.muted} >
                  <source src={section.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className="lg:w-1/3 mt-4">
              <h4 className="text-xl md:text-4xl font-bold mb-4 text-[#ee5d19]">{section.title}</h4>
              <p className="text-lg">{section.text}</p>
            </div>
          </div>
        ))}

        <div className="my-16 w-full">
          <h2 className="text-3xl font-bold text-start md:text-center mb-8">
          <span className="font-black text-[#ee5d19]">PaperAI</span> loves Researchers, umm... almost as much as Researchers love <span className="font-black bg-[#ee5d19]">PaperAI</span>!
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Testimonial Cards */}
            {testimonial.map((item, index) => (
              <div
                key={index}
                className="bg-[#2e2e2e] p-6 rounded-lg shadow-lg flex-1 flex flex-col items-start"
              >
                <p className="text-lg mb-4 italic text-gray-200 text-start">
                  &quot;{item.text}&quot;
                </p>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-400">{item.occupation}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="my-0 w-full">
          <h2 className="text-3xl font-bold text-start md:text-center mb-8">
            People Love <span className="font-black text-[#ee5d19]">PaperAI</span>! Here&apos;s what they have to say.
          </h2>
          <div className="w-full">
            {/* Slider Component */}
            <div className="relative w-full h-80 overflow-hidden p-6 rounded-lg">
              {screenshots.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                    index === currentSlideScreenshot ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={slide.imageUrl}
                    alt={slide.title}
                    layout="fill"
                    objectFit="contain"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Community Section */}
        <div className="my-16 w-full">
          <h2 className="text-3xl font-bold text-start md:text-center mb-8">
          Made for a Vibrant Community! Join Us Today!
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="bg-[#2e2e2e] p-6 rounded-lg shadow-lg flex-1">
              <h3 className="text-xl font-bold mb-4">GitHub</h3>
              <p className="text-lg mb-4">
                Star our repo, track new releases and become part of our open-source journey.
              </p>
              <a href="https://github.com/abdibrokhim/paper-ai-voice-assistant" 
                className="text-[#ee5d19] hover:underline" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Visit our GitHub
              </a>
            </div>
            <div className="bg-[#2e2e2e] p-6 rounded-lg shadow-lg flex-1">
              <h3 className="text-xl font-bold mb-4">Discord</h3>
              <p className="text-lg mb-4">
                Join our Discord community for real-time discussions, insights, and support.
              </p>
              <a href="https://discord.gg/nVtmDUN2sR" 
                className="text-[#ee5d19] hover:underline"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Join our Discord
              </a>
            </div>
            <div className="bg-[#2e2e2e] p-6 rounded-lg shadow-lg flex-1">
              <h3 className="text-xl font-bold mb-4">LinkedIn</h3>
              <p className="text-lg mb-4">
                Follow us on LinkedIn for updates, insights, and more. Let&apos;s connect!
              </p>
              <a href="https://www.linkedin.com/company/paperai/" 
                className="text-[#ee5d19] hover:underline"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Follow us on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative row-start-3 flex gap-6 flex-row items-end justify-between w-full">
        <div className="flex flex-col gap-4">
          <div className="top-0 absolute">
            <a className="flex justify-start items-center gap-2" href="https://www.paperai.pro/" rel="noopener noreferrer">
              <Image
                className="transform rotate-12 hover:rotate-180 transition-transform duration-500 ease-in-out"
                src="/vercel.svg"
                alt="PaperAI Logo"
                width={40}
                height={40}
                priority
                />
              <p className="text-2xl font-bold">PaperAI</p>
            </a>
          </div>
          <p className="text-xs text-[#9e9e9e]">© 2024 PaperAI - All Rights Reserved</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm mb-4 font-bold">Community</p>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-xs text-[#9e9e9e] hover:text-[#ee5d19]"
            href="https://x.com/abdibrokhim"
            target="_blank"
            rel="noopener noreferrer"
          >
            X
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-xs text-[#9e9e9e] hover:text-[#ee5d19]"
            href="https://www.linkedin.com/company/paperai/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-xs text-[#9e9e9e] hover:text-[#ee5d19]"
            href="https://discord.gg/nVtmDUN2sR"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-xs text-[#9e9e9e] hover:text-[#ee5d19]"
            href="https://github.com/abdibrokhim/paper-ai-voice-assistant"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Source → 
          </a>
        </div>
      </footer>
    </div>
  );
}