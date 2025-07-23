// src/hooks/useScrollAnimations.ts
import { useState, useEffect } from 'react';

export interface AnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimations = (options: AnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
    triggerOnce = true
  } = options;

  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  // Initial load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id));
          } else if (!triggerOnce) {
            setVisibleSections(prev => {
              const newSet = new Set(prev);
              newSet.delete(entry.target.id);
              return newSet;
            });
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    const sections = document.querySelectorAll('[data-animate-on-scroll]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [threshold, rootMargin, triggerOnce]);

  // Animation class generators
  const getAnimationClass = (
    sectionId: string,
    baseAnimation: string = 'opacity-100 translate-y-0',
    hiddenAnimation: string = 'opacity-0 translate-y-12',
    duration: string = 'duration-1000',
    delay: string = ''
  ) => {
    const delayClass = delay ? `delay-${delay}` : '';
    return `transition-all ${duration} ease-out ${delayClass} ${
      visibleSections.has(sectionId) ? baseAnimation : hiddenAnimation
    }`;
  };

  const getLoadAnimation = (
    baseAnimation: string = 'opacity-100 translate-y-0',
    hiddenAnimation: string = 'opacity-0 translate-y-8',
    duration: string = 'duration-1500'
  ) => {
    return `transition-all ${duration} ease-out ${
      isLoaded ? baseAnimation : hiddenAnimation
    }`;
  };

  const getCardAnimation = (
    sectionId: string,
    index: number = 0,
    baseDelay: number = 200
  ) => {
    const delay = baseDelay + (index * 100);
    return `transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl ${
      visibleSections.has(sectionId) 
        ? `opacity-100 translate-y-0 delay-[${delay}ms]` 
        : 'opacity-0 translate-y-8'
    }`;
  };

  return {
    isLoaded,
    visibleSections,
    getAnimationClass,
    getLoadAnimation,
    getCardAnimation,
    // Utility functions for common animation patterns
    fadeInUp: (sectionId: string, delay?: string) => 
      getAnimationClass(sectionId, 'opacity-100 translate-y-0', 'opacity-0 translate-y-12', 'duration-1000', delay),
    fadeInLeft: (sectionId: string, delay?: string) => 
      getAnimationClass(sectionId, 'opacity-100 translate-x-0', 'opacity-0 -translate-x-12', 'duration-800', delay),
    fadeInRight: (sectionId: string, delay?: string) => 
      getAnimationClass(sectionId, 'opacity-100 translate-x-0', 'opacity-0 translate-x-12', 'duration-800', delay),
    scaleIn: (sectionId: string, delay?: string) => 
      getAnimationClass(sectionId, 'opacity-100 scale-100', 'opacity-0 scale-95', 'duration-700', delay),
  };
};
