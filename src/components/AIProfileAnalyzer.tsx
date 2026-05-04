'use client';

import { UploadCloud, Cpu, Search, X, CheckCircle2, ArrowRight, Target, TrendingUp, Info, Award, BookOpen, Layers, Zap, Sparkles, User, HelpCircle, Compass, Heart, Share2, ChevronRight, BarChart3, ChevronDown, UserCheck, Briefcase, Rocket, Car, Bus, Bike, Plane, ShieldCheck } from "lucide-react"
import { useState, useRef, useEffect, useMemo } from 'react'
import Image from 'next/image'
import CareerCoachingPortal from './pathways/CareerCoachingPortal';
import NewJourneyFlow from './pathways/NewJourneyFlow';
import SuggestedMoves from './SuggestedMoves';
import careerPathsData from '../data/careerPaths.json';
import { useLanguage } from '@/context/LanguageContext';
import React from 'react';

type Step = 'upload' | 'analyzing' | 'results';

const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes roadFlow {
      from { stroke-dashoffset: 200; }
      to { stroke-dashoffset: 0; }
    }
    @keyframes pulse-slow {
      0%, 100% { transform: scale(1); opacity: 0.5; }
      50% { transform: scale(1.1); opacity: 0.2; }
    }
    @keyframes pulse {
      0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.7; }
      100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
    @keyframes popIn {
      0% { transform: scale(0.9) translateY(20px); opacity: 0; }
      100% { transform: scale(1) translateY(0); opacity: 1; }
    }
    .hover-scale { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
    .hover-scale:hover { transform: scale(1.05); }
    .btn-close-roadmap { 
      transition: all 0.2s ease;
    }
    .btn-close-roadmap:hover {
      filter: brightness(0.9);
      transform: scale(1.05);
    }
    .btn-close-roadmap:active {
      transform: scale(0.95);
    }
  `}} />
);

interface CardData {
  id: string;
  role: string;
  match: string;
  matchColor: string;
  badge: string;
  badgeColor: string;
  image: string;
  pathId: string;
}

// 365 Professional Quotes for the Daily Motivation Engine
const DAILY_QUOTES = [
  "Innovation distinguishes between a leader and a follower.",
  "Your career is your business. It's time for you to manage it as a CEO.",
  "The only way to do great work is to love what you do.",
  "Don't wait for opportunity. Create it.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Hard work beats talent when talent doesn't work hard.",
  "The best way to predict the future is to create it.",
  "Believe you can and you're halfway there.",
  "Opportunities don't happen. You create them.",
  "Everything you've ever wanted is on the other side of fear.",
  "Success usually comes to those who are too busy to be looking for it.",
  "Great things in business are never done by one person.",
  "The way to get started is to quit talking and begin doing.",
  "Your talent determines what you can do. Your motivation determines how much you are willing to do.",
  "The only place where success comes before work is in the dictionary.",
  "Quality means doing it right when no one is looking.",
  "If you really want to do something, you'll find a way. If you don't, you'll find an excuse.",
  "Focus on being productive instead of busy.",
  "The secret of change is to focus all of your energy not on fighting the old, but on building the new.",
  "Action is the foundational key to all success.",
  "Standardize then optimize. Scale comes from systems.",
  "Leadership is an action, not a position.",
  "Your altitude is determined by your attitude.",
  "Growth and comfort do not coexist.",
  "Be so good they can't ignore you.",
  "Vision without execution is just hallucination.",
  "Don't be afraid to give up the good to go for the great.",
  "Patience, persistence, and perspiration make an unbeatable combination for success.",
  "The expert in anything was once a beginner.",
  "Discipline is the bridge between goals and accomplishment.",
  "Success is walking from failure to failure with no loss of enthusiasm.",
  "What you do today can improve all your tomorrows.",
  "I find that the harder I work, the more luck I seem to have.",
  "Develop success from failures. Discouragement and failure are two of the surest stepping stones to success.",
  "The road to success is always under construction.",
  "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
  "If you aren't embarrassed by the first version of your product, you shipped too late.",
  "Logic will get you from A to B. Imagination will take you everywhere.",
  "Don't let the noise of others' opinions drown out your own inner voice.",
  "Stay hungry, stay foolish.",
  "The biggest risk is not taking any risk.",
  "Innovation is saying no to a thousand things.",
  "Complexity is your enemy. Any fool can make something complicated.",
  "Simplicity is the ultimate sophistication.",
  "Hire character. Train skill.",
  "Make it simple. Make it memorable. Make it inviting to look at.",
  "Design is not just what it looks like and feels like. Design is how it works.",
  "Focus on the user and all else will follow.",
  "Great vision without great people is irrelevant.",
  "Culture eats strategy for breakfast.",
  "The most dangerous phrase in the language is, 'We've always done it this way.'",
  "If you don't build your dream, someone else will hire you to help them build theirs.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "Entrepreneurship is living a few years of your life like most people won't, so that you can spend the rest of your life like most people can't.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Everything is figureoutable.",
  "Done is better than perfect.",
  "The scariest moment is always just before you start.",
  "Small daily improvements over time lead to stunning results.",
  "Average leaders raise the bar on themselves; good leaders raise the bar for others; great leaders inspire others to raise their own bar.",
  "The best performance improvement plan is a better environment.",
  "Your net worth is your network.",
  "If you want to go fast, go alone. If you want to go far, go together.",
  "A leader is best when people barely know he exists... when his work is done, his aim fulfilled, they will say: we did it ourselves.",
  "Management is doing things right; leadership is doing the right things.",
  "True leadership lies in guiding others to success.",
  "A satisfied customer is the best business strategy of all.",
  "Your most unhappy customers are your greatest source of learning.",
  "The goal as a company is to have customer service that is not just the best but legendary.",
  "Customer service shouldn't just be a department, it should be the entire company.",
  "We see our customers as invited guests to a party, and we are the hosts.",
  "Profit in business comes from repeat customers.",
  "Be a yardstick of quality. Some people aren't used to an environment where excellence is expected.",
  "Always deliver more than expected.",
  "Success is the sum of small efforts, repeated day-in and day-out.",
  "The secret of your future is hidden in your daily routine.",
  "Either you run the day, or the day runs you.",
  "Amateurs sit and wait for inspiration, the rest of us just get up and go to work.",
  "Productivity is never an accident. It is always the result of a commitment to excellence.",
  "Until we can manage time, we can manage nothing else.",
  "The key is not to prioritize what’s on your schedule, but to schedule your priorities.",
  "Time is a created thing. To say 'I don't have time,' is like saying, 'I don't want to.'",
  "You may delay, but time will not.",
  "Lost time is never found again.",
  "Give me six hours to chop down a tree and I will spend the first four sharpening the axe.",
  "The price of anything is the amount of life you exchange for it.",
  "An organization, no matter how well designed, is only as good as the people who live and work in it.",
  "The competition to be hire is over. The competition to be helpful has begun.",
  "If people like you, they'll listen to you, but if they trust you, they'll do business with you.",
  "To be successful, you must be unique, you must be so different that if people want what you have, they must come to you to get it.",
  "If you are not a brand, you are a commodity.",
  "Personal branding is about managing your name in a world of misinformation, metadata, and search engines.",
  "Your brand is what other people say about you when you're not in the room.",
  "A brand for a company is like a reputation for a person. You earn reputation by trying to do hard things well.",
  "Design is the silent ambassador of your brand.",
  "The most powerful person in the world is the storyteller.",
  "If you can't explain it simply, you don't understand it well enough.",
  "Data! Data! Data! I can't make bricks without clay.",
  "Information is the oil of the 21st century, and analytics is the combustion engine.",
  "Without big data, you are blind and deaf and in the middle of a freeway.",
  "The world is one big data problem.",
  "Torture the data, and it will confess to anything.",
  "In God we trust, all others must bring data.",
  "Data is the new science. Big Data holds the answers.",
  "Artificial Intelligence is the new electricity.",
  "The question isn't whether AI is going to replace humans, but which humans using AI will replace which humans who don't.",
  "Automation is good, so long as you know exactly where to put the machine.",
  "The first rule of any technology used in a business is that automation applied to an efficient operation will magnify the efficiency.",
  "The second is that automation applied to an inefficient operation will magnify the inefficiency.",
  "Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important.",
  "The advance of technology is based on making it fit in so that you don't really even notice it.",
  "Any sufficiently advanced technology is indistinguishable from magic.",
  "It's not a faith in technology. It's faith in people.",
  "The digital transformation is a business transformation.",
  "Change is hard at first, messy in the middle and gorgeous at the end.",
  "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
  "Whosoever desires constant success must change his conduct with the times.",
  "Change is the law of life.",
  "You cannot step into the same river twice.",
  "The measure of intelligence is the ability to change.",
  "Continuity gives us roots; change gives us branches.",
  "Courage is the power to let go of the familiar.",
  "Embrace the uncertainty. Enjoy the beauty of becoming.",
  "Every problem is an opportunity in disguise.",
  "Think of your pitfalls as your progress.",
  "There are no failures—just experiences and your reactions to them.",
  "Failure is simply the opportunity to begin again, this time more intelligently.",
  "I have not failed. I've just found 10,000 ways that won't work.",
  "Our greatest glory is not in never falling, but in rising every time we fall.",
  "Success is not how high you have climbed, but how you make a positive difference to the world.",
  "The purpose of life is a life of purpose.",
  "Work for a cause, not for applause. Live life to express, not to impress.",
  "Chase the vision, not the money.",
  "The secret to wealth is simple: Find a way to do more for others than anyone else does.",
  "Try not to become a man of success. Rather become a man of value.",
  "Success is doing ordinary things extraordinarily well.",
  "The quality of a leader is reflected in the standards they set for themselves.",
  "Individual commitment to a group effort—that is what makes a team work.",
  "If everyone is moving forward together, then success takes care of itself.",
  "Teammates are like the gears in a clock... when everything is working right, it runs perfectly.",
  "Coming together is a beginning. Keeping together is progress. Working together is success.",
  "The strength of the team is each individual member. The strength of each member is the team.",
  "Alone we can do so little; together we can do so much.",
  "Cooperation is the thorough conviction that nobody can get there unless everybody gets there.",
  "The best teamwork comes from men who are working independently toward one goal in unison.",
  "Synergy—the bonus that comes when things work together as one.",
  "Unity is strength... when there is teamwork and collaboration, wonderful things can be achieved.",
  "Talent wins games, but teamwork and intelligence win championships.",
  "The whole is greater than the sum of its parts.",
  "Good teams become great ones when the members trust each other enough to surrender the 'me' for the 'we'.",
  "The only man who never makes a mistake is the man who never does anything.",
  "A person who never made a mistake never tried anything new.",
  "Mistakes are proof that you are trying.",
  "Learn from the mistakes of others. You can't live long enough to make them all yourself.",
  "Your mistakes are your greatest teachers.",
  "The problem is not that there are problems. The problem is expecting otherwise and thinking that having problems is a problem.",
  "When you reach the end of your rope, tie a knot in it and hang on.",
  "Hardships often prepare ordinary people for an extraordinary destiny.",
  "Strength does not come from winning. Your struggles develop your strengths.",
  "The gem cannot be polished without friction, nor man perfected without trials.",
  "What doesn't kill us makes us stronger.",
  "Everything you need is already inside you.",
  "Your time is limited, so don't waste it living someone else's life.",
  "The two most important days in your life are the day you are born and the day you find out why.",
  "Dream big and dare to fail.",
  "Go as far as you can see; when you get there, you'll be able to see further.",
  "If you want to live a happy life, tie it to a goal, not to people or things.",
  "Only those who will risk going too far can possibly find out how far one can go.",
  "To handle yourself, use your head; to handle others, use your heart.",
  "Be kind, for everyone you meet is fighting a hard battle.",
  "A good head and a good heart are always a formidable combination.",
  "Kindness is the language which the deaf can hear and the blind can see.",
  "The best way to find yourself is to lose yourself in the service of others.",
  "Giving is the secret to a healthy and happy life.",
  "We make a living by what we get, but we make a life by what we give.",
  "The simplest acts of kindness are by far more powerful than a thousand heads bowing in prayer.",
  "No act of kindness, no matter how small, is ever wasted.",
  "Remember that the happiest people are not those getting more, but those giving more.",
  "Gratitude is not only the greatest of virtues, but the parent of all others.",
  "If you want to turn your life around, try gratitude. It will change your life mightily.",
  "The more grateful I am, the more beauty I see.",
  "In ordinary life, we hardly realize that we receive a great deal more than we give.",
  "Gratitude turns what we have into enough.",
  "When we give cheerfully and accept gratefully, everyone is blessed.",
  "Silent gratitude isn't very much to anyone.",
  "Be grateful for what you already have while you pursue your goals.",
  "Gratitude is the sign of noble souls.",
  "Appreciation is a wonderful thing. It makes what is excellent in others belong to us as well.",
  "A life spent making mistakes is not only more honorable, but more useful than a life spent doing nothing.",
  "Success is getting what you want. Happiness is wanting what you get.",
  "Most people are about as happy as they make up their minds to be.",
  "Happiness depends upon ourselves.",
  "The secret of happiness is not in doing what one likes, but in liking what one does.",
  "Happiness is not something readymade. It comes from your own actions.",
  "The only joy in the world is to begin.",
  "Character is like a tree and reputation like its shadow. The shadow is what we think of it; the tree is the real thing.",
  "Honesty is the first chapter in the book of wisdom.",
  "Integrity is doing the right thing, even when no one is watching.",
  "The true test of character is not how much we know how to do, but how we behave when we don't know what to do.",
  "Our character is what we do when we think no one is looking.",
  "Character is doing the right thing when nobody's looking. There are too many people who think that the only thing that's right is to get by, and the only thing that's wrong is to get caught.",
  "Rather than love, than money, than fame, give me truth.",
  "I would rather be a superb meteor, every atom of me in magnificent glow, than a sleepy and permanent planet.",
  "If you want to be successful, you must respect one rule: Never lie to yourself.",
  "The mind is everything. What you think you become.",
  "Whether you think you can or think you can't, you're right.",
  "You are what you believe yourself to be.",
  "What we think, we become.",
  "All that we are is the result of what we have thought.",
  "With our thoughts, we make the world.",
  "Whatever the mind can conceive and believe, it can achieve.",
  "Thinking is the hardest work there is, which is probably the reason why so few engage in it.",
  "Change your thoughts and you change your world.",
  "Think big and don’t listen to people who tell you it can’t be done. Life’s too short to think small.",
  "A single grateful thought raised to heaven is the most perfect prayer.",
  "Think twice before you speak, because your words and influence will plant the seed of either success or failure in the mind of another.",
  "The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.",
  "Success is most often achieved by those who don't know that failure is inevitable.",
  "If you are going through hell, keep going.",
  "Opportunities are usually disguised as hard work, so most people don't recognize them.",
  "The hard work puts you where the good luck can find you.",
  "Successful and unsuccessful people do not vary greatly in their abilities. They vary in their desires to reach their potential.",
  "The only person you should try to be better than is the person you were yesterday.",
  "Don't compare your beginning to someone else's middle.",
  "Every champion was once a contender that refused to give up.",
  "Success is simple. Do what's right, the right way, at the right time.",
  "Success comes to those who dedicate everything to their passion.",
  "If you can dream it, you can do it.",
  "The harder the conflict, the more glorious the triumph.",
  "Difficulties strengthen the mind, as labor does the body.",
  "Hardship is the pathway to peace.",
  "Turn your wounds into wisdom.",
  "You cannot find peace by avoiding life.",
  "Peace comes from within. Do not seek it without.",
  "He who is contented is rich.",
  "Happiness is not a station you arrive at, but a manner of traveling.",
  "A happy life is one spent in learning, earning, and yearning.",
  "The journey of a thousand miles begins with one step.",
  "If you don't know where you are going, any road will get you there.",
  "The direction in which education starts a man will determine his future in life.",
  "Education is the most powerful weapon which you can use to change the world.",
  "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence.",
  "An investment in knowledge pays the best interest.",
  "Live as if you were to die tomorrow. Learn as if you were to live forever.",
  "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
  "I am still learning.",
  "Capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
  "Never stop learning, because life never stops teaching.",
  "A teacher is one who makes himself progressively unnecessary.",
  "Information is not knowledge.",
  "The purpose of education is to turn mirrors into windows.",
  "Wisdom begins in wonder.",
  "The only true wisdom is in knowing you know nothing.",
  "Knowing others is intelligence; knowing yourself is true wisdom.",
  "Wisdom is the reward you get for a lifetime of listening when you'd have preferred to talk.",
  "Common sense is genius dressed in its working clothes.",
  "Genius is 1% inspiration and 99% perspiration.",
  "Imagination is more important than knowledge.",
  "Originality is nothing but judicious imitation.",
  "Creativity is intelligence having fun.",
  "Curiosity is one of the most permanent and certain characteristics of a vigorous intellect.",
  "Keep your eyes on the stars, and your feet on the ground.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Your life does not get better by chance, it gets better by change.",
  "Don't let yesterday take up too much of today.",
  "Start where you are. Use what you have. Do what you can.",
  "Setting goals is the first step in turning the invisible into the visible.",
  "A goal is a dream with a deadline.",
  "You are never too old to set another goal or to dream a new dream.",
  "Don't wish it were easier. Wish you were better.",
  "Build your own dreams, or someone else will hire you to build theirs.",
  "The people who are crazy enough to think they can change the world are the ones who do.",
  "Do what you can, with what you have, where you are.",
  "Your work is to discover your work and then with all your heart to give yourself to it.",
  "Success is how high you bounce when you hit bottom.",
  "If you want to achieve greatness stop asking for permission.",
  "I am not a product of my circumstances. I am a product of my decisions.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
  "Always keep your head up. If you keep your head down, you'll never see the blessings in your life.",
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "He who has a why to live can bear almost any how.",
  "You will face many defeats in life, but never let yourself be defeated.",
  "In the middle of every difficulty lies opportunity.",
  "Everything that is made is made by the people.",
  "Build it and they will come.",
  "The difference between a successful person and others is not a lack of strength, not a lack of knowledge, but rather a lack of will.",
  "Aim for the moon. If you miss, you may hit a star.",
  "Success is not final, but the result of persistency.",
  "There is no substitute for hard work.",
  "Productivity is the deliberate use of your resources to accomplish the things you want.",
  "Don't measure yourself by what you have accomplished, but by what you should have accomplished with your ability.",
  "One of the greatest discoveries a man makes is to find that he can do what he was afraid he couldn't do.",
  "Success is a journey, not a destination.",
  "The dictionary is the only place where success comes before work.",
  "You don't have to be great to start, but you have to start to be great.",
  "Success requires no explanations, failure permits no alibis.",
  "Keep your face always toward the sunshine—and shadows will fall behind you.",
  "Everything is possible for one who believes.",
  "You miss 100% of the shots you don't take.",
  "Victory belongs to the most persevering.",
  "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.",
  "It's not what you look at that matters, it's what you see.",
  "Stay focused and never give up.",
  "Be the change that you wish to see in the world.",
  "Always be a first-rate version of yourself instead of a second-rate version of somebody else.",
  "Make every day your masterpiece.",
  "Do one thing every day that scares you.",
  "Don't count the days, make the days count.",
  "You create your own opportunities.",
  "Work hard in silence, let your success be your noise.",
  "The secret to getting ahead is getting started.",
  "Opportunities are like sunrises. If you wait too long, you miss them.",
  "The value of a person lies in what they are capable of giving and not what they are capable of receiving.",
  "Do what you love and you will never work a day in your life.",
  "I'm a great believer in luck, and I find the harder I work, the more I have of it.",
  "Success is the ability to go from failure to failure with no loss of enthusiasm.",
  "Passion is energy. Feel the power that comes from focusing on what excites you.",
  "Your legacy is being written by yourself. Make the right decisions.",
  "The world needs dreamers and the world needs doers. But above all, the world needs dreamers who do.",
  "The power of imagination makes us infinite.",
  "Success is not for the chosen few, but for the few who choose it.",
  "Don't find fault, find a remedy.",
  "A leader is someone who knows the way, goes the way, and shows the way.",
  "Whatever you are, be a good one.",
  "Life begins at the end of your comfort zone.",
  "Great things never come from comfort zones.",
  "It's never too late to be what you might have been.",
  "Where there is a will, there is a way.",
  "Action speaks louder than words.",
  "You must do the things you think you cannot do.",
  "Focus on your goals, not your obstacles.",
  "Excellence is not a destination; it is a continuous journey that never ends.",
  "Always strive for excellence, but forget about perfection.",
  "If you want to be happy, set a goal that commands your thoughts, liberates your energy, and inspires your hopes.",
  "The future belongs to those who prepare for it today.",
  "Persistence is the key to success.",
  "Every mountain top is within reach if you just keep climbing.",
  "Your future is as bright as your faith.",
  "Optimism is the faith that leads to achievement. Nothing can be done without hope and confidence.",
  "Be humble. Be hungry. And always be the hardest worker in the room.",
  "Success is not about the destination, it's about the climb.",
];

function LaneRow({ card, pathData, t, setPortalActivePath, isPromoted = false, hideBridge = false }: any) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showFullRoadmap, setShowFullRoadmap] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  const fullRoadmapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (selectedNode && detailsRef.current) {
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [selectedNode]);

  useEffect(() => {
    if (showFullRoadmap && fullRoadmapRef.current) {
      setTimeout(() => {
        fullRoadmapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [showFullRoadmap]);
  
  if (!pathData) return null;
  const accentColor = card.matchColor || '#10B981';

  const getLearningResources = (role: string) => {
    const node = pathData.nodes.find((n: any) => n.role === role);
    if (node && node.learning_path) {
      return node.learning_path;
    }
    return [
      { name: `${role} Professional Certification`, url: '#', type: 'Certification' },
      { name: `Advanced ${role} Strategy`, url: '#', type: 'Course' }
    ];
  };

  const nextNodes = pathData.nodes.filter((n: any) => n.status !== 'past').slice(0, 2);
  const allNodes = pathData.nodes;
  const filteredNodes = allNodes;

    return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 32, position: 'relative' }}>
      {/* Connector line from spine to the whole block */}
      <div style={{ width: 40, height: 2, background: `linear-gradient(90deg, #E2E8F0, ${accentColor}44)`, position: 'absolute', left: -40, top: 40 }} />

      {/* Row 1: Main Role Profile - Professional Control Panel */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 40,
        background: '#fff',
        border: '1.5px solid #0F172A',
        borderRadius: 24,
        padding: '32px 48px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.04)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Vibrant Accent Stripe */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 8, height: '100%', background: `linear-gradient(180deg, ${accentColor}, ${accentColor}88)` }} />
        
        <div style={{ position: 'relative' }}>
          <div style={{ width: 90, height: 90, borderRadius: 20, overflow: 'hidden', border: '4px solid #F8FAFC', flexShrink: 0, boxShadow: '0 10px 25px rgba(0,0,0,0.08)', position: 'relative' }}>
            <Image src={card.image} width={90} height={90} alt="" style={{ objectFit: 'cover' }} />
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
            <h3 style={{ fontSize: 26, fontWeight: 1000, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>{card.role}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: `${accentColor}10`, color: accentColor, padding: '6px 14px', borderRadius: 20, fontSize: 10, fontWeight: 900, textTransform: 'uppercase' }}>
              <Zap size={14} fill={accentColor} /> AI Verified Path
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
             <div style={{ flex: 1, maxWidth: 320 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                   <span style={{ fontSize: 10, fontWeight: 1000, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Success Probability</span>
                   <span style={{ fontSize: 11, fontWeight: 1000, color: accentColor }}>88%</span>
                </div>
                <div style={{ height: 10, background: '#F1F5F9', borderRadius: 6, overflow: 'hidden' }}>
                   <div style={{ width: '88%', height: '100%', background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)`, borderRadius: 6 }}></div>
                </div>
             </div>
             <div style={{ color: accentColor, fontSize: 11, fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: 8, background: `${accentColor}08`, padding: '10px 20px', borderRadius: 12, border: `1px solid ${accentColor}22` }}>
                <ShieldCheck size={16} /> Optimal Career Match
             </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#64748B', cursor: 'pointer', padding: '12px 24px', borderRadius: 16, border: '1px solid #E2E8F0', background: '#fff', fontSize: 13, fontWeight: 900, transition: 'all 0.2s' }} className="hover-scale">
             <Heart size={20} /> Save
           </div>
           <button onClick={() => {
               if (!showFullRoadmap) {
                 setShowFullRoadmap(true);
                 setSelectedNode(null);
               } else {
                 setShowFullRoadmap(false);
               }
             }} style={{ 
               background: '#0F172A', 
               color: '#fff', border: 'none', padding: '18px 36px', borderRadius: 16, fontSize: 13, fontWeight: 1000, 
               textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', transition: 'all 0.3s', 
               boxShadow: '0 10px 25px rgba(15, 23, 42, 0.15)' 
             }}>
             {showFullRoadmap ? 'Hide Details' : 'Full Roadmap'}
           </button>
        </div>
      </div>

       {/* Row 2: Pathway Progression */}
      <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 60, position: 'relative' }}>
           {/* Vertical Bridge with Node - High Tech Look */}
           {!hideBridge && (
             <div style={{ position: 'absolute', left: 100, top: -40, width: 2, height: 40, background: `linear-gradient(180deg, transparent, ${accentColor}88, ${accentColor})` }}>
               <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: 22, height: 22, borderRadius: '50%', background: '#fff', border: `2px solid ${accentColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 20px ${accentColor}33`, zIndex: 2 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: accentColor, animation: 'pulse 2s infinite' }} />
               </div>
               <div style={{ position: 'absolute', bottom: -5, left: -4, width: 10, height: 10, borderBottom: `2px solid ${accentColor}`, borderRight: `2px solid ${accentColor}`, transform: 'rotate(45deg)' }} />
             </div>
           )}

          <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 32 }}>
              {nextNodes.map((node: any, nIdx: number) => (
                <React.Fragment key={nIdx}>
                   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 100, opacity: 0.7 }}>
                      <div style={{ position: 'relative', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', borderRadius: '50%', border: '1px solid #E2E8F0' }}>
                         <ArrowRight size={16} color="#64748B" />
                      </div>
                      <div style={{ fontSize: 9, fontWeight: 1000, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Next Level</div>
                   </div>

                   <div onClick={() => setSelectedNode(selectedNode === node.role ? null : node.role)}
                        style={{ 
                          background: '#fff',
                          border: `1px solid ${selectedNode === node.role ? accentColor : '#E2E8F0'}`, 
                          borderRadius: 24, 
                          padding: '24px 32px', 
                          minWidth: 280,
                          boxShadow: selectedNode === node.role ? `0 20px 40px ${accentColor}15` : '0 10px 30px rgba(0,0,0,0.03)', 
                          position: 'relative',
                          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                          cursor: 'pointer',
                          zIndex: selectedNode === node.role ? 10 : 1
                        }} className="progression-box-premium">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div style={{ background: accentColor, color: '#fff', fontSize: 9, fontWeight: 1000, padding: '4px 14px', borderRadius: 20, width: 'fit-content', textTransform: 'uppercase', letterSpacing: '0.05em', boxShadow: `0 4px 10px ${accentColor}33` }}>
                          {nIdx === 0 ? 'Strategic Milestone' : 'Target Position'}
                        </div>
                        <h4 style={{ fontSize: 19, fontWeight: 1000, color: '#0F172A', margin: 0, lineHeight: 1.2, letterSpacing: '-0.01em' }}>{node.role}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: accentColor, fontSize: 11, fontWeight: 900 }}>
                          <Compass size={14} /> <span style={{ textDecoration: 'underline' }}>View Learning Path</span>
                        </div>
                      </div>

                   </div>
                </React.Fragment>
              ))}
          </div>
      </div>

      {/* Full Roadmap Expansion (The "Career Highway") */}
      {showFullRoadmap && (
        <div ref={fullRoadmapRef} style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)', borderRadius: 40, padding: '48px', border: '1.5px solid #0F172A', marginLeft: 40, position: 'relative', overflow: 'hidden', animation: 'popIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
           <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, background: `${accentColor}10`, borderRadius: '50%', filter: 'blur(80px)' }} />
           
           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48, position: 'relative', zIndex: 1 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
               <div style={{ background: accentColor, color: '#fff', padding: 14, borderRadius: 16, boxShadow: `0 10px 25px ${accentColor}4D` }}><Layers size={24} /></div>
               <div>
                 <h4 style={{ fontSize: 22, fontWeight: 950, color: '#0F172A', margin: 0 }}>The Career Highway</h4>
                 <p style={{ fontSize: 14, color: '#64748B', margin: '4px 0 0 0', fontWeight: 600 }}>Multitiered executive path visualization</p>
               </div>
             </div>
             <button 
                onClick={() => setShowFullRoadmap(false)} 
                style={{ 
                  background: accentColor, 
                  padding: '12px 32px', 
                  borderRadius: 16, 
                  border: 'none', 
                  fontSize: 12, 
                  fontWeight: 1000, 
                  color: '#fff', 
                  cursor: 'pointer', 
                  boxShadow: `0 8px 20px ${accentColor}33`,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }} className="btn-close-roadmap">
                CLOSE
              </button>
           </div>
           
           <div style={{ display: 'flex', flexDirection: 'column', gap: 64, position: 'relative', zIndex: 1 }}>
              {/* Row 1: Early to Mid Path */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%', position: 'relative' }}>
                {filteredNodes.slice(0, 3).map((node: any, idx: number) => (
                  <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                    <div style={{ background: node.status === 'current' ? accentColor : '#fff', padding: '6px 14px', borderRadius: 10, border: `1px solid ${node.status === 'current' ? accentColor : 'rgba(226, 232, 240, 0.8)'}`, marginBottom: 12, fontSize: 10, fontWeight: 1000, color: node.status === 'current' ? '#fff' : accentColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{node.status}</div>
                    <div onClick={() => setSelectedNode(node.role)} style={{ width: 200, background: '#fff', border: `2px solid ${node.status === 'current' ? accentColor : '#F1F5F9'}`, borderRadius: 28, padding: '24px 20px', boxShadow: node.status === 'current' ? `0 15px 35px ${accentColor}1A` : '0 10px 25px rgba(0,0,0,0.03)', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }} className="hover-scale">
                      <div style={{ width: 52, height: 52, borderRadius: '50%', background: node.status === 'current' ? accentColor : `${accentColor}10`, color: node.status === 'current' ? '#fff' : accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: node.status === 'current' ? `0 8px 16px ${accentColor}33` : 'none' }}>
                        {idx === 0 ? <Award size={26} /> : <Rocket size={26} />}
                      </div>
                      <h5 style={{ fontSize: 15, fontWeight: 1000, color: '#0F172A', margin: '0 0 10px 0', lineHeight: 1.2 }}>{node.role}</h5>
                      <div style={{ fontSize: 11, color: accentColor, fontWeight: 900, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', opacity: 0.8 }}>Explore <ArrowRight size={14} /></div>
                    </div>
                    {/* Horizontal Directional Arrow */}
                    {idx < 2 && (
                      <div style={{ position: 'absolute', right: '-15%', top: '68%', width: '30%', height: 2, background: `linear-gradient(90deg, ${accentColor}00, ${accentColor}, ${accentColor}00)` }}>
                         <div style={{ position: 'absolute', right: 0, top: -4, width: 10, height: 10, borderTop: `2px solid ${accentColor}66`, borderRight: `2px solid ${accentColor}66`, transform: 'rotate(45deg)' }} />
                      </div>
                    )}
                  </div>
                ))}
                {/* Vertical Bridge with Node - Career Highway Bridge */}
                <div style={{ position: 'absolute', right: 60, bottom: -64, width: 2, height: 64, background: `linear-gradient(180deg, ${accentColor}, ${accentColor}88, transparent)` }}>
                   <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 24, height: 24, borderRadius: '50%', background: '#fff', border: `2px solid ${accentColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 20px ${accentColor}33`, zIndex: 2 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: accentColor, animation: 'pulse 2s infinite' }} />
                   </div>
                   <div style={{ position: 'absolute', bottom: 0, left: -4, width: 10, height: 10, borderBottom: `2px solid ${accentColor}`, borderRight: `2px solid ${accentColor}`, transform: 'rotate(45deg)' }} />
                </div>
              </div>

              {/* Row 2: Advanced to Executive Path */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', width: '100%', gap: 64, paddingRight: 0 }}>
                {filteredNodes.slice(3).reverse().map((node: any, idx: number) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                    <div style={{ background: node.status === 'current' ? accentColor : '#fff', padding: '6px 14px', borderRadius: 10, border: `1px solid ${node.status === 'current' ? accentColor : 'rgba(226, 232, 240, 0.8)'}`, marginBottom: 12, fontSize: 10, fontWeight: 1000, color: node.status === 'current' ? '#fff' : accentColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{node.status}</div>
                    <div onClick={() => setSelectedNode(node.role)} style={{ width: 200, background: '#fff', border: '2px solid #F1F5F9', borderRadius: 28, padding: '24px 20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }} className="hover-scale">
                      <div style={{ width: 52, height: 52, borderRadius: '50%', background: `${accentColor}10`, color: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><Layers size={26} /></div>
                      <h5 style={{ fontSize: 15, fontWeight: 1000, color: '#0F172A', margin: '0 0 10px 0', lineHeight: 1.2 }}>{node.role}</h5>
                      <div style={{ fontSize: 11, color: accentColor, fontWeight: 900, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', opacity: 0.8 }}>Explore <ArrowRight size={14} /></div>
                    </div>
                    {/* Horizontal Directional Arrow (Reverse) */}
                    {idx < filteredNodes.slice(3).length - 1 && (
                      <div style={{ position: 'absolute', left: -64, top: '68%', width: 64, height: 2, background: `linear-gradient(270deg, ${accentColor}00, ${accentColor}, ${accentColor}00)` }}>
                         <div style={{ position: 'absolute', left: 0, top: -4, width: 10, height: 10, borderBottom: `2px solid ${accentColor}66`, borderLeft: `2px solid ${accentColor}66`, transform: 'rotate(45deg)' }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
           </div>
        </div>
      )}

      {/* Expanded Node Details */}
      {selectedNode && (
        <div ref={detailsRef} style={{ background: '#fff', borderRadius: 24, padding: '24px 32px', border: '1.5px solid #0F172A', marginLeft: 40, marginTop: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.03)', animation: 'popIn 0.4s ease-out' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <div>
              <h4 style={{ fontSize: 18, fontWeight: 900, color: '#1E293B', margin: '0 0 4px 0' }}>{selectedNode} Roadmap</h4>
              <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>Step-by-step guide and learning resources to master this role.</p>
            </div>
            <button onClick={() => setSelectedNode(null)} style={{ background: accentColor, border: 'none', padding: '10px 24px', borderRadius: 12, cursor: 'pointer', color: '#fff', fontSize: 11, fontWeight: 1000, textTransform: 'uppercase', letterSpacing: '0.08em', boxShadow: `0 4px 15px ${accentColor}33` }} className="btn-close-roadmap">CLOSE</button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ background: `${accentColor}15`, color: accentColor, padding: 8, borderRadius: 10 }}><Target size={18} /></div>
                <h5 style={{ fontSize: 14, fontWeight: 850, color: '#334155', margin: 0 }}>Skills to Master</h5>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {(pathData.nodes.find((n: any) => n.role === selectedNode)?.skills_to_master || ['Data Analysis', 'Strategic Planning']).map((skill: string, sIdx: number) => (
                  <div key={sIdx} style={{ background: accentColor, padding: '10px 18px', borderRadius: 12, fontSize: 12, fontWeight: 850, color: '#fff', boxShadow: `0 4px 15px ${accentColor}33`, border: 'none' }}>{skill}</div>
                ))}
              </div>
            </div>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ background: `${accentColor}15`, color: accentColor, padding: 8, borderRadius: 10 }}><BookOpen size={18} /></div>
                <h5 style={{ fontSize: 14, fontWeight: 850, color: '#334155', margin: 0 }}>Learning Path</h5>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {getLearningResources(selectedNode).map((res, rIdx) => (
                  <a key={rIdx} href={res.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '12px 16px', borderRadius: 12, textDecoration: 'none', border: '1px solid #F1F5F9', transition: 'all 0.2s' }} className="hover-scale">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ background: '#fff', width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E2E8F0', color: accentColor }}><Rocket size={16} /></div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 800, color: '#1E293B', margin: 0 }}>{res.name}</p>
                        {res.content_covered && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                            {res.content_covered.map((topic: string, i: number) => (
                              <span key={i} style={{ background: '#E2E8F0', color: '#475569', fontSize: 10, padding: '2px 6px', borderRadius: 6, fontWeight: 600 }}>{topic}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <ArrowRight size={14} color="#0F172A" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    );
}

export function AIProfileAnalyzer() {
  const { t } = useLanguage();
  const [step, setStep] = useState<Step>('upload');
  const [analyzingText, setAnalyzingText] = useState('Initializing Neural Engine...');
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showSurprise, setShowSurprise] = useState(false);
  const [portalActivePath, setPortalActivePath] = useState<string | null>(null);
  const [showNewJourney, setShowNewJourney] = useState(false);
  const [expandedPathId, setExpandedPathId] = useState<string | null>(null);
  const [showSuggestedMoves, setShowSuggestedMoves] = useState(false);
  const [isAnalyzingPathway, setIsAnalyzingPathway] = useState(false);
  const [analysisPathwayStep, setAnalysisPathwayStep] = useState(0);
  const journeysRef = useRef<HTMLDivElement>(null);
  const roadmapRef = useRef<HTMLDivElement>(null);

  const handleSimulatePathway = () => {
    setIsAnalyzingPathway(true);
    setShowSurprise(false);
    setAnalysisPathwayStep(0);
    
    const steps = [
      "Initializing Strategic Analysis...",
      "Correlating Skill Matrix...",
      "Scanning Market Vacancies...",
      "Calibrating Career Velocity...",
      "Optimizing Path Trajectory..."
    ];
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setAnalysisPathwayStep(currentStep);
      } else {
        clearInterval(interval);
        setIsAnalyzingPathway(false);
        setShowSurprise(true);
      }
    }, 1000);
  };

  useEffect(() => {
    if (showSurprise && journeysRef.current) {
      setTimeout(() => {
        journeysRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    }
  }, [showSurprise]);

  useEffect(() => {
    if (expandedPathId && roadmapRef.current) {
      setTimeout(() => {
        roadmapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [expandedPathId]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('hertz_profile_analyzed') === 'true') {
        setStep('results');
      }
    }
  }, []);

  const dailyQuote = useMemo(() => {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return DAILY_QUOTES[dayOfYear % DAILY_QUOTES.length];
  }, []);

  const careerCards = [
    {
      id: '1',
      pathId: 'incentive-comp',
      role: 'Incentive Compensation',
      label: 'Best Fit',
      labelColor: '#EC4899',
      match: 'BEST_FIT',
      matchColor: '#EC4899',
      badge: 'NEXT_STEP',
      badgeColor: '#EC4899',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=400&fit=crop'
    },
    {
      id: '2',
      pathId: 'it-path',
      role: 'IT Career Path',
      label: 'High Match',
      labelColor: '#F59E0B',
      match: 'HIGH_MATCH',
      matchColor: '#F59E0B',
      badge: 'NEXT_STEP',
      badgeColor: '#F59E0B',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop'
    },
    {
      id: '3',
      pathId: 'l-and-d',
      role: 'Learning & Development',
      label: 'Potential',
      labelColor: '#10B981',
      match: 'POTENTIAL',
      matchColor: '#10B981',
      badge: 'EXPLORE',
      badgeColor: '#10B981',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=400&fit=crop'
    },
    {
      id: '4',
      pathId: 'operations',
      role: 'Operations',
      label: 'New Horizon',
      labelColor: '#8B5CF6',
      match: 'NEW_HORIZON',
      matchColor: '#8B5CF6',
      badge: 'EXPLORE',
      badgeColor: '#8B5CF6',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop'
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;
    setStep('analyzing');
    setTimeout(() => setAnalyzingText('Analyzing 10+ years experience...'), 800);
    setTimeout(() => setAnalyzingText('Extracting RPA & Architecture strengths...'), 1600);
    setTimeout(() => {
      localStorage.setItem('hertz_profile_analyzed', 'true');
      setStep('results');
    }, 3500);
  };

  if (step === 'upload') {
    return (
      <div style={{ 
        maxWidth: 1000, 
        margin: '100px auto', 
        padding: '20px',
        position: 'relative',
        fontFamily: "'Outfit', 'Inter', sans-serif"
      }}>
         <div style={{ position: 'absolute', inset: -100, pointerEvents: 'none', zIndex: 0 }}>
            <div className="light-particle" style={{ position: 'absolute', top: '20%', left: '10%', width: 4, height: 4, background: '#f59e0b', borderRadius: '50%', filter: 'blur(2px)', animation: 'floatParticle 8s infinite ease-in-out' }} />
            <div className="light-particle" style={{ position: 'absolute', top: '70%', left: '20%', width: 6, height: 6, background: '#ec4899', borderRadius: '50%', filter: 'blur(3px)', animation: 'floatParticle 12s infinite ease-in-out', animationDelay: '2s' }} />
            <div className="light-particle" style={{ position: 'absolute', top: '40%', right: '15%', width: 5, height: 5, background: '#f59e0b', borderRadius: '50%', filter: 'blur(2px)', animation: 'floatParticle 10s infinite ease-in-out', animationDelay: '1s' }} />
            <div className="light-particle" style={{ position: 'absolute', bottom: '10%', right: '30%', width: 4, height: 4, background: '#ec4899', borderRadius: '50%', filter: 'blur(2px)', animation: 'floatParticle 9s infinite ease-in-out', animationDelay: '3s' }} />
         </div>

         <div style={{
           width: '100%',
           background: '#fff',
           border: '1px solid #E5E7EB',
           borderRadius: 36,
           padding: '55px 70px',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'space-between',
           boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
           position: 'relative',
           overflow: 'hidden',
           animation: 'cardIn 1s cubic-bezier(0.2, 0.8, 0.2, 1)'
         }}>
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              background: 'radial-gradient(circle at 0% 0%, rgba(245, 158, 11, 0.05) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(236, 72, 153, 0.05) 0%, transparent 50%)',
              animation: 'meshMove 20s infinite alternate linear',
              zIndex: 0 
            }} />

            <div style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '50%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
              transform: 'skewX(-20deg)',
              animation: 'lightShimmer 6s infinite ease-in-out',
              zIndex: 1
            }} />
            
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12, pointerEvents: 'none', zIndex: 0 }} viewBox="0 0 1000 300">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#fff" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            <div style={{ display: 'flex', alignItems: 'center', gap: 40, position: 'relative', zIndex: 1 }}>
               <div style={{ 
                 position: 'relative',
                 width: 136, 
                 height: 136, 
                 borderRadius: '50%', 
                 padding: 6, 
                 background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
                 boxShadow: '0 0 40px rgba(245, 158, 11, 0.3)',
                 animation: 'profilePop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
               }}>
                  <div style={{
                    position: 'absolute',
                    inset: -12,
                    borderRadius: '50%',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    animation: 'pulseOrbital 4s infinite linear'
                  }} />
                  <div style={{
                    position: 'absolute',
                    inset: -24,
                    borderRadius: '50%',
                    border: '1px solid rgba(236, 72, 153, 0.15)',
                    animation: 'pulseOrbital 6s infinite linear reverse'
                  }} />
                  
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '6px solid #F1F5F9' }}>
                     <Image src="/john_profile.png" width={136} height={136} alt="John" style={{ objectFit: 'cover', width: '100%', height: '100%' }} priority />
                  </div>
               </div>

               <div style={{ animation: 'fadeSlideRight 0.8s both' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                     <h1 style={{ fontSize: 52, color: '#111827', margin: 0, letterSpacing: '-0.04em', fontWeight: 1000 }}>John Smith</h1>
                  </div>
                  <p style={{ fontSize: 19, color: '#6B7280', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '4px 0' }}>
                     High School Tutor & Server
                  </p>
               </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'relative', zIndex: 1, animation: 'fadeSlideLeft 0.8s both' }}>
               <input type="file" id="resume-upload" hidden onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
                   <button onClick={() => document.getElementById('resume-upload')?.click()} style={{ background: '#fff', color: '#1e293b', padding: '24px 40px', borderRadius: 16, fontWeight: 800, border: '1px solid rgba(226, 232, 240, 0.8)', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, boxShadow: '0 4px 10px rgba(0, 0, 0, 0.02)', minWidth: 200 }}>
                     <div style={{ background: '#F1F5F9', padding: '12px', borderRadius: '50%', color: '#ec4899' }}><Search size={24} /></div>
                     RE-EVALUATE
                   </button>
                </div>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                   <button onClick={selectedFile ? handleAnalyze : () => { localStorage.setItem('hertz_profile_analyzed', 'true'); setStep('results'); }} style={{ flex: 1, background: 'linear-gradient(135deg, #f59e0b, #ec4899)', color: '#fff', padding: '14px 16px', borderRadius: 12, fontWeight: 900, border: 'none', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, boxShadow: '0 8px 20px rgba(236,72,153,0.25)' }}>
                     {selectedFile ? 'Submit Analysis' : 'Skip & Submit'} <ArrowRight size={16} />
                   </button>
                   <button onClick={() => setSelectedFile(null)} style={{ flex: 1, background: '#fff', color: '#64748B', padding: '14px 16px', borderRadius: 12, fontWeight: 900, border: '1px solid #E2E8F0', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer' }}>Reset</button>
                </div>
            </div>
         </div>

         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 15, opacity: 0.7, marginTop: 40, animation: 'fadeSlideUp 1s 1s both' }}>
            <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, #CBD5E1)' }} />
            <p style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 600, letterSpacing: '0.06em', margin: 0 }}>
               Hertz Career Forge is powered by <span style={{ color: '#374151', fontWeight: 800 }}>Intelligent Neural Pathfinding.</span>
            </p>
            <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, #CBD5E1, transparent)' }} />
         </div>

         <style>{`
            @keyframes pulseOrbital { 0% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.2); opacity: 0; } 100% { transform: scale(1); opacity: 0.4; } }
            @keyframes floatParticle { 0%, 100% { transform: translate(0, 0); opacity: 0.3; } 50% { transform: translate(20px, -40px); opacity: 0.6; } }
            @keyframes cardIn { from { opacity: 0; transform: translateY(40px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
            @keyframes profilePop { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
            @keyframes lightShimmer { 0% { left: -100%; } 30%, 100% { left: 200%; } }
            @keyframes meshMove { from { background-position: 0% 0%; } to { background-position: 100% 100%; } }
            @keyframes fadeSlideRight { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
            @keyframes fadeSlideLeft { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
            @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 0.7; transform: translateY(0); } }
            @keyframes spin { to { transform: rotate(360deg); } }
            @keyframes cycleRealTransport { 0% { opacity: 0; transform: translateX(-20px) scale(0.8); } 5% { opacity: 1; transform: translateX(0) scale(1); } 15% { opacity: 1; transform: translateX(0) scale(1); } 20% { opacity: 0; transform: translateX(20px) scale(0.8); } 100% { opacity: 0; transform: translateX(20px) scale(0.8); } }
         `}</style>
      </div>
    );
  }

  if (step === 'analyzing') {
    return (
      <div style={{ maxWidth: 600, margin: '160px auto', textAlign: 'center', fontFamily: "'Outfit', 'Inter', sans-serif" }}>
        <div style={{ position: 'relative', width: 100, height: 100, margin: '0 auto 40px' }}>
          <div style={{ position: 'absolute', inset: 0, border: '8px solid #F1F5F9', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', inset: 0, border: '8px solid #FFD100', borderRadius: '50%', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=100&h=100&fit=crop" style={{ position: 'absolute', width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', opacity: 0, animation: 'cycleRealTransport 5s infinite 0s' }} alt="Real Car" />
            <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=100&h=100&fit=crop" style={{ position: 'absolute', width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', opacity: 0, animation: 'cycleRealTransport 5s infinite 1s' }} alt="Real Bus" />
            <img src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=100&h=100&fit=crop" style={{ position: 'absolute', width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', opacity: 0, animation: 'cycleRealTransport 5s infinite 2s' }} alt="Real Cycle" />
            <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100&h=100&fit=crop" style={{ position: 'absolute', width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', opacity: 0, animation: 'cycleRealTransport 5s infinite 3s' }} alt="Real Flight" />
            <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=100&h=100&fit=crop" style={{ position: 'absolute', width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', opacity: 0, animation: 'cycleRealTransport 5s infinite 4s' }} alt="Real Truck" />
          </div>
        </div>
        <h3 style={{ fontSize: 24, fontWeight: 900, color: '#000', marginBottom: 16, textTransform: 'uppercase' }}>Hertz Intelligence...</h3>
        <p style={{ fontSize: 18, color: '#64748B', fontWeight: 800 }}>{analyzingText}</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 40%, #E0F2FE 100%)', width: '100%', paddingBottom: 100, overflowX: 'hidden', color: '#111827', fontFamily: "'Outfit', 'Inter', sans-serif" }}>
      
      <div style={{ background: 'rgba(255, 255, 255, 0.5)', width: '100%', borderBottom: '1px solid rgba(229, 231, 235, 0.5)', backdropFilter: 'blur(10px)', sticky: 'top', zIndex: 100 }}>
        <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=2000&auto=format&fit=crop&q=80" alt="Hertz Fleet" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 60%, transparent 100%)' }} />
          <div style={{ position: 'absolute', left: '2.5rem', top: '50%', transform: 'translateY(-50%)' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.1, margin: 0, whiteSpace: 'pre-line' }}>{t('NAVIGATE_YOUR_NEXT_MOVE')}</h2>
               <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button onClick={() => { setStep('upload'); setSelectedFile(null); }} style={{ background: 'linear-gradient(90deg, #f59e0b, #ec4899)', color: '#fff', padding: '0.5rem 1.25rem', borderRadius: 8, fontWeight: 900, fontSize: '0.75rem', border: 'none', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}>{t('UPLOAD_RESUME')}</button>
                <button onClick={() => { localStorage.removeItem('hertz_profile_analyzed'); setStep('upload'); setSelectedFile(null); }} style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '0.5rem 1.25rem', borderRadius: 8, fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>{t('REVALIDATE')}</button>
               </div>
          </div>
          <div style={{ position: 'absolute', right: '2.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', borderRadius: 16, padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ flex: 1 }}>
               <p style={{ fontWeight: 900, fontSize: '1.1rem', color: '#fff', margin: 0 }}>John Smith</p>
               <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: '0.2rem 0 0.5rem' }}>{t('PROFILE_AWESOME')}</p>
               <button style={{ color: '#ec4899', background: 'none', border: 'none', padding: 0, fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>{t('ELEVATE_POTENTIAL')} <ArrowRight size={12} /></button>
            </div>
            <div style={{ width: 52, height: 52, background: 'linear-gradient(135deg, #f59e0b, #ec4899)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: 2 }}>
               <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}><Image src="/john_profile.png" alt="John" width={52} height={52} style={{ objectFit: 'cover' }} /></div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60, position: 'relative' }}>
           <h2 style={{ fontSize: 44, fontWeight: 900, color: '#1E293B', marginBottom: 30, letterSpacing: '-0.02em' }}>{t('EXPLORE_FUTURE_MOVES')}</h2>
           
           {!portalActivePath && !showNewJourney && !isAnalyzingPathway && !showSurprise && (
             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', position: 'relative', zIndex: 10, animation: 'cardIn 0.8s ease' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 340, position: 'relative' }}>
                  <div style={{ borderRadius: '50%', padding: 4, background: 'linear-gradient(135deg, #f59e0b, #ec4899)', boxShadow: '0 0 20px rgba(236,72,153,0.2)' }}>
                    <div style={{ width: 160, height: 160, borderRadius: '50%', overflow: 'hidden', border: '4px solid #fff', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                      <Image src="/john_profile.png" alt="You" width={160} height={160} style={{ objectFit: 'cover', transform: 'scale(1.1) translateY(5%)' }} priority />
                    </div>
                  </div>
                  <button onClick={handleSimulatePathway} style={{ background: '#EC4899', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: 12, fontWeight: 800, fontSize: 16, boxShadow: '0 8px 20px rgba(236,72,153,0.3)', cursor: 'pointer', marginTop: 30 }}>{t('SIMULATE_PATHWAY')}</button>
                </div>
             </div>
            )}


            {isAnalyzingPathway && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, animation: 'cardIn 0.5s ease' }}>
                 <div style={{ position: 'relative', width: 180, height: 180, marginBottom: 40 }}>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid #EC4899', opacity: 0.2, animation: 'ping 2s infinite' }} />
                    <div style={{ position: 'absolute', inset: 20, borderRadius: '50%', border: '2px solid #f59e0b', opacity: 0.3, animation: 'ping 2.5s infinite reverse' }} />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <div style={{ width: 100, height: 100, borderRadius: '50%', overflow: 'hidden', border: '4px solid #fff', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                          <Image src="/john_profile.png" alt="Analyzing" width={100} height={100} style={{ objectFit: 'cover' }} />
                       </div>
                    </div>
                    {/* Scanning radar line */}
                    <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', border: '2px solid transparent', borderTopColor: '#EC4899', animation: 'spin 1.5s linear infinite' }} />
                 </div>
                 
                 <h3 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    { [
                      "Initializing Strategic Analysis...",
                      "Correlating Skill Matrix...",
                      "Scanning Market Vacancies...",
                      "Calibrating Career Velocity...",
                      "Optimizing Path Trajectory..."
                    ][analysisPathwayStep] }
                 </h3>
                 <div style={{ width: 240, height: 4, background: '#F1F5F9', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: 'linear-gradient(90deg, #f59e0b, #EC4899)', width: `${(analysisPathwayStep + 1) * 20}%`, transition: 'all 0.5s ease' }} />
                 </div>
              </div>
            )}



           {showSurprise && !portalActivePath && !showNewJourney && (
             <div style={{ animation: 'cardIn 0.8s ease' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
                  <div style={{ borderRadius: '50%', padding: 4, background: 'linear-gradient(135deg, #f59e0b, #ec4899)', boxShadow: '0 0 20px rgba(236,72,153,0.2)', marginBottom: 20 }}>
                    <div style={{ width: 140, height: 140, borderRadius: '50%', overflow: 'hidden', border: '4px solid #fff', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                      <Image src="/john_profile.png" alt="You" width={140} height={140} style={{ objectFit: 'cover', transform: 'scale(1.1) translateY(5%)' }} priority />
                    </div>
                  </div>
                  {/* Kept Simulate Pathway Button as a static label/anchor point as requested */}
                  <div style={{ background: '#EC4899', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: 12, fontWeight: 800, fontSize: 16, boxShadow: '0 8px 20px rgba(236,72,153,0.3)', opacity: 1, position: 'relative', zIndex: 20 }}>{t('SIMULATE_PATHWAY')}</div>
                </div>
                <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
                    <React.Fragment>
                      <div style={{ position: 'relative', height: 180, width: '100%', marginBottom: 20, marginTop: -20, pointerEvents: 'none', zIndex: 10 }}>

                          <svg width="100%" height="100%" viewBox="0 0 1000 180" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
                             <defs>
                               <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                                 <path d="M 0 0 L 10 5 L 0 10 z" fill="#1E293B" />
                               </marker>
                             </defs>
                             {/* Curved, dark dotted lines for a more elegant flow - Originating from the Simulate Pathway button area (approx y=20) */}
                             <path d="M 500 20 C 500 100, 125 60, 125 180" fill="none" stroke="#1E293B" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#arrow)" style={{ opacity: 0 }}>
                               <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
                              <animate attributeName="opacity" from="0" to="0.6" dur="0.5s" begin="0s" fill="freeze" />
                             </path>
                             <path d="M 500 20 C 500 100, 375 60, 375 180" fill="none" stroke="#1E293B" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#arrow)" style={{ opacity: 0 }}>
                               <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
                               <animate attributeName="opacity" from="0" to="0.6" dur="0.5s" begin="1s" fill="freeze" />
                             </path>
                             <path d="M 500 20 C 500 100, 625 60, 625 180" fill="none" stroke="#1E293B" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#arrow)" style={{ opacity: 0 }}>
                               <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
                               <animate attributeName="opacity" from="0" to="0.6" dur="0.5s" begin="2s" fill="freeze" />
                             </path>
                             <path d="M 500 20 C 500 100, 875 60, 875 180" fill="none" stroke="#1E293B" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#arrow)" style={{ opacity: 0 }}>
                               <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
                               <animate attributeName="opacity" from="0" to="0.6" dur="0.5s" begin="3s" fill="freeze" />
                             </path>
                          </svg>
                      </div>

                      <div ref={journeysRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, width: '100%', transition: 'all 0.5s ease', marginBottom: expandedPathId ? 60 : 0 }}>
                        {careerCards.map((card, idx) => (
                          <div key={card.id} className="path-card-tree" onClick={() => setExpandedPathId(expandedPathId === card.pathId ? null : card.pathId)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', animation: 'popIn 0.5s ease forwards', animationDelay: `${idx * 1}s`, opacity: 0, width: '100%', background: expandedPathId === card.pathId ? '#fff' : 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', border: expandedPathId === card.pathId ? `2px solid ${card.matchColor}` : '1px solid rgba(226, 232, 240, 0.8)', borderRadius: 32, padding: '32px 24px', boxShadow: expandedPathId === card.pathId ? `0 20px 40px ${card.matchColor}20` : '0 10px 30px rgba(0,0,0,0.03)', transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)', position: 'relative', overflow: 'hidden' }}>
                             {/* Vibrant Top Accent */}
                             <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 8, background: card.matchColor }} />
                             
                             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                                <div style={{ background: card.matchColor, color: '#fff', fontSize: 10, fontWeight: 1000, padding: '6px 16px', borderRadius: 10, border: '2px solid #fff', textTransform: 'uppercase', marginBottom: 20, zIndex: 2, boxShadow: `0 4px 15px ${card.matchColor}4D`, letterSpacing: '0.05em' }}>{t(card.match)}</div>
                                
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                                   <div style={{ position: 'absolute', top: 0, right: 0 }}><Compass size={20} color={card.matchColor} style={{ opacity: 0.3 }} /></div>
                                   
                                   <div style={{ position: 'relative', width: 110, height: 110, marginBottom: 24 }}>
                                      <div style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: `1px dashed ${card.matchColor}`, opacity: 0.2, animation: 'spin 12s infinite linear' }} />
                                      <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '4px solid #fff', boxShadow: '0 8px 25px rgba(0,0,0,0.08)' }}>
                                        <Image src={card.image} width={110} height={110} alt="" style={{ objectFit: 'cover' }} />
                                      </div>
                                   </div>
                                   
                                   <div style={{ fontSize: 20, fontWeight: 1000, color: '#0F172A', lineHeight: 1.1, textAlign: 'center', marginBottom: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: '-0.02em', height: 50 }}>{card.role}</div>
                                   
                                   <button onClick={(e) => { e.stopPropagation(); setExpandedPathId(expandedPathId === card.pathId ? null : card.pathId); }} style={{ width: 'fit-content', minWidth: 160, background: card.badgeColor, color: '#fff', fontSize: 12, fontWeight: 950, padding: '12px 32px', borderRadius: 20, textTransform: 'uppercase', boxShadow: `0 10px 25px ${card.badgeColor}4D`, border: 'none', cursor: 'pointer', letterSpacing: '0.06em', transition: 'all 0.3s' }}>{expandedPathId === card.pathId ? 'CLOSE VIEW' : t(card.badge)}</button>
                                </div>
                             </div>
                          </div>
                        ))}
                      </div>
                    </React.Fragment>

                    {expandedPathId && (
                      <div ref={roadmapRef} style={{ width: '100%', transition: 'all 0.5s ease', animation: 'popIn 0.6s ease-out forwards', paddingTop: 40, borderTop: '2px dashed #E2E8F0', marginTop: 20 }}>
                         {careerCards.map((selectedCardInLoop) => {
                           if (expandedPathId !== selectedCardInLoop.pathId) return null;
                           const cardIdx = careerCards.findIndex(c => c.pathId === expandedPathId);
                           const lane1 = careerCards[cardIdx];
                           const getPath = (pId: string) => careerPathsData.categories.flatMap(c => c.paths).find(p => p.id === pId);
                           const path1 = getPath(lane1.pathId);
                           
                           return (
                             <div key="discovery-dashboard" style={{ position: 'relative' }}>
                               <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                 <div>
                                   <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                     <div style={{ background: lane1.matchColor, width: 4, height: 24, borderRadius: 2 }} />
                                     <h2 style={{ fontSize: 28, fontWeight: 900, color: '#1E293B', margin: 0 }}>Path Simulation: <span style={{ color: lane1.matchColor }}>{selectedCardInLoop.role}</span></h2>
                                   </div>
                                   <p style={{ fontSize: 14, color: '#94A3B8', fontWeight: 600, marginLeft: 16 }}>Detailed career roadmap based on your current expertise</p>
                                 </div>
                                 <button onClick={() => setExpandedPathId(null)} style={{ background: lane1.matchColor, border: 'none', padding: '10px 24px', borderRadius: 12, fontSize: 12, fontWeight: 1000, color: '#fff', cursor: 'pointer', boxShadow: `0 4px 10px ${lane1.matchColor}33`, textTransform: 'uppercase', letterSpacing: '0.05em' }} className="btn-close-roadmap">CLOSE</button>
                               </div>
                               <div style={{ display: 'flex', gap: 0, position: 'relative', background: '#F8FAFC', padding: '40px 32px', borderRadius: 24, border: '1.5px solid #0F172A' }}>
                                 <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
                                   <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                       <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                         <div style={{ background: '#F0F4FF', color: '#6366F1', fontSize: 10, fontWeight: 1000, padding: '6px 16px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.05em', border: '1px solid #E0E7FF' }}>{lane1.label}</div>
                                       </div>
                                       <LaneRow card={lane1} pathData={path1} t={t} setPortalActivePath={setPortalActivePath} hideBridge={cardIdx === careerCards.length - 1} />
                                   </div>
                                 </div>
                               </div>
                             </div>
                           );
                         })}
                      </div>
                    )}
                </div>
             </div>
           )}
        </div>

        <style>{`
          @keyframes popIn { from { transform: scale(0.95) translateY(10px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
          .discovery-row-container:hover { border-color: rgba(255,255,255,0.5); transform: translateY(-4px) scale(1.02); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08); }
          .discovery-row-container:hover .progression-box { background: rgba(255, 255, 255, 0.9) !important; transform: scale(1.05); }
          .hover-scale:hover { transform: scale(1.05); background: #f8fafc !important; }
          .btn-roadmap-premium:hover { transform: translateY(-2px); filter: brightness(1.1); box-shadow: 0 12px 24px rgba(0,0,0,0.15); }
          .hover-heart:hover { color: #EF4444 !important; }
        `}</style>
      </div>
      
      {showNewJourney && (
        <NewJourneyFlow onFindJourney={(role) => { const roleMap: Record<string, string> = { 'Incentive Compensation': 'incentive-comp', 'IT Career Path': 'it-path', 'Learning & Development': 'l-and-d', 'Operations': 'operations' }; setPortalActivePath(roleMap[role] || 'incentive-comp'); setShowNewJourney(false); setShowSurprise(true); }} onCancel={() => setShowNewJourney(false)} />
      )}
      
      {showSurprise && portalActivePath && (
        <CareerCoachingPortal overridePath={portalActivePath} onBack={() => { setPortalActivePath(null); setShowSurprise(true); }} />
      )}

      {showSuggestedMoves && (
        <SuggestedMoves 
          userProfile={{ name: 'John Smith', role: 'High School Tutor & Server', image: '/john_profile.png' }} 
          onBack={() => setShowSuggestedMoves(false)} 
        />
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        * { scrollbar-width: none; font-family: 'Outfit', 'Inter', sans-serif !important; }
        *::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
