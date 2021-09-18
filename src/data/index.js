import file from './topics.json';
import { BehaviorSubject } from 'rxjs';

const topics = new BehaviorSubject(file.topics);

export default {
    topicsStream: topics
};