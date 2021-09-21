import "../../styles/wordCloud.scss";
import {useEffect, useState, useCallback} from 'react';
import topicsProvider from '../../data';
import WordCloud from 'react-d3-cloud';

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

const addTextAndValuePoperty = function(topics) {
    topics.forEach((topic)=> {
        topic['text'] = topic['label'];
        topic['value'] = topic['volume']
    })
    return topics;
}

export default function WordCloudContainer() {
    const [topics, setTopics] = useState(null);
    const [sizeGroups, setSizeGroups] = useState({});

    useEffect(() => {
        const subscription = topicsProvider.topicsStream.subscribe((result) => {
            setTopics(addTextAndValuePoperty(result));
            setSizeGroups(getSizeGroups(result));
        });
        return () => subscription.unsubscribe();
    }, []);

    const selectTopic = function(topic) {
        topicsProvider.selectedTopicStream.next(topic);
    }

    const getColor = useCallback((topic) => {
        if (topic.sentimentScore > 60) {
            return "darkseagreen";
        } else if (topic.sentimentScore < 40) {
            return "indianred";
        }
        return "dimgrey";
    }, []);

    return (
        <div className="wordCloudWrapper">
            <div className="wordCloudContainer">
            {
                topics && topics.length>0 &&
                <WordCloud
                    data={topics}
                    fontSize={(topic) => {
                        return (7 - sizeGroups[topic.volume] ) *10 ;
                    }}
                    padding={5}
                    rotate = {0}
                    fill= {getColor}
                    onWordClick={(pointer, word) => selectTopic(word)}
                />
            }
            </div>

        </div>
    );
}