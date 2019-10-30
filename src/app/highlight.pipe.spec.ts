import {HighlightPipe} from './highlight.pipe';

describe('HighlightPipe', () => {

    let pipe = new HighlightPipe();

    it('return the same string if search string is null or empty', () => {
        expect(pipe.transform('Byjus', null)).toBe('Byjus');
    });


    it('return the updated string with html mark tag containing search string', () => {
        expect(pipe.transform('Byjus', 'ju')).toBe('By<mark>ju</mark>s');
    });

});
