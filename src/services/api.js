// Enhanced API service with quiz generation

// Wikipedia summary endpoint
const WIKI_SUMMARY_URL = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
// Wikipedia events (timelines) are not directly available, but we can fetch sections or use Wikidata for more structured data.
const QUIZ_GENERATION_URL = 'https://api.openai.com/v1/chat/completions';

export const fetchTopicContent = async (topic) => {
  try {
    // First try the exact topic match
    let response = await fetch(`${WIKI_SUMMARY_URL}${encodeURIComponent(topic)}`);
    
    // If not found, try with "(history)" suffix which often gives better historical context
    if (!response.ok) {
      response = await fetch(`${WIKI_SUMMARY_URL}${encodeURIComponent(topic + ' (history)')}`);
    }
    
    if (!response.ok) throw new Error('Topic not found');
    
    const data = await response.json();
    
    // Format the response consistently
    return {
      title: data.title.replace('(history)', '').trim(),
      narrative: data.extract || 'No summary available.',
      imageUrl: data.thumbnail?.source || null,
      timeline: [{
        date: data.description || 'Historical Overview',
        title: 'Summary',
        description: data.extract || 'No details available.'
      }]
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      title: 'Error',
      narrative: 'No historical information found. Try a different search term.',
      imageUrl: null,
      timeline: []
    };
  }
};

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_ENDPOINTS = [
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent',
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'
];

async function tryGeminiRequest(prompt, endpointIndex = 0) {
  try {
    const response = await fetch(
      `${GEMINI_ENDPOINTS[endpointIndex]}?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate 3-5 multiple choice questions about ${prompt}. Return ONLY valid JSON array format like: [{"question":"...","options":["...","..."],"answer":0}]`
            }]
          }]
        })
      }
    );

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const data = await response.json();
    console.log('Raw API response:', data);
    
    // Extract and parse the response
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!responseText) throw new Error('Empty response');
    
    try {
      const parsed = JSON.parse(responseText);
      if (!Array.isArray(parsed)) throw new Error('Response not an array');
      return parsed;
    } catch (e) {
      // Try to extract JSON from malformed response
      const jsonMatch = responseText.match(/\[.*\]/s);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);
      throw e;
    }
  } catch (error) {
    if (endpointIndex < GEMINI_ENDPOINTS.length - 1) {
      return tryGeminiRequest(prompt, endpointIndex + 1);
    }
    throw error;
  }
}

// Fallback questions for when API fails
const getFallbackQuestions = (topic) => {
  const generalQuestions = [
    {
      question: `What is ${topic}?`,
      options: [
        "A historical event",
        "A scientific concept",
        "A geographical location",
        "A cultural phenomenon"
      ],
      answer: 0
    },
    {
      question: `When did ${topic} occur?`,
      options: [
        "In ancient times",
        "During the medieval period",
        "In the 19th century",
        "In modern times"
      ],
      answer: 0
    },
    {
      question: `Who was involved in ${topic}?`,
      options: [
        "Historical figures",
        "Scientists",
        "Artists",
        "Political leaders"
      ],
      answer: 0
    },
    {
      question: `What was the impact of ${topic}?`,
      options: [
        "It changed the course of history",
        "It had minimal impact",
        "It was quickly forgotten",
        "It only affected a small region"
      ],
      answer: 0
    },
    {
      question: `Where did ${topic} take place?`,
      options: [
        "In Europe",
        "In Asia",
        "In the Americas",
        "In Africa"
      ],
      answer: 0
    }
  ];
  
  return generalQuestions;
};

export const generateQuizQuestions = async (topic, difficulty = 'medium') => {
  const prompt = `Generate 5 multiple choice questions about ${topic} (${difficulty} difficulty). Return only valid JSON.`;
  
  try {
    // Try Gemini first
    const questions = await tryGeminiRequest(prompt);
    if (questions && questions.length > 0) {
      return questions;
    }
    throw new Error('No questions returned from API');
  } catch (error) {
    console.error('Gemini failed, falling back to Open Trivia DB');
    
    try {
      // Fallback to Open Trivia DB
      const response = await fetch(
        `https://opentdb.com/api.php?amount=5&category=23&difficulty=${difficulty}`
      );
      
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results.map(q => ({
          question: q.question,
          options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
          answer: q.incorrect_answers.length
        }));
      }
      throw new Error('No questions from Open Trivia DB');
    } catch (fallbackError) {
      console.error('Open Trivia DB failed, using fallback questions');
      // Use our fallback questions
      return getFallbackQuestions(topic);
    }
  }
};

// Helper functions
function getEraAnswer(narrative) {
  if (narrative.includes('century BC')) return 0;
  if (narrative.includes('medieval')) return 1;
  if (narrative.includes('19th')) return 2;
  return 3;
}

function generateContributionOptions(narrative) {
  const options = [];
  if (narrative.includes('invent')) options.push('Important inventions');
  if (narrative.includes('politic')) options.push('Political reforms');
  if (narrative.includes('art')) options.push('Artistic masterpieces');
  if (narrative.includes('science')) options.push('Scientific discoveries');
  
  // Fill remaining options if needed
  while (options.length < 4) {
    options.push('Various contributions');
  }
  
  return options.slice(0, 4);
}

export const fetchQuizQuestions = async (topic) => {
  try {
    const prompt = `Generate 2 multiple-choice questions about ${topic}. 
    Format as JSON array with objects containing:
    - question (string)
    - options (array of objects with id and text)
    - correctAnswer (string, matching option id)
    - explanation (string)`;

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch quiz questions');
    }

    const data = await response.json();
    const questions = JSON.parse(data.candidates[0].content.parts[0].text);
    return questions;
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    // Fallback to mock data if API fails
    return [];
  }
}; 

export const fetchTopicImages = async (topic) => {
  try {
    const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
    
    const response = await fetch(
      `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(topic)}&image_type=photo&per_page=5`
    );
    
    if (!response.ok) throw new Error(`Pixabay API Error: ${response.status}`);
    
    const data = await response.json();
    
    if (data.hits?.length > 0) {
      return data.hits.map(hit => ({
        url: hit.webformatURL,
        user: hit.user,
        pageURL: hit.pageURL
      }));
    }
    
    // Fallback to Unsplash (no attribution required)
    return [{
      url: `https://source.unsplash.com/300x200/?${encodeURIComponent(topic)},history`
    }];
  } catch (error) {
    console.error('Image fetch error:', error);
    return [];
  }
};