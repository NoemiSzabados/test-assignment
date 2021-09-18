import './App.css';
import TopicInformation from "./views/topicInformation";
import WordCloud from "./views/wordCloud";
import topicsProvider from "./data";
import {useEffect, useState} from "react";

function App() {
    const [topic, setTopic] = useState(null);

    useEffect(() => {
        const subscription = topicsProvider.selectedTopicStream.subscribe(setTopic);
        return () => subscription.unsubscribe();
    }, []);

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
