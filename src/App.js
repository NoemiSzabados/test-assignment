import './App.css';
import TopicInformation from "./views/topicInformation";
import WordCloud from "./views/wordCloud";

function App() {
  return (
    <div className="App">
      <h1>Word Cloud</h1>
      <div className="container">
        <WordCloud />
        <TopicInformation />
      </div>
    </div>
  );
}

export default App;
