import previewContent from "../../functions/previewContent";

test('Should return the correct text from previewContent', () => {
    const text = 'My name is Admin';
    const previewFunction = previewContent(text);
    expect(previewFunction.length).toBeLessThan(text.length);
    expect(previewFunction).toBe('My name is');
});