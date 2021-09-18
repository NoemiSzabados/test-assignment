import './App.css';
import TopicInformation from "./views/topicInformation";
import WordCloud from "./views/wordCloud";

function App() {
    const topic =
        {
        "id": "1751295897__Berlin",
        "label": "Berlin",
        "volume": 165,
        "type": "topic",
        "sentiment": {
            "negative": 3,
            // "neutral": 133,
            "positive": 29
        },
        "sentimentScore": 65,
        "burst": 13
        }

  return (
    <div className="App">
      <h1>Word Cloud</h1>
      <div className="container">
        <WordCloud />
        {topic && <TopicInformation topic={topic}/>}
      </div>
    </div>
  );
}

export default App;
