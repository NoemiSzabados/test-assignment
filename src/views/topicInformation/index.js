import "../../styles/topicInformation.scss";

export default function TopicInformation({topic}) {
    const positiveMentions = topic.sentiment.positive ? topic.sentiment.positive : 0;
    const neutralMentions = topic.sentiment.neutral ? topic.sentiment.neutral : 0;
    const negativeMentions = topic.sentiment.negative ? topic.sentiment.negative : 0;

    return (
        <div className="infoWrapper">
            <div>Information on topic "{topic.label}"</div>
            <div>Total mentions: {topic.volume}</div>
            <div>
                <div>Positive mentions: <span className="positiveMentions">{positiveMentions}</span></div>
                <div>Neutral mentions: {neutralMentions}</div>
                <div>Negative mentions: <span className="negativeMentions">{negativeMentions}</span></div>
            </div>
        </div>
    );
}