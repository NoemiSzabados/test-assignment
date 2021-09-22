
import renderer from 'react-test-renderer';
import WordCloudContainer from "./index";
import ReactDOM from "react-dom";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe('Word Cloud', () => {
    it('snapshot test', () => {
        const component = renderer.create(
            <WordCloudContainer />,
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

    });

    it('renders without crush', () => {
        const div = document.createElement("div");
        ReactDOM.render(<WordCloudContainer />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

});
