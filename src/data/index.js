import file from './topics.json';
import { BehaviorSubject } from 'rxjs';

const topics = new BehaviorSubject(file.topics);
const selectedTopic = new BehaviorSubject(null);

export default {
    topicsStream: topics,
    selectedTopicStream: selectedTopic,
};