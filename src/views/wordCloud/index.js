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

    return (
        <div className="wordCloudWrapper">
            {
                topics && topics.length>0 && topics.map((topic)=><p key={topic.id} onClick={()=>selectTopic(topic)}>{topic.label}</p>)
            }
        </div>
    );
}