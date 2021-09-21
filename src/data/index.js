import file from './topics.json';
import { BehaviorSubject } from 'rxjs';

const topics = new BehaviorSubject(file.topics.sort(() => Math.random() - 0.5));
const selectedTopic = new BehaviorSubject(null);

export default {
    topicsStream: topics,
    selectedTopicStream: selectedTopic,
};