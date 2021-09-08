import ClassProfileStatus from "./ClassProfileStatus";
import {create} from 'react-test-renderer'

describe("ClassProfileStatus Component should be displayed", () => {

    test('after creation input should`t be displayed', () => {
        const component = create(<ClassProfileStatus status={'Gey'}/>)
        const root = component.root
        expect(() => {let input = root.findByType('input')}).toThrow()
    })

    test("after creation span should be correct status", () => {
        const component = create(<ClassProfileStatus status={'Gey'}/>)
        const root = component.root
        let span = root.findByType('span')
        expect(span.children[0]).toBe('Gey')
    })

   /* test('input should be displayed in editMode instead of span', () => {
        const component = create(<ClassProfileStatus status={'Gey'}/>)
        const root = component.root
        let span = root.findByType('span')
        span.props.onDoubleClick();
        let input = root.findByType('input')
        expect(input.props.value).toBe('Gey')
    })*/
})