import renderer, {act} from "react-test-renderer";
import TopicInformation from "./index";
import topicsProvider from "../../data";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReactDOM from "react-dom";


Enzyme.configure({ adapter: new Adapter() });

describe('Topic Information', () => {
    it('snapshot test', () => {
        const component = renderer.create(
            <TopicInformation />,
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

    });

    it('renders without crush', () => {
        const div = document.createElement("div");
        ReactDOM.render(<TopicInformation />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('topic information is hidden after init', () => {
        const wrapper = shallow(<TopicInformation />);
        expect(wrapper.find('.hidden').exists()).toBe(true);
    });

    it('topic information is hidden when topic is null', () => {
        const wrapper = shallow(<TopicInformation />);
        const topic = null;
        act(() => {
            topicsProvider.selectedTopicStream.next(topic);
        });
        expect(wrapper.find('.hidden').exists()).toBe(true);
    });

    it('topic information is visible when topic is not null', async () => {
        const component = renderer.create(
            <TopicInformation />,
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
        const topic =
            {
                "id": "1751295897__Berlin",
                "label": "Berlin",
                "volume": 165,
                "type": "topic",
                "sentiment": {
                    "negative": 3,
                    "neutral": 133,
                    "positive": 29
                },
                "sentimentScore": 65,
                "burst": 13,
            };
        act(()=> {
            topicsProvider.selectedTopicStream.next(topic);
        })

        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
