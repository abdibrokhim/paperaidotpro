'use client';

// src/app/pages.tsx
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react"

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
      title: "Choose your mode",
      text: "Select the mode that suits your research style, from Idle to Collaborative.",
      reverse: true,
      videoUrl: "/shorts/modes.mp4",
      muted: true,
      controls: false,
      autoPlay: true,
    },
    {
      title: "Deep dive into research in Idle mode",
      text: "Experience an uninterrupted focus on your research with our Idle mode, tailored for individual exploration.",
      reverse: false,
      videoUrl: "/shorts/idle.mp4",
      muted: true,
      controls: false,
      autoPlay: true,
    },
    {
      title: "Leave your notes in Private mode",
      text: "Jot down your insights and thoughts privately, ensuring your initial ideas are captured securely.",
      reverse: true,
      videoUrl: "/shorts/private.mp4",
      muted: true,
      controls: false,
      autoPlay: true,
    },
    {
      title: "Work together with peers in Collaborative mode",
      text: "Collaborate seamlessly with your peers, sharing insights and building upon each other's work.",
      reverse: false,
      videoUrl: "/shorts/collab.mp4",
      muted: true,
      controls: false,
      autoPlay: true,
    },
    {
      title: "Highlight to Leave comments",
      text: "Engage in discussions directly within the text by highlighting and commenting on specific sections.",
      reverse: true,
      videoUrl: "/shorts/comment.mp4",
      muted: true,
      controls: false,
      autoPlay: true,
    },
    {
      title: "... and Reply",
      text: "Engage in discussions directly within the text by highlighting and commenting on specific sections.",
      reverse: true,
      videoUrl: "/shorts/reply.mp4",
      muted: true,
      controls: false,
      autoPlay: true,
    },
    {
      title: "Add new paper with ease",
      text: "Easily upload and integrate new papers into your research library with minimal effort.",
      reverse: false,
      videoUrl: "/shorts/url.mp4",
      muted: true,
      controls: false,
      autoPlay: true,
    },
    {
      title: "Advanced AI Voice Assistant to help you with your research",
      text: "Leverage our AI Voice Assistant for hands-free assistance and insights while you work.",
      reverse: true,
      videoUrl: "/shorts/ai_voice_ass1.mp4",
      muted: false,
      controls: true,
      autoPlay: false,
    },
    {
      title: "Advanced AI Voice Assistant to help you with your research",
      text: "Leverage our AI Voice Assistant for hands-free assistance and insights while you work.",
      reverse: true,
      videoUrl: "/shorts/ai_voice_ass2.mp4",
      muted: false,
      controls: true,
      autoPlay: false,
    },
    {
      title: "Citation made easy with PaperAI",
      text: "Generate citations effortlessly, ensuring your references are accurate and properly formatted.",
      reverse: false,
      videoUrl: "/shorts/citation.mp4",
      muted: true,
      controls: false,
      autoPlay: true,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = 2000; // 2 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % slides.length);
    }, slideInterval);
    return () => clearInterval(interval);
  }, [currentSlide, slides.length]);


  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans bg-[#212121e6] text-white">
      <Analytics />
      {/* Logo */}
      <header className="row-start-1 w-full flex justify-between items-center">
        <div className="flex justify-center items-center gap-2">
          <Image
            className=""
            src="/vercel.svg"
            alt="PaperAI Logo"
            width={40}
            height={40}
            priority
            />
          <p className="text-2xl font-bold">PaperAI</p>
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
              PaperAI is a platform that revolutionizes the way researchers collaborate and dive into
              academic papers. Join us in redefining research workflows.
            </p>
          </div>
          <div className="lg:w-1/2 w-full">
            {/* Slider Component */}
            <div className="relative w-full h-96 overflow-hidden">
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
                  <div className="absolute top-0 w-full bg-black bg-opacity-50 p-4 text-center">
                    <h3 className="text-xl font-semibold">{slide.title}</h3>
                  </div> 
                </div>
              ))}
              {/* Navigation Dots */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-black bg-opacity-50 p-4 space-x-2">
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
            type="email"
            placeholder="Enter your email"
            className="rounded-md border border-solid border-[#ee5d19] dark:border-[#ee5d19] bg-transparent text-white h-10 sm:h-12 px-4 sm:px-5 text-sm sm:text-base w-64 sm:w-80 focus:outline-none focus:ring-2 focus:ring-[#ee5d19]"
          />
          <button
            onClick={() => alert("You have been added to the waitlist!")}
            className="font-black rounded-md border border-solid border-transparent bg-[#ff6600] text-white transition-colors flex items-center justify-center hover:bg-[#ee5d19] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-44"
          >
            Join the Waitlist
          </button>
        </div>

        {/* Sections */}
        {shorts.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col mt-16 ${
              section.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
            } items-center lg:items-start gap-8 my-8 w-full`}
          >
            <div className="lg:w-1/2">
              {/* Video Placeholder */}
              <div className="w-full h-96 flex items-center justify-center">
                <video className="w-full h-full" controls={section.controls} autoPlay={section.autoPlay} loop={true} muted={section.muted} >
                  <source src={section.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h4 className="text-2xl font-semibold mb-4">{section.title}</h4>
              <p className="text-lg">{section.text}</p>
            </div>
          </div>
        ))}

        {/* Testimonials Section */}
        <div className="my-16 w-full">
          <h2 className="text-3xl font-bold text-center mb-8">
            PaperAI loves Researchers, umm... almost as much as Researchers love PaperAI!
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Testimonial Cards */}
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-[#2e2e2e] p-6 rounded-lg shadow-lg flex-1 flex flex-col"
              >
                <p className="text-lg mb-4 flex-grow">
                &quot;PaperAI has revolutionized my research workflow.&quot;
                </p>
                <p className="font-semibold">Researcher Name</p>
                <p className="text-sm text-gray-400">Occupation</p>
              </div>
            ))}
          </div>
        </div>

        {/* Community Section */}
        <div className="my-16 w-full">
          <h2 className="text-3xl font-bold text-center mb-8">
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
              <a href="https://www.linkedin.com/company/opencommunity/" 
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
          <div className="flex justify-start items-center gap-2 top-0 absolute">
            <Image
              className=""
              src="/vercel.svg"
              alt="PaperAI Logo"
              width={40}
              height={40}
              priority
              />
            <p className="text-2xl font-bold">PaperAI</p>
          </div>
          <p className="text-xs text-[#9e9e9e]">© 2024 PaperAI - All Rights Reserved</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm mb-4 font-bold">Community</p>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-xs text-[#9e9e9e]"
            href="https://x.com/abdibrokhim"
            target="_blank"
            rel="noopener noreferrer"
          >
            X
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-xs text-[#9e9e9e]"
            href="https://www.linkedin.com/company/opencommunity/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-xs text-[#9e9e9e]"
            href="https://discord.gg/nVtmDUN2sR"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-xs text-[#9e9e9e]"
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