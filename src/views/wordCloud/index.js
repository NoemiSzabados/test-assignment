import "../../styles/wordCloud.scss";
import {useEffect, useState} from 'react';
import topicsProvider from '../../data';


export default function WordCloud() {
    const [topics, setTopics] = useState(null);

    useEffect(() => {
        const subscription = topicsProvider.topicsStream.subscribe(setTopics);
        return () => subscription.unsubscribe();
    }, []);

    const selectTopic = function(topic) {
        topicsProvider.selectedTopicStream.next(topic);
    }

    const getColor = function(topic) {
        if (topic.sentimentScore > 60) {
            return "greenText";
        } else if (topic.sentimentScore < 40) {
            return "redText";
        }
    }

    return (
        <div className="wordCloudWrapper">
            {
                topics && topics.length>0 &&
                topics.map((topic)=>
                    <span key={topic.id} className={getColor(topic)} onClick={()=>selectTopic(topic)}> {topic.label}</span>
                )
            }
        </div>
    );
}