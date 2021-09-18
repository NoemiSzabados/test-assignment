import "../../styles/wordCloud.scss";
import {useEffect, useState} from 'react';
import topicsProvider from '../../data';


export default function WordCloud() {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const subscription = topicsProvider.topicsStream.subscribe(setTopics);
        return () => subscription.unsubscribe();
    }, []);

    return (
        <div className="wordCloudWrapper">
            {
                topics && topics.length>0 && topics.map((topic)=><p>{topic.label}</p>)
            }
        </div>
    );
}