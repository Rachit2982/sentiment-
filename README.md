# 📊 Social Media Sentiment Analyzer Dashboard

Harness the power of real-time **social media sentiment analysis** with an interactive dashboard built using **React, Vite, TypeScript, and Gemini API**.  

This project visualizes campaign hashtag sentiment in real-time, using transformer-based models for nuanced sentiment analysis and an intuitive frontend for marketers, strategists, and researchers.

🔗 **Live Project:** [View Here](https://sentiment-4mx.pages.dev/)

---

## 🚀 Features
- 📈 **Real-Time Sentiment Analysis** of hashtags and posts  
- 🎨 **Interactive Charts** (time series, pie charts, bar charts)  
- 🌗 **Light & Dark Mode Support**  
- 🔄 **Live Social Media Feed Simulation**  
- 🤖 **Transformer-based NLP** with Gemini API  
- ⚡ **Fast frontend** powered by React + Vite  

---

## 🛠️ Tech Stack
- **Frontend:** React, TypeScript, Vite  
- **Visualization:** Custom charts (TimeSeries, Sentiment, PostFeed)  
- **LLM API:** Google Gemini API  
- **Other:** Node.js, npm  

---

## 📂 Project Structure
```
├── components/          # UI Components
│   ├── Header.tsx
│   ├── Instructions.tsx
│   ├── LoadingSpinner.tsx
│   ├── PostFeed.tsx
│   ├── SearchControl.tsx
│   ├── SentimentChart.tsx
│   └── TimeSeriesChart.tsx
├── services/
│   └── geminiService.ts # Gemini API integration
├── App.tsx              # Main React App
├── constants.ts         # App constants
├── index.tsx            # Entry point
├── index.html           # Root HTML
├── types.ts             # TypeScript types
├── vite.config.ts       # Vite config
├── tsconfig.json        # TypeScript config
└── package.json         # Dependencies
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/social-media-sentiment-analyzer.git
cd social-media-sentiment-analyzer
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root directory:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run the development server
```bash
npm run dev
```

---

## 📌 Usage
1. Enter a **campaign hashtag or keyword** in the search bar.  
2. View real-time **sentiment trends, charts, and live posts feed**.  
3. Toggle between **light and dark mode** for better visualization.  

---

## 🧩 Future Improvements
- Integration with live Twitter/Reddit APIs  
- Advanced analytics (geo-location trends, influencer tracking)  
- Export sentiment reports (PDF/CSV)  
- Multi-language sentiment support  

---

## 📜 License
MIT License © 2025 [Your Name]  


## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
