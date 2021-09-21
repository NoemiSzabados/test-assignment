import './App.css';
import TopicInformation from "./views/topicInformation";
import WordCloudContainer from "./views/wordCloud";


function App() {
    return (
    <div className="App">
      <h1>Word Cloud</h1>
      <div className="container">
        <WordCloudContainer />
        <TopicInformation />
      </div>
    </div>
  );
}

export default App;
