import App from './App';
import ReactDOM from "react-dom"
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WordCloudContainer from "./views/wordCloud";
import TopicInformation from "./views/topicInformation";

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('snapshot test', () => {
        const component = renderer.create(
            <App />,
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("title and components displayed", () => {
        const wrapper = shallow(<App />);
        const text = wrapper.find("h1").text();

        expect(text).toEqual("Word Cloud");
        expect(wrapper.contains(<WordCloudContainer />)).toBe(true);
        expect(wrapper.contains(<TopicInformation />)).toBe(true);
    });
})
