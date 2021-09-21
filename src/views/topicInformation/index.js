import "../../styles/topicInformation.scss";
import topicsProvider from "../../data";
import {useEffect, useState} from "react";

export default function TopicInformation({}) {

    const [topic, setTopic] = useState(null);
    const [positiveMentions, setPositiveMentions] = useState(null);
    const [neutralMentions, setNeutralMentions] = useState(null);
    const [negativeMentions, setNegativeMentions] = useState(null);

    useEffect(() => {
        const subscription = topicsProvider.selectedTopicStream.subscribe((topic) => {
            setTopic(topic);
            if (topic) {
                setPositiveMentions(topic.sentiment.positive ? topic.sentiment.positive : 0);
                setNeutralMentions(topic.sentiment.neutral ? topic.sentiment.neutral : 0);
                setNegativeMentions(topic.sentiment.negative ? topic.sentiment.negative : 0);
            }
        });
        return () => subscription.unsubscribe();
    }, []);


    return (
        <div className={"infoWrapper" + (topic ? "": " hidden")} >
            {topic && <div className="infoContainer">
                <div>Information on topic "{topic.label}"</div>
                <div>Total mentions: {topic.volume}</div>
                <div>
                    <div>Positive mentions: <span className="positiveMentions">{positiveMentions}</span></div>
                    <div>Neutral mentions: {neutralMentions}</div>
                    <div>Negative mentions: <span className="negativeMentions">{negativeMentions}</span></div>
                </div>
            </div>
            }
        </div>
    );
}