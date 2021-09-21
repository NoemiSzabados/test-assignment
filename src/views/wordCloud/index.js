import "../../styles/wordCloud.scss";
import {useEffect, useState} from 'react';
import topicsProvider from '../../data';


const getSizeGroups = function(topics) {
    let sizeGroups = {};

    // get volumes in descending order without duplicates
    let volumes = Array.from(new Set(topics.map(topic => topic.volume)));
    volumes.sort(function(a, b){ return b-a });

    let nbOfItemsInGroups = volumes.length / 6;

    // grouping volumes into 6 equal groups
    for (let group = 1; group < 7; group++) {
        let startIndex = Math.round(nbOfItemsInGroups * (group - 1));
        let endIndex = Math.round(nbOfItemsInGroups * group);
        for (let volumeIndex = startIndex; volumeIndex < endIndex; volumeIndex++) {
            sizeGroups[volumes[volumeIndex]] = group;
        }
    }
    return sizeGroups;
}

export default function WordCloud() {
    const [topics, setTopics] = useState(null);
    const [sizeGroups, setSizeGroups] = useState({});

    useEffect(() => {
        const subscription = topicsProvider.topicsStream.subscribe((result) => {
            setTopics(result);
            setSizeGroups(getSizeGroups(result));
        });
        return () => subscription.unsubscribe();
    }, []);

    const selectTopic = function(topic) {
        topicsProvider.selectedTopicStream.next(topic);
    }

    const getColor = function(topic) {
        if (topic.sentimentScore > 60) {
            return "greenText ";
        } else if (topic.sentimentScore < 40) {
            return "redText ";
        }
        return "";
    }

    const getSize = function(topic) {
        return "fontSize-" + sizeGroups[topic.volume];
    }

    return (
        <div className="wordCloudWrapper">
            <div className="wordCloudContainer">
            {
                topics && topics.length>0 &&
                topics.map((topic)=>
                    <span key={topic.id} className={getColor(topic) + getSize(topic)} onClick={()=>selectTopic(topic)}> {topic.label} </span>
                )
            }
            </div>

        </div>
    );
}